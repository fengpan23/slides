define(['libs/backbone',
		'app/unit/ComponentFactory',
		],
	function(Backbone, ComponentFactory) {
		'use strict';

		return Backbone.View.extend({

			className: 'toolkit',

			events: function() {
				return {
					'click .unit-btn': '_addComponent',
				};
			},

			initialize: function() {
				delete this.options;
				this._template = JST['toolkit/ToolbarList'];
				this._unitTemplate = JST['toolkit/UnitItem'];

				this._units = this.model.get('createUnitButtons');
			},

			render: function() {
				this.$el.html(this._template());
				this.$addtoolbar = this.$el.find('.toolbar[data-type="add"]');
				this.$edittoolbar = this.$el.find('.toolbar[data-type="edit"]');

				this._units.forEach(function(unit) {
					this.$addtoolbar.append(this._unitTemplate(unit));
				}, this);
				return this.$el;
			},

			/**
			 * 	@description [show and hide tool bar]
			 * 	@param {string} component  [scope name]
			 */
			switchToolbar: function(slide, component, selected){
				if(this.toolView){
					this.toolView.dispose();
				}
				if(component && selected){
					var toolView = this._creatToolView(component);
					this.$edittoolbar.empty().append(toolView.render());
					this.$addtoolbar.css('left',-200);
					this.$edittoolbar.css('left', 0);
					return;
				}
				this.$addtoolbar.css('left', 0);
				this.$edittoolbar.css('left', 200);
			},

			/**
			 * [_creatToolView ]
			 * @param  {[obj]} component
			 * @return {[new tool view]}
			 */
			_creatToolView: function(component){
				return this.toolView = ComponentFactory.instance.createTool(component);
			},

			_addComponent: function(e){
				var componentType = $(e.currentTarget).attr('data-type');
				this.model.addComponent(componentType);
			},

			constructor: function Toolkit() {
				Backbone.View.prototype.constructor.apply(this, arguments);
			}
		});
	});