define(['app/unit/ComponentModel',
	'common/FileUtils'],
	function(Component, FileUtils) {
		'use strict';

		/**
		 * @class Image
		 * @augments Component
		 */
		return Component.extend({
			initialize: function() {
				Component.prototype.initialize.apply(this, arguments);
				this.set('type', 'Image');
				var src = this.get('src');
				src && this.set('imageType', FileUtils.imageType(src));
			},

			dispose: function() {
				Component.prototype.dispose.apply(this, arguments);
			},

			constructor: function ImageModel(attrs) {
				Component.prototype.constructor.call(this, attrs);
			}
		});
	});