define(['app/unit/ComponentModel'],
	function(Component) {
		'use strict';

		/**
		 * @class WebFrame
		 * @augments Component
		 */
		return Component.extend({
			initialize: function() {
				Component.prototype.initialize.apply(this, arguments);
				this.set('type', 'WebFrame');
			},

			constructor: function WebFrame(attrs) {
				Component.prototype.constructor.call(this, attrs);
			}
		});
	});