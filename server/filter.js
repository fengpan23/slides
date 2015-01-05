exports.authorize = function(req, res, next) {
	// console.log(req.session);
  console.log(req.connection.remoteAddress);
	if (!req.session.user) {
    	res.redirect('/login');
  	} else {
    	next();
  	}
}

// //认证
// var querystring = require('querystring');
// var http = require('http');

// exports.authorize = function(req, res, next) {
// 	console.log('ssss');
// 	if(!req.session.user || !req.session.user.token ){
//         res.redirect('/login');
//         return;
//     }
//     var token = req.session.user.token;        
//     var post_data = querystring.stringify({ tokenid:token });
//     var theoptions = {
// 	        host: 'sso.lisys.cn',
// 	        port: 8080,
// 	        path: "/uis/identity/isTokenValid",
// 	        method: 'POST',
// 	        headers: {
// 	            "Content-Type" : 'application/x-www-form-urlencoded',
// 	            "Content-Length" : post_data.length
// 	        }
//         };
//     var req_tt = http.request(theoptions, function(resuserinfo) {
//         resuserinfo.setEncoding('utf8');
//         var infos = '';
//         resuserinfo.on('data', function(chunk) {
//             infos = infos + chunk;
//         }) .on('end', function() {
//             var theindex = infos.indexOf("true");
//             if(theindex > 0){
//                 return next();
//             }else{
//                 res.redirect('/login');
//             }
//         });
//     });
//     req_tt.write( post_data + "\n" );
//     req_tt.end(  ); 
// }

exports.adminAuthorize = function(req, res, next) {
	// console.log(req.session);
	if (!req.session.user) {
		 res.redirect('/admin/login');
  	} else {
    	next();
  	}
}