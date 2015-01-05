define(["../../ComponentView"],
	function(ComponentView) {
		var Html5, Youtube, result, types;

		/**
		 * @class VideoView.Html5
		 * @augments ComponentView
		 */
		Html5 = ComponentView.extend({
			className: "component videoView",

			events: function() {
				var myEvents, parentEvents;
				parentEvents = ComponentView.prototype.events();
				myEvents = {
					'mouseenter': '_playerCreate',
					'click': '_clicked',
					// 'mouseout': 'loseFocus',
				};
				return _.extend(parentEvents, myEvents);
			},

			/**
			 * Initialize VideoView.Html5 component view.
			 */
			initialize: function() {
				ComponentView.prototype.initialize.apply(this, arguments);

				this.$el.css('z-index', zTracker.next1());
			},

			/**
			 * Render element based on component model.
			 *
			 * @returns {*}
			 */
			render: function() {
				var $video,
					_this = this;
				ComponentView.prototype.render.call(this);
				$videoContainer = $("<div></div>");
				$video = $("<video controls></video>");
				$video.append("<source preload='metadata' src='" + (this.model.get("src")) + "' type='" + (this.model.get("srcType")) + "' />");
				$video.bind("loadedmetadata", function() {
					_this._finishRender($(this));
				});
				this.$el.find(".content").append($video);

				//				
				//				this._drawImage = this._drawImage.bind(this);
				//				this._drawImageEnd = this._drawImageEnd.bind(this);
				//				
				//				$video.on('play', this._drawImage);
				//				$video.on('pause', this._drawImageEnd);
				//				$video.on('ended', this._drawImageEnd);
				//				
				//				this.video = $video[0];
				////				var $canvas = $('<canvas id="myCanvas" width="270" height="135" style="border:1px solid #d3d3d3;">Your browser does not support the HTML5 canvas tag.</canvas>');
				//				var oCanvas = document.createElement("canvas");
				//				oCanvas.id = 'myoCanvas';
				//				$('body').append(oCanvas);

				//				this.oCanvas = $canvas[0];
				//				this.ctx = oCanvas.getContext('2d');

				console.time('new VideoControl');
				var videoControl = new VideoControl({
					$el: this.$el
				});
				console.timeEnd('new VideoControl');
				return this.$el;
			},

			_clicked: function(e) {
				this.$el.css('z-index', zTracker.next1());
				this.$el.trigger("focused");
				e.stopPropagation();
				return false;
			},

			_drawImage: function() {
				//				snapshoot
				console.log('dddddddddddddd');
				//				var video = this.$el.find('video')[0];
				//				var video = $('video')[0];
				//				var oCanvas = document.createElement("canvas");
				//				oCanvas.height = video.videoHeight;
				//				oCanvas.width = video.videoWidth;
				//				$('body').append(oCanvas);
				//				var ctx = oCanvas.getContext('2d');

				var self = this;
				this._draw = setInterval(function() {
					//					console.log(video);
					//					console.log(ctx);
					self.ctx.drawImage(self.video, 0, 0, 270, 135, 10, 10, 10, 10);
					//					var img = oCanvas.toDataURL("image/png");
					//					console.log(oCanvas);
				}, 200);
			},

			_drawImageEnd: function() {
				console.log('ssss');
				clearInterval(this._draw);

				this.ctx.save();

				//				var dataURL = this.oCanvas.toDataURL("image/png");
				var temp = $('#myoCanvas')[0].toDataURL("image/png");
				//				var temp = this.oCanvas.toDataURL("image/png");
			},

			/**
			 * Do the actual rendering once video is loaded.
			 *
			 * @param {jQuery} $img
			 * @returns {*}
			 * @private
			 */
			_finishRender: function($video) {
				this.origSize = {
					width: $video[0].videoWidth,
					height: $video[0].videoHeight
				};
				this._setUpdatedTransform();
			}
		});

		/**
		 * @class VideoView.Youtube
		 * @augments ComponentView
		 */
		YouKu = ComponentView.extend({
			className: 'component videoView',

			/**
			 * Initialize VideoView.Youtube component view.
			 */
			initialize: function() {
				ComponentView.prototype.initialize.apply(this, arguments);
				this.youku = new Youku(this.model);
				this.scale = Mixers.scaleObjectEmbed;
				this.model.off("change:scale", this._setUpdatedTransform, this);
				this.model.on("change:scale", Mixers.scaleChangeObjectEmbed, this);
			},

			/**
			 * Render element based on component model.
			 *
			 * @returns {*}
			 */
			render: function() {
				var object, scale;
				ComponentView.prototype.render.call(this);

				object = '<iframe class="youku-player" type="text/html" width="720px" height="720px" src="http://player.youku.com/player.php/sid/' + this.model.get('shortSrc') + '/v.swf" frameborder="0"></iframe>';
				// object = '<embed src="http://player.youku.com/player.php/sid/'+ this.model.get("shortSrc")+ '/v.swf" quality="high" align="middle" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash"></embed>';
				// ject = '<object width="425" height="344"><param name="movie" value="http://www.youtube.com/v/' + + '&hl=en&fs=1"><param name="allowFullScreen" value="true"><embed src="http://www.youtube.com/v/' + this.model.get('shortSrc') + '&hl=en&fs=1" type="application/x-shockwave-flash" allowfullscreen="true" width="425" height="344"></object>';
				this.$object = $(object);
				// <embed src="http://player.youku.com/player.php/sid/' . $id . '/v.swf" '
				// . 'quality="high" width="' . $width . '" height="' . $height . '" '
				// . 'align="middle" allowScriptAccess="always" '
				// . 'allowFullScreen="true" type="application/x-shockwave-flash">'
				// . '</embed>
				// this.$embed = this.$object.find('embed');
				scale = this.model.get("scale");
				if (scale && scale.width) {
					this.$object.attr(scale);
				} else {
					this.model.attributes.scale = {
						width: 425,
						height: 344
					};
				}
				this.$el.find('.content').append(this.$object);
				this.$el.append('<div class="overlay"></div>');
				this.$el.append('<div class="youkuControl"></div>');

				var _this = this;
				this.$youku = this.$el.find('.youkuControl');
				this.$youku.on('click', function() {
					_this.youku.show();
				});

				return this.$el;
			}
		});

		types = {
			html5: Html5,
			youku: YouKu
		};
		return function(params) {
			return new types[params.model.get('videoType')](params);
		};
	});