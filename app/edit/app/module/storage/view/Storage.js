define(['libs/backbone', 'lang'],
function(Backbone, lang) {
	return Backbone.View.extend({
		
		className: 'btn head-save',

		events: {
			click: 'save'
		},
		initialize: function() {
			delete this.options;
		},
		save: function() {
			if(this.savingFlag)return;
			this.saving();
			var _this = this;
			this.model.save(function(result){
				_this.saved(result.saveTime);
			});
		},
		saving: function(){
			this.savingFlag = true;
			this.$el.find('.icon-save').removeClass('icon-save').addClass('ongoing').attr('title', lang.saving);
		},
		saved: function(saveTime){
			this.savingFlag = false;
			this.$el.find('.ongoing').removeClass('ongoing').addClass('icon-save').attr('title', lang.save);
			this.$el.find('.save-status').html(saveTime);
		},

		render: function() {
			this.$el.html('<span class="icon-save" title='+ lang.save +'></span><span class="save-status"></span>');
			return this;
		},
		constructor: function SaveMenuItem() {
			Backbone.View.prototype.constructor.apply(this, arguments);
		},
	});
});