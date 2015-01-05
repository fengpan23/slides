define(['./view/Image',
		'./model/Image',
		'./tool/Image',
		'lang'
	],
	function(ImageView, ImageModel, ImageTool, lang) {
		'use strict';

		var service = {
			getProvider: function() {
				return {
					text: lang.image,
					icon: 'icon-picture',
					type: 'Image'
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
						type: 'Image'
					}
				}, ImageModel);

				registry.register({
					interfaces: 'strut.ComponentView',
					meta: {
						type: 'Image'
					}
				}, ImageView);

				registry.register({
					interfaces: 'strut.ComponentTool',
					meta: {
						type: 'Image'
					}
				}, ImageTool);
			}
		}
	});