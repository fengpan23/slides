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
			className: "audio-edit",
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
					'change .import-content>input': '_inputFileChosen',
					'change .tool-bg-music-switch>input': '_bgsoundOption',
					'change .tool-loop-switch>input': '_loopOption',
				};
				return _.extend(parentEvents, myEvents);
			},

			/**
			 * Initialize TextBox component view.
			 */
			initialize: function() {
				ComponentTool.prototype.initialize.apply(this, arguments);

				this._template = JST['unit/audio/AudioTool'];
			},

			/**
			 * Render element based on component model.
			 *
			 * @returns {*}
			 */
			render: function() {
				this.$el.html(this._template(this.model));
				ComponentTool.prototype.render.call(this);
				this.$el.find('.tool-action').hide(); //not suitable
				if(this.model.get('src')){
					this._itemLoaded();
				}
				if(this._hasBgsound()){
					this.$el.find('.tool-bg-music-switch>input').attr('disabled', true);
				}
				return this.$el;
			},
			/**
			 * make sure one slide only has a background music
			 * @return {Boolean} ture: has bg music , false: this slide no bg music
			 */
			_hasBgsound: function(){
				var hasBgsound, components, _this = this;
				components = this.model.slide.get('components');

				components.forEach(function(component){
					if(component == _this.model)return;
					if((component.get('type') == 'Audio') && component.get('bgsound')){
						hasBgsound = true;
					}
				});
				return hasBgsound;
			},

			_bgsoundOption: function(e){
				this.model.set('bgsound', e.currentTarget.checked);
			},

			_loopOption: function(e){
				this.model.set('loop', e.currentTarget.checked);
			},

			_inputFileChosen: function(e){
				var f;
				f = e.target.files[0];
				this._fileChosen(f);
			},

	        _fileChosen: function(file, cb){
	        	if (!file && !file.type.match('audio.*')){
					this._itemLoadError();
					return;
				}

	            var mName = file.name.replace(/\.\w+$/, '');
	            var form = new FormData();
	            form.append('file', file);
	            var _this = this;
	            var xhr = new XMLHttpRequest();
	            xhr.open('POST', '/file/upload');
	            xhr.onreadystatechange=function(){
	                if(xhr.readyState == 4 && xhr.status == 200){
	                    var data = JSON.parse(xhr.responseText);
	                    data.songName = mName;
	                    data.time = 0;
	                    _this.model.set(data);
	                    _this._itemLoaded(mName);
	                }
	            };
	            xhr.send(form);
	        },

			_itemLoaded: function(mName){
				this.$el.find('.filename').html(mName || this.model.get('songName'))
				this.$el.find('.change-audio-btn').addClass('replace').html('replace');
			},

			_itemLoadError: function(){
				conole.log('load audio error');
			},

			dispose: function() {
				this.model.off(null, null, this);
				ComponentTool.prototype.dispose.call(this);
			},

			constructor: function Audio() {
				ComponentTool.prototype.constructor.apply(this, arguments);
			}
		});
	});