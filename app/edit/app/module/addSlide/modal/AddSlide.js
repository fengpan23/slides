define(['libs/backbone'],
function(Backbone) {
	var previous = null;

	var Modal = Backbone.View.extend({
		className: "add-slide modal",
		events: {
			"click .ok": "okClicked",
			"click .close": "_hide",
		},

		initialize: function() {
			// this.loadItem = _.debounce(this.loadItem.bind(this), 200);
			// this._template = JST['module/addSlide/AddSlide'];
		},

		show: function() {
			this.$el.removeClass('left-out').addClass('left-in');
			$('body').append('<div class="modal-backdrop"></div>')
		},

		okClicked: function(e) {
			e.stopPropagation();
			e.preventDefault();
		},
		
		hidden: function() {
			this.$el.find(".ok").addClass("disabled");
			if (this.$input != null) {
				this.item.src = '';
				this.file = null;
				return this.$input.val("");
			}
		},

		_hide: function(){
			this.$el.removeClass('left-in').addClass('left-out');
			$('body').find('.modal-backdrop').fadeOut('500').remove();
		},

		render: function() {
			this.$el.html(JST["module/addSlide/AddSlide"]);
			return this.$el;
		},

		constructor: function AddSlideModal() {
			Backbone.View.prototype.constructor.apply(this, arguments);
		}
	});

	return {
		get: function() {
			if (!previous) {
				previous = new Modal();
				$('#modals').append(previous.render());
			}
			return previous;
		},

		ctor: Modal
	};
});
