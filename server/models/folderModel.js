var db = require('./db');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//控制数据写入
var folderSchema = new Schema({
    uid: ObjectId,
    folderName:  String,
    numberFiles: {type: Number, default: 0},
    index: {type: Number, default: 1},
});

var model = db.model('folders', folderSchema);

exports.folderModel = {
    findById: function(id, callback) {
        model.findById(id, function(err, item) {
            if(err){
                console.log("find By User Id fail: " );
                console.log(err);
                return callback(false);
            }
            return callback(item);
        });
    },
	findByUid: function(uid, callback) {
        model.find({uid: uid}, function(err, items) {
        	if(err){
        		console.log("find By User Id fail: " );
                console.log(err);
        		return callback(false);
        	}
        	return callback(items);
        });
	},
	update: function(id, newfolder, callback){
        model.findOneAndUpdate({_id: id}, newfolder, function(err, data){
            if(err){
                console.log("update folder name fail: " + err);
                return callback(false);
            }
            callback(data);
        });
	},
	add: function(folder, callback) {
        var folderEntity = new model(folder);
        folderEntity.save(function(err, data){
            if(err){
                console.log('add folder error: ' + err);
                callback(false);
            }
            console.log(data);
            callback(data);
        });
	},
    count: function(uid, callback){
        model.count({uid: uid}, function(err, count){
            if(err){
                console.log('add folder error: ' + err);
                callback(false);
            }
            callback(count);
        });
    }, 
	remove: function(id, callback){
        model.findByIdAndRemove(id, function(err, data){
            if(err){
                console.log('remove folder error: ' + err);
                callback(false);
            }
        	callback(data);
        });
	},
};