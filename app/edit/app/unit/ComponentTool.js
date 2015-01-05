define(['libs/backbone',
	'communal/widgets/DeltaDragControl',
	'communal/undo_support/CmdListFactory',
	'communal/widgets/ToolbarPanel'],
	function(Backbone, DeltaDragControl, CmdListFactory, ToolbarPanel) {
		var undoHistory = CmdListFactory.managedInstance('editor');

		/**
		 * @class ComponentView
		 * @augments Backbone.View
		 */
		return Backbone.View.extend({
			/**
			 * Returns list of events, tracked by this view.
			 *
			 * @returns {Object}
			 */
			events: function() {
				return {
					'click .border-switch': '_switchBorderBar',
					'click .border-style-select-trigger': '_triggerBorderStyle',
					'click .stepper-munber': '_focusInput',
					'click .depth-down, .depth-up': '_changeDepth',
					'click .action-expand, .action-contract': '_renderRange',

					'deltadragStart .stepper-munber': '_borderStepperStart',
					'deltadrag .stepper-munber': '_borderStepper',
					'deltadragStop .stepper-munber': '_borderStepperStop',
				};
			},

			/**
			 * Initialize component view.
			 */
			initialize: function() {
				this._toolbarPanel = ToolbarPanel.get();
				this._deltaDrags = [];

				this._resize = this._resize.bind(this);
				$(window).resize(this._resize);
			},

			/**
			 * Render element based on component model.
			 *
			 * @returns {*}
			 */
			render: function() {
				this.$el.find('.edit-tool-list').append(this._getTemplate()(this.model));

				var _this = this;
				this.$el.find('.stepper-munber').each(function(idx, elem) {
					var deltaDrag;
					deltaDrag = new DeltaDragControl($(elem), false);
					return _this._deltaDrags.push(deltaDrag);
				});

				this._initSpectrum();
				this._initOpacity();

				return this.$el;
			},

			_getTemplate: function(){
				return JST['unit/ComponentTool'];
			},

			/**
			 * expand component or contract component
			 * @param  {[type]} e [description]
			 * @return {[type]}   [description]
			 */
			_renderRange: function(e){
				if($(e.currentTarget).hasClass('action-expand')){
					this.model.set(config.slide.size);
					this.model.set({x: 0, y: 0});
				}else{
					this.model.set({width: config.slide.size.width/2, height: config.slide.size.height/2});
					this.model.set({x: config.slide.size.width/4, y: config.slide.size.height/4});
				}
			},

			/**
			 * get component z-index max and min range
			 */
			getZRange: function(){
				var components = this.model.slide.get('components');
				var zIndex = [];
				components.forEach(function(component){
					var z =  component.get('zIndex');
						zIndex.push(z || 0);
				});
				return {min: _.min(zIndex), max: _.max(zIndex)};
			},

			/**
			 * change depth
			 */
			_changeDepth: function(e){
				var range = this.getZRange();
				if($(e.currentTarget).hasClass('depth-down')){
					this.model.set('zIndex', range.min - 1);
				}else{
					this.model.set('zIndex', range.max + 1);
				}
			},

			/**
			 * make sure the input box focus. and stepper-number drag can use
			 * @type {e}
			 */
			_focusInput: function(e){
				$(e.currentTarget).focus();
			},

			/**
			 * init opacity
			 * change the model value when change pulg-in  value
			 */
			_initOpacity: function() {
				var initOpacity = this.model.get('opacity') || 1;
				var _this = this;
				this.$el.find('.tool-slider').slider({
					range: "min",
					value: 100 - initOpacity * 100,
					min: 0,
					max: 100,
					slide: function(event, ui) {
						$(this).siblings('.tool-content').find('.opacity-value').html(ui.value + '%');
						_this.model.set('opacity', 1 - ui.value/100);
					},
					change: function(event, ui) {
						$(this).siblings('.tool-content').find('.opacity-value').html(ui.value + '%');
						_this.model.set('opacity', 1 - ui.value/100);
					}
				});
				this.$el.find('.opacity-value').html(100 - initOpacity * 100 + '%');
			},

			/**
			 * init color pick
			 * change the model value when change pulg-in  value
			 */
			_initSpectrum: function(){
				var _this = this;
				this._spectrum = this.$el.find('.color-pick-trigger').spectrum({
				    allowEmpty:true,
				    showInput: true,
				    containerClassName: "full-spectrum",
				    showInitial: true,
				    showPalette: true,
				    showSelectionPalette: true,
				    showAlpha: true,
				    maxPaletteSize: 10,
				    preferredFormat: "hex",
				    localStorageKey: "spectrum.strut",
				    move: function (color) {
				    	var rgbColor = color.toRgbString();
				    	var nature = $(this).attr('data-nature');
				    	this.style.background = rgbColor;
				    	_this.model.setChain(nature, rgbColor);
				    },
				    show: function () {
				    	$('.sp-container').css({'left': '', 'right': 182});
				    },
				    palette: [
				        ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", "rgb(153, 153, 153)","rgb(183, 183, 183)",
				        "rgb(204, 204, 204)", "rgb(217, 217, 217)", "rgb(239, 239, 239)", "rgb(243, 243, 243)", "rgb(255, 255, 255)"],
				        ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
				        "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
				        ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
				        "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
				        "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
				        "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
				        "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
				        "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
				        "rgb(133, 32, 12)", "rgb(153, 0, 0)", "rgb(180, 95, 6)", "rgb(191, 144, 0)", "rgb(56, 118, 29)",
				        "rgb(19, 79, 92)", "rgb(17, 85, 204)", "rgb(11, 83, 148)", "rgb(53, 28, 117)", "rgb(116, 27, 71)",
				        "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
				        "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
				    ]
				});
			},

			/**
			 * use _toolbarPanel to provide select
			 * change model value when select option
			 */
			_triggerBorderStyle: function(e){
				var _this, data = {content: ['dotted', 'dashed', 'solid', 'double'], e: e};
				_this = this;
				border = this.model.get('border') || {};
				this._toolbarPanel.show(data, function(value){
					$(e.currentTarget).html(value);
					border.style = value;
					_this.model.set('border', border);
					_this.model.trigger('change:border');
				});
			},

			/**
			 * drag event
			 * border Stepper Start
			 */
			_borderStepperStart: function(e){
				var dataNature = $(e.currentTarget).attr('data-nature');
				this._initNatureValue = this.model.getChain(dataNature) || 0;
			},

			_borderStepper: function(e, deltas){
				var dataNature = $(e.currentTarget).attr('data-nature');
				var currentValue = this._initNatureValue + deltas.dx/10|0
				this.model.setChain(dataNature, currentValue);
				$(e.currentTarget).val(currentValue + 'px');
				this.model.trigger('change:border', this.model);
			},

			__borderStepperStop: function(e){
				// var cmd = new ComponentCommands.border(this._initBorder, this.model);
				// undoHistory.push(cmd);
			},

			/**
			 * [_switchBorderBar description]
			 * @param  {[type]} e [description]
			 */
			_switchBorderBar: function(e){
				this.$el.find('.border-property').toggle(400);
				$(e.currentTarget).toggleClass("rotate-open");
			},

			dispose: function(){
				$(window).off('resize', this._resize);
				this._deltaDrags.forEach(function(deltaDrag){
					deltaDrag.dispose();
				});
				this._spectrum.each(function(i, elem){
					$(elem).spectrum('destroy');
				});
				this.model.off(null, null, this);
			},

			_resize: function(){
				this._spectrum.each(function(i, elem){
					$(elem).spectrum('hide');
				});
			},

			constructor: function ComponentView() {
				Backbone.View.prototype.constructor.apply(this, arguments);
			}
		});
	});
