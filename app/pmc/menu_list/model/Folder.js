define([
    "lodash",
    "backbone",
], function (_, Backbone) {
    "use strict";
    return Backbone.Model.extend({
        defaults: {
            folderName  : String,
            index       : Number,
            numberFiles : Number,
            uid         : null,
        },
        urlRoot: 'pmc/folder', // RESTful server API
        idAttribute: "folderId",

        initialize: function() {
        },
        delModel: function(callback){
            this.id = 123; //backbone在进行destroy时对 model进行isNew判断，isNew对model是否存在id判断
            this.url = '/pmc/folder/' + this.get('_id');
            this.destroy({success: function(data, response){
                if(callback){
                    delete data.id;
                    callback(data);
                }
            }, error: function(err){
                console.log('delete deck error');
                console.log(err);
            }});
        },
    });
});
