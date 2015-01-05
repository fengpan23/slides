var template = require('../models/templateModel');

exports.main = {
    edit: function(req, res) {
        res.redirect('edit.html');
    },
    userTemplates: function(req, res){
    	var uid = req.query.uid;
    	template.templateModel.findField({uid: uid}, function(data){
    		res.send(data);
    	});
    },
    addTemplate: function(req, res){
    	var data = req.body;
    	template.templateModel.addDeck(data, function(result){
    		res.send(result);
    	});
    },
    deleteTemplate: function(req, res){
    	var id = req.params._id;
    	template.templateModel.deleteDeck(id, function(result){
    		res.send(result);
    	});
    },
    getTemplate: function(req, res){
    	var id = req.query._id;
    	template.templateModel.findById(id, function(result){
    		res.send(result);
    	});
    },
    updateTemplate: function(req, res){
        var data = JSON.parse(req.body.deck);
        var id = req.body.tId
        delete data._id;
        console.log(data);
        console.log(id);
        template.templateModel.updateDeck(id, data, function(result){
            res.send(result);
        });
    },
};