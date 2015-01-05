define(['./view/Frame',
		'./model/Frame',
		'./tool/Frame',
		'lang'
	],
	function(FrameView, FrameModel, FrameTool, lang) {
		'use strict';

		var service = {
			getProvider: function() {
				return {
					text: lang.frame,
					icon: 'icon-website',
					type: 'WebFrame'
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
						type: 'WebFrame'
					}
				}, FrameModel);

				registry.register({
					interfaces: 'strut.ComponentView',
					meta: {
						type: 'WebFrame'
					}
				}, FrameView);

				registry.register({
					interfaces: 'strut.ComponentTool',
					meta: {
						type: 'WebFrame'
					}
				}, FrameTool);
			}
		}
	});