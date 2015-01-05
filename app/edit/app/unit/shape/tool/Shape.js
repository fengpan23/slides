define(['../../ComponentTool',
		'app/deck/ComponentCommands',
		'communal/undo_support/CmdListFactory',
		'../ShapeCollection',
		'lang'
	],
	function(ComponentTool, ComponentCommands, CmdListFactory, ShapeCollection, lang) {
		'use strict';

		var undoHistory = CmdListFactory.managedInstance('editor');

		/**
		 * @class ShapeView
		 * @augments ComponentView
		 */
		return ComponentTool.extend({
			className: "shape-edit",
			tagName: "div",

			/**
			 * Returns list of events, tracked by this view.
			 *
			 * @returns {Object}
			 */
			events: function() {
				var myEvents, parentEvents;
				parentEvents = ComponentTool.prototype.events();
				myEvents = {
					'click .shape-content': '_triggerShapeBox',
				};
				return _.extend(parentEvents, myEvents);
			},

			/**
			 * Initialize shape component view.
			 */
			initialize: function() {
				ComponentTool.prototype.initialize.apply(this, arguments);
				this.model.on('change:color', this._colorRender, this);
				this._template = JST['unit/shape/ShapeTool'];
			},

			/**
			 * Render element based on component model.
			 *
			 * @returns {*}
			 */
			render: function() {
				this.$el.html(this._template(this.model));
				ComponentTool.prototype.render.call(this);

				this._colorRender();
				return this.$el;
			},

			_colorRender: function(model, color){
				color = this.model.get('color') || color;
				this.$el.find('.shape-content>svg').css('fill', color);
			},

			_triggerShapeBox: function(e){
				var shapeCollection = new ShapeCollection;
				var shapes = [];
				shapeCollection.shapes.forEach(function(shape){
					shapes.push(shape.markup);
				});
				var data = {content: shapes, e: e, className: 'chunk'},
				_this = this;

				this._toolbarPanel.show(data, function(value){
					$(e.currentTarget).html(value);
					_this.model.set('content', value);
					_this._colorRender();
				});
			},

			dispose: function() {
				this.model.off(null, null, this);
				ComponentTool.prototype.dispose.call(this);
			},

			constructor: function Shape() {
				ComponentTool.prototype.constructor.apply(this, arguments);
			}
		});
	});