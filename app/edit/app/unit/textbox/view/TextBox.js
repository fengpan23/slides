define(["../../ComponentView",
		"app/deck/ComponentCommands",
		"communal/undo_support/CmdListFactory",
		"communal/interactions/TouchBridge",
		"ckeditor",
		"lang",
	],
	function(ComponentView, ComponentCommands, CmdListFactory, TouchBridge, ckeditor, lang) {
		'use strict';
		var undoHistory = CmdListFactory.managedInstance('editor');

		/**
		 * @class TextBoxView
		 * @augments ComponentView
		 */
		return ComponentView.extend({
			className: "component textBox",
			tagName: "div",

			/**
			 * Returns list of events, tracked by this view.
			 *
			 * @returns {Object}
			 */
			events: function() {
				var myEvents, parentEvents;
				parentEvents = ComponentView.prototype.events();
				myEvents = {
					"editComplete": "editCompleted",
					"mouseup": "mouseup",

					"deltadragStart span[data-delta='width']": "widthStart",
					"deltadrag span[data-delta='width']": "width",
					"deltadragStop span[data-delta='width']": "widthStop",
				};
				return _.extend(parentEvents, myEvents);
			},

			/**
			 * Initialize TextBox component view.
			 */
			initialize: function() {
				ComponentView.prototype.initialize.apply(this, arguments);
				this.model.on("edit", this.edit, this);
				this.model.on("contentChange", this.editCompleted, this);
				this.model.on("change:text", this._textChanged, this);
				this.model.on("change:link", this._linkChanged, this);
				this.model.on('change:width', this._updateComponentWidth, this);
				this.model.on('change:lineSpacing', this._lineSpacingChanged, this);
				this.model.on('change:textColor', this._textColorChange, this);
				this.model.on('change:bgColor', this._bgColorChange, this);

				this._lastDx = 0;
				this.dblclicked = this.dblclicked.bind(this);
				TouchBridge.on.dblclick(this.$el, this.dblclicked);

				this._toolTemplate = JST['unit/textbox/ComponentTool'];
			},

			/**
			 * Render element based on component model.
			 *
			 * @returns {*}
			 */
			render: function() {
				ComponentView.prototype.render.call(this);

				var self = this;
				this.$content.bind('paste', function(e) {
					self._handlePaste(this, e);
				});
				this.$content.html(this.model.get("text"));
				this.$content.css({
					'background': this.model.get("background"),
					'line-height': this.model.get('lineSpacing') || 'normal',
					'width': this.model.get('width'),
				});
				return this.$el;
			},

			_bgColorChange: function(model, color){
				this.$content.css("background", color);
			},

			_textColorChange: function(model, color){
				this.$content.css("color", color);
			},

			_lineSpacingChanged: function(model, lineSpacing) {
				this.$content.css("line-height", lineSpacing ||this.model.get('lineSpacing') || 'normal');
			},

			/**
			 * React on content width.
			 */
			_updateComponentWidth: function(model, width) {
				this.$content.css("width", width);
			},

			/**
			 * Event:width transformation started.
			 */
			widthStart: function() {
				this._initialWidth = this.model.get("width") || this.$el.width() || 144;
				this._initialX = this.model.get("x");
			},
			/**
			 * Event: width transformation is in progress.
			 *
			 * @param {Event} e
			 * @param {{dx: number, dy: number}} deltas
			 */
			width: function(e, deltas) {
				if($(e.currentTarget).hasClass('cl')){
					this.model.set('x', this._initialX + deltas.dx);
					this.model.setFloat("width", this._initialWidth - deltas.dx);
				}else{
					this.model.setFloat("width", this._initialWidth + deltas.dx);
				}
			},

			/**
			 * Event: width transformation stopped.
			 */
			widthStop: function() {
				var cmd = new ComponentCommands.Width(this._initialWidth, this.model);
				undoHistory.push(cmd);
			},

			/**
			 * Remove component view.
			 *
			 * @param {boolean} disposeModel Whether or not to dispose component's model as well.
			 */
			remove: function(disposeModel) {
				ComponentView.prototype.remove.apply(this, arguments);
				// TODO This can be uncommented once modal windows start blocking all slide key events.
			},

			/**
			 * Event: element is double clicked. Enter editing mode for a textbox.
			 *
			 * @param {Event} e
			 */
			dblclicked: function(e) {
				if (!this.editing) {
					this.$el.addClass("editable");
					this._initialText = this.$content.html();
					this.$content.attr('contenteditable', true);
					this.ckeditor = CKEDITOR.inline(this.$content[0]);
					this.$content[0].focus();

					this.editing = true;
					this.allowDragging = false;
				}
			},

			/**
			 * Event: mouse button has peen pressed down, drag started. If in editing mode, move etch to the clicked spot.
			 *
			 * @param {Event} e
			 */
			mousedown: function(e) {
				if (!this.editing) {
					ComponentView.prototype.mousedown.apply(this, arguments);
				}else{
					 e.stopPropagation();
				}
			},

			/**
			 *Event: mouse button has peen mouse, drag started. If in editing mode, move etch to the clicked spot.
			 *
			 * @param {Event} e
			 **/
			mousemove: function(e){
				if (!this.editing){
					ComponentView.prototype.mousemove.apply(this, arguments);
				}else{
					e.stopPropagation();
				}
			},

			/**
			 * Event: mouse button has been released.
			 *
			 * @param {Event} e
			 */
			mouseup: function(e) {
				if (!this.editing){
					ComponentView.prototype.mouseup.apply(this, arguments);
				}else{
					e.stopPropagation();
				}
			},

			/**
			 * Open editor for the textbox.
			 */
			edit: function() {
				var e;
				console.log('text box edit, get some attention');
				this.model.set("selected", true);
				e = $.Event("click", {
					pageX: this.model.get("x")
				});
				this.dblclicked(e);
				this.$content.selectText();
			},

			/**
			 * Finish editing and close the editor.
			 */
			editCompleted: function() {
				var text;
				text = this.ckeditor.getData() || this.$content.html();

				this.editing = false;
				this.allowDragging = true;
				this.ckeditor.destroy();

				 var sel = window.getSelection();
				 sel.removeAllRanges();

				this.model.set("text", text);

				var cmd = ComponentCommands.Text(this._initialText, this.model);
				undoHistory.push(cmd);

				this.$content.attr("contenteditable", false);
				this.$el.removeClass("editable");
			},

			/**
			 * React on component is being selected. If component have been unselected, hide it's editor, if in editing mode.
			 *
			 * @param {Component} model
			 * @param {boolean} selected
			 * @private
			 */
			_selectionChanged: function(model, selected) {
				ComponentView.prototype._selectionChanged.apply(this, arguments);
				if (!selected && this.editing) {
					this.editCompleted();
				}
			},

			/**
			 * React on component's text change. Update html contents of the text box.
			 *
			 * @param {Component} model
			 * @param {string} text Updated text (HTML code).
			 * @private
			 */
			_textChanged: function(model, text) {
				this.$content.html(text);
			},

			_handlePaste: function(elem, e) {
				console.log('_handlePaste');
				e = e.originalEvent;
				document.execCommand('insertText', false, e.clipboardData.getData('text/plain'));
				// var sel = window.getSelection();
				// var range = sel.getRangeAt(0);
				// var text = document.createTextNode(e.clipboardData.getData('text/plain'));
				// range.deleteContents();
				// range.insertNode(text);

				// range.setStartAfter(text);
				// range.setEndAfter(text);

				// sel.removeAllRanges();
				// sel.addRange(range);

				e.preventDefault();
			},

			constructor: function TextBoxView() {
				ComponentView.prototype.constructor.apply(this, arguments);
			}
		});
	});