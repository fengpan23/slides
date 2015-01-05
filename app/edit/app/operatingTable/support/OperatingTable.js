define(['libs/backbone'],
	function(Backbone) {
		return Backbone.Model.extend({
			initialize: function() {
				// this._editorModel.on('launch:preview', this._triggerSave, this);
				// this._editorModel.on('change:modeId', this._triggerSave, this);
				// 
				//get the add slide provider  if add slide btn is provider at features create it
				var addSlideProvider = this._editorModel.registry.getBest('strut.AddSlideProvider');
				if(addSlideProvider){
					this.set('topAddProvider', addSlideProvider.createProvider(this._editorModel));
					this.set('bottomAddProvider', addSlideProvider.createProvider(this._editorModel));
				}
			},
			
			/**
			 * [_deck use the edit model deck]
			 * @return {[deck]}
			 */
			_deck: function(){
				return this._editorModel.deck();
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

			/**
			 * [clipboard user edit model clipboard]
			 * @return {storage object}
			 */
			clipboard: function(){
				return this._editorModel.clipboard;
			},

			/**
			 * [computeSlideDimensions is get the screen data]
			 * @param  {[$]} $opTable
			 * @return {[screen data]}
			 */
			computeSlideDimensions: function($opTable) {
				var width = $opTable.width();
				var height = $opTable.height();

				if (height < 300)
					height = 300;

				var slideSize = config.slide.size;

				var xScale = width / slideSize.width;
				var yScale = height / slideSize.height;

				var newHeight = slideSize.height * xScale;
				if (newHeight > height) {
					var scale = yScale;
				} else {
					var scale = xScale;
				}

				var scaledWidth = scale * slideSize.width;
				var scaledHeight = scale * slideSize.height;

				var remainingWidth = width - scaledWidth;
				var remainingHeight = height - scaledHeight;

				return {
					scale: scale,
					scaledWidth: scaledWidth,
					remainingHeight: remainingHeight,
					remainingWidth: remainingWidth
				}
			},

			constructor: function OperatingTable(registry, editorModel) {
				this._editorModel = editorModel;
				Backbone.Model.prototype.constructor.call(this);
			}
		});
	});