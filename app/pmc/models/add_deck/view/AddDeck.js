define(['jquery',
        'backbone'
], function ($, Backbone) {
    "use strict";

    return Backbone.View.extend({
        className: "addDeck modal hide",

        events: {
            'hidden': 'hidden',
            'click input[type="button"]': '_submit',
            'keyup .tagBar > input': '_checkTag',
        },
        initialize: function(){
            delete this.options;
            this._template = JST["models/add_deck/AddDeck"];
        },
        render: function(){
            this.$el.html(this._template());
            this.$form = this.$el.find('form');
            this.$userClassify = this.$el.find('.userClassify');
            return this;
        },
        show: function(){
            var activeFolder = this.folderCollection.getActiveFolder();
            this.$userClassify.html(activeFolder.get('folderName'));
            
            this.$el.find('input[name="uname"]').val($('.header_container .user').html());
            this.$el.find('input[name="uid"]').val(activeFolder.get('uid'));
            this.$el.find('input[name="fid"]').val(activeFolder.get('_id'));
            this.$el.modal('show');
        },
        _submit: function(){
            if($.trim(this.$form.find('input[name="filename"]').val())){
                var _this = this;
                this._checkSubmit(function(data){
                    if(data.status){
                        _this.$el.modal('hide');
                        _this.$form.submit();
                    }else{
                        alert('你要创建多上个课件？');
                    }
                });
            }else{
                alert('文件名不能为空');
            }
            return false;
        },
        _checkSubmit: function(callback){
            var uid = this.folderCollection.getActiveFolder().get('uid');
            $.ajax({
                url: '/pmc/checkHandle',
                type: 'GET',
                async: false,
                dataType: 'json',
                data: {uid: uid},
            }).done(function(data) {
                console.log(data);
                callback(data);
            }).fail(function() {
                console.log("error");
            }).always(function() {
                console.log("complete");
            });
            
        },
        _checkTag: function(e){
            var tagString = $.trim($(e.currentTarget).val()).replace(/\s+/g, ' ');
            var tags = tagString.split(/[,\n\s，]+/);
            if(tags.length > 5){   
                $(e.currentTarget).siblings('.message').html('最多添加五个。').show(200).delay(3000).hide(200);
                $(e.currentTarget).val(tags.slice(0, 5).toString());
            }
        },
        hidden: function(){

        },
        constructor: function addDeckView(folderCollection) {
            this.folderCollection = folderCollection;
            Backbone.View.prototype.constructor.call(this, arguments);
        }
    });
});
