/**
 * @author Matt Crinklaw-Vogt
 */
define(["common/SpatialObject"], function(SpatialObject) {
	var defaultScale, defaults, defaultBorder, defaultOpacity;
	defaults = {
		x: config.slide.size.width / 5,
		y: config.slide.size.height / 5
	};

	defaultScale = {
		x: 1,
		y: 1
	};

	defaultBorder = {
		width: 0,
		style: 'solid',
		color: '#000',
		radius: 0
	};

	/**
	 * Base class for all slide elements.
	 *
	 * @class Component
	 * @augments SpatialObject
	 */
	return SpatialObject.extend({

		/**
		 * Initialize component model.
		 * @returns {Object}
		 */
		initialize: function() {
			_.defaults(this.attributes, defaults);
			if (this.attributes.scale === undefined) {
				this.attributes.scale = {};
				_.defaults(this.attributes.scale, defaultScale);
			}
			if (this.attributes.border === undefined) {
				this.attributes.border = {};
				_.defaults(this.attributes.border, defaultBorder);
			}
		},

		/**
		 * [setChain description]
		 * @param {[type]} key     [description]
		 * @param {[type]} value   [description]
		 * @param {[type]} options [description]
		 */
		setChain: function(key, value, options) {
			var keyArr = key.split('.');
			if(keyArr.length > 1){
				var evelStr = "this.attributes." + key + "=";
				if(typeof value === 'string' && value.indexOf('(') > 0){
					evelStr += "'" + value + "'";
				}else{
					evelStr += value;
				}
				eval(evelStr);
				this.trigger('change:' + keyArr[0]);
			}else{
				this.set(key, value);
			}
		},

		getChain: function(key){
			if(key.indexOf('.') > 0){
				return eval("this.attributes." + key);
			}else{
				return this.get(key);
			}
		},

		/**
		 * Sets or returns custom classes of the element.
		 *
		 * @param {string} [classes] If passed, element will take these classes.
		 * @returns {string}
		 */
		customClasses: function(classes) {
			if (classes == null) {
				return this.get('customClasses');
			} else {
				this.set('customClasses', classes);
			}
		},
		
		/**
		 * Dispose the element.
		 */
		dispose: function() {
			this.trigger("dispose", this);
			this.off();
		},

		constructor: function Component() {
			SpatialObject.prototype.constructor.apply(this, arguments);
		}
	});
});
