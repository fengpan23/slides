var http = require('http');
var openstack = require('pkgcloud');
var request = require('request');

var _ = require('underscore');

var deckModel = require('../models/deckModel');
var fileModel = require('../models/fileModel');
var fs = require('fs');


exports.openstack = function(){

	var openstackOpts = {
	    provider: 'openstack',
	    username: 'pfeng',
	    password: 'lisys-store',
	    tenantName: 'lisystec',
	    authUrl: 'http://192.168.1.198:5000',
	    internalURL: "http://192.168.1.198:8080/v1/AUTH_41c81798e8b242ce857b99f26a042d5e",
	    region: 'regionOne'
	};
	var openstackPKGClient = openstack.compute.createClient(openstackOpts);
    // openstackPKGClient._serviceUrl = 'http://192.168.1.198:8080/v1/AUTH_41c81798e8b242ce857b99f26a042d5e';
    openstackPKGClient.getFlavors(function(err, flovors){

	   openstackPKGClient.getImages(function(err, images){
	   		console.log(images);
	   		 var flovor = _.findWhere(images,{name: '1401171263112_暗香.mp3'})
	   		 console.log(flovor);

	   		  var image = _.findWhere(images,{name: '1401171263112_暗香.mp3'})
	   		 console.log(image);
	   });
    });


        // var tmp_path = file.path;
        // var mktemp = (new Date()).valueOf() + "" + Math.floor(Math.random() * 10) + '_' + file.originalFilename;
        // var myFile = fs.createReadStream(tmp_path);
      
        // myFile.pipe(openstackPKGClient.upload({
        //     container : 'cloudslide',
        //     remote : mktemp
        // }, function(err, result) {
        //     if (err) {
        //         callback({state: 'error'});
        //         return;
        //     }
        //     callback({
        //         state: 'success',
        //         src: openstackOpts.internalURL +'/cloudslide/'+ mktemp
        //     });
        //     return;
        // }));
}

exports.drawCanvas = function(){
	var src = 'http://www.aape8.com/template/archy_weihei/archy_img/logo.png';


	http.get(src, function(res) {

		var out = fs.createWriteStream("app/urltourl.jpg");

	    res.on('data', function (chunk) {
	    	out.write(chunk);
		});
		res.on('end', function(){
			out.end();
    		console.log("urltourl.jpg");
		});
	}).on('error', function(e) {
//		res.send(e.message);
	  	console.log("Got error: " + e.message);
	});
}

exports.deleteComment = function(req, res){
	deckModel.deckModel.findAppoint({}, 0, 1000, {}, function(result){
		result.data.forEach(function(deck, i){
			if(deck.comments){
				deck.comments = [];
				deck.save(function (err, product, numberAffected) {
					if (err){
						console.log(err);
					}else{
						console.log(product._id);
						// console.log(product.slides[0].components[0]);
						console.log(numberAffected);
						// res.send('success');
					}
				});
			}
		});
	});
}

exports.saveBase64ToOpenStack = function(req, res){
	function changeImg(base64, data, callback){
	    //过滤data:URL
	    var base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
	    var dataBuffer = new Buffer(base64Data, 'base64');
	    // var timestamp = (new Date()).valueOf();
	    var timestamp = new Date().getTime() + "" + Math.floor(Math.random() * 10);
	    console.log("timestamp 1: " + timestamp);
	    fs.writeFile(timestamp  + ".jpg", dataBuffer, function(err) {
	        if(err){
	          console.log(err);
	        }else{
	        	console.log("*********");
	        	console.log("timestamp 2: " + timestamp);
	         	// console.log("保存成功！");
	         	var file = {};
	         	file.path = timestamp + ".jpg";
	         	file.originalFilename = "64.jpg"
	         	fileModel.fileModel.uploadFile(file, function(imgData){
					console.log(imgData);
					callback(imgData, data);
				})
	        }
	    });
	}
	deckModel.deckModel.findAppoint({}, 0, 1000, {}, function(result){
		console.log(result.count);
		result.data.forEach(function(deck, i){
			console.log("第" + i + "个课件： " + deck._id);
			if(deck.picture && deck.picture.indexOf('data:image') === 0){
				changeImg(deck.picture, {deck: deck}, function(imgData, data){
					data.deck.picture = imgData.src;
					data.deck.save(function (err, product, numberAffected) {
						if (err){
							console.log(err);
						}else{
							console.log(product._id);
							// console.log(product.slides[0].components[0]);
							console.log(numberAffected);
							// res.send('success');
						}
					});
				})
			}
			if(deck.background && deck.background.indexOf('data:image') === 0){
				changeImg(deck.background, {deck: deck}, function(imgData, data){
					data.deck.background = imgData.src;
					data.deck.save(function (err, product, numberAffected) {
						if (err){
							console.log("fail")
							console.log(err);
						}else{
							console.log("success")
							console.log(product._id);
							// console.log(product.slides[0].components[0]);
							console.log(numberAffected);
							// res.send('success');
						}
					});
				})
			}
			if(!deck.slides)return;
			deck.slides.forEach(function(slide, j){
				if(!slide.components)return;
				slide.components.forEach(function(component, k){
					console.log("i: " + i +"j: " + j + "k: " + k);
					// console.log(component.src);
					if(component.type === 'Image'  && component.src.indexOf('data:image') === 0){
						// console.log("meiyou");
						changeImg(component.src, {deck: deck, j: j, k: k}, function(imgData, data){
							console.log('********************************');
							var changeslides = data.deck.slides;
							changeslides[data.j].components[data.k].src = imgData.src;
							data.deck.update({slides: changeslides}, function (err, numberAffected, raw) {
								if (err){
									console.log("fail")
									console.log(err);
								}else{
									console.log('success');
									console.log(numberAffected);
									console.log('The raw response from Mongo was ', raw);
								}
							});
						});
					}
				});
			});

		});
	});
	// fileModel.fileModel.uploadFile(file, function(data){
	// 	console.log(data);
	// });
}


exports.testDeckModel = function(){
}

exports.test = function(req, res) {
	console.log('tessss');
	
	var options = {
			method: "get",  
			  host: 'http://lxpt.mlyu.lxpt.cn',
//			  port: 8080,
			  path: '/api/user/login.json',
			};
	
	var url = "http://192.168.2.76:8080/HelloWorldServlet/HelloWorld1?id=100";

		
//		http.get(url, 
//				function(theRes) {
//		 		theRes.on('data', function (chunk) {
//	                tempStr = tempStr + chunk;
//	                    });
//	                    
//	                    theRes.on('end', function(){
//	                    	console.log(tempStr);
//	   					var return_json = JSON.parse(tempStr);                       
//						res.jsonp(return_json);
//	   				});
//
//	  			}).on('error', function(E) {
//	    		console.log("Got error: " + e.message);
//	  		});
//		
//			
//		});	
//		
	http.get(url, function(res) {
		
		console.log('aaaaaaaaaaaaaaaaa');
			console,log(res);
	       res.on('data', function (chunk) {
	        var  data = JSON.parse(""+chunk);
	         
	        res.send(data);
	         console.log(data)
//			        console.log('BODY: ' + data.statuses[0].user.id)
	  });
	}).on('error', function(e) {
//		res.send(e.message);
	  console.log("Got error: " + e.message);
	});
		
};
