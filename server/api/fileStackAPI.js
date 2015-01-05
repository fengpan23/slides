var files = require('../models/fileModel');
exports.loadFile = function(req, res){
    var filename = req.query.filename;
    console.log('load openStack file  name:' + filename);
    files.fileModel.loadFile(filename, res); 
};

exports.uploadFile = function(req, res){
	console.log('upload file to openStack');
    console.log(req);
    var file = req.files.file;
    
    files.fileModel.uploadFile(file, function(data){
        // console.log(data);
        res.send(data);
    });
};
exports.deleteFile  = function(){
      
};
