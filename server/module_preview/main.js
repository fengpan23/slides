var deck = require('../models/deckModel');
exports.preview = function(req, res){
	var deckId = req.params.id;
	deck.deckModel.findById(deckId, function(result){
		res.send(result);
	});
};
exports.display = function(req, res){
	var displayId = req.params.id;
	// console.log(displayId);
	res.redirect('/display.html#' + displayId);
};