define(['libs/backbone'],
	function(Backbone) {
		'use strict';

		return Backbone.Model.extend({

			initialize: function() {
				this._deck = this._editModel.deck();
			},

			updateStyle: function(data) {
				this._deck.set(data);
			},

			constructor: function StyleModel(editModel) {
				this._editModel = editModel;
				Backbone.Model.prototype.constructor.call(this);
			}
		});
	});