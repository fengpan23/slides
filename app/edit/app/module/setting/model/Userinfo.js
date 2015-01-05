define(['libs/backbone'],
	function(Backbone) {
		'use strict';

		return Backbone.Model.extend({
			initialize: function(){
				this._deck = this._editModel.deck();
			},

			updateUserinfo: function(data) {
				console.log(data);
				this._deck.set(data);
			},

			configurationItem: function(){
				return {
					title: this._deck.get('title'),
					description: this._deck.get('description'),
					autoDisplay: this._deck.get('autoDisplay'),
					autoSave: this._deck.get('autoSave'),
					slidewellScale: this._deck.get('slidewellScale')
				}
			},

			constructor: function StyleModel(editModel) {
				this._editModel = editModel;
				Backbone.Model.prototype.constructor.call(this);
			}
		});
	});