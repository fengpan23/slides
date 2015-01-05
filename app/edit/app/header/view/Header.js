define(['libs/backbone'],
function(Backbone) {
	return Backbone.View.extend({
		className: 'header',

		events: {
			'click .head-display': '_launch',
		},

		initialize: function() {
			this._template = JST['header/Header'];
			this._buttons = this.model.get('createCompButtons');
		},

		// create component buttons
		render: function() {
			this.$el.html(this._template());
			this.$tools = this.$el.find('.head-tool');

			this._buttons.forEach(function(button){
				this.$tools.append(button.render().$el);
			}, this);

			//add display button
			this.$tools.append('<div class="btn head-display"><span class="icon-play"></span></div>');
			return this.$el;
		},

		_launch: function() {
			//save and first
			var currentId = this.model._editorModel._deck.get('_id');
			window.open('reveal/index.html#' + currentId, window.location.href);
		},

		constructor: function HeaderView() {
			Backbone.View.prototype.constructor.apply(this, arguments);
		}
	});
});