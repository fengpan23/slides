define(['app/unit/ComponentModel'],
	function(Component) {
		'use strict';

		function getInitialText(attrs) {
			if (!attrs)
				return '<p><span style="font-size:48px">Text</span></p>';
			else {
				var text = '<p><font style=';
				if(attrs.size){
					text += '"font-size:' + attrs.size + 'px;"';
				}
//				for (var style in attrs) {
//					if (style == 'size'){
//						text += ' style="font-size:'+ 72 + 'px;"';
//						continue;
//					}else{
//						text += " ";
//					}
//					text += style + '="' + attrs[style] + '"';
//				}
				return text + '>双击添加文本</font></p>';
			}
		}

		/**
		 * @class TextBox
		 * @augments Component
		 */
		return Component.extend({
			initialize: function() {
				Component.prototype.initialize.apply(this, arguments);
				this.set('type', 'TextBox');
				if (!this.get('text')) {
					var text = getInitialText(this._opts && this._opts.fontStyles);
					if (this._opts && this._opts.fontStyles && this._opts.fontStyles.size)
						this.set('size', this._opts.fontStyles.size);
					delete this._opts;
					this.set('text', text);
					this.set('width', 730);
					// this.set('new', true);
				}
			},

			constructor: function TextBox(attrs, opts) {
				this._opts = opts;
				Component.prototype.constructor.call(this, attrs);
			}
		});
	});