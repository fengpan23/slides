define(['libs/backbone',
		'app/deck/ComponentCommands',
		'communal/undo_support/CmdListFactory',
		'communal/interactions/TouchBridge',
		'lang'
	],
	function(Backbone, ComponentCommands, CmdListFactory, TouchBridge, lang) {
		'use strict';

		var undoHistory = CmdListFactory.managedInstance('editor');

		/**
		 * @class TextBoxView
		 * @augments ComponentView
		 */
		return Backbone.View.extend({
			className: "text-edit",
			tagName: "div",

			/**
			 * Returns list of events, tracked by this view.
			 *
			 * @returns {Object}
			 */
			events: {
				"mouseup": "mouseup",
				"deltadragStart span[data-delta='width']": "widthStart",
				"deltadrag span[data-delta='width']": "width",
				"deltadragStop span[data-delta='width']": "widthStop"
			},

			/**
			 * Initialize TextBox component view.
			 */
			initialize: function() {
				this._template = JST['unit/video/VideoTool'];
			},

			/**
			 * Render element based on component model.
			 *
			 * @returns {*}
			 */
			render: function() {
				this.$el.html(this._template(model));
				return this.$el;
			},

			constructor: function Video() {
				Backbone.View.prototype.constructor.apply(this, arguments);
			}
		});
	});