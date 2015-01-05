require.config({
	paths : {
		libs 					: '../scripts/libs',
		preview_export 			: '../preview_export',
		jquery 					: '../scripts/libs/jQuery',
		jqueryui 				: '../scripts/libs/jquery-ui',
		j_qrcode 				: '../scripts/libs/jquery.qrcode',
		qrcode 					: '../scripts/libs/qrcode',
		jcrop 					: '../scripts/libs/jquery.Jcrop.min',
		touchpunch 				: '../scripts/libs/jquery-ui-touch-punch',
		'jquery.multisortable' 	: '../scripts/libs/jquery.multisortable',
		position 				: '../components/jq-contextmenu/jquery.ui.position',
		jqContextMenu 			: '../components/jq-contextmenu/jquery.contextMenu',
		lodash 					: '../scripts/libs/lodash',
		backbone 				: '../scripts/libs/backbone',
		css 					: '../scripts/libs/css',
		circlePlayer 			: '../components/audiojs',
		bootstrap 				: '../components/bootstrap/bootstrap',
		colorpicker 			: '../components/spectrum/spectrum',
		handlebars 				: '../scripts/libs/Handlebars',
		lang 					: '../locales/lang',
		lexed 					: '../components/lexed/lexed',
		codemirror 				: '../components/codemirror',
		marked 					: '../components/marked/marked',
		lls 					: '../components/lls/dist',
		Q 						: '../components/q/q',
		converseWeb				: '../components/converse/converse.website.min',


		// build - rmap
		'pmc/user' 				: './user',
		'pmc/models' 			: './models',
		'pmc/header' 			: './header',
		'pmc/deck_list' 		: './deck_list',
		'pmc/menu_list' 		: './menu_list',
		'pmc/main_content' 		: './main_content',
		// end build - rmap
	},

	shim : {
		bootstrap : {
			deps : ['jquery']
		},
		converseWeb: {
			deps : ['css!../components/converse/converse.css']
		}
	}
});

require(['backbone', './router/Router', 'bootstrap', 'compiled-templates', '../components/converse/main'],
	function(Backbone, Router, Bootstrap, empty) {
		'use strict';

	var agent = window.navigator.userAgent;

	if (agent.indexOf('WebKit') >= 0)
		window.browserPrefix = '-webkit-';
	else if (agent.indexOf('MSIE') >= 0)
		window.browserPrefix = '-ms-';
	else if (agent.indexOf('Firefox') >= 0)
		window.browserPrefix = '-moz-';
	else
		window.browserPrefix = '';

	window.addEventListener('dragover', function(e) {
		e = e || event;
		e.preventDefault();
	}, false);
	window.addEventListener('drop', function(e) {
		e = e || event;
		e.preventDefault();
	}, false);
	//清空hash，解决页面刷新时相同路由不触发问题。
	window.onload = function(e) {
		e = e || event;
		e.preventDefault();
		Backbone.history.navigate('', {trigger: false});
	};
	var router = new Router();
	Backbone.history.start();
});
