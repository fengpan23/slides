define(['jquery',
        'backbone'
], function ($, Backbone) {
    "use strict";

    return Backbone.View.extend({
        className: "callboard modal hide",

        events: {
            'hidden': 'hidden',
        },

        initialize: function(){
            this._template = JST["models/callboard/Callboard"];
        },

        render: function(){
            this.$el.html(this._template());
            return this;
        },
        show: function(deck){
            this._setDeckText(deck);
            if(!deck.get('slides')){
                //show message
                this.maxIndex = 1;
            }else{
                this.maxIndex = deck.get('slides').length;
            }
            this.$iframe.attr('src', previewSrc + 'overview');
            this.$filename.html(deck.get('filename'));
            this.$el.modal('show');

            var _this = this;
            setTimeout(function(){
                _this._pageIndexShow();
            }, 1000);
        },
        hidden: function(){
        },
    });
});
