var mongoose = require('mongoose');
var appConfig = require('../config.js');
var opts = { server: { auto_reconnect: false,poolSize: 4}};
var conn = mongoose.createConnection(appConfig.db.uri, opts);
module.exports = conn;