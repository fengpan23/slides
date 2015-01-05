define(['libs/backbone',
		'jquery.multisortable',
		'app/slideSnapshot/view/SlideSnapshot',
		'app/editor/GlobalEvents',
		'communal/undo_support/CmdListFactory',
	],
	function(Backbone, multisortable, SlideSnapshot, GlobalEvents, CmdListFactory) {
		'use strict';
		var undoHistory = CmdListFactory.managedInstance('editor');

		/**
		 * This class is responsible for rendering left sidebar with little slide previews.
		 *
		 * @class slide-well
		 */
		return Backbone.View.extend({
			events: {
				'destroyed': 'dispose',
				'mousedown': '_focused',
				'mousewheel': '_zoomView',
			},

			className: 'slide-well',

			/**
			 * -Initialize slide well.
			 */
			initialize: function() {
				delete this.options;
				this.$slides = $('<div class="slides">');

				this.model._deck.on('slideAdded', this._slideAdded, this);
				this.model._deck.on('slideMoved', this._slideMoved, this);
				this.model._deck.on('slidesReset', this._slidesReset, this);

				this.model._deck.on('change:slidewellScale', this._scaleChange, this);

				this.$slides.multisortable({
					items: "div.slideSnapshot",
					placeholder: "slidePlaceholder",
					stop: this._dragStopped.bind(this),
					mousedown: this._mousedown.bind(this),
					click: this._clicked.bind(this),
					axis: 'y'
				});

				GlobalEvents.on('cut', this._cut, this);
				GlobalEvents.on('copy', this._copy, this);
				GlobalEvents.on('paste', this._paste, this);
				GlobalEvents.on('delete', this._delete, this);

				this._clipboard = this.model.clipboard();

				// size setting
	            this._resize = this._resize.bind(this);
	            $(window).resize(this._resize);
	            var self = this;
				setTimeout(function() {
					self._resize();
				}, 50);
			},

			/**
			 * -Render slide well.
			 * @returns {html} $el
			 */
			render: function() {
				this.$slides.html('');
				this.$el.html(this.$slides);

				this.model._deck.get('slides').forEach(function(slide) {
					var snapshot = new SlideSnapshot({
						model: slide,
						deck: this.model._deck,
						registry: this.model._registry
					});
					this.$slides.append(snapshot.render());
				}, this);

				// if add slide btn is provider create it
				var addProvider = this.model.get('addProvider');
				addProvider && this.$el.append(addProvider.render(1, 'top'));
				
				return this.$el;
			},

			_scaleChange: function(model, scale){
				this._scaleResize(scale);
				$(window).resize();
			},

			_scaleResize: function(scale){
				if(scale == undefined){
					scale = this.$el.css(window.browserPrefix + "transform");
					scale = parseFloat(scale.substring(7, scale.indexOf(",")));
				}
				this.$el.height(this._slideWellHeight / scale);
				this.$el.css(window.browserPrefix + "transform", "scale(" + scale + ")");
				$('.operating-table').css('left', scale * this.$el.width());
			},

			_resize: function(){
				var headerHeight = 52;
				var winHeight = $(window).height();
				this._slideWellHeight = winHeight - headerHeight;
				this._scaleResize();
			},

			/**
			 * [_zoomView use mousewheel to zoom view]
			 * @param  {[jquery envent]} e    load the original event
			 * @return {[false]}   stopPropagation
			 */
			_zoomView: function(e){
				var multiselect = e.ctrlKey || e.metaKey;
				if(multiselect){
					var scale = this.$el.css(window.browserPrefix + "transform");
					scale = parseFloat(scale.substring(7, scale.indexOf(","))) || 1;
					e = e.originalEvent;
					scale =  (e.detail || e.wheelDelta) > 0 ? scale+0.05 : scale-0.05 ;
					this.model._deck.set('slidewellScale', scale.toFixed(2));
					return false
				}
			},

			/**
			 * -Create a slide snapshot for the new slide.
			 *
			 * @param {Slide} slide
			 * @param {number} index
			 * @private
			 */
			_slideAdded: function(slide, opts) {
				var index = opts.at;

				var snapshot = new SlideSnapshot({model: slide, deck: this.model._deck, registry: this.model._registry});
				if (index == 0) {
					this.$slides.prepend(snapshot.render());
				} else {
					var $slides = this.$el.find('.slideSnapshot');
					if (index >= $slides.length) {
						this.$slides.append(snapshot.render());
					} else {
						$($slides[index]).before(snapshot.render());
					}
				}
			},

			/**
			 * Move slide snapshot to a new position.
			 *
			 * @param {Slide} slide
			 * @param {number} destination
			 * @private
			 */
			_slideMoved: function(slide, destination) {
				if (this._initiatedMove) return;
				this.$slides.empty();
				this._slidesReset(this.model._deck.get('slides').models);
			},
			
			/**
			 * Refresh slide snapshots on slides reset.
			 *
			 * @param {Slide[]} newSlides
			 * @private
			 */
			_slidesReset: function(newSlides) {
				var i = 0;
				var opts = {at: 0};
				newSlides.forEach(function(slide) {
					opts.at = i;
					this._slideAdded(slide, opts);
					i += 1;
				}, this);
			},

			/**
			 * Event: user has finished dragging slide snapshots. We need to re-order slides accordingly.
			 *
			 * @param {jQuery.Event} event
			 * @param ui
			 * @private
			 */
			_dragStopped: function(event, ui) {
				var destination = this.$slides.children().index(this.$slides.find('.ui-selected')[0]);
				var slides = this.model._deck.selected;
				this._initiatedMove = true;
				this.model._deck.moveSlides(slides, destination);
				this._initiatedMove = false;
			},

			/**
			 * Event: user has pressed their mouse on a slide snapshot
			 *
			 * The jquery.multisortable plugin is computing the selections
			 * for us so we need to update our model to reflect
			 * the computed selections.
			*/
			_mousedown: function(e, $target_item) {
				var multiselect = e.ctrlKey || e.metaKey || e.shiftKey;

				var activate = false;

				this.$slides.find('> .ui-selected').trigger('select', {
					selected: true,
					multiselect: multiselect
				});

				if (!this.$slides.find('.active').is('.ui-selected') && !multiselect) {
					$target_item.trigger('select', {
						selected: true,
						active: !multiselect,
						multiselect: multiselect
					});
				}
			},

			/**
			 * -Event: user has clicked one of the slide snapshots.
			 * 
			 * Clicking a slide forces that one to become the active
			 * slide.
			 *
			 * @param {jQuery.Event} e
			 * @private
			 */
			_clicked: function(e, $target_item) {
				var multiselect = e.ctrlKey || e.metaKey || e.shiftKey;

				$target_item.trigger('select', {
					selected: true,
					active: !multiselect,
					multiselect: multiselect
				});
			},

			/**
			 * Event: mouse down.
			 *
			 * @param {jQuery.Event} e
			 * @private
			 */
			_focused: function(e) {
				this.model.focusScope('slideWell');
			},

			/**
			 * React on Cut shortcut.
			 * @private
			 */
			_cut: function() {
				if (this.model.focusScope() == 'slideWell') {
					var slides = this.model._deck.selected;
					this._clipboard.setItems(slides);
					this.model._deck.remove(slides);
				}
			},

			/**
			 * React on Copy shortcut.
			 * @private
			 */
			_copy: function() {
				if (this.model.focusScope() == 'slideWell') {
					var slides = this.model._deck.selected;
					this._clipboard.setItems(slides);
				}
			},

			/**
			 * React on Paste shortcut.
			 * @private
			 */
			_paste: function() {
				var slides = this._clipboard.getItems();
				if (slides != null && slides.length && slides[0].type != undefined && slides[0].type == 'slide') {
					slides.forEach(function(slide) {
						if(slide.get('x')){
							slide.set("x", slide.get('x') + 50);
							slide.set("y", slide.get('y') + 20);
						}
					});
					this.model._deck.add(slides);
				}
				// TODO: scroll to the new item...
			},

			/**
			 * React on Delete shortcut.
			 * @private
			 */
			_delete: function() {
				if (this.model.focusScope() == 'slideWell') {
					var slides = this.model._deck.selected;
					this.model._deck.remove(slides);
				}
			},

			constructor: function SlideWell() {
				Backbone.View.prototype.constructor.apply(this, arguments);
			}
		});
	});