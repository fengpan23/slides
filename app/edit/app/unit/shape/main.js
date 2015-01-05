define(['./view/Shape',
		'./model/Shape',
		'./tool/Shape',
		'lang'
	],
	function(ShapeView, ShapeModel, ShapeTool, lang) {
		'use strict';

		var service = {
			getProvider: function() {
				return {
					text: lang.chart,
					icon: 'icon-chart',
					type: 'Shape'
				};
			}
		};

		return {
			initialize: function(registry) {
				registry.register({
					interfaces: 'strut.UnitProvider'
				}, service);

				registry.register({
					interfaces: 'strut.ComponentModel',
					meta: {
						type: 'Shape'
					}
				}, ShapeModel);

				registry.register({
					interfaces: 'strut.ComponentView',
					meta: {
						type: 'Shape'
					}
				}, ShapeView);

				registry.register({
					interfaces: 'strut.ComponentTool',
					meta: {
						type: 'Shape'
					}
				}, ShapeTool);
			}
		}
	});