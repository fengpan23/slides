define(['../../ComponentTool',
		'app/deck/ComponentCommands',
		'communal/undo_support/CmdListFactory',
		'lang'
	],
	function(ComponentTool, ComponentCommands, CmdListFactory, lang) {
		'use strict';

		var undoHistory = CmdListFactory.managedInstance('editor');

		/**
		 * @class TextBoxView
		 * @augments ComponentView
		 */
		return ComponentTool.extend({
			className: "text-edit",
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
					'click .linespacing-value': '_triggerLinespacing',
				};
				return _.extend(parentEvents, myEvents);
			},

			/**
			 * Initialize TextBox component view.
			 */
			initialize: function() {
				ComponentTool.prototype.initialize.apply(this, arguments);
				this._template = JST['unit/textbox/TextBoxTool'];
			},

			/**
			 * Render element based on component model.
			 *
			 * @returns {*}
			 */
			render: function() {
				this.$el.html(this._template(this.model));
				ComponentTool.prototype.render.call(this);

				return this.$el;
			},

			_triggerLinespacing: function(e){
				var _this, data = {content: ['1.5', '2', '2.5'], e: e};
				_this = this;
				this._toolbarPanel.show(data, function(value){
					$(e.currentTarget).html(value);
					_this.model.set('lineSpacing', value);
				});
			},

			dispose: function() {
				var _ref, idx, deltaDrag;
				this.model.off(null, null, this);
				_ref = this._deltaDrags;
				for (idx in _ref) {
					deltaDrag = _ref[idx];
					deltaDrag.dispose();
				}
				ComponentTool.prototype.dispose.call(this);
			},

			constructor: function TextBox() {
				ComponentTool.prototype.constructor.apply(this, arguments);
			}
		});
	});