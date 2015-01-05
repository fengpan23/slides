define(['libs/backbone', '../modal/AddSlide'],
function(Backbone, AddSlideModal) {
	'use strict';

	return Backbone.View.extend({
		className: 'add-slide-btn',

		events: {
			// 'click': '_showAddSlideModal',
			'click': '_addSlide',
		},

		initialize: function() {
			this.addModal = AddSlideModal.get();
			$('#modals').append(this.addModal.render());
		},

		_showAddSlideModal: function(e){
			this.addModal.show();
		},

		_addSlide: function(){
			var addOffset = parseInt(this.$el.attr('data-offset'));
			this.model.addSlide(addOffset);
		},

		render: function(offset, cs) {
			this.$el.attr('data-offset', offset).addClass(cs).html('+');
			return this.$el;
		},

		constructor: function AddSlide() {
			Backbone.View.prototype.constructor.apply(this, arguments);
		}
	});
});