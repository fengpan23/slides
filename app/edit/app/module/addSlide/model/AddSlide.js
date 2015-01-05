define(['libs/backbone'],
	function(Backbone) {
		'use strict';

		return Backbone.Model.extend({
			addSlide: function(index){
				var insertIndex = this._editModel.activeSlideIndex() + index;
				this._editModel.addSlide(insertIndex > 0 ? insertIndex : 0);
			},

			constructor: function AddSlideModel(editModel) {
				this._editModel = editModel;
				Backbone.Model.prototype.constructor.call(this);
			}
		});
	});