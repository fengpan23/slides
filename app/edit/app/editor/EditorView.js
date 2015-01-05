define(['libs/backbone',
		'lang',
		'app/header/view/Header',
		'app/toolkit/view/Toolkit',
		'app/operatingTable/view/OperatingTable',
		'app/slideWell/view/SlideWell',
		],
function(Backbone, lang, Header, Toolkit, OperatingTable, SlideWell) {
	return Backbone.View.extend({
		className: 'container',
		initialize: function() {
			this._header = new Header({model: this.model.get('header')});
			this._toolkit = new Toolkit({model: this.model.get('toolkit')});
			this._operatingTable = new OperatingTable({support: this.model.get('operatingTable'), toolkit: this._toolkit});
			this._slideWell = new SlideWell({model: this.model.get('slideWell')});
		},

		render: function() {
			this.$el.append(this._header.render());
			this.$el.append(this._toolkit.render());
			this.$el.append(this._operatingTable.render());
			this.$el.append(this._slideWell.render());
			return this.$el;
		}
	});
});
