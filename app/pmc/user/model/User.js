define([
    "lodash",
    "backbone",
], function (_, Backbone) {
    "use strict";
    return Backbone.Model.extend({
        defaults: {
            userId      : '',
            userName    : '',
        },
        urlRoot: '/userInfo', // RESTful server API
        idAttribute: "userId",

        initialize: function() {
        },
        initUser: function(callback){
            this.fetch({success: function(model, data, options){
                callback(data);
                console.log('fetch user info success .');
            }, error: function(err){
                console.log('fetch user info error: ');
                console.log(err);
            }});
        }
    });
});
