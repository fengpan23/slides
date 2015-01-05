define(["libs/backbone",
	"common/Math2",
	"app/editor/GlobalEvents",
	"app/deck/ComponentCommands",
	"communal/widgets/DeltaDragControl",
	"communal/undo_support/CmdListFactory",
	"communal/interactions/TouchBridge",
	"communal/widgets/Guides"],
	function(Backbone, Math2, key, ComponentCommands, DeltaDragControl, CmdListFactory, TouchBridge, Guides) {
		var undoHistory = CmdListFactory.managedInstance('editor');

		/**
		 * @class ComponentView
		 * @augments Backbone.View
		 */
		return Backbone.View.extend({
			className: "component",

			/**
			 * Returns list of events, tracked by this view.
			 *
			 * @returns {Object}
			 */
			events: function() {
				return {
					'select': '_selected',
					'unselect': '_unselected',
					'click': 'clicked',
					'destroyed': 'remove',
				};
			},

			/**
			 * Initialize component view.
			 */
			initialize: function() {
				this._dragging = false;
				this.allowDragging = true;
				
				this.model.on("unrender", this._unrender, this);
				this.model.on("change:selected", this._selectionChanged, this);
				this.model.on("change:x", this._xChanged, this);
				this.model.on("change:y", this._yChanged, this);
				this.model.on('change:opacity', this._opacityChanged, this);
				this.model.on('change:border', this._borderChanged, this);
				this.model.on('change:zIndex', this._zIndexChanged, this);

				this.model.on("dragStart", this.dragStart, this);
				this.model.on("drag", this.drag, this);
				this.model.on("dragStop", this.dragStop, this);

				var $doc = $(document);
				this._deltaDrags = [];
				this._toDispose = [];
				this._mouseup = this.mouseup.bind(this);
				this._mousemove = this.mousemove.bind(this);
				this.mousedown = this.mousedown.bind(this);
				this._toDispose.push(TouchBridge.on.mouseup($doc, this._mouseup));
				this._toDispose.push(TouchBridge.on.mousemove($doc, this._mousemove));
				TouchBridge.on.mousedown(this.$el, this.mousedown);
			},

			/**
			 * Render element based on component model.
			 *
			 * @returns {*}
			 */
			render: function() {
				var _this = this;
				this.$el.html(this.__getTemplate()(this.model.attributes));
				if(this._toolTemplate){
					this.$el.find('.component-tool').html(this._toolTemplate())
				}
				this.$el.find('span[data-delta]').each(function(idx, elem) {
					var deltaDrag;
					deltaDrag = new DeltaDragControl($(elem), true);
					return _this._deltaDrags.push(deltaDrag);
				});
				this.$content = this.$el.find(".content");
				this.$el.css({
					top: this.model.get("y"),
					left: this.model.get("x")
				});
				return this.$el;
			},

			/**
			 * React on click event. Boost element's z-index to bring it front while editing.
			 *
			 * @param {Event} e
			 */
			clicked: function(e) {
				this.$el.trigger("focused");
				e.stopPropagation();
				return false;
			},

			/**
			 * Remove component view.
			 *
			 * @param {boolean} disposeModel Whether or not to dispose component's model as well.
			 */
			remove: function(disposeModel) {
				var $doc, deltaDrag, idx, _ref;
				Backbone.View.prototype.remove.call(this);
				_ref = this._deltaDrags;
				for (idx in _ref) {
					deltaDrag = _ref[idx];
					deltaDrag.dispose();
				}
				if (disposeModel) {
					this.model.dispose();
				}

				this.model.off(null, null, this);
				this._toDispose.forEach(function(d) {
					d();
				});
			},


			/**
			 * Select or unselect component on mouse down.
			 *
			 * @param {jQuery.Event} e
			 * @private
			 */
			_selectComponent: function(e) {
				if ((key.pressed.ctrl || key.pressed.meta || key.pressed.shift) && this.model.get("selected")) {
					this.model.set("selected", false);
				}
				else {
					this.model.set("selected", true);
				}
			},

			/**
			 * Event: element is selected by user.
			 *
			 * @param {jQuery.Event} e
			 * @private
			 */
			_selected: function(e) {
				this.model.set("selected", true, { multiselect: true });
			},

			/**
			 * Event: element is unselected by user.
			 *
			 * @param {jQuery.Event} e
			 * @private
			 */
			_unselected: function(e) {
				this.model.set("selected", false);
			},

			/**
			 * React on component is being selected. Toggle a selection class on the element.
			 *
			 * @param {Component} model
			 * @param {boolean} selected
			 * @private
			 */
			_selectionChanged: function(model, selected) {
				if (selected) {
					this.$el.addClass("ui-selected");
				} else {
					this.$el.removeClass("ui-selected");
				}
			},

			/**
			 * Event: mouse button has peen pressed down.
			 *
			 * @param {Event} e
			 */
			mousedown: function(e) {
				// When component is dragged, we shouldn't start selecting anything.
				this.$el.parents('.ui-selectable').selectable("disable");
				if (e.which === 1) {
					e.preventDefault();
					this._selectComponent(e);
					// this.$el.css("zIndex", zTracker.next1());

					// TODO: convert code that depends on
					// this.model.slide into a method call
					// so we can get rid of the if (this.model.slide) everywhere
					if (this.model.slide) {
						this.model.slide.selected.forEach(function(component) {
							component.trigger('dragStart', e);
						});
					} else {
						this.options.deck.selected.forEach(function(component) {
							component.trigger('dragStart', e);
						});
					}
				}
			},

			/**
			 * Event: mouse is being moved over the element.
			 *
			 * @param {Event} e
			 */
			mousemove: function(e) {
				if (this.model.slide) {
					this.model.slide.selected.forEach(function(component) {
						component.trigger('drag', e);
					});
				} else {
					this.options.deck.selected.forEach(function(component) {
						component.trigger('drag', e);
					});
				}
			},

			/**
			 * Event: mouse button has been released.
			 *
			 * @param {Event} e
			 */
			mouseup: function(e) {
				// Drag is over, selectable can be turned on again.
				this.$el.parents('.ui-selectable').selectable("enable");

				var _this = this;
				if (this.model.slide) {
					undoHistory.record(function(){
						_this.model.slide.selected.forEach(function(component) {
							component.trigger('dragStop', e);
						});
					}, 'Move Components');
				} else {
					undoHistory.record(function(){
						_this.options.deck.selected.forEach(function(component) {
							component.trigger('dragStop', e);
						});
					}, 'Move Slide Transition');
				}
			},

			/**
			 * Event: drag has been started.
			 *
			 * @param {Event} e
			 */
			dragStart: function(e) {
				e.stopPropagation();
				this.dragScale = this.$el.parent().css(window.browserPrefix + "transform");
				this.dragScale = parseFloat(this.dragScale.substring(7, this.dragScale.indexOf(","))) || 1;
				this._dragging = true;
				this.$el.addClass("dragged");
				this._prevPos = {
					x: this.model.get("x"),
					y: this.model.get("y")
				};
				this._prevMousePos = {
					x: e.pageX,
					y: e.pageY
				};

				Guides.resetGuides(this.$el);
			},

			/**
			 * Event: drag is in progress.
			 *
			 * @param {Event} e
			 */
			drag: function(e) {
				var dx, dy, gridSize, newX, newY, snapToGrid;
				if (this._dragging && this.allowDragging) {
					snapToGrid = key.pressed.shift;
					dx = e.pageX - this._prevMousePos.x;
					dy = e.pageY - this._prevMousePos.y;
					newX = this._prevPos.x + dx / this.dragScale;
					newY = this._prevPos.y + dy / this.dragScale;
					if (snapToGrid) {
						gridSize = 20;
						newX = Math.floor(newX / gridSize) * gridSize;
						newY = Math.floor(newY / gridSize) * gridSize;
					}
					this.model.setInt("x", newX);
					this.model.setInt("y", newY);
					if (!this.dragStartLoc) {
						this.dragStartLoc = {
							x: newX,
							y: newY
						};
					}
				}
			},

			/**
			 * Event: drag has been stopped.
			 *
			 * @param {Event} e
			 */
			dragStop: function(e) {
				if (this._dragging) {
					this._dragging = false;
					this.$el.removeClass("dragged");
					if ((this.dragStartLoc != null) && this.dragStartLoc.x !== this.model.get("x") && this.dragStartLoc.y !== this.model.get("y")) {
						undoHistory.pushdo(new ComponentCommands.Move(this.dragStartLoc, this.model));
					}
					this.dragStartLoc = null;
				}
				Guides.hide();
			},

			/**
			 * React on X position change.
			 *
			 * @param {Component} model
			 * @param {number} value
			 * @private
			 */
			_xChanged: function(model, value) {
				Guides.findGuides(this.$el, model);
				this.$el.css("left", model.get('x'));
			},

			/**
			 * React on Y position change.
			 *
			 * @param {Component} model
			 * @param {number} value
			 * @private
			 */
			_yChanged: function(model, value) {
				Guides.findGuides(this.$el, model);
				this.$el.css("top", model.get('y'));
			},

			/**
			 * React on border change.
			 *
			 * @param {Component} model
			 * @param {number} value
			 * @private
			 */
			_borderChanged: function(model, border){
				border = border || model&&model.get('border') || this.model.get('border');
				this.$content.css({
					"border-color": border.color,
					"border-style": border.style,
					"border-width": border.width,
					"border-radius": border.radius
				});
			},

			_zIndexChanged: function(model, zIndex){
				this.$el.css("zIndex", zIndex);
			},

			/**
			 * React on opacity change.
			 *
			 * @param {Component} model
			 * @param {number} value
			 * @private
			 */
			_opacityChanged: function(model, opacity){
				this.$content.css("opacity", opacity);
			},


			/**
			 * Get view template.
			 *
			 * @returns {*}
			 * @private
			 */
			__getTemplate: function() {
				return JST["unit/Component"];
			},

			/**
			 * React on component is being unrendered.
			 *
			 * @returns {*}
			 * @private
			 */
			_unrender: function() {
				return this.remove(false);
			},

			constructor: function ComponentView() {
				Backbone.View.prototype.constructor.apply(this, arguments);
			}
		});
	});
