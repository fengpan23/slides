define(['libs/backbone'],
	function(Backbone) {
		'use strict';

		return Backbone.Model.extend({
			save: function(cb) {
				//获取数据
				// this.storageInterface.save(data);
				setTimeout(function(){

					var data = {};
					data.saveTime = new Date().toLocaleTimeString();
					cb(data);
				}, 3000);
			},

			constructor: function StyleModel(editModel) {
				this._editModel = editModel;
				Backbone.Model.prototype.constructor.call(this);
			}
		});
	});