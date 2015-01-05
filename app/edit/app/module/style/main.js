define(['./view/Style',
		'./model/Style',
		'lang',
		'css!edit/styles/plug-in-modal-style.css'
	],
	function(StyleView, StyleModel, lang) {
		'use strict';

		var service = {
			createProvider: function(editorModel) {
				return new StyleView({model: new StyleModel(editorModel)});
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