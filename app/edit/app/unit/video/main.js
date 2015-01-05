define(['./view/Video',
		'./model/Video',
		'./tool/Video',
		'lang'
	],
	function(VideoView, VideoModel, VideoTool, lang) {
		'use strict';

		var service = {
			getProvider: function() {
				return {
					text: lang.video,
					icon: 'icon-picture',
					type: 'Video'
				}
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
						type: 'Video'
					}
				}, VideoModel);

				registry.register({
					interfaces: 'strut.ComponentTool',
					meta: {
						type: 'Video'
					}
				}, VideoTool);
			}
		}
	});