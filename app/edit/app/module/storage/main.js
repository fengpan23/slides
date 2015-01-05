define(['./view/Storage',
		'./model/Storage',
		'lang'
	],
	function(StorageView, StorageModel, lang) {
		'use strict';

		var service = {
			createProvider: function(editorModel) {
				return new StorageView({model: new StorageModel(editorModel)});
			}
		};

		return {
			initialize: function(registry) {
				registry.register({
					interfaces: 'strut.MenuProvider'
				}, service);

			}
		}
	});