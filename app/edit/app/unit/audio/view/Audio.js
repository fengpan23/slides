define(['../../ComponentView',
        'cPlayer/circle.player'],
	function(ComponentView, circlePlayer) {
		/**
		 * @class audioView
		 * @augments ComponentView
		 */
		return ComponentView.extend({
			className: 'component audioView',

			events: function() {
                var myEvents, parentEvents;
                parentEvents = ComponentView.prototype.events();
                myEvents = {
                    'click': '_updateDuration',
                };
                return _.extend(parentEvents, myEvents);
            },
            /**
             * Initialize audioView component view.
             */
            initialize: function() {
                ComponentView.prototype.initialize.apply(this, arguments);

                this.model.on('change:src', this._srcChange, this);
                this.model.on('change:bgsound', this._bgsoundRender, this);
                this.model.on('change:loop', this._loopChange, this);

                var self = this;
                setTimeout(function() {
                    self._createPlayer();
                }, 300);
            },

            _loopChange: function(model, loop){
                this.cPlayer.loop(loop);
            },

            _srcChange: function(model, src){
                this.cPlayer.setMedia({m4a: this.model.get('src')});
            },

            _bgsoundRender: function(model, bgsound){
                if(bgsound){
                    var _this = this;
                    setTimeout(function() {
                        _this.cPlayer.play();
                    }, 300);
                    this.$el.css('opacity', 0.1);
                    this.$el.find('.component-tool').css('pointer-events', 'fill');
                }else{
                    this.$el.css('opacity', 1);
                    this.$el.find('.component-tool').css('pointer-events', 'none');
                }
            },

            /**
             * update duration
             */
            _updateDuration: function(){
                var time = this.$el.find('.jp-duration').html();
                this.model.set('time', time);
                ComponentView.prototype.clicked.apply(this, arguments);
            },

            /**
             * create circle Player if player is created update duration
             */
            _createPlayer: function(){
                if (this.cPlayer) {
                    this._updateDuration();
                    return;
                }
                this.cPlayer = new CirclePlayer("#jquery_jplayer_" + this.model.cid,
                {
                    m4a: this.model.get('src')
                }, {
                    cssSelectorAncestor: "#cp_container_" + this.model.cid,
                    // swfPath: "../../dist/jplayer",
                    wmode: "window",
                    currentTime: '.jp-current-time',
                    duration: '.jp-duration',
                    keyEnabled: false,
                    ready: function(){
                    }
                });
               if(this.model.get('bgsound')){
                    this._bgsoundRender(null, true);
               }
               this.cPlayer.loop(this.model.get('loop'));
            },

            /**
             * Remove component view, destroy circle player
             *
             * @param {boolean} disposeModel Whether or not to dispose component's model as well.
             */
            remove: function(disposeModel) {
                if(this.cPlayer){
                    this.cPlayer.destroy();
                    delete this.cPlayer;
                }
                ComponentView.prototype.remove.apply(this, arguments);
            },
			/**
			 * Render element based on component model.
			 *
			 * @returns {*}
			 */
			render: function() {
				ComponentView.prototype.render.call(this);
			    this.template = JST["unit/audio/Audio"](this.model);
                this.$content.html(this.template);
				return this.$el;
			}
		});
	});
