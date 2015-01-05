define(['app/unit/ComponentModel',
		'../ShapeCollection'],
function(Component, ShapeCollection) {
	'use strict';

	return Component.extend({
		initialize: function() {
			Component.prototype.initialize.apply(this, arguments);

			var shapeCollection = new ShapeCollection;

			this.set('type', 'Shape');
			this.set('content', shapeCollection.shapes[0].markup);
		},

		constructor: function Shape(attrs) {
			console.log(attrs);
			Component.prototype.constructor.call(this, attrs);
		}
	});
});