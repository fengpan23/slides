define(['./view/TextBox',
		'./model/TextBox',
		'./tool/TextBox',
		'lang'
	],
	function(TextBoxView, TextBoxModel, TextBoxTool, lang) {
		'use strict';

		var service = {
			getProvider: function() {
				return {
					text: lang.text,
					icon: 'icon-text',
					type: 'TextBox'
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
						type: 'TextBox'
					}
				}, TextBoxModel);

				registry.register({
					interfaces: 'strut.ComponentView',
					meta: {
						type: 'TextBox'
					}
				}, TextBoxView);

				registry.register({
					interfaces: 'strut.ComponentTool',
					meta: {
						type: 'TextBox'
					}
				}, TextBoxTool);
			}
		}
	});