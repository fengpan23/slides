define(['./view/Audio',
		'./model/Audio',
		'./tool/Audio',
		'lang'
	],
	function(AudioView, AudioModel, AudioTool, lang) {
		'use strict';

		var service = {
			getProvider: function() {
				return {
					text: lang.audio,
					icon: 'icon-music',
					type: 'Audio'
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
						type: 'Audio'
					}
				}, AudioModel);

				registry.register({
					interfaces: 'strut.ComponentView',
					meta: {
						type: 'Audio'
					}
				}, AudioView);

				registry.register({
					interfaces: 'strut.ComponentTool',
					meta: {
						type: 'Audio'
					}
				}, AudioTool);
			}
		}
	});