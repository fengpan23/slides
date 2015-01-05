define(['lodash',
        'backbone',
		'../model/Folder',
], function (_, Backbone, FolderModel) {
    "use strict";

    return Backbone.Collection.extend({
        model: FolderModel,
        url: "pmc/folders",
        initialize: function () {
        },
        initFolder: function(uid, callback){
            var _this = this;
            this.fetch({
                reset: true, 
                url: '/pmc/userfolders',
                data: {uid: uid},
                success: function(model, data, options){
                        // console.log(data);
                        _this.trigger('change:sysFolder');
                        var all = _.find(data, function(folder){return folder.folderName === 'all'});
                        if(!all){
                            _this.initSysFolder(function(){
                                _this.setActiveFolder('all');
                            });
                        }else{
                            // _this.setActiveFolder('all'); //init active folder
                            if(callback){
                                callback();
                            }
                        }
                    },
                error: function(err){
                        console.log(err);
                    }
            });
        },
        initSysFolder: function(callback){
            this.addFolder('all', callback);
            this.addFolder('trash');
        },
        addFolder: function(folderName, callback){
            var folderMolder = new FolderModel({folderName: folderName});
            var _this = this;
            folderMolder.url = 'pmc/addfolder';
            folderMolder.save(null, {success: function(model){
                _this.add(model, {merge:true});
                if(callback){
                    callback(model);
                }
                _this.setActiveFolder(model);//添加成功后 将新添加的文件夹设置为活动文件夹
            }, error: function(err){
                console.log('add folder err: ' + err);
            }});
        },
        renameFolder: function(oldName, newName){
            var activeModel = this.findWhere({folderName: oldName});
            var _this = this;
            if(!activeModel){
                return;
            }
            activeModel.set('folderName', newName);
            activeModel.url = 'pmc/updatafolder';
            activeModel.save(null, {success: function(data){
                // console.log('updata folder success');
                _this.setActiveFolder(data.get('folderName'));
            }, error: function(err){
                 console.log('updata folder err: ' + err);
            }});
        },
        //如果已经有了此文件 返回false else return true
        judgeFolderName: function(folderName){
            var tempModel = this.findWhere({folderName: folderName});
            if(tempModel){
                return false;
            }else{
                return true;
            };
        },
        getUserFolders: function(){
            var userFolders = _.filter(this.toJSON(), function(folder) {
                return (folder.folderName !== 'trash' && folder.folderName !== 'all')
            });
            return userFolders;
        },
        getSysFolders: function(){
            return _.filter(this.toJSON(), function(folder) {
                    return (folder.folderName === 'trash' || folder.folderName === 'all')
                });
        },
        getTrashModel: function(){
            return _.filter(this.toJSON(), function(folder) {
                    return (folder.folderName === 'trash')
                })[0];
        },
        getFolderModel: function(folderName){
            return _.filter(this.toJSON(), function(folder) {
                    return (folder.folderName === folderName)
                })[0];
        },
        getActiveFolder: function(){
            return this.activeFolder;
        },

        setActiveFolder: function(folder, options){
            if(typeof folder === 'object'){
                this.activeFolder = folder;
            }else{
                this.activeFolder = this.findWhere({folderName: folder});
            };
            if(options && options.silent){
                return;
            }
            this.trigger('change:activeFolder');
        },
        deleteFolder: function(folderModel){
            var nearFolder = this.nearFolder(folderModel);
            this.remove(folderModel);
            this.setActiveFolder(nearFolder);
        },
        nearFolder: function(folder){
            var index = folder.get('index');
            var sortIndexs = this.pluck("index");
            var at = _.indexOf(sortIndexs, index);
            if(at > 0){
                return this.findWhere({index: sortIndexs[at - 1]});
            }else{
                return this.findWhere({folderName: 'all'});
            }
        },

        // creatCollection: function(deckIds){
        // 	var _this = this;
        // 	this.reset();
        // 	deckIds.forEach(function(itemId){
        // 		_this.push(new FolderModel({_id: itemId}));
        // 	});
        // },
    });
});
