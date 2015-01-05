define(['jquery',
        'backbone',
], function ($, Backbone) {
    "use strict";

    return Backbone.View.extend({
        className: "left_body",

        events: {
            'click li > div': '_menuSwitch',
            'click .classify-ico': '_cloudsync',
            'click .addClassify': '_addFolder',
            'click .classify': '_activeFolder',
            'click .getTag': '_renderTag',
            'click .tagContainer > span': '_searchByTag',

            'click input[type="checkbox"]': '_showBtn',
            'click button': '_deleteTag',
            'blur input': '_doChangeFolder',
            'dblclick .userFolder > li': '_renameFolder',
            'keydown input': '_isEnter',
            'keyup input': '_checkInput',
        },
        initialize: function () {
            delete this.options;
            this._template = JST["menu_list/Menu"];
            this.folderCollection.on('add', this.renderFolder, this);
            this.folderCollection.on('reset', this.renderFolder, this);
            this.folderCollection.on('remove', this.renderFolder, this);
            this.folderCollection.on('change:folderName', this.renderFolder, this);

            this.folderCollection.on('change:numberFiles', this.renderFolderNumber, this);

            this.folderCollection.on('change:activeFolder', this._changeActiveFolder, this);
            this.folderCollection.on('change:sysFolder', this._sysFolder, this);

        },
        render: function () {
            this.$el.html(this._template());
            this.$input = this.$el.find('input');
            this.$addClassifyBar = this.$el.find('.addClassifyBar');
            this.$userFolder = this.$el.find('.userFolder');
            this.$tagBar = this.$el.find('.pmc_tag');
            this.$error = this.$el.find('.error');
            return this;
        },
        renderFolderNumber: function(model, value){
            var activeId = model.get('_id');
            this.$el.find('#' + activeId + ' .deck-number').html(value);
            // console.log(model);
            // console.log(value);
        },
        renderFolder: function(){
            var folders = this.folderCollection.getUserFolders();
            this.$userFolder.html(JST["menu_list/MenuLi"](folders));
        },
        _sysFolder: function(){
            var sysFolders = this.folderCollection.getSysFolders();
            var _this = this;
            sysFolders.forEach(function(item){
                if(item.folderName === 'all'){
                    _this.$el.find('.alldeck').attr('id', item._id);
                }else if(item.folderName === 'trash'){
                    _this.$el.find('.trashdeck').attr('id', item._id);
                }
            });
        },
        _renderTag: function(){
            var folder = this.folderCollection.getActiveFolder();
            var uid = folder.get('uid');
            var data = {uid: uid};
            if(folder.get('folderName') !== 'all'){
                data.fid = folder.get('_id');
            }else{
                data.trushId = this.folderCollection.getTrashModel()._id;
            }
            var _this = this;
            $.ajax({
                url: '/pmc/userTags',
                type: 'GET',
                dataType: 'json',
                data: data,
            }).done(function(data) {
                var tags = _.without(_.uniq(data), '', 'undefined');
                _this.$tagBar.find('.tagContainer').empty();
                tags.forEach(function(tag){
                    _this.$tagBar.find('.tagContainer').append('<span>' + tag + '<input type="checkbox"/></span>');
                });
            }).fail(function() {
                console.log("error");
            }).always(function() {
                console.log("complete");
            });
        },
        _showBtn: function(e){
            var checked = e.currentTarget.checked;
            if(checked){
                this.$tagBar.find('button').show();
            }else{
                this.$tagBar.find('button').hide();
            }
        },
        _checkInput: function(){
            var value = this.$input.val().replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '');
            if(value !== this.$input.val()){
                this.$error.html('特殊字符不可用');
                this.$error.show(500);
                this.$error.delay(2000).hide(500);
            }
            this.$input.val(value);
             // onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[/d]/g,''))"
        },
        _deleteTag: function(e){
            if(!this.$tagBar.find('.active > input')[0].checked){
                return;
            };
            var $activeTag = this.$tagBar.find('.active').clone();
            $activeTag.find('*').remove();
            var tag = $activeTag.html();

            var activeFolder = this.folderCollection.getActiveFolder();
            var acitveId = activeFolder.get('_id');
            var _this = this;
            var data = {tag: tag};
            if(activeFolder.get('folderName') === 'all'){
                data.trushId = this.folderCollection.getTrashModel()._id;
                data.uid = activeFolder.get('uid');
            }else{
                data.fid = acitveId;
            }
            $.ajax({
                url: '/pmc/deleteTags',
                type: 'GET',
                dataType: 'json',
                data: data,
            }).done(function(data) {
                // console.log(data);
                alert('删除成功~！！！');
                _this.$tagBar.find('.active').remove();
                $(e.currentTarget).hide(200);
                Backbone.history.navigate('/tag/' + activeFolder.get('folderName') + '/', {trigger: true});
            }).fail(function() {
                console.log("error");
            }).always(function() {
                console.log("complete");
            });
        },
        _searchByTag: function(e){
            this.$tagBar.find('.active').removeClass();
            var $currentTarget = $(e.currentTarget).addClass('active').clone();
            $currentTarget.find('*').remove();
            var tag = $currentTarget.html();
            var folder = this.folderCollection.getActiveFolder();
            Backbone.history.navigate('/tag/' + folder.get('folderName') + '/' + tag, {trigger: true});
        },
        _cloudsync: function(){
            this.userModel.fetch({success: function(data){console.log(data)}, error: function(err){console.log(err)}});
        },
        // //菜单分类显示课件 采用router方式， router里面捕获
        _activeFolder: function(e){
            var deckType = $(e.currentTarget).attr('data-type');
            // if(deckType == this.deckType){
            //     return;
            // }
            this.deckType = deckType;
            this.folderCollection.setActiveFolder(this.deckType);
        },

        _changeActiveFolder: function(){
            var activeFolder = this.folderCollection.getActiveFolder();
            var acitveId = activeFolder.get('_id');
            var activeFolderName = activeFolder.get('folderName');
            this.$el.find('.active').removeClass('active');
            this.$el.find('#'+acitveId).addClass('active');
            Backbone.history.navigate('/list/' + activeFolderName, {trigger: true});
            this._renderTag();
        },
        _renameFolder: function(e){
            this.renameClassify = true;
            var folderName = $(e.currentTarget).attr('data-type');
            //系统文件不可重命名
            if(folderName === "恢复的课件"){
                this.$error.html('系统文件！');
                this.$error.show(500);
                this.$error.delay(2000).hide(500);
                return;
            }
            this.folderName = folderName;
            this.$input.val(folderName);
            this.$addClassifyBar.css($(e.currentTarget).position()).show(500);
            this.$input.focus();
        },
        _addFolder: function(e){
            e.preventDefault();
            e.stopPropagation();
            this.addFolder = true;
            this.$input.val('');
            this.$addClassifyBar.removeAttr('style').fadeIn(500);
            this.$input.focus();
        },
        _isEnter: function(){
            var theEvent = window.event || e; 
            var code = theEvent.keyCode || theEvent.which; 
            if (code === 13) {
                this.$input.blur();
            }
        },
        _doChangeFolder: function(){
            this.$error.hide(1000);
            var newFolder = this.$input.val().replace(/(^\s*)|(\s*$)/g,"");
            if(newFolder === this.folderName){
                this.$addClassifyBar.hide(500);
                return;
            }
            if(!this.folderCollection.judgeFolderName(newFolder)){
                this.$error.html('已有此文件名');
                this.$error.show();
                this.$input.focus();
                return;
            }
            if(newFolder && this.addFolder){
                this.addFolder = false;
                this.folderCollection.addFolder(newFolder);
            }else if(newFolder && this.renameClassify){
                this.renameClassify = false;
                Backbone.history.navigate('/list/' + newFolder, {trigger: false});
                this.folderCollection.renameFolder(this.folderName, newFolder);
            }
            this.$addClassifyBar.hide(500);
        },
        _menuSwitch: function(e){
            var $controlTarget = $(e.currentTarget).parent();
            if($controlTarget.hasClass('open')){
                $controlTarget.removeClass('open');
            }else{
                $controlTarget.addClass('open');
            }
        },
        constructor: function MenuView(folderCollection) {
            this.folderCollection = folderCollection;
            Backbone.View.prototype.constructor.call(this, arguments);
        }
    });
});
