define(['../../ComponentView',
		'app/deck/ComponentCommands',
		'communal/undo_support/CmdListFactory'],
	function(ComponentView, ComponentCommands, CmdListFactory) {

		var undoHistory = CmdListFactory.managedInstance('editor');
		/**
		 * @class ImageView
		 * @augments ComponentView
		 */
		return ComponentView.extend({
			className: "component image",
			tagName: "div",

			events: function() {
                var myEvents, parentEvents;
                parentEvents = ComponentView.prototype.events();
                myEvents = {
                    "deltadragStart span[data-delta='size']": "sizeStart",
					"deltadrag span[data-delta='size']": "size",
					"deltadragStop span[data-delta='size']": "sizeStop",
                };
                return _.extend(parentEvents, myEvents);
            },
			/**
			 * Initialize Image component view.
			 */
			initialize: function() {
				ComponentView.prototype.initialize.apply(this, arguments);

				this.model.on('change:src', this._srcChanged, this);
				this.model.on('change:width', this._widthChanged, this);
				this.model.on('change:height', this._heightChanged, this);

				this._toolTemplate = JST['unit/image/ComponentTool'];
			},

			/**
			 * Render element based on component model.
			 *
			 * @returns {*}
			 */
			render: function() {
				ComponentView.prototype.render.call(this);

				var _this = this, url = this.model.get('src');
				if (url) {
					this.$img = $('<img src="' + url + '">');
					this.$img.load(function(e) {
						_this._imageLoaded(e);	
					});
				} else {
					this.$img = $('<div class="icon-picture"></div>');
				}
				this.$content.html(this.$img);

				return this.$el;
			},

			_srcChanged: function(model, url){
				if(this.$img.hasClass('icon-picture')){
					this.$img = $('<img src="' + url + '">');
					var _this = this;
					this.$img.load(function(e){
						_this._imageLoaded(e);
					});
					this.$content.html(this.$img);
					return;
				}
				this.$img.attr('src', url);
			},

			_widthChanged: function(model, width){
				this.$img.width(width);
			},

			_heightChanged: function(model, height){
				this.$img.height(height);
			},

			_imageLoaded: function(e){
				this.$img.css({
					width: this.model.get('width') || e.currentTarget.width, 
					height: this.model.get('height') || e.currentTarget.height});
			},

			sizeStart: function(){
				this._initialWidth = this.model.get("width") || this.$img.width() || 50;
				this._initialHeight = this.model.get("height") || this.$img.height() || 50;
				this._initialX = this.model.get('x');
				this._initialY = this.model.get('y');
				this.multiselect = window.event.ctrlKey || window.event.metaKey;

				this.dragStartSize = {};
				this.dragStartSize.width = this._initialWidth;
				this.dragStartSize.height = this._initialWidth;
				this.dragStartSize.x = this._initialX;
				this.dragStartSize.y = this._initialY;
			},
			size: function(e, deltas){
				var correction = deltas.dx/Math.cos(45);

				if($(e.currentTarget).hasClass('br')){
					if(this.multiselect){
						this.model.setFloat("width", this._initialWidth + deltas.dx);
						this.model.setFloat("height", this._initialHeight + deltas.dy);
					}else{
						this.model.setFloat("width", this._initialWidth + correction);
						this.model.setFloat("height", this._initialHeight + correction);
					}
				}else if($(e.currentTarget).hasClass('bc')){
					this.model.set('height', this._initialHeight + deltas.dy);
				}else if($(e.currentTarget).hasClass('bl')){
					if(this.multiselect){
						this.model.set('x', this._initialX + deltas.dx);
						this.model.setFloat("width", this._initialWidth - deltas.dx);
						this.model.setFloat("height", this._initialHeight + deltas.dy);
					}else{
						this.model.set('x', this._initialX + correction);
						this.model.setFloat("width", this._initialWidth - correction);
						this.model.setFloat("height", this._initialHeight - correction);
					}
				}else if($(e.currentTarget).hasClass('cl')){
					this.model.set('x', this._initialX + deltas.dx);
					this.model.set('width', this._initialWidth - deltas.dx);
				}else if($(e.currentTarget).hasClass('cr')){
					this.model.set('width', this._initialWidth + deltas.dx);
				}else if($(e.currentTarget).hasClass('tl')){
					if(this.multiselect){
						this.model.set('x', this._initialX + deltas.dx);
						this.model.set('y', this._initialY + deltas.dy);
						this.model.setFloat("width", this._initialWidth - deltas.dx);
						this.model.setFloat("height", this._initialHeight - deltas.dy);
					}else{
						this.model.set('x', this._initialX + correction);
						this.model.set('y', this._initialY + correction);
						this.model.setFloat("width", this._initialWidth - correction);
						this.model.setFloat("height", this._initialHeight - correction);
					}
				}else if($(e.currentTarget).hasClass('tc')){
					this.model.set('y', this._initialY + deltas.dy);
					this.model.set('height', this._initialHeight - deltas.dy);
				}else if($(e.currentTarget).hasClass('tr')){
					if(this.multiselect){
						this.model.set('y', this._initialY + deltas.dy);
						this.model.setFloat("width", this._initialWidth + deltas.dx);
						this.model.setFloat("height", this._initialHeight - deltas.dy);
					}else{
						this.model.set('y', this._initialY - correction);
						this.model.setFloat("width", this._initialWidth + correction);
						this.model.setFloat("height", this._initialHeight + correction);
					}	
				}else{
					console.log('be careful, drag change image size error!');
				}
			},
			sizeStop: function(){
				// undoHistory.pushdo(new ComponentCommands.Size(this.dragStartSize, this.model));
			}

		});
	});