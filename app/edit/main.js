require.config({
	paths : {
		libs 					: '../scripts/libs',
		common			 		: '../scripts/common',
		framework 				: '../scripts/framework',

		lang 					: '../locales/lang',

		css 					: '../scripts/libs/css',
		jquery 					: '../scripts/libs/jQuery',
		jqueryui 				: '../scripts/libs/jqueryui/jquery-ui',
		'jquery.multisortable'	: '../scripts/libs/jquery.multisortable',
		lodash 					: '../scripts/libs/lodash',
		backbone 				: '../scripts/libs/backbone',
		handlebars 				: '../scripts/libs/Handlebars',
		bootstrap 				: '../components/bootstrap/bootstrap',
		jPlayer 				: '../scripts/libs/jquery.jplayer.min',
		cPlayer 				: '../components/circlePlayer/js',

		colorpicker 			: './component/spectrum/spectrum',
		ckeditor 				: './component/ckeditor/ckeditor',

		// build - rmap
		'app/config'							: './app/config',
		'app/deck'                           	: './app/deck',
		'app/editor'                           	: './app/editor',
		'app/footer'                           	: './app/footer',
		'app/header'                           	: './app/header',
		'app/module'							: './app/module',
		'app/operatingTable'                   	: './app/operatingTable',
		'app/slideWell'                        	: './app/slideWell',
		'app/unit'                        		: './app/unit',

		communal					   			: './communal',
		'communal/interactions'					: './communal/interactions',
		'communal/undo_support'					: './communal/undo_support',
		// end build - rmap
	},

	shim : {
		bootstrap : {
			deps : ['jquery']
		},

		'jquery.multisortable' : {
			deps : ['jquery', 'jqueryui']
		},

		jqueryui : {
			deps : ['jquery', 'css!scripts/libs/jqueryui/jquery-ui.css']
		},

		colorpicker : {
			deps : ['jquery', 'css!edit/component/spectrum/spectrum.css']
		},

		'cPlayer/circle.player': {
		    deps: [	'jquery',
		    		'jPlayer',
		           	'cPlayer/jquery.grab',
		           	'cPlayer/jquery.transform2d',
		           	'cPlayer/mod.csstransforms.min',
		           	'css!../components/circlePlayer/skin/circle.player.css',
		    ]
		},
	}
});

//etch get select
function getSelectionBoundaryElement(win, isStart) {
	var range, sel, container = null;
	var doc = win.document;

	if (doc.selection) {
		// IE branch
		range = doc.selection.createRange();
		range.collapse(isStart);
		return range.parentElement();
	} else if (win.getSelection) {
		// Other browsers
		sel = win.getSelection();

		if (sel.rangeCount > 0) {
			range = sel.getRangeAt(0);
			container = range[ isStart ? 'startContainer' : 'endContainer'];

			// Check if the container is a text node and return its parent if so
			if (container.nodeType === 3) {
				container = container.parentNode;
			}
		}
	}
	return container;
}

require(['libs/backbone',
         'bootstrap',
         './compiled-templates',
         'app/config/config',
         './features',
         './route/Router',
         'colorpicker'], 
	function(Backbone, bootstrap, empty, config, registry, Router) {
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

	var router = new Router(registry);
	Backbone.history.start();
});
