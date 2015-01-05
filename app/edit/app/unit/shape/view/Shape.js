define(["../../ComponentView",
		"app/deck/ComponentCommands",
		"communal/undo_support/CmdListFactory"],
function(ComponentView, ComponentCommands, CmdListFactory) {
	'use strict';

	var undoHistory = CmdListFactory.managedInstance('editor');

	return ComponentView.extend({
		className: 'component shapeView',

		/**
		 * Returns list of events, tracked by this view.
		 *
		 * @returns {Object}
		 */
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

		initialize: function() {
			ComponentView.prototype.initialize.apply(this, arguments);

			this._toolTemplate = JST['unit/shape/ComponentTool'];

			this.model.on('change:content', this._renderContent, this);
			this.model.on('change:width', this._widthChange, this);
			this.model.on('change:height', this._heightChange, this);
			this.model.on('change:color', this._colorChange, this);
		},

		render: function() {
			ComponentView.prototype.render.call(this);

			this._renderContent();
			return this.$el;
		},

		_renderContent: function(model, content){
			content = content || this.model.get('content');
			this.$svg = $(content);
			this.$svg.css({
				width: this.model.get('width') || 120,
				height: this.model.get('height') || 120,
				fill: this.model.get('color') || '#000',
			});
			this.$content.html(this.$svg);
		},

		_widthChange: function(model, width){
			this.$svg.css('width', width);
		},

		_heightChange: function(model, height){
			this.$svg.css('height', height);
		},

		_colorChange: function(model, color){
			this.$svg.css('fill', color);
		},

		sizeStart: function(){
			this._initialWidth = this.model.get("width") || this.$svg.width() || 50;
			this._initialHeight = this.model.get("height") || this.$svg.height() || 50;
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