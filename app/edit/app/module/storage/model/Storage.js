define(['libs/backbone'],
	function(Backbone) {
		'use strict';

		return Backbone.Model.extend({
			initialize: function(){
				this.storageInterface = this._editorModel.registry.getBest('strut.StorageInterface');
			},

			save: function(cb) {
				var data = this._editorModel.exportPresentation();
				this.storageInterface.save(data, function(data){
					console.log(data);
					var data = {};
					data.saveTime = new Date().toLocaleTimeString();
					cb(data);
				});
			},

			constructor: function StorageModel(editorModel) {
				this._editorModel = editorModel;
				Backbone.Model.prototype.constructor.call(this);
			}
		});
	});