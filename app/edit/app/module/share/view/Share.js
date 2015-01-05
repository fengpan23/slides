define(['libs/backbone', 'lang', '../modal/Share'],
function(Backbone, lang, ShareModal) {
	return Backbone.View.extend({
		className: 'btn-r head-share',
		events: {
			click: '_showModal'
		},
		initialize: function() {
			delete this.options;
			this.modal = new ShareModal();
			$('#modals').append(this.modal.render());
		},
		_showModal: function() {
			this.modal.show();
		},
		render: function() {
			this.$el.html('<span class="icon-share" title='+ lang.share +'></span><span class="btn-content">'+ lang.share +'</span>');
			return this;
		},
		constructor: function ShareView() {
			Backbone.View.prototype.constructor.apply(this, arguments);
		},
	});
});