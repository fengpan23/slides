var db = require('./db');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//控制数据写入
var deckSchema = new Schema({
    uid: ObjectId,
    uname: String,
    fid:  ObjectId,

    filename: String,
    type: String,
    tag: String,
    slides: Array,
    activeSlide: {},
    background: String,
    picture: String,
    surface: String,
    previewText: String,

    loveCount: {type: Number, default: 0},
    totaldowns: {type: Number, default: 0},
    viewCount: {type: Number, default: 0},
    comments: Array,
    // favtimes: {type: Number, default: 0},
    // sharetimes: {type: Number, default: 0},
    report: Array,
    outward: {type: Boolean, default: false},
    outwardTime: {type: Date, default: null},
    createTime: {type: Date, default: Date.now},
    last_modified: {type: Date, default: Date.now},
});

deckSchema.index({filename: -1});

var model = db.model('decks', deckSchema);

exports.deckModel = {
	findById: function(id, callback) {
        model.findById(id, function(err, item) {
        	if(err){
        		console.log("find deck by id fail.");
        		throw err;
        	}else{
        		callback(item);
        	}
        });
	},
	findAppoint: function(tag, skip, limit, order, callback){
		var result = {};
		model.count(tag, function (err, count) {
        	if (err){
        		console.log("count deck by "+ tag.toString() +" fail.");
                callback();
           		throw err;
          	}else{
	            result.count = count;
	            query = model.find(tag);
	            query.sort(order);
	            query.skip(skip);
	            query.limit(limit);
	            query.exec(function(err, items){
	                if (err){
	                	console.log("exec find deck by "+ tag.toString() +" fail.");
	                    throw err;
	                }else {
	                    result.data = items
	                    callback(result);
	                }
	            });
          	}
        });
	},
    //通过指定字段查找
    findField: function(field, callback){
        model.find(field, function(err, items){
            callback(items);
        });
    },
	updateDeck: function(id, deck, callback){
         if(deck._id){
            delete deck._id;
        }
		model.findByIdAndUpdate(id, deck, function(err, item){
			if (err){
            	console.log("update deck "+ id +" fail.");
                throw err;
            }else {
                console.log("one document update success");
                callback(item);
            }
		});
	},
	addDeck: function(deck, callback) {
        var deckEntity = new model(deck);
        deckEntity.save(function(err, data){
            if(err){
                console.log('add deck error');
                callback();
                throw err;
            }else{
                console.log("add a document success");
            	callback(data);
            }
        });
	},
	deleteDeck: function(id, callback){
		model.findByIdAndRemove(id, function(err, item){
			if (err){
            	console.log("delete deck by id: "+ id +" fail.");
                callback();
                throw err;
            }else {
                console.log("delete deck by id: "+ id +" success.");
                callback(item);
            }
		});
	},
};