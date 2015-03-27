define(['libs/backbone',
		'app/unit/ComponentFactory',
		'app/editor/GlobalEvents',
		'app/deck/Utils',
		'app/unit/ComponentModel',
		'communal/widgets/Guides',
		],
function(Backbone, ComponentFactory, GlobalEvents, DeckUtils, Component, Guides) {
	
	'use strict';
	
	return Backbone.View.extend({
		className: 'operating-table',
		events: {
			"click": "_clicked",
			// "focused": "_focus",
			// "dragover": "_dragover",
			// "drop": "_drop",
			// destroyed: 'dispose'
		},

		initialize: function() {
			this._resize = this._resize.bind(this);
			$(window).resize(this._resize);

// 			// Re-render when active slide changes in the deck
			this._deck.on('change:activeSlide', function(deck, model) {
				this.setModel(model);
			}, this);

			this._deck.on('change:theme', this._updateTheme, this);
// 			this._deck.on('change:surface', this._updateSurface, this);
			this.setModel(this._deck.get('activeSlide'));
			
// //			this.$el.on("contextmenu", this._rightMenu);

			GlobalEvents.on('cut', this._cut, this);
			GlobalEvents.on('copy', this._copy, this);
			GlobalEvents.on('paste', this._paste, this);
			GlobalEvents.on('delete', this._delete, this);
			GlobalEvents.on('save', this._save, this);

//			var _this =this;
//			 $('body').bind('mousedown.slideEditor', function(e) {
//		        var target = e.target || e.srcElement;
//		        console.log($(target));
//		        if ($(target).not('.slideEditor *').size()) {
//		        	_this.$el.trigger("click");
//		        }
//			 });
			// ContextMenu.setModel(this._menuModel);
		},
		
		render: function() {
			this._$slideContainer = $('<div class="slide-container"></div>');
			this.$el.html(this._$slideContainer);
			this._$slideContainer.css(config.slide.size);

			// DeckUtils.applyBackground(this._$slideContainer, this.model, this._deck, {transparentForSurface: true, surfaceForDefault: true, transparentForDeckSurface: true});
			// this._$markdownContent = $('<div class="markdownArea themedArea"></div>');
			// this._$slideContainer.append(this._$markdownContent);
			
			//tow dimension code at heae
//			this._$slideContainer.append(new TdimensionCode().render().$el);
			
			// drag Multi-Object select 
			this._$slideContainer.selectable({
				filter: ".component",
				selected: function(event, ui) {
					$(ui.selected).trigger('select', ui);
				},
				unselected: function(event, ui) {
					$(ui.unselected).trigger('unselect', ui);
				}
			});

			var self = this;
			setTimeout(function() {
				self._resize();
				self._rendered = true;	
				self._renderContents(); //init render active slide
			}, 0);

			//init guide lines, use at componentView
			Guides.init(this._$slideContainer[0]);

			// if add slide btn is provider create it
			var topAddProvider = this._support.get('topAddProvider');
			topAddProvider && this.$el.append(topAddProvider.render(0, 'top'));
			var bottomAddProvider = this._support.get('bottomAddProvider');
			bottomAddProvider && this.$el.append(bottomAddProvider.render(1, 'bottom'));
			
			// this.$el.addClass((this._deck.get('surface') || 'bg-default'));
			
//			var rigthmenu = this._registry.getBest('strut.right_menu');
//			if(rigthmenu){
//				rigthmenu.operatingTable(this.$el);
//			}
			return this.$el;
		},
		
		_updateTheme: function(model, theme) {
			this.$el.removeClass();
			this.$el.addClass(this.className +' '+ theme);
			// DeckUtils.applyBackground(this._$slideContainer, this.model, this._deck, {transparentForSurface: true, surfaceForDefault: true});
		},

		// _updateSurface: function(model, bg) {
		// 	bg = DeckUtils.slideSurface(model, this._deck);
		// 	if (bg) {
		// 		if (!DeckUtils.isImg(bg)) {
		// 			this.$el.css('background-image', '');
		// 			this.$el.removeClass();
		// 			// TODO: we can do this more intelligently
		// 			this.$el.addClass('center_body strut-surface ' + bg);
		// 		} else {
		// 			this.$el.css('background-image', DeckUtils.getImgUrl(bg));
		// 		}
		// 	}
		// },

		_cut: function() {
			if (this._support.focusScope() == 'operatingTable') {
				var components = this.model.selected;
				if (components.length) {
					this._clipboard.setItems(components);
					this.model.remove(components);
				}
			}
		},

		_copy: function() {
			if (this._support.focusScope() == 'operatingTable') {
				var components = this.model.selected;
				if (components.length) {
					this._clipboard.setItems(components);
				}
			}
		},

		_paste: function(e) {
			var components = this._clipboard.getItems();
			if (components != null && components.length && components[0] instanceof Component) {
				this.model.add(components);
			}
		},

		_delete: function() {
			if (this._support.focusScope() == 'operatingTable') {
				var components = this.model.selected;
				if (components.length) {
					this.model.remove(components);
				}
			}
		},
		
		_save: function() {
			console.log('save focus on operating table');
			if (this._support.focusScope() == 'operatingTable') {
				return false;
			}
		},

		_clicked: function() {
			this.model.get('components').forEach(function(comp) {
				if (comp.get('selected')) {
					comp.set('selected', false);
				}
			});
			this.$el.find('.editable').removeClass('editable').attr('contenteditable', false)
				.trigger('editComplete');

			this._focus();
		},

		_focus: function(slide, component, selected) {
			this._support.focusScope('operatingTable');

			this._toolkit.switchToolbar(slide, component, selected);
		},

		_dragover: function(e) {
			e.stopPropagation();
			e.preventDefault();
			e.originalEvent.dataTransfer.dropEffect = 'copy';
		},

		_componentAdded: function(model, comp) {
			var view = ComponentFactory.instance.createView(comp);
			this._$slideContainer.append(view.render());
		},

		setModel: function(model) {
			var prevModel = this.model;
			if (this.model === model) return;

			if (this.model != null) {
				this.model.off(null, null, this);
			}
			this.model = model;
			if (this.model != null) {
				this.model.on('change:components.add', this._componentAdded, this);
				this.model.on('change:background', this._updateBg, this);

				this.model.on('change:activeComponent', this._focus, this);

				// this.model.on('change:markdown', this._renderMarkdown, this);
				// this.model.on('change:surface', this._updateSurface, this);
				// this._updateBg();
				// this._updateSurface(this.model, this.model.get('surface'));
			}
			this._renderContents(prevModel);
			return this;
		},

		dispose: function() {
			$(window).off('resize', this._resize);
			this._deck.off(null, null, this);
			if (this.model)
				this.model.off(null, null, this);
			GlobalEvents.off(null, null, this);
		},

		_renderContents: function(prevModel) {
			if (prevModel != null) {
				prevModel.trigger('unrender', true);
			}

			if (!this._rendered) return;

			if (this.model != null) {
				var components = this.model.get('components');
				components.forEach(function(comp) {
					var view = ComponentFactory.instance.createView(comp);
					this._$slideContainer.append(view.render());
				}, this);
			}
		},

		_resize: function(e) {
			var dimensions = this._support.computeSlideDimensions(this.$el);
			this._$slideContainer.css({
				'margin-left': dimensions.remainingWidth / 2,
				'margin-right': dimensions.remainingWidth / 2,
				'margin-top': dimensions.remainingHeight / 2,
				'margin-bottom': dimensions.remainingHeight / 2
			});

			this._$slideContainer.css(window.browserPrefix + 'transform', 'scale(' + dimensions.scale + ')');
		},

		constructor: function OperatingTable(options) {
			this._deck = options.support._deck();
			this._clipboard = options.support.clipboard();
			this._support = options.support;
			this._toolkit = options.toolkit;
			Backbone.View.prototype.constructor.call(this);
		}
	});
});
