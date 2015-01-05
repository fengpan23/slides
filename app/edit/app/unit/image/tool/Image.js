define(['../../ComponentTool',
		'libs/imgup',
		'app/deck/ComponentCommands',
		'communal/undo_support/CmdListFactory',
		'communal/interactions/TouchBridge',
		'lang'
	],
	function(ComponentTool, Imgup, ComponentCommands, CmdListFactory, TouchBridge, lang) {
		'use strict';

		var undoHistory = CmdListFactory.managedInstance('editor');

		/**
		 * @class TextBoxView
		 * @augments ComponentView
		 */
		return ComponentTool.extend({
			className: "image-edit",
			tagName: "div",

			/**
			 * Returns list of events, tracked by this view.
			 *
			 * @returns {Object}
			 */
			events: function(){
				var myEvents, parentEvents;
				parentEvents = ComponentTool.prototype.events();
				myEvents = {
					"change input[type='file']": "_inputFileChosen",
				};
				return _.extend(parentEvents, myEvents);
			},

			/**
			 * Initialize TextBox component view.
			 */
			initialize: function() {
				ComponentTool.prototype.initialize.apply(this, arguments);

				this._template = JST['unit/image/ImageTool'];
			},

			/**
			 * Render element based on component model.
			 *
			 * @returns {*}
			 */
			render: function() {
				this.$el.html(this._template(this.model));
				ComponentTool.prototype.render.call(this);

				this.$img = this.$el.find('.content>img');
				if(this.$img.attr('src')){
					this._imgLoaded();
				}
				return this.$el;
			},

			_inputFileChosen: function(e){
				var f;
				f = e.target.files[0];
				this._fileChosen(f);
			},

			_fileChosen: function(f) {
				if (!f.type.match('image.*')){
					this._itemLoadError();
					return;
				}
				var _this = this;
				var reader = new FileReader();
				reader.onload = function(e) {
					_this.src = e.target.result; // reader's return value after read.
					_this.model.set('src', _this.src);
					_this._imgLoaded();
	            };
	            reader.readAsDataURL(f);
			},

			_imgLoaded: function(){
				this.$img.attr('src', this.src);
				this.$el.find('.icon-picture').hide();
				this.$el.find('.upload-btn').html('replace');
			},

			_itemLoadError: function(){
				conole.log('load image error');
			},

			dispose: function() {
				this.model.off(null, null, this);
				ComponentTool.prototype.dispose.call(this);
			},

			constructor: function Image() {
				ComponentTool.prototype.constructor.apply(this, arguments);
			}
		});
	});