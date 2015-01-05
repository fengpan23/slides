define(['jquery',
        'backbone',
        'models/Main',
], function ($, Backbone, Models, DeckModel) {
    "use strict";

    return Backbone.View.extend({
        
        className: 'deck_list',

		events: {
            'click .delete': '_delete',
            'click .edit': '_edit',
            'click .moveTo': '_toggleMoveTo',
            'click .moveToList > .classify': '_move',
            'click .moveToList > button': '_addFolder',
            'click .display': '_display',
            'click .tagSwitch': '_openTag',
            'click .openedTag': '_closeTag',
            'click .addTag': '_showAddTagBar',
            'blur .inputTag > input': '_addTag',
            'keyup .inputTag > input': '_checkInputTag',
            'click .delete-btn': '_deleteTag',
            'click .cloud-icon-share': '_shareDeck',
            'click .cloud-icon-cancelShare': '_cancelShareDeck',
            'click .restore': '_restore',
            'mouseover .filename': '_tooltip'
		},

        initialize: function () {
            delete this.options;
            this._template = JST["deck_list/DeckList"];
            // this.page = 1;

            this.collection.on('change', this.render, this);
            this.collection.on('remove', this.render, this);
            this.collection.on('reset', this.render, this);
            this.collection.on('sort', this.render, this);

            // this._resize = this._resize.bind(this);
            // $(window).resize(this._resize);
        },

        render: function () {
            this.$el.html('');
            var renderData = this.collection;
            if(this.folderCollection.length === 0){
                this.$el.html(JST["deck_list/NewDeck"]);
                return this;
            }
            //垃圾篓模板单独处理
            if(this.folderCollection.getActiveFolder().get('folderName') === 'trash'){
                if(renderData.length > 0){
                    var newData = this._renderDataPack(renderData);
                    this.$el.append(JST["deck_list/TrashList"](newData));
                    this.$moveToList = this.$el.find('.moveToList');
                    this._renderFoldersList();
                    this._resize();
                }
                return
            }
            this.$el.html(JST["deck_list/NewDeck"]);
            if(renderData.length > 0){
                var newData = this._renderDataPack(renderData);
                this.$el.append(this._template(newData));
                this.$moveToList = this.$el.find('.moveToList');
                this._renderFoldersList();
                this._resize();
            }
            //将分页添加至列表页后
            return this;
        },
        _renderDataPack: function(renderData){
            var newData = [];
            renderData.forEach(function(item){
                var deck = item.toJSON();
                if(deck.filename.length > 10){
                    deck.showFilename = deck.filename.substring(0, 6) + '...';
                }else{
                    deck.showFilename = deck.filename;
                }
                if(deck.last_modified){
                    var date = new Date(deck.last_modified);
                    // deck.last_modified = date.toLocaleTimeString();
                    // deck.last_modified = date.toLocaleString();
                    deck.last_modified = date.toLocaleDateString();
                }
                if(deck.tag){
                    deck.tags = deck.tag.split(/[,]/).slice(0, 5);
                }
                newData.push(deck);
            });
            return newData;
        },
        _renderFoldersList: function(){
            if(this.$moveToList && this.$moveToList.length > 0){
                var folders = this.folderCollection.getUserFolders();
                var _this = this;
                var usableFolders = _.filter(folders, function(folder){
                    return folder.folderName !== _this.folderCollection.getActiveFolder().get('folderName');
                });
                if(usableFolders.length < 1){
                    this.$moveToList.html('<div class="no-file">您还没有其它文件夹。</div><button>立马创建</button>');
                    return;
                };
                this.$moveToList.html(JST["deck_list/MenuLi"](usableFolders));
            }
        },

        _addFolder: function(e){
            var offset = $(e.currentTarget).offset();
            var $animateText = $('<input style="width:130px;height:25px;position:fixed;z-index:1000;border:1px solid #cccccc;border-radius:4px"></input>').css(offset);
            $('body').append($animateText);
            $animateText.animate({left:'81px', top: '217px'}, "slow", function(){
                $('.addClassify').click();
                $(this).delay(500).fadeOut(500, function(){
                    $(this).remove()
                });
            });
        },
        // _rederPaging: function(totalCount){
        //     this.$indexBar.empty();
        //     var pageCount = Math.ceil(totalCount / 10);
        //     var showPages = this.paging(pageCount, this.page, 5);
        //     for (var i = 0; i < showPages.length; i++) {
        //         var $pageBtn = $('<a class="circle-btn" href="#">'+ showPages[i]+'</a>');
        //         $indexBar.append($pageBtn);
        //         if(showPages[i] === page){
        //             $pageBtn.addClass('active');
        //         }
        //     };
        // },
        // _page: function(event){
        //     var index = parseInt($(event.currentTarget).html());
        //     var activeFolder = this.folderCollection.getActiveFolder().get('folderName');
        //     if(index !== page){
        //         $('.circle-btn').removeClass('active');
        //         $(event.currentTarget).addClass('active')
        //         this.page = index;
        //         Backbone.history.navigate('/list/' + activeFolder + '/' + index, {trigger: true});
        //     }
        // },
        // paging: function(totalPage, currrentPage, showPageCount){
        //     var pages = [];
        //     if(currrentPage > totalPage){
        //         console.log('currrent page can not greater than total page');
        //         return pages;
        //     }
        //     if(totalPage <= showPageCount){
        //         for(var i=1; i<=totalPage; i++){
        //             pages.push(i);
        //         }
        //         return pages;
        //     }
        //     for(var i=1; i<= showPageCount; i++){
        //         pages.push(currrentPage - Math.floor(showPageCount/2) - 1 + i);
        //     }
        //     pages = judgeNnmber(pages);
        //     return pages;

        //     function judgeNnmber(pages){
        //         if(Math.min.apply(null, pages) < 1){
        //             pages = pages.slice(1);
        //             pages.push(Math.max.apply(null, pages) + 1);
        //             return judgeNnmber(pages);
        //         }
        //         if(Math.max.apply(null, pages) > totalPage){
        //             pages = pages.slice(0, showPageCount - 1);
        //             pages.unshift(Math.min.apply(null, pages) - 1);
        //             return judgeNnmber(pages);
        //         }
        //         return pages;
        //     }
        // },
        //refresh and initialize to list all 
        // _renderDeckList: function(){
        //     var type = this.folderCollection.getClassify();
        //     var deckIds = [];
        //     if(type === 'all'){
        //         deckIds = this.folderCollection.allDeck();
        //     }else{
        //         deckIds = this.folderCollection.folderDeck(type)
        //     }
        //     this.collection.creatCollection(deckIds);
        // },
        _openTag: function(e){
            $(e.currentTarget).animate({left:'125px'},"slow", function(){
                $(this).removeClass().addClass('openedTag');
            }).next('.tag-bar').show(200);
        },
        _closeTag: function(e){
            $(e.currentTarget).animate({left:'5px'},"slow", function(){
                $(this).removeClass().addClass('tagSwitch');
            }).next('.tag-bar').hide(200);
        },
        _showAddTagBar: function(e){
            $(e.currentTarget).prev().show(400).children('input').focus();
        },
        _addTag: function(e){
            var tag = $.trim($(e.currentTarget).val());
            var checkTag = !/[?!@#$%\\^&*(),\n\s，]+/g.test(tag);
            console.log(checkTag);
            if(tag && checkTag){
                var deckId = this.getCurrentId(e);
                var deckModel = this.collection.findWhere({_id: deckId});
                var tags = '';

                if(deckModel.get('tag')){
                    tags = deckModel.get('tag').split(/[,]+/);
                }  
                if(_.indexOf(tags, tag) < 0){
                    var updataTag = null;
                    // console.log(deckModel.get('tag'));
                    if(deckModel.get('tag')){
                        updataTag = deckModel.get('tag') + ',' + tag
                    }else{
                        updataTag = tag;
                    }   
                    deckModel.changeTag(updataTag, function(){
                        $(e.currentTarget).val('').parent().hide(400).before('<span class="tag" title="'+ tag +'">'+ tag +'<span class="delete-btn">x</span></span>');
                    });
                }else{
                    console.log('已有此标签');
                }
            }else{
                $(e.currentTarget).parent().hide(400)
            }
        },
        _checkInputTag: function(e){
            var keyCode = e.keyCode
            if(keyCode === 13){
                $(e.currentTarget).blur();
            }
        },
        _deleteTag: function(e){
            this._stopEvent(e);
            var currentTag = $(e.currentTarget).parent().attr('title');
            var deckId = this.getCurrentId(e);
            var deckModel = this.collection.findWhere({_id: deckId});

            var tags = deckModel.get('tag').split(/[,\n\s，]/);
            var newTags = _.without(tags, currentTag, '');
            deckModel.changeTag(newTags.toString(), function(){
                $(e.currentTarget).parent().hide(200).remove();
            });
        },
        _shareDeck: function(e){
             this._stopEvent(e);

            var deckId = this.getCurrentId(e);
            var deckModel = this.collection.findWhere({_id: deckId});
            deckModel.changePublic(true, function(flag){
                if(flag){
                    $(e.currentTarget).removeClass('cloud-icon-share').addClass('cloud-icon-cancelShare').attr('title', '取消公开');
                    alert('课件公开成功');
                }else{
                    alert('课件公开失败, 您今日公开次数已用完。');
                }
            });
        },
        _cancelShareDeck: function(e){
             this._stopEvent(e);

            var deckId = this.getCurrentId(e);
            var deckModel = this.collection.findWhere({_id: deckId});
            deckModel.changePublic(false, function(flag){
                if(flag){
                    $(e.currentTarget).removeClass('cloud-icon-cancelShare').addClass('cloud-icon-share').attr('title', '公开');
                    alert('取消成功');
                }else{
                    alert('取消失败');
                }
            });
        },
        _display: function(e){
            var deckId = this.getCurrentId(e);
            if(!this.preview){
                this.preview = Models.getPreviewModel();
            }
            var deckModel = this.collection.findWhere({_id: deckId});
            var _this = this;
            deckModel.fetch({
                url: /preview/+ deckId,
                success: function(deckMoel){
                    _this.preview.show(deckModel);
                },
                error: function (err) {
                    alert('An error occurred while fetch decks: ' + err);
                }
            });
        },
        _move: function(e){
            this._stopEvent(e);

            var deckId = this.getCurrentId(e);
            var toFolderId = $(e.currentTarget).attr('id');
            var model = this.collection.findWhere({_id: deckId});
            model.changeFolder(toFolderId);
            this.removeDeck(model);
        },
        _edit: function(e){
             this._stopEvent(e);

            var deckId = this.getCurrentId(e);
            window.open('/edit.html#deck/' + deckId);
        },

        _delete: function(e){
            var deckId = this.getCurrentId(e);
            var model = this.collection.findWhere({_id: deckId});
            if(this.folderCollection.getActiveFolder().get('folderName') !== 'trash'){
                model.changePublic(false);
                model.changeFolder(this.folderCollection.getTrashModel()._id);
            }else{
                model.delModel();
            }
            this.removeDeck(model);
        },
        removeDeck: function(models){
            this.collection.remove(models);
        },
        //回收站恢复功能
        _restore: function(e){
            var deckId = this.getCurrentId(e);
            var model = this.collection.findWhere({_id: deckId});
            if(this.folderCollection.judgeFolderName('恢复的课件')){
                this.folderCollection.addFolder('恢复的课件', function(folder){
                    model.changeFolder(folder.get('_id'));
                });
            }else{
                var fid = this.folderCollection.getFolderModel('恢复的课件')._id;
                model.changeFolder(fid);
            }
            this.removeDeck(model);
        },
        getCurrentId: function(e){
            return $(e.currentTarget).parents('.deckItem').attr('data-id');
        },
        _resize: function(){
             // var listWidth = this.$el.width();
             // console.log(this.$el.height());
             // var remainingWidth = listWidth - (listWidth/195 | 0) * 186;
             // this.$el.css({
             //    'margin-left': remainingWidth / 2
             // });
        },

        _toggleMoveTo: function(e){
            this._stopEvent(e);
            if($(e.currentTarget).hasClass('open')){
                $(e.currentTarget).removeClass('open');   
            }else{
                $(e.currentTarget).addClass('open');   
            }
        },

        _stopEvent: function(e){
            e.preventDefault();
            e.stopPropagation();
        },
        // show filename
        _tooltip: function(e){
              $(e.currentTarget).tooltip('show')
        },
        constructor: function DeckListView(folderCollection, deckCollection) {
            this.folderCollection = folderCollection;
            this.collection = deckCollection;
            Backbone.View.prototype.constructor.call(this, arguments);
        }
    });
});
