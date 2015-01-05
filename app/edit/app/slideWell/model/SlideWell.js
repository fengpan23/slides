define(["common/Calcium"],
	function(Backbone) {

		/**
		 * @class SlideCollection
		 * @augments Backbone.Collection
		 */
		return Backbone.Model.extend({
			/**
			 * Initialize collection model.
			 */
			initialize: function() {
				this._deck = this._editorModel.deck();

				//get the add slide provider  if add slide btn is provider at features create it
				this._addSlideProvider = this._registry.getBest('strut.AddSlideProvider');
				if(this._addSlideProvider){
					this.set('addProvider', this._addSlideProvider.createProvider(this._editorModel));
				}

				// this.on("add", this._updateIndexes, this);
				// this.on("remove", this._updateIndexes, this);
			},

			/**
			 * Update slide indexes on any changes to the contents of collection.
			 *
			 * @private
			 */
			_updateIndexes: function() {
				this.models.forEach(function(model, idx) {
					return model.set("index", idx);
				});
			},

			/**
			 * [focusScope set and get the scope]
			 * @param  {[string]} scope
			 * @return {[string]}
			 */
			focusScope: function(scope){
				if(scope){
					this._editorModel.set('scope', scope);
				}
				return this._editorModel.get('scope');
			},

			clipboard: function(){
				return this._editorModel.clipboard;
			},

			constructor: function SlideWell(registry, editorModel) {
				this._editorModel = editorModel;
				this._registry = registry;
				Backbone.Model.prototype.constructor.call(this);
			}
		});
	});