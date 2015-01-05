define(['./view/Table',
		'./model/Table',
		'lang'
	],
	function(TableView, TableModel, lang) {
		'use strict';

		var service = {
			getProvider: function() {
				return {
					text: lang.table,
					icon: 'icon-text',
					type: 'Table'
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
						type: 'Table'
					}
				}, TextBoxModel);

				registry.register({
					interfaces: 'strut.ComponentView',
					meta: {
						type: 'Table'
					}
				}, TextBoxView);
			}
		}
	});