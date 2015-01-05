var transform = require('../models/fileModel');

exports.transform = function(req, res) {
    console.log("transform url:  " + req.query.url);
    var url = req.query.url;
    var filename = req.query.filename;
    var format = req.query.format ||  url.substring(url.lastIndexOf('.') + 1);
    transform.fileModel.transpondFile(url, filename, format, function(data){
        res.send(data);
    });
};
