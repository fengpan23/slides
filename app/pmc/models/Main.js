define(['jquery',
        'models/preview/view/Preview',
        'models/add_deck/view/AddDeck',
        'models/callboard/view/Callboard',
        'models/import/view/Import',
], function ($, Preview, AddDeck, Callboard, Import) {
    "use strict";

    // init all model  in this function
    var models = {
    	getPreviewModel: function(){
        	var preview = new Preview();
			$('#models').append(preview.render().el);
			return preview;
    	},
        getAddDeck: function(folderCollection){
            var addDeck = new AddDeck(folderCollection);
            $('#models').append(addDeck.render().el);
            return addDeck;
        },
        getCallboard: function(){
            var callboard = new Callboard();
            $('#models').append(callboard.render().el);
            return callboard;
        },
        getImport: function(){
            var importView = new Import();
            $('#models').append(importView.render().el);
            return importView;
        },
    }
    return models;
});
