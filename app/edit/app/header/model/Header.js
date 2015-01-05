define(['libs/backbone'],
function(Backbone) {
	return Backbone.Model.extend({
		initialize: function() {
			this._createButtons();
			// this._createCreateCompButtons();
			// this.set('createCompButtons', []);
			// this.set('modeButtons', []);

			// TODO: update to use ServiceCollection and remove the boilerplate.
			// this.registry.on('registered:strut.ComponentButtonProvider',
				// this._compBtnProviderRegistered, this);
			// this.registry.on('registered:strut.EditMode',
				// this._modeRegistered, this);
		},

		// editorModel: function() { return this._editorModel; },

		_createButtons: function() {
			var btnProviders = this.registry.get('strut.MenuProvider');
			var createCompButtons = [];
			btnProviders.forEach(function(provider) {
				var buttons = provider.service().createProvider(this._editorModel);
				createCompButtons = createCompButtons.concat(buttons);
			}, this);

			this.set('createCompButtons', createCompButtons);
		},

		// _createCreateCompButtons: function() {
		// 	this._disposeObjects(this.get('createCompButtons'));
		// 	var providers = this.registry.get('strut.ComponentButtonProvider');

		// 	var createCompButtons = [];
		// 	providers.forEach(function(provider) {
		// 		var buttons = provider.service().createButtons(this._editorModel);
		// 		createCompButtons = createCompButtons.concat(buttons);
		// 	}, this);

		// 	this.set('createCompButtons', createCompButtons);
		// },

		// _modeRegistered: function(newMode) {
		// 	var newButton = newMode.service().createButton(this._editorModel);
		// 	this.get('modeButtons').push(newButton);
		// 	this.trigger('change:modeButtons.push', this.get('modeButtons'), newButton);
		// },

		// _compBtnProviderRegistered: function(entry) {
		// 	var newButtons = entry.service().createButtons(this._editorModel);
		// 	this.set('createCompButtons', this.get('createCompButtons').concat(newButtons));
		// 	this.trigger('change:createCompButtons.concat',
		// 		this.get('createCompButtons'), newButtons);
		// },

		// _disposeObjects: function(objects) {
		// 	if (objects)
		// 		objects.forEach(function(object) {
		// 			object.dispose();
		// 		});
		// },

		constructor: function HeaderModel(registry, editorModel) {
			this.registry = registry;
			this._editorModel = editorModel;
			Backbone.Model.prototype.constructor.call(this);
		}
	});
});