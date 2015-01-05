var deck = require('../models/deckModel');

exports.findById = function(req, res) {
	var id = req.query.id;
	deck.deckModel.findById(id, function(result) {
		res.send(result);
	});
};

exports.searchByTag = function(req, res) {
	console.log(req.query);
	var searchTag = req.query.searchTag;
	var skip = parseInt(req.query.skip) || 0;
	var limit = parseInt(req.query.limit) || 25;
	var order = null;
	
	tag = {"$or": [{filename: {$regex: searchTag, $options: 'i'}}, {tag: {$regex: searchTag, $options: 'i'}}]};
	tag.outward = true;
	deck.deckModel.findAppoint(tag, skip , limit, order, function(result) {
		var data = [];
		result.data.forEach(function(deck){
			data.push({_id: deck._id, filename: deck.filename, picture: deck.picture, tag: deck.tag});
		});
		result.data = data;
		if(result){
			res.jsonp({state: 1, data: result, message: "search deck success"});
		}else{
			res.jsonp({state: 0, message: "search deck fail"});
		}
	});
};

exports.updateDeck = function(req, res) {
	console.log(req);
	 var id = req.params.id;
	 var data = req.body;
	 
	 delete data._id;
	 // console.log(data);
	 deck.deckModel.updateDeck(id, data, function(result) {
	 	console.log(data);
		 res.send(data);
	 });
};

exports.deleteDeck = function(req, res) {
	var  id = req.params.id;
	
	deck.deckModel.deleteDeck(id, function(result) {
		res.send(req.body);
	});
};

exports.addDeck = function(req, res) {
	 var data = req.body;
	 // console.log(data);
	 deck.deckModel.addDeck(data, function(result) {
			res.send(result);
	 });
};

exports.findAllDeck = function(req, res) {
	var result = [];
	
	deck.deckModel.findAll(function(results) {
		results.forEach(function(item){
			delete item.activeSlide;
			delete item.slides;
			delete item.picture;
			delete item.background;
			result.push(item);
//	    	 result.push({
//				id: item._id, 
//	    		filename: item.filename, 
//	    		creator: item.creator, 
//	    		last_modified: item.last_modified,
//	    		quoteTimes: item.quoteTimes,
//	    		watchTimes: item.watchTimes,
//	    		deckVersion: item.deckVersion
//			});
	     });
		res.send(result);
	});
};