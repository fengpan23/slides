define(['./GlobalEvents',
		'./EditorModel',
		'./EditorView',
		'lang'],
	function(GlobalEvents, EditorModel, EditorView, lang) {
		'use strict';
		var registry = null;
		function loadEditor(deck) {
			var model = new EditorModel(registry);
			var editor = new EditorView({
				model: model,
				registry: registry
			});
			$('body').append(editor.render());
			if(deck){
				model.importPresentation(deck);
			}
		}

		var editorStartup = {
			run: function(deck) {
				loadEditor(deck);
			}
		};

		var welcome = {
			run: function() {
				// If no previous presentation was detected, show the welcome screen.
			}
		};
		return {
			initialize: function(reg) {
				registry = reg;
				var actions;
				if (navigator.appVersion.indexOf("Mac") != -1) {
					actions = [
						['undo', '⌘+Z'],
						['redo', '⌘+Y'],
						['cut', '⌘+X'],
						['copy', '⌘+C'],
						['paste', '⌘+V'],
						['delete', '⌘+⌫']
					];
				} else {
					actions = [
						['undo', 'Ctrl+Z'],
						['redo', 'Ctrl+Y'],
						['cut', 'Ctrl+X'],
						['copy', 'Ctrl+C'],
						['paste', 'Ctrl+V'],
						['delete', 'Del']
					];
				}

				actions.forEach(function(action) {
					registry.register({
						interfaces: 'strut.editor.glob.action',
						meta: {
							title: lang[action[0]],
							action: action[0],
							hotkey: action[1]
						}
					}, function() {
						GlobalEvents.trigger(action[0]);
					});
				});

				registry.register({
					interfaces: 'strut.StartupTask'
				}, editorStartup);

				registry.register({
					interfaces: 'strut.StartupTask'
				}, welcome);
			}
		};
	});