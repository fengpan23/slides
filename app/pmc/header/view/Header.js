define(['jquery',
        'backbone'
    ], function ($, Backbone) {
    "use strict";
    return Backbone.View.extend({
        
        className: "header_container",

		events: {
			"click .createBtn": "createDeck"
		},

        initialize: function () {
            this._template = JST['header/Header'];
            this.userModel.on('change:userName', this.userInfo, this);
        },

        render: function () {
            this.$el.html(this._template());
            this.$userDisplay = this.$el.find('.user');
            return this;
        },
        userInfo: function(model, value){
            this.$userDisplay.html(value)
        },
        constructor: function DeckListView(userModel) {
            this.userModel = userModel;
            Backbone.View.prototype.constructor.apply(this, arguments);
        }
    });
});
