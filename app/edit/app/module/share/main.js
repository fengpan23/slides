define(['./view/Share',
		'./model/Share',
		'lang',
		'css!edit/styles/plug-in-modal-share.css'
	],
	function(ShareView, ShareModel, lang) {
		'use strict';

		var service = {
			createProvider: function(editorModel) {
				return new ShareView({model: new ShareModel()});
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