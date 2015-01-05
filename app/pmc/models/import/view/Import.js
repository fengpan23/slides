define(['jquery',
        'backbone'
], function ($, Backbone) {
    "use strict";

    return Backbone.View.extend({
        className: "import modal hide",

        events: {
            'hidden': 'hidden',
        },

        initialize: function(){
            this._template = JST["models/import/Import"];
        },

        render: function(){
            this.$el.html(this._template());
            this.$inputIndex = this.$el.find('input[type="text"]');
            return this;
        },
        _import: function(){
            $.ajax({
                url: '/ppt',
                type: 'POST',
                dataType: 'json',
                data: {param1: 'value1'},
            })
            .done(function() {
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
            
            // if (file.type === "application/vnd.ms-powerpoint") {
            //     var form = new FormData();
            //     var xhr = new XMLHttpRequest();
                
            //     form.append('file', file);
            //     xhr.open('POST', "ppt");
                
            //     xhr.setRequestHeader('Authorization', 'Client-ID ' + this.clientId);
            //     xhr.onreadystatechange = function() {
            //         if (xhr.readyState === 4) {
            //             console.log(xhr);
            //             if(xhr.responseText){
            //                 editorModel.importPresentation(JSON.parse(xhr.responseText));
            //             }else{
            //                 message.show({error: '文件转换失败 ! 请与管理员联系。'});
            //             }
            //         }else{
            //             console.log('XMLHttp open error: ' + xhr.readyState);
            //         }
            //     };
            //     xhr.send(form);
            // } 
        },
        show: function(){
            this.$el.modal('show');
        },
        hidden: function(){
        },
    });
});
