define(['lodash'], function(_) {
	var Guides, magnetic = 10;

	Guides = {
		init: function(showAreaEl) {
			showAreaEl.appendChild(this.render());
			this.initGuides();
		},

		initGuides: function(){
			this.guides = {
				// crosswise: [0, 128, 256, 384, 512, 640, 768],
				// vertical: [0, 128, 256, 384, 512, 640, 768, 896, 1024]
				crosswise: [0, 384, 768],
				vertical: [0, 256, 512, 768, 1024]
			};
		},

		hide: function(){
			this.$crosswise.hide();
			this.$vertical.hide();
		},

		resetGuides: function($el){
			var _this = this;
			this.initGuides();
			$el.siblings('.component').each(function(component, index){
				var position = _this._getPositon(this),
					width = $(this).width(),
					height = $(this).height();

					_this.addGuide(position);
					position.left += width;
					position.top += height;
					_this.addGuide(position);
			});
		},

		addGuide: function(position){
			this.guides.crosswise.push(position.top);
			this.guides.vertical.push(position.left);
		},

		render: function() {
			this.el = document.createElement('div');
			this.el.className = "guides";

			this.$crosswise = $('<div class="guides-line"></div>');
			this.$vertical = $('<div class="guides-line"></div>');
			$(this.el).append(this.$crosswise);
			$(this.el).append(this.$vertical);
			return this.el;
		},

		_renderGuide: function(guideStyle){

		},

		findGuides: function($dragedBox, model) {
			var currentPos = {}, boxSize = {width: $dragedBox.width(), height: $dragedBox.height()};
	        currentPos.x1 = model.get('x');
	        currentPos.x2 = model.get('x') + boxSize.width;
	        currentPos.y1 = model.get('y');
	        currentPos.y2 = model.get('y') +  boxSize.height;
	        this.compageEdges(currentPos, model, boxSize);
	    },

	    compageEdges: function(currentPos, model, boxSize){
	    	var rangeX1 = this.rangeNumber(this.guides.vertical, currentPos.x1, magnetic);
	    	var rangeX2 = this.rangeNumber(this.guides.vertical, currentPos.x2, magnetic);
	    	var rangeY1 = this.rangeNumber(this.guides.crosswise, currentPos.y1, magnetic);
	    	var rangeY2 = this.rangeNumber(this.guides.crosswise, currentPos.y2, magnetic);
	    	var guideStyle = {};
	    	if(rangeX1 !== false){
    			model.set('x', rangeX1);
    			guideStyle.left = rangeX1;
    			guideStyle.top = 0;
    			guideStyle.bottom = 0;
    			this.$vertical.css(guideStyle);
    			this.$vertical.show();
	    	}else if(rangeX2 !== false){
	    		model.set('x', rangeX2 - boxSize.width);
    			guideStyle.left = rangeX2;
    			guideStyle.top = 0;
    			guideStyle.bottom = 0;
    			this.$vertical.css(guideStyle);
    			this.$vertical.show();
	    	}else{
	    		this.$vertical.hide();
	    	}
	    	guideStyle = {};
	    	if(rangeY1 !== false){
    		 	model.set('y', rangeY1);
    		 	guideStyle.top = rangeY1;
    			guideStyle.left = 0;
    			guideStyle.right = 0;
    			this.$crosswise.css(guideStyle);
    			this.$crosswise.show();
	    	}else if(rangeY2 !== false){
	    		model.set('y', rangeY2 - boxSize.height);
    		 	guideStyle.top = rangeY2;
    			guideStyle.left = 0;
    			guideStyle.right = 0;
    			this.$crosswise.css(guideStyle);
    			this.$crosswise.show();
	    	}else{
	    		this.$crosswise.hide();
	    	}
	    },

	    /**
		 * get the real positon and change to int
		 * @type {left: ***, top: ***}
		 */
		_getPositon: function(el){
			var position = {};
			position.left = parseInt(el.style.left.replace('px', ''));
			position.top = parseInt(el.style.top.replace('px', ''));
			return position;
		},

	    /**
	     * @param  {array} cpArray   compare array
	     * @param  {number} comparNumner compare number
	     * @param  {number} range   array item range or to say the compare number range
	     * @return {number}   the best fit in array or false
	     */
	    rangeNumber: function(cpArray, comparNumner, range){
	    	var nearNumber = _.min(cpArray, function(number, index){
				return Math.abs(number - comparNumner)
			 });
			 return Math.abs(comparNumner - nearNumber) > range ? false : nearNumber;
	    },

	    /**
	     * @param  {array} cpArray  compare array
	     * @param  {number} cpNumber to compare number
	     * @return {number}   the nearest number
	     */
	    nearNumber: function(cpArray, cpNumber){
			return _.min(cpArray, function(number){
				return Math.abs(1-number/cpNumber);
			});
	    }
	};
	return Guides;
});