define(['libs/backbone',
		'app/deck/Deck',
		'app/unit/ComponentFactory',
		'common/Adapter',
		'./GlobalEvents',
		'communal/interactions/Clipboard',
		'communal/undo_support/CmdListFactory',
		'app/header/model/Header',
		'app/toolkit/model/Toolkit',
		'app/operatingTable/support/OperatingTable',
		'app/slideWell/model/SlideWell',
	],
	function(Backbone, Deck, ComponentFactory, Adapter, GlobalEvents, Clipboard, CmdListFactory, Header, Toolkit, OperatingTable, SlideWell) {
		'use strict';

		return Backbone.Model.extend({
			initialize: function() {
				this._deck = new Deck();
				this._cmdList = CmdListFactory.managedInstance('editor');
				this.clipboard = new Clipboard();

				this.set('header', new Header(this.registry, this));
				this.set('toolkit', new Toolkit(this.registry, this));
				this.set('operatingTable', new OperatingTable(this.registry, this));
				this.set('slideWell', new SlideWell(this.registry, this));

				GlobalEvents.on('undo', this._cmdList.undo, this._cmdList);
				GlobalEvents.on('redo', this._cmdList.redo, this._cmdList);

				//save and auto save
				// var savers = this.registry.getBest('tantaman.web.saver.AutoSavers');
				// var storageInterface = this.registry.getBest('strut.StorageInterface');
				// this.storageInterface = storageInterface;
				// if (savers) {
				// 	var self = this;
				// 	storageInterface = adaptStorageInterfaceForSavers(storageInterface);
				// 	this._exitSaver = savers.exitSaver(this.exportable, {
				// 		identifier: 'strut-exitsave', 
				// 		cb: function() {
				// 			window.sessionMeta.lastPresentation = self.exportable.identifier();
				// 		}
				// 	});
				// 	this._timedSaver = savers.timedSaver(this.exportable, 20000, storageInterface);
				// 	this._manualSaver = savers.manualSaver(this.exportable, storageInterface);
				// }

			},

			dispose: function() {
				throw "EditorModel can not be disposed yet";
				this._exitSaver.dispose();
				this._timedSaver.dispose();
				Backbone.off(null, null, this);
			},

			validKey: function(name) {
				return this.storageInterface.validKey(name);
			},

			newPresentation: function() {
				var num = window.sessionMeta.num || 0;
				this.trigger('newPresentationDesired', num + 1);
			},

			createPresentation: function(name) {
				var num = window.sessionMeta.num || 0;
				num += 1;
				window.sessionMeta.num = num;
				this.importPresentation({
					filename: name,
					slides: []
				});
				//				this._deck.create();
			},

			/**
			 * see Deck.addCustomBgClassFor
			 */
			addCustomBgClassFor: function(color) {
				var result = this._deck.addCustomBgClassFor(color);
				if (!result.existed) {
					this.trigger('change:customBackgrounds', this, this._deck.get('customBackgrounds'));
				}
				return result;
			},

			customBackgrounds: function() {
				return this._deck.get('customBackgrounds');
			},

			importPresentation: function(rawObj) {
				//				this.storageInterface.revokeAllAttachmentURLs();
				// deck disposes iteself on import?
				// TODO: purge URL cache
				console.log('New file name: ' + rawObj.filename);
				this._deck.import(rawObj);
			},

			hasStorage: function() {
				return this.storageInterface.ready();
			},

			exportPresentation: function(filename) {
				if (filename)
					this._deck.set('filename', filename);
				var genid = this._deck.get('__genid');

				if (genid == null) genid = 0;
				else genid += 1;

				// Set the generation id for the deck.
				// A higher genid means its a newer version of the presentation.

				//TODO Generate active page snapshots
				//				var img = this.mslide(this._deck);
				//				if(img){
				//					var w=window.open('about:blank'); 
				//					w.document.write("<img src='"+img+"' alt='from canvas'/>"); 
				//				}
				if (this._deck.get('activeSlide')) {
					this._deck.set('picture', this.mslide(this._deck));
				}
				this._deck.set('__genid', genid);
				//set the preview html
				// var preview = this.registry.getBest('strut.presentation_generator');
				// var previewText = preview.generate(this._deck).replace(/contenteditable="true"/g, '');

				// var strlen = this.strlen(previewText) / 1024 / 1024;
				// console.log("已经写了" + strlen + "MB啦~@！");
				// if (strlen > 1) {
				// 	var mess = {
				// 		'error': '写了' + strlen.toFixed(2) + 'MB，超过1MB了，稍稍整理下吧~！'
				// 	};
				// 	this.message.show(mess);
				// 	return false;
				// }

				// this._deck.set('previewText', previewText);

				var obj = this._deck.toJSON(false, true);
				return obj;
			},
			strlen: function(str) { //在IE8 兼容性模式下 不会报错  
				var s = 0;
				for (var i = 0; i < str.length; i++) {
					if (str.charAt(i).match(/[\u0391-\uFFE5]/)) {
						s += 2;
					} else {
						s++;
					}
				}
				return s;
			},

			mslide: function(deck) {
				//返回使用的第一张图片
				function isImage(src) {
					if (!src) return false;
					if (src.indexOf('http') === 0) {
						return true;
					} else {
						return false;
					}
				}
				if (isImage(deck.get('background'))) {
					return deck.get('background');
				}
				if (isImage(deck.get('surface'))) {
					return deck.get('surface');
				}
				var models = deck.get('slides').models;
				for (var i in models) {
					if (isImage(models[i].get('background'))) {
						return models[i].get('background');
					}
					var components = models[i].get('components');
					for (var j in components) {
						if (components[j].get('type') === "Image") {
							return components[j].get('src');
						}
					}
				}

				var oCanvas = document.createElement("canvas");
				oCanvas.width = 1024;
				oCanvas.height = 768;
				var g2d = oCanvas.getContext("2d");
				var SlideDrawer = this.registry.getBest('strut.SlideDrawer');
				var draw = new SlideDrawer(null, g2d, this.registry);

				var bg = deck.get('activeSlide').get('background') || deck.get('background');
				if (bg) {
					// console.log(bg);
					bg = bg.split('-')[2] || (deck.get('background') ? deck.get('background') : 'no').split('-')[2] || '#F0F0F0';
				} else {
					bg = '#F0F0F0';
				}
				draw._paint(bg);
				return draw._toImage(oCanvas, 128, 96);
				// //				return oCanvas;
			},

			fileName: function() {
				var fname = this._deck.get('filename');
				if (fname == null) {
					// TODO...
					fname = 'presentation-unnamed';
					this._deck.set('filename', fname);
				}

				return fname;
			},

			deck: function() {
				return this._deck;
			},

			currentDeckId: function(deckId) {
				return this._deck.set('_id', deckId);
			},

			cannedTransition: function(c) {
				if (c != null)
					this._deck.set('cannedTransition', c);
				else
					return this._deck.get('cannedTransition');
			},

			slides: function() {
				return this._deck.get('slides');
			},

			addSlide: function(index, slide) {
				this._deck.create(index, slide);
			},

			activeSlide: function() {
				return this._deck.get('activeSlide');
			},

			activeSlideIndex: function() {
				return this._deck.get('slides').indexOf(this._deck.get('activeSlide'));
			},

			addComponent: function(data, slide) {
				slide = slide || this._deck.get('activeSlide');
				if (slide) {
					if (typeof data.src == 'object' && data.src.file != null) {
						this._addEmbeddedComponent(data, slide);
					} else {
						var comp = ComponentFactory.instance.createModel(data, {
							fontStyles: this._fontState
						});
						if (comp)
							slide.add(comp);
					}
				} else {
					/*no find active slide   add a default slide and then creat component*/
					this.addSlide(0);
					this.addComponent(data);
				}
			},

			_addEmbeddedComponent: function(data, slide) {
				var embedData = data.src;
				var docKey = this.fileName();
				var attachKey = embedData.file.name;
				var self = this;
				this.storageInterface.storeAttachment(docKey,
					attachKey, embedData.file).then(function() {
					data.src = {
						docKey: docKey,
						attachKey: attachKey
					};
					self.addComponent(data, slide);
				}, function(error) {
					console.error(error);
					// TODO: report an error to our error reporting module...
				}).done();
			},

			_fontStateChanged: function(state) {
				_.extend(this._fontState, state);
				window.sessionMeta.fontState = this._fontState;
			},

			_createMode: function() {
				var modeId = this.get('modeId');
				var modeService = this.registry.getBest({
					interfaces: 'strut.EditMode',
					meta: {
						id: modeId
					}
				});

				if (modeService) {
					var prevMode = this.get('activeMode');
					if (prevMode)
						prevMode.close();
					this.set('activeMode', modeService.getMode(this, this.registry));
				}
			},

			constructor: function EditorModel(registry, deck) {
				this.registry = registry;
				Backbone.Model.prototype.constructor.call(this);
			}
		});
	});