define(['../../ComponentTool',
		'app/deck/ComponentCommands',
		'communal/undo_support/CmdListFactory',
		'lang'
	],
	function(ComponentTool, ComponentCommands, CmdListFactory, lang) {
		'use strict';

		var undoHistory = CmdListFactory.managedInstance('editor');

		var ignoredVals = {
				'http:': true,
				'http://': true,
				'file:': true,
				'/': true,
				'https://': true,
				'https:': true
			};
		var reg = /^[a-z]+:/;
		/**
		 * @class TextBoxView
		 * @augments ComponentView
		 */
		return ComponentTool.extend({
			className: "frame-edit",
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
					'click .switch': '_switchVisit',
					'keyup input': 'srcChange',
				};
				return _.extend(parentEvents, myEvents);
			},

			/**
			 * Initialize TextBox component view.
			 */
			initialize: function() {
				ComponentTool.prototype.initialize.apply(this, arguments);
				this._template = JST['unit/frame/FrameTool'];
			},

			/**
			 * Render element based on component model.
			 *
			 * @returns {*}
			 */
			render: function() {
				this.$el.html(this._template(this.model));
				ComponentTool.prototype.render.call(this);

				this.$input = this.$el.find('input');
				this.$el.find('input[type="checkbox"]')[0].checked = this.model.get('visit');
				return this.$el;
			},

			srcChange: function(){
				var val = this.$input.val();
				if (val in ignoredVals)
					return;

				var r = reg.exec(val);
				if (r == null || r.index != 0) {
					if (val !== '')
						val = 'http://' + val;
				}
				this.model.set('src', val);
			},

			_switchVisit: function(e){
				var $toggle = $(e.currentTarget).find('input[type="checkbox"]');
				this.model.set('visit', $toggle[0].checked);
			},

			dispose: function() {
				this.model.off(null, null, this);
				ComponentTool.prototype.dispose.call(this);
			},

			constructor: function WebFrame() {
				ComponentTool.prototype.constructor.apply(this, arguments);
			}
		});
	});