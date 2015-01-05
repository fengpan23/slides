var fs = require('fs');
var openstack = require('pkgcloud');
var request = require('request');

var openstackOpts = {
    provider: 'openstack',
    username: 'pfeng',
    password: 'lisys-store',
    tenantName: 'lisystec',
    authUrl: 'http://192.168.1.198:5000',
    internalURL: "http://192.168.1.198:8080/v1/AUTH_41c81798e8b242ce857b99f26a042d5e",
    region: 'regionOne'
};
var openstackPKGClient = openstack.storage.createClient(openstackOpts);
    // openstackPKGClient._serviceUrl = 'http://192.168.1.198:8080/v1/AUTH_41c81798e8b242ce857b99f26a042d5e';

// file management 
var db = require('./db');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var fileSchema = new Schema({
    uid: ObjectId,
    filename:  String,
    type: String,
    url: String,
});

var model = db.model('files', fileSchema);    

exports.fileModel = {
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
    update: function(id, newfile, callback){
        model.findOneAndUpdate({_id: id}, newfile, function(err, data){
            if(err){
                console.log("update file name fail: " + err);
                return callback(false);
            }
            callback(data);
        });
    },
    add: function(file, callback) {
        var fileEntity = new model(file);
        fileEntity.save(function(err, data){
            if(err){
                console.log('add folder error: ' + err);
                callback(false);
            }
            console.log(data);
            callback(data);
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

    /**
     * 
     *@param object file 
     * 
     */
    uploadFile: function(file, callback){
        var tmp_path = file.path;
        var mktemp = (new Date()).valueOf() + "" + Math.floor(Math.random() * 10) + '_' + file.originalFilename;
        var myFile = fs.createReadStream(tmp_path);
      
        myFile.pipe(openstackPKGClient.upload({
            container : 'cloudslide',
            remote : mktemp
        }, function(err, result) {
            console.log('ooooooooooooooooooooooooooooooooooooooooooooooooooooooo');
            console.log(result);
            if (err) {
                callback({state: 'error'});
                return;
            }
            callback({
                state: 'success',
                src: openstackOpts.internalURL +'/cloudslide/'+ mktemp
            });
            return;
        }));
    },
    
    loadFile: function(filename, res){
        openstackPKGClient.download({
            container : 'cloudslide',
            remote : filename,
        }, function(err, result) {
            if(err){
                res.send({state: 'error'});
                return;
            }
        }).pipe(res); 
    },
    
    deleteFile: function(){
        
    },
    /**
     *@param Outside url
     *   
     * return url 
     */
    transpondFile: function(url, filename, format, callback){
        // var preURL = "http://appdev.lxpt.cn:2323/file/load/";
        var preURL = 'http://192.168.1.198:8080/v1/AUTH_41c81798e8b242ce857b99f26a042d5e/cloudslide/';
        filename = (new Date()).valueOf() + '_' + filename + '.' + format;
        // console.log(filename);
        try{
            console.log('try');
            request(url).pipe(openstackPKGClient.upload({
                        container : 'cloudslide',
                        remote : filename
                    }, function(err, result) {
                        if (err) {
                            callback({state: "upload error"});
                            return;
                        }
                        callback({state: "success", src: preURL + filename});
                        return;
            }));
        }catch(err){
            console.log("catch err: " + err);
            callback({state: "request error", message: err});
        }
     }
};