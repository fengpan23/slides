define(['libs/backbone'],
function(Backbone) {
	return Backbone.View.extend({
		className: "setting modal",
		events: {
			"click .ok": "okClicked",
			"click .cancel": "_hide",
		},

		initialize: function() {
			// this.loadItem = _.debounce(this.loadItem.bind(this), 200);
		},

		show: function(data, cb) {
			this.cb = cb;
			this.render(data);

			data.autoDisplay && this.$el.find('.auto-slide-select').val(data.autoDisplay),
			data.autoSave && this.$el.find('.auto-save-select').val(data.autoSave),

			this._initScaleSlider(data.slidewellScale),

			this.$el.removeClass('top-out').addClass('top-in');
			$('body').append('<div class="modal-backdrop"></div>')
		},

		okClicked: function(e) {
			e.stopPropagation();
			e.preventDefault();
			this.cb({
				title: this.$el.find('.title-text').val(),
				description: this.$el.find('.description-text').val(),
				autoDisplay: this.$el.find('.auto-slide-select').val(),
				autoSave: this.$el.find('.auto-save-select').val(),
				slidewellScale: this.slidewellScale
			});
			this._hide();
		},

		/**
		 * init scale slider
		 * change the slidewellScale value when change pulg-in  value
		 */
		_initScaleSlider: function(slidewellScale) {
			if(typeof(slidewellScale) != 'number') slidewellScale = 1;
			var _this = this;
			this.$el.find('.slidewell-scale').slider({
				range: "min",
				value: slidewellScale * 100,
				min: 0,
				max: 200,
				slide: function(event, ui) {
					$(this).siblings('.slidewell-scale-value').html(ui.value + '%');
					_this.slidewellScale = ui.value/100;
				},
				change: function(event, ui) {
					$(this).siblings('.slidewell-scale-value').html(ui.value + '%');
					_this.slidewellScale = ui.value/100;
				}
			});
			this.$el.find('.slidewell-scale-value').html(slidewellScale * 100 + '%');
		},
		
		_hide: function(){
			this.$el.removeClass('top-in').addClass('top-out');
			$('body').find('.modal-backdrop').fadeOut('500').remove();
		},

		render: function(data) {
			this.$el.html(JST["module/setting/UserinfoModal"](data));
			return this.$el;
		},

		constructor: function LinkModal() {
			Backbone.View.prototype.constructor.apply(this, arguments);
		}
	});
});
