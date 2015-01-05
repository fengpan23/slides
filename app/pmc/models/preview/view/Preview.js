define(['jquery',
        'backbone'
], function ($, Backbone) {
    "use strict";

    var previewSrc = '/preview_export/impress.html#/';
    return Backbone.View.extend({
        className: "preview modal hide",

        events: {
            'hidden': 'hidden',
            'click input[type="button"]': '_jumpPage',
            'keydown input[type="text"]': '_checkInput',
            'click .previous_page': '_prePage',
            'click .next_page': '_nextPage',
        },

        initialize: function(){
            this._template = JST["models/preview/Preview"];
        },

        render: function(){
            this.$el.html(this._template());
            this.$iframe = this.$el.find('.preview_bodyer > iframe');
            this.$filename = this.$el.find('.filename');
            this.$inputIndex = this.$el.find('input[type="text"]');
            this.$playIndex = this.$el.find('.playIndex');
            return this;
        },
        //not found events to listen iframe contentDocument url, use set timeout to find url  has change
        _pageIndexShow: function(){
            var currentURL = this.$iframe[0].contentDocument.URL;
            var tag = currentURL.substring(currentURL.lastIndexOf('/') + 1);
            this.$playIndex.html(tag);
            var _this = this;
            this.indexAutoShow = setTimeout(function(){
                _this._pageIndexShow();
            }, 1000);
        },
        _prePage: function(){
            var currentURL = this.$iframe[0].contentDocument.URL;
            var tag = currentURL.substring(currentURL.lastIndexOf('/') + 1);
            if(tag === "overview"){
                 this.$iframe.attr('src', previewSrc + 'step-' + this.maxIndex);
            }else{
                var tagNum = tag.substring(tag.indexOf('-') + 1);
                if(tagNum == 1){
                     this.$iframe.attr('src', previewSrc + 'overview');
                }else{
                     this.$iframe.attr('src', previewSrc + 'step-' + (parseInt(tagNum) - 1));
                }
            }
            this.$iframe.focus();
        },

        _nextPage: function(){
            var currentURL = this.$iframe[0].contentDocument.URL;
            var tag = currentURL.substring(currentURL.lastIndexOf('/') + 1);
            if(tag === "overview"){
                 this.$iframe.attr('src', previewSrc + 'step-1');
            }else{
                var tagNum = tag.substring(tag.indexOf('-') + 1);
                if(tagNum == this.maxIndex){
                     this.$iframe.attr('src', previewSrc + 'overview');
                }else{
                     this.$iframe.attr('src', previewSrc + 'step-' + (parseInt(tagNum) + 1));
                }
            }
            this.$iframe.focus();
        },

        _jumpPage: function(){
            var pageIndex = this.$inputIndex.val();
            if(pageIndex <= this.maxIndex && pageIndex > 0){
                this.$iframe.attr('src', previewSrc + 'step-' + pageIndex);
            }else{
                this.$iframe.attr('src', previewSrc + 'overview');
            }
        },

        _checkInput: function(e){
            var theEvent = window.event || e; 
            var keyCode = theEvent.keyCode || theEvent.which;
            if(keyCode === 13) {
                this._jumpPage();
            }
            if(!(keyCode==46)&&!(keyCode==8)&&!(keyCode==37)&&!(keyCode==39)){
                if(!((keyCode>=48&&keyCode<=57)||(keyCode>=96&&keyCode<=105))){
                    theEvent.returnValue=false; 
                }
            }
        },
        show: function(deck){
            this._setDeckText(deck);
            if(!deck.get('slides')){
                //show message
                this.maxIndex = 1;
            }else{
                this.maxIndex = deck.get('slides').length;
            }
            this.$iframe.attr('src', previewSrc + 'overview');
            this.$filename.html(deck.get('filename'));
            this.$el.modal('show');

            var _this = this;
            setTimeout(function(){
                _this._pageIndexShow();
            }, 1000);
        },
        hidden: function(){
            clearTimeout(this.indexAutoShow);
            this.$iframe.attr('src', '');
            localStorage.removeItem('preview-string');
        },
        _setDeckText: function(deck){
            localStorage.setItem('preview-string', deck.get('previewText'));
        }        
    });
});
