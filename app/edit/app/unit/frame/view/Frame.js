define(["../../ComponentView"],
	function(ComponentView) {

		/**
		 * @class WebFrameView
		 * @augments ComponentView
		 */
		return ComponentView.extend({
			className: "component webFrame",

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
			 * Initialize WebFrameView component view.
			 */
			initialize: function() {
				ComponentView.prototype.initialize.apply(this, arguments);
				this.model.on('change:visit', this._visitChange, this);
				this.model.on('change:src', this._srcChange, this);
				this.model.on('change:width', this._widthChange, this);
				this.model.on('change:height', this._heightChange, this);

				this._toolTemplate = JST['unit/frame/ComponentTool'];
			},

			_srcChange: function(model, src){
				this.$frame.attr('src', src);
				this.$frame.addClass('loading');
				if(this.$virtual){
					this.$virtual.remove();
					delete this.$virtual
				}
			},

			_widthChange: function(model, width){
				this.$frame.width(width);
			},

			_heightChange: function(model, height){
				this.$frame.height(height);
				if(this.$virtual){
					this.$virtual.css({'fontSize': height, 'margin': height/-2});
				}
			},

			_visitChange: function(model, visit){
				this.$overlay.toggleClass("pointer");
				this.$overlay.html('');
				this.$el.find('.pointer').html('<span></span>');
			},

			/**
			 * Render element based on component model.
			 *
			 * @returns {*}
			 */
			render: function() {
				ComponentView.prototype.render.call(this);

				this.$overlay = $('<div class="overlay"></div>');
				if(this.model.get('src')){
					this.$frame = $("<iframe class='loading' src=" + this.model.get('src') + "></iframe>");
					var _this = this;
					if (this.$frame[0].attachEvent){
						this.$frame[0].attachEvent("onload", function(){
							_this.$frame.removeClass('loading');
						});	
					} else {
						this.$frame[0].onload = function(e){
							_this.$frame.removeClass('loading');
						};
					}
				}else{
					this.$frame = $("<iframe src='http://#'></iframe>");
					this.$virtual = $('<span class="icon-website"></span>');
					this.$virtual.css({'fontSize': 384, 'margin': 384/-2});
					this.$el.append(this.$virtual);
				}
				this.$frame.css({width: this.model.get('width') || 512, height: this.model.get('height') || 384});
				this.$content.append(this.$frame);

				this.$el.append(this.$overlay);
				return this.$el;
			},

			sizeStart: function(){
				this._initialWidth = this.model.get("width") || this.$el.width() || this.$frame.width() || 480;
				this._initialHeight = this.model.get("height") || this.$el.height() || this.$frame.height() || 384;
				this._initialX = this.model.get('x');
				this._initialY = this.model.get('y');
				this.multiselect = window.event.ctrlKey || window.event.metaKey;
			},
			size: function(e, deltas){
				var correction = deltas.dx/Math.cos(45);
				switch ($(e.currentTarget).attr('data-place')) {
					case "tl":
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
						break;
					case "tr":
						if(this.multiselect){
							this.model.set('y', this._initialY + deltas.dy);
							this.model.setFloat("width", this._initialWidth + deltas.dx);
							this.model.setFloat("height", this._initialHeight - deltas.dy);
						}else{
							this.model.set('y', this._initialY - correction);
							this.model.setFloat("width", this._initialWidth + correction);
							this.model.setFloat("height", this._initialHeight + correction);
						}	
						break;
					case "bl":
						if(this.multiselect){
							this.model.set('x', this._initialX + deltas.dx);
							this.model.setFloat("width", this._initialWidth - deltas.dx);
							this.model.setFloat("height", this._initialHeight + deltas.dy);
						}else{
							this.model.set('x', this._initialX + correction);
							this.model.setFloat("width", this._initialWidth - correction);
							this.model.setFloat("height", this._initialHeight - correction);
						}
	                    break;
	                case "br":
	               		if(this.multiselect){
							this.model.setFloat("width", this._initialWidth + deltas.dx);
							this.model.setFloat("height", this._initialHeight + deltas.dy);
						}else{
							this.model.setFloat("width", this._initialWidth + correction);
							this.model.setFloat("height", this._initialHeight + correction);
						}
			            break;
				}
			},
			sizeStop: function(e, deltas){
				// var cmd = new ComponentCommands.Width(this._initialWidth, this.model);
				// undoHistory.push(cmd);
			}

		});
	});