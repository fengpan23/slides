var db = require('./db');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//控制数据写入
var userSchema = new Schema({
    userName:  String,
    password: String,
    locked: {type: Boolean, default: false},
    cheaters: {type: Number, default: 0},
    limitDeck: {type: Number, default: 40},
    limitShare: {type: Number, default: 50},
    shareTimes: {type: Number, default: 0},
    latestShareTime: {type: Date, default: null},
});

var model = db.model('users', userSchema);

exports.deckUser = {
	findByUserName: function(userName, callback) {
        model.findOne({userName: userName}, function(err, data) {
        	if(err){
        		console.log("find By User Name fail: " + err);
        		return callback(false);
        	}
        	return callback(data);
        });
	},
	findById: function(id, callback) {
        model.findById(id, function(err, item) {
        	if(err){
        		console.log("findById fail: " + err);
        		return callback(false);
        	}
        	return callback(item);
        });
	},
    findAppoint: function(tag, skip, limit, order, callback){
        var result = [];

        var theRegExp = new RegExp(".*" + tag + ".*","gi"); 
        var query = model.find();
        var searchOption = {'userName': theRegExp };

        model.count(searchOption, function (err, count) {
          if (err){
            callback(false);
          }else{
            result.push({count: count});
            query = model.find(searchOption);
            query.skip(skip);
            query.limit(limit);
            query.sort(order);
            query.exec(function(err, items){
                if (err){
                    throw err;
                }else {
                    result.push(items);
                    callback(result);
                }
            });
          }
        });
    },
	update: function(id, user, callback){
        if(user._id){
            delete user._id;
        }
        model.findByIdAndUpdate(id, user, function(err, result) {
            if (err) {
                console.log('Error updating user: ' + err);
               return callback(false);
            } else {
                console.log('user document(s) updated');  //result is affect the number of rows
                return callback(result);
            }
        });
	},
	addUser: function(user, callback) {
        var userEntity = new model(user);
        userEntity.save(function(err, data){
            if(err){
                console.log('add user error: ' + err);
                callback(false);
            }
            callback(data);
        });
	},
	remove: function(){
        model.remove(function(err, ss){
        	console.log(ss);
        });
	}
};