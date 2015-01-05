define(['libs/backbone', './AvailableThemes', './AvailableTransition'],
function(Backbone, AvailableThemes, AvailableTransition) {
	return Backbone.View.extend({
		className: "style modal",
		events: {
			'click .ok': 'okClicked',
			'click .cancel': '_hide',
			'click .theme-item': '_selectBackground',
			'click .transition-item': '_selectTransition',
		},

		initialize: function() {
			this.data = {
				themes: AvailableThemes,
				transition: AvailableTransition
			}
		},

		show: function(cb) {
			this.cb = cb;
			this.$el.removeClass('top-out').addClass('top-in');
			$('body').append('<div class="modal-backdrop"></div>')
		},

		okClicked: function(e) {
			e.stopPropagation();
			e.preventDefault();

			if (this.theme != null || this.transition != null) {
				this.cb({
					theme: this.theme,
					transition: this.transition
				});
			}
			return this._hide();
		},

		_selectBackground: function(e){
			this.$themeList.find('.select').removeClass('select');
			this.theme = $(e.currentTarget).addClass('select').attr('data-theme');
		},

		_selectTransition: function(e){
			this.$transitionList.find('.select').removeClass('select');
			this.transition = $(e.currentTarget).addClass('select').attr('data-transition');
		},
		
		_hide: function(){
			this.theme = null;
			this.transition = null;
			this.$el.removeClass('top-in').addClass('top-out');
			$('body').find('.modal-backdrop').fadeOut('500').remove();
		},

		render: function() {
			this.$el.html(JST["module/style/StyleModal"](this.data));
			this.$themeList = this.$el.find('.theme-list');
			this.$transitionList = this.$el.find('.transition-list');
			return this.$el;
		},

		constructor: function StyleModal() {
			Backbone.View.prototype.constructor.apply(this, arguments);
		}
	});
});
