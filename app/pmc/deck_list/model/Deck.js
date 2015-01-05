define(["backbone",
], function (Backbone) {
    "use strict";

    return Backbone.Model.extend({
        defaults: {
            _id: null,
            fid: null,
            uid: null,
            filename: "",
            background: "",
            picture: null,
            type: 'Default',
            outward: false,
        },

        urlRoot: "/decks",

        idAttribute: "id",

        initialize: function () {
            // this.fetch();
        },
        changeFolder: function(fid){
            this.url = '/pmc/updateDeck'
            this.save({fid: fid});
        },
        changePublic: function(flag, callback){
            this.url = '/pmc/shareHandle'
            this.save({outward: flag, uid: this.get('uid')}, {silent: true, success: function(model, data){
                console.log(data);
                if(callback){
                    if(data.status === 0){
                        callback(false);
                    }else{
                        callback(true);
                    }
                }
            }});
        },
        changeTag: function(tag, callback){
            this.url = '/pmc/updateDeck'
            this.save({tag: tag}, {silent: true, success: function(data){
                console.log(data);
                console.log('updata deck success');
                if(callback){
                    callback(); 
                }
            }, error: function(err){
                console.log(err);
            }});
        },
        delModel: function(){
            this.set('id', 123); //backbone在进行destroy时对 model进行isNew判断，isNew对model是否存在id判断
            this.url = '/decks/' + this.get('_id');
            this.destroy({success: function(data, response){
                // console.log(data);
            }, error: function(err){
                console.log('delete deck error');
                console.log(err);
            }});
        }
    });
});