define(['libs/backbone'],
	function(Backbone) {
		return Backbone.Model.extend({
			initialize: function() {
				this._createUnit();
				delete this.options;
			},

			_createUnit: function() {
				var unitProviders = this.registry.get('strut.UnitProvider');

				var createUnitButtons = [];
				unitProviders.forEach(function(provider) {
					var units = provider.service().getProvider();
					createUnitButtons = createUnitButtons.concat(units);
				}, this);

				this.set('createUnitButtons', createUnitButtons);
			},

			addComponent: function(type){
				var data = {
					type: type
				}
				this._editorModel.addComponent(data);
			},
			
			constructor: function ToolkitModel(registry, editorModel) {
				this.registry = registry;
				this._editorModel = editorModel;
				Backbone.Model.prototype.constructor.call(this);
			}
		});
	});