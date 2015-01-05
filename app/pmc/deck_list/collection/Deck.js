define(['backbone',
		'../model/Deck'
], function (Backbone, DeckModel) {
    "use strict";

    return Backbone.Collection.extend({
        model: DeckModel,
        url: "pmc/decks",

        decksCount: function(count){
        	if(count){
        		this.count = count || 0;
        	}else{
        		return this.count;
        	}
        },
        refresh: function(data){
            this.fetch({data: data, reset: true});
        },
    });
});
