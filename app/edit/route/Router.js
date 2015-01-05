define([
    'jquery',
    'libs/backbone'
], function($, Backbone) {
    'use strict';

    return Backbone.Router.extend({
        routes: {
            // Define some URL routes
            '': 'lastDeck',
            'deck/:id': 'editDeck',

            // Default - catch all
            '*actions': 'defaultAction'
        },
        lastDeck: function() {
            var StartupService = this.registry.getBest('strut.StartupTask');
            StartupService.run();
        },

        editDeck: function(id) {
            //TODO  change the selectPtovider
            var storageInterface = this.registry.getBest('strut.StorageInterface');
            // storageInterface.selectProvider('remotestorage');
            // storageInterface.selectProvider('localstorage');
            // console.log(storageInterface.currentProvider());
            var self = this;
            storageInterface.load(id, function(deck, err) {
                if (!err) {
                    var StartupService = self.registry.getBest('strut.StartupTask');
                    StartupService.run(deck);
                } else {
                    console.log(err.stack);
                }
            });
            //			storageInterface.selectProvider('largelocalstorage');
        },

        /* 
        home: function() {
            this._showView('#content', new HomeView());
            this.headerView.selectMenuItem('home-menu');
        },

        about: function() {
            this._showView('#content', new AboutView());
            this.headerView.selectMenuItem('about-menu');
        },

        signup: function() {
            this.user = new UserModel();
            this._showView('#content', new SignupView({
                model: this.user
            }));
            this.headerView.selectMenuItem('signup-menu');
        },
 */
        // defaultAction: function() {
        // this._showView('#content', new NotFoundView());
        // }
        constructor: function Router(registry) {
            this.registry = registry;
            Backbone.Router.prototype.constructor.call(this);
        }
    });
});