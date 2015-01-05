define(['libs/backbone'], function(Backbone) {
    "use strict";

    function RemoteStorage() {
        this.name = "Remote Storage";
        this.id = "remotestorage";
    }

    RemoteStorage.prototype = {
        renderModel: function(data) {
            var deck = Backbone.Model.extend({
                urlRoot: '/decks'
            });
            return new deck(data);
        },

        getContents: function(deckId, cb) {
            var deck = new Backbone.Model;
            try {
                deck.fetch({
                    url: '/decks',
                    data: {id: deckId},
                    success: function(data) {
                        console.log('get deck success: ' + data.get('_id'));
                        cb(data.attributes);
                    },
                    error: function(err) {
                        cb(err.statusText);
                    }
                });
            } catch (e) {
                cb(e);
            }
        },

        setContents: function(data, cb) {
            // var deck = this.renderModel(data);
            var deck = new Backbone.Model(data);
            deck.id = data._id;
            deck.save(null, {
                url: '/decks',
                success: function(data) {
                    console.log('save deck success: ' + data.get('_id'));
                    cb(data);
                },
                error: function(data, err) {
                    cb(err.statusText);
                }
            });
        },

        rm: function(deckId, cb) {
            var deck = this.renderModel({
                '_id': deckId
            });
            deck.destroy({
                success: function(data) {
                    console.log('remove deck success: ' + data.get('_id'));
                    cb(data);
                },
                error: function(data, err){
                    cb(err.statusText);
                }
            });
        }
    };

    return RemoteStorage;
});