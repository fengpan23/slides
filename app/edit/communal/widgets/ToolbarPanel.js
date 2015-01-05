define(['libs/backbone'],
function(Backbone) {
	var previous = null;

	var Modal = Backbone.View.extend({
		className: "toolbar-panel",
		events: {
			"click .panel-item": "_selected",
		},
		initialize: function() {

		},

		show: function(data, cb) {
			this.cb = cb;
			this.$contents.empty();
			var _this = this, e = data.e, content = data.content;
			content.forEach(function(item){
				_this.$contents.append('<div class="panel-item">'+ item +'</div>')
			});
			this.$el.removeClass();
			data.className ? this.$el.addClass('toolbar-panel '+ data.className): this.$el.addClass('toolbar-panel');

			var top = e.clientY- this.$el.height()/2 ;
			top = top > 0 ? top : 5;
			this.$el.animate({top: top}, 'fast');
			this.$el.show();

			var _this = this;
	      	$('body').bind('mousedown.toolbar-panel', function(e) {
		        var target = e.target || e.srcElement;
		        if ($(target).not('.toolbar-panel *').size()) {
			        _this.hidden();
		        	$(this).unbind('mousedown.toolbar-panel');
		        }
	      	});
		},
		_selected: function(e) {
			e.stopPropagation();
			e.preventDefault();
			var selectVal = $(e.currentTarget).html();
			this.cb(selectVal);
			this.hidden();
		},
		
		hidden: function() {
			this.$el.hide();
		},
		render: function() {
			this.$contents = $('<div class="content-list"></div>');
			this.$el.html(this.$contents);
			return this.$el;
		},
		constructor: function ToolbarPanel() {
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
