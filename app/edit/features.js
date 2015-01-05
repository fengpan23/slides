define([
	'framework/ServiceRegistry',
	'app/editor/main',
	
	'app/module/storage/main',
	'app/module/style/main',
	'app/module/setting/main',
	'app/module/share/main',
	'app/module/addSlide/main',

	// 'app/unit/video/main',
	// 'app/unit/table/main',
	'app/unit/image/main',
	'app/unit/textbox/main',
	'app/unit/shape/main',
	'app/unit/frame/main',
	'app/unit/audio/main',
	'app/unit/ComponentFactory', //make sure this under the unit 

	'communal/storage/main',

	// 'strut/logo_button/main',
	// 'strut/themes/main',
	// 'strut/editor/main',
	// 'strut/exporter/json/main',
//	'strut/exporter/zip/browser/main',
	// 'strut/importer/ppt/main',
	// 'strut/importer/json/main',
	// 'strut/importer/main',
	// 'strut/exporter/main',
	// 'strut/presentation_generator/bespoke/main', //可平板观看
	// 'strut/presentation_generator/handouts/main', //可平板观看
	// 'strut/presentation_generator/impress-mobile/main',

	// 'strut/presentation_generator/reveal/main',
	// 'strut/presentation_generator/impress/main',
	// 'strut/presentation_generator/main',
	// 'tantaman/web/saver/main',
	// 'strut/slide_editor/main',
	// 'strut/transition_editor/main',
	// 'strut/slide_components/main',
	// 'strut/well_context_buttons/main',
	// 'strut/drawers/main',
	
	// 'tantaman/web/local_storage/main', // LLS is being set up in main.
	// 'tantaman/web/remote_storage/main',
	// 'strut/startup/main'
	],
function(ServiceRegistry) {
	var registry = new ServiceRegistry();

	var args = Array.prototype.slice.call(arguments, 0);

	var i = 0;
	for (var i = 1; i < args.length; ++i) {
		args[i].initialize(registry);
	}

	return registry;
});