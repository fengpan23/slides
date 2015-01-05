define(['jquery',
        'backbone',
        'pmc/deck_list/collection/Deck',
        'pmc/menu_list/collection/Folders',
        'pmc/header/view/Header',
        'pmc/menu_list/view/Menu',
        'pmc/main_content/view/MainContent',
        'pmc/user/model/User',
        'pmc/deck_list/model/Deck',
], function($, Backbone, DeckCollection, FolderCollection, HeaderView, MenuListView, MainContentView, User, Deck) {
    'use strict';

    var Router = Backbone.Router.extend({
        routes: {
            // Define some URL routes
			'': 'defaultView',
            'list/:type(/:page)': '_listChange',
            'search/:folder/(:tag)': '_searchDeck',
            'tag/:folder/(:tag)': '_searchByTag',
        },

        initialize: function(){
            this.userModel = new User();
            this.deckCollection = new DeckCollection();
            this.folderCollection = new FolderCollection();

            this._headerView = new HeaderView(this.userModel);
            this._menuListView = new MenuListView(this.folderCollection);
            this._mainContentView = new MainContentView(this.folderCollection, this.deckCollection);
        },

        defaultView: function(callback){
            this.view = true;
            $('body').append(this._headerView.render().el);
            var $body_container = $('<div class="body_container">');
            $body_container.append(this._menuListView.render().el);
            $body_container.append(this._mainContentView.render().el);
            $('body').append($body_container);
            $('body').append('<div class="footer_container"><span class="company">领新教育@版权所有</div>');

            if(!callback){
                var _this = this;
                callback = function(){
                    _this.folderCollection.setActiveFolder('all');
                }
            }
            this.initDate(callback);
        },

        initDate: function(callback){
            var _this = this;
            this.userModel.initUser(function(user){
                var uid = user._id;
                _this.folderCollection.initFolder(uid, callback);
            });
        },

        _listChange: function(type, page){
            console.log(type);
            // console.log(page);
            var _this = this;            
            function renderList(){
                 _this.folderCollection.setActiveFolder(type);
                var acitveFolder = _this.folderCollection.getActiveFolder();
                if(!acitveFolder)return;
                var data = {};
                var queryURL = 'pmc/folder/decks';
                data.uid = acitveFolder.get('uid');
                data.fid = acitveFolder.get('_id');
                if(type === 'all'){
                    queryURL = 'pmc/userdecks';
                    data.trushId = _this.folderCollection.getTrashModel()._id;
                }
                if(acitveFolder){
                    _this.deckCollection.fetch({
                        reset: true,
                        url: queryURL,
                        data: data,
                        success: function (result){
                            console.log(result);
                            acitveFolder.set('numberFiles', result.length);
                            // console.log(collection);
                        },
                        error: function(err){
                            console.log('deck fetch fail');
                        }
                    });
                }
            }
            if(!this.view){
                this.defaultView(renderList);
            }else{
                renderList();
            }
        },

        _searchDeck: function(folder, tag){
            var _this = this;
            if(!this.view){
                this.defaultView(function(){
                     _this.folderCollection.setActiveFolder(folder);
                });
            }else{
                var acitveFolder = _this.folderCollection.getActiveFolder();
                var data = {};
                data.uid = _this.userModel.get('userId');
                data.fid = acitveFolder.get('_id');
                data.tag = tag;
                console.log(tag);
                if(acitveFolder.get('folderName') === 'all'){
                    data.fid = null;
                    data.trashId = _this.folderCollection.getTrashModel()._id;
                }
                _this.deckCollection.fetch({
                    reset: true,
                    url: 'pmc/search',
                    data: data,
                    success: function (result){
                        console.log(result);
                        acitveFolder.set('numberFiles', result.length);
                    },
                    error: function(err){
                        console.log(err);
                    },
                });
            }
        },

        _searchByTag: function(folder, tag){
            var _this = this;
            if(!this.view){
                this.defaultView(function(){
                    _this.folderCollection.setActiveFolder(folder);
                });
            }else{
                var acitveFolder = _this.folderCollection.getActiveFolder();
                var data = {};
                data.uid = _this.userModel.get('userId');
                data.fid = acitveFolder.get('_id');
                data.tag = tag;
                console.log(tag);
                if(acitveFolder.get('folderName') === 'all'){
                    data.fid = null;
                    data.trashId = _this.folderCollection.getTrashModel()._id;
                }
                _this.deckCollection.fetch({
                    reset: true,
                    url: 'pmc/searchByTag',
                    data: data,
                    success: function (data){
                        console.log(data);
                    },
                    error: function(err){
                        console.log(err);
                    },
                });
            }
        },
/*  
        _showView: function(selector, view) {
            if (this.currentView instanceof Backbone.View) {
                this.currentView.dispose();
            }

            this.currentView = view;

            if (this.currentView.view) {
                $(selector).html(this.currentView.view.$el);
            } else {
                $(selector).html(this.currentView.$el);
            }
        },
 *//* 
        list: function(page) {
            var p = page ? parseInt(page, 10) : 1;
            var self = this;
            storageInterface.list(function(decks) {
                self._showView('#content', new DeckListView({
                    collection: decks,
                    page: p
                }));
            });
            this.headerView.selectMenuItem('get-menu');
        },
 */
		lastDeck: function(){
            console.log('list');
			// var storageInterface = this.registry.getBest('strut.StorageInterface');
			// storageInterface.selectProvider('largelocalstorage');
			// var StartupService = this.registry.getBest('strut.StartupTask');
			// StartupService.run();
		},
		
		
        editDeck: function(id) {
			//TODO  change the selectPtovider
			var storageInterface = this.registry.getBest('strut.StorageInterface');
			storageInterface.selectProvider('remotestorage');
			// storageInterface.selectProvider('localstorage');
			console.log(storageInterface.currentProvider());
			var self = this;
            storageInterface.load(id, function(deck, err) {
                if (!err) {
                    var StartupService = self.registry.getBest('strut.StartupTask');
					console.log(deck);
                    StartupService.run(deck);
                } else {
                    console.log(err.stack);
                }
            });
//			storageInterface.selectProvider('largelocalstorage');
        }

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
    });

    return Router;
});
