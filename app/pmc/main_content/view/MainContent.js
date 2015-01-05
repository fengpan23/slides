define(['jquery',
        'backbone',
        'models/Main',
        'pmc/deck_list/view/DeckList'
], function ($, Backbone, Models, DeckListView) {
    "use strict";
    return Backbone.View.extend({
        
        className: "main_content",

		events: {
			'click .newDeck': 'createDeck',
            'click input[type="button"]': '_search',
            'click .deleteFolder': '_deleteFolder',
            'click .sortDeck': '_sortDeck',
            'click .import': '_import',
            'keydown .searchBar > input[type="text"]': '_inEnter',
		},

        initialize: function () {
            delete this.options;
            this._deckListView = new DeckListView(this.folderCollection, this.collection);

            this.folderCollection.on('change:activeFolder', this._changeClassify, this);
            this._template = JST["main_content/MainContent"];
        },
        render: function () {
            this.$el.html(this._template());
            this.$el.append(this._deckListView.render().el);
            this.$input = this.$el.find('input[type="text"]');
            this.$stateContent = this.$el.find('.stateContent');
            this.$deleteFolder = this.$el.find('.deleteFolder');
            return this;
        },
        _inEnter: function(){
            var theEvent = window.event || e; 
            var code = theEvent.keyCode || theEvent.which; 
            if (code === 13) {
                this._search();
            }
        },
        _deleteFolder: function(){
            var activeFolder = this.folderCollection.getActiveFolder();
            if(activeFolder.get('folderName') === 'trash' || activeFolder.get('folderName') === 'all'){
                alert('系统文件不能删除！');
                return;
            }
            if(this.collection.length > 0){
                //提示是否将文件里的课件删除
                var fid = this.folderCollection.getTrashModel()._id;
                this.collection.forEach(function(deckModel){
                    deckModel.changeFolder(fid);
                });
            }
            var _this = this;
            activeFolder.delModel(function(folderModel){
                _this.folderCollection.deleteFolder(folderModel);
            });
            Backbone.history.navigate('/list/all', {trigger: true});
        },
        _import: function(e){
            if(!this.importModal){
                this.importModal = Models.getImport();
            }
            this.importModal.show();
        },
        _sortDeck: function(e){
            var sortType = $(e.currentTarget).attr('sort-type');
            var des = parseInt($(e.currentTarget).attr('des'));
            // console.log(~des + 1);
            $(e.currentTarget).attr('des', ~des + 1);
            // this.collection.comparator = function(m1, m2){
            //     var type1 = m1.get(sortType);
            //     var type2 = m2.get(sortType);
            //     if(type1 < type2){  
            //         return des;  
            //     } else {  
            //         return (des+1)&1;  
            //     } 
            // }
            // this.collection.comparator = 'filename';
            // this.collection.sort();
            var data = {};
            var sort = {};
            sort[sortType] = des;
            data.sort = sort;
            var activeFolderModel = this.folderCollection.getActiveFolder();
            var activeFolder = activeFolderModel.get('folderName');
            if(activeFolder !== 'all'){
                data.fid = activeFolderModel.get('_id');
            }
            data.uid =  activeFolderModel.get('uid');
            data.tag = this.$input.val();
            data.page = 1;
            this.collection.refresh(data);
        },
        _search: function(){
            var searchTag = this.$input.val();
            // if(searchTag){
                var activeFolderModel = this.folderCollection.getActiveFolder();
                var activeFolder = activeFolderModel.get('folderName');
                Backbone.history.navigate('/search/' + activeFolder + '/' + searchTag, {trigger: true});  
            // }
        },
        _changeClassify: function(){
            var activeFolderModel = this.folderCollection.getActiveFolder();
            var activeFolder = activeFolderModel.get('folderName');
            if(activeFolder === 'all'){
                this.$deleteFolder.addClass('disabled');
                this.$stateContent.html('所有课件');
                return;
            }
            if(activeFolder === 'trash'){
                this.$deleteFolder.addClass('disabled');
                this.$stateContent.html('垃圾篓');
                return;
            }
            this.$deleteFolder.removeClass('disabled');
            this.$stateContent.html(activeFolder);
        },
        createDeck: function(){
            if(!this.addModel){
                this.addModel = Models.getAddDeck(this.folderCollection);
            }
            this.addModel.show();
        },
        constructor: function MainContentView(folderCollection, deckCollection) {
            this.folderCollection = folderCollection;
            this.collection = deckCollection;
            Backbone.View.prototype.constructor.call(this, arguments);
        }
    });
});
