var deck = require('../models/deckModel');	
// state
// 0 , 1

exports.findByTag = function(req, res) {
	var searchTag = req.params.searchTag;
	var skip = parseInt(req.params.skip) || 0;
	var limit = parseInt(req.params.limit) || 10;
	var order = req.params.order;
	console.log(order);
	var tag = {};
	if(/^\d+$/.test(searchTag)){ //'number'
		var date = new Date();
		var section = date.getDate() - parseInt(searchTag);
			date.setDate(section);
		// tag = {createTime: {$gte: start, $lt: end}};
		tag = {createTime: {$gte: date}};
	}else if(typeof searchTag === 'object'){
		tag = searchTag;
	}else{
		tag = {"$or": [{filename: {$regex: searchTag, $options: 'i'}}, {tag: {$regex: searchTag, $options: 'i'}}]};
	}
	deck.deckModel.findAppoint(tag, skip , limit, order, function(result) {
		var data = [];
		result.data.forEach(function(deck){
			data.push({_id: deck._id, filename: deck.filename, tag: deck.tag, last_modified: deck.last_modified});
		});
		result.data = data;
		if(result){
			res.jsonp({state: 1, data: result, message: "search deck success"});
		}else{
			res.jsonp({state: 0, message: "search deck fail"});
		}
	});
};

exports.deleteDeck = function(req, res) {
	var  id = req.params.id;
	
	deck.deckModel.deleteDeck(id, function(result) {
		if(result){
			res.jsonp({state: 1, data: result, message: "delete success"});
		}else{
			res.jsonp({state: 0, message: "delete fail"});
		}
	});
};
exports.addDeck = function(req, res) {
	 var data = req.body;
	 console.log(data);
	 deck.deckModel.addDeck(data, function(result) {
		if(result){
			res.jsonp({state: 1, data: result, message: "add deck success"});
		}else{
			res.jsonp({state: 0, message: "add deck fail"});
		}
	 });
};
// exports.rename = function(req, res){
//     var deckId = req.params.id;
//     var newName = req.params.name;
    
//     deck.deckModel.findById(deckId, function(result) {
//         console.log(result);
//         if(!result){
//             res.jsonp({message: 'not find by ' + deckId});
//             return;
//         }
//         result.filename = newName;
        
//         deck.deckModel.updateDeck(deckId, result, function(data){
//             res.jsonp(data);
//         });
//     });
// };
