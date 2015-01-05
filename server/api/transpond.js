var http = require('http');
var https = require('https');
var config = require('./config.json');
var xmlreader = require('xml2js').parseString; 

//google image search (unsteadiness in china)
exports.gImageSearch = function(req, resXM){
	// console.log(req.query.tag);
	var tag = req.query.tag;
	var start = req.query.start;
	
	console.log(start);
	console.log(encodeURIComponent(start));
	// var url = "http://image.baidu.com/i?tn=baiduimagejson&width=&height=&word="+ tag +"&rn=10&pn=1";
 	// var url = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=" + encodeURIComponent(tag);
 	var url = "http://ajax.googleapis.com/ajax/services/search/images?rsz=8&v=1%2E0&start="+ encodeURIComponent(start) +"&safe=active&q="+ encodeURIComponent(tag);
 	console.log(url);
	http.get(url, function(res) {
		var info = ''
		res.on('data', function (chunk) {
			info += chunk
		}).on('end', function() {
			var data = JSON.parse(info);
			// console.log(data);
			resXM.send(data);
		}).on('error', function(e) {
			console.log("Got error: " + e.message);
			resXM.send(e.message);
		});
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
		resXM.send(e.message);
	});
};
//bing image search
exports.bImageInfo = function(req, resXM){
    console.log('bing image search: ' + req.query.tag);
    var tag = req.query.tag;
    var startLoad = req.query.startLoad;
    // console.log(startLoad);
    // var url = 'http://image.baidu.com/i?tn=baiduimagejson&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=&sf=1&fmq=1401869133137_R&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=' + tag;
    // var url = 'http://image.baidu.com/i?tn=baiduimagejson&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=&sf=1&fmq=1349413075627_R&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&rn=10&pn='+ pageNum +'&word=' + tag;
    var url = 'http://cn.bing.com/images/async?q='+ encodeURIComponent(tag) +'&first='+ startLoad +'&count=10';
     http.get(url, function(res) {
        var info = '';
        res.on('data', function (chunk) {
            info += chunk;
        }).on('end', function() {
        	// console.log(info);
        	re = /<a(.+?)\/>/ig; // 创建正则表达式模式。
        	re1 = /<img[^>]+src2="([^"]+)"/;//"http:
        	re2 = /http(s)?:\/\/[^(&|"|}|;|,)]+(?:\.jpg|\.gif|\.png|\.bmp)/ig;

        	var start = info.match(/beg="(\d{0,5})"/)[1]; 
			var end = info.match(/end="(\d{0,5})"/)[1];

            var imgs = info.match(re);
            var pictureSet = [];
            pictureSet.push({imgNum: end - start + 1});
            for(i in imgs){
            	var realSrc = imgs[i].match(re2);
            	var tbUrl = imgs[i].match(re1);
            	if(realSrc && tbUrl){
                	pictureSet.push({tbUrl: tbUrl[1], realSrc: realSrc[0]});
            	}else{
            		break;
            	}
            }
            // console.log(pictureSet);
            // re = /\{"thumbURL":"[^\}]*?\}/ig; // 创建正则表达式模式。
            // var imgs = info.replace(/[ ]/g,'').match(re);
            // var pictureSet = [];
            // for(i in imgs){
            //     pictureSet.push(JSON.parse(imgs[i]));
            // }
            // console.log(pictureSet);
            resXM.send(pictureSet);
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
            resXM.send(e.message);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
        resXM.send(e.message);
    });
};

var transform = require('../models/fileModel');

exports.bMusicInfo = function(req, resXM) {
	console.log(req.query.mId);
	var url = "http://ting.baidu.com/data/music/links?songIds=" + req.query.mId;
	http.get(url, function(res) {
		var info = '';
		res.on('data', function (chunk) {
			info += chunk;
		}).on('end', function() {
			var data = JSON.parse(info);
			if(data.errorCode === 22000){
			    var songData = data.data.songList[0];
			    // console.log(songData);
			    transform.fileModel.transpondFile(songData.songLink, songData.songName, songData.format, function(mess){
			        mess.songName = songData.songName;
			        mess.artistName = songData.artistName;
			        //time formart
	                if(typeof songData.time === 'number'){
	                    var sTime = Math.floor(songData.time/60) +":" + songData.time%6;
	                    mess.time = sTime;
	                }else{
			        	mess.time = songData.time;
	                }
			        // console.log(mess);
			        resXM.send(mess);
			    });
			}else{
			    console.log(data);
    			resXM.send(data);
			}
		}).on('error', function(e) {
			console.log("Got error: " + e.message);
			resXM.send(e.message);
		});
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
		resXM.send(e.message);
	});
};
exports.bMusic = function(req, resXM) {
	console.log('baidu music search: ' + req.query.mName);
	var tag = req.query.mName;
	var singer = req.query.mSinger;
	searchMusicAPI_2(tag, singer, function(data){
	    console.log("search music the first time");
	    if(data.length === 0){
	        console.log("search music second time");
	        searchMusicAPI_2(tag, singer, function(data){
	            if(data.length === 0){
	                console.log("search music third time");
	                searchMusicAPI_1(tag, singer, function(data){
                            resXM.send(data);
                    });
	            }else{
                    resXM.send(data);
	            }
            });
	    }else{
	        resXM.send(data);
	    }
	});
	//Don't work now !!!
	function searchMusicAPI_1(searchTag, mSinger, cb){
	    var url = "http://mp3.baidu.com/dev/api/?tn=getinfo&ct=0&word="+ searchTag +"&ie=utf-8&format=json";
	    http.get(url, function(res) {
	        var info = '';
	        res.on('data', function (chunk) {
	            info += chunk;
	        }).on('end', function() {
	            var data = JSON.parse(info);
	            console.log(data);
	            cb(data);
	        }).on('error', function(e) {
	            console.log("Got error: " + e.message);
	           cb(e.message);
	        });
	    }).on('error', function(e) {
	        console.log("Got error: " + e.message);
	        cb(e.message);
	    });
	};
	//return {src: ***}
	function searchMusicAPI_2(searchTag, mSinger, cb){
		var queryName = searchTag;
		var querySinger = mSinger || '';
		var url = "http://box.zhangmen.baidu.com/x?op=12&count=1&title="+ queryName +"$$"+ querySinger +"$$$";
		
		var allowVals = {
	        'MP3': true,
	        'MP4': true,
	        'WMA': true,
	    }
		http.get(url, function(res){
			// console.log('STATUS: ' + res.statusCode);
			// console.log('HEADERS: ' + JSON.stringify(res.headers));
			var info = ''
			res.on('data', function (chunk) {
				info += chunk
			}).on('end', function() {
				xmlreader(info, function(err, data){
					var result = [];
				    if(err){
				        console.log(err);
				        cb(err);
				        return;  
				    }
				    if(parseInt(data.result.count[0]) > 0){
					    data.result.url.forEach(function(item){
				    		// console.log(item);
					    	var encode = item.encode[0];
					    	var decode = item.decode[0];
					    	var src = encode.substring(0, encode.lastIndexOf('/') + 1) + decode;
					    	var format = src.substring(src.lastIndexOf('.') + 1).toUpperCase();
					    	if(format in allowVals){
					    		result.push({src: src});
					    	}
					    })
				    }else{
				    	console.log("not find");
				    }
				    cb(result);
				});
			}).on('error', function(e) {
				console.log("Got error: " + e.message);
				cb(e.message);
			});
		}).on('error', function(e) {
			console.log("Got error: " + e.message);
			cb(e.message);
		});
	};
};
exports.lxUser = function(req, resXM) {
	var info = '';
	
	req.addListener('data', function(chunk){
		info += chunk;  
	}).addListener('end', function(){
	  	var data = JSON.parse(info);
	  	console.log(data);
	  	var url = "http://" + data.domain + "/index.php?option=com_lxedu&task=api.profileDisplay&format=json&id=" + data.lxid;
    	
	  	console.log(url);
    	http.get(url, function(res) {
    		var info = '';
			res.on('data', function (chunk) {
				info += chunk;
			}).on('end', function() {
				console.log('end:' + info);
				resXM.send(info);
			}).on('error', function(e) {
				console.log("Got error: " + e.message);
				resXM.send(e.message);
			});
    	}).on('error', function(e) {
    		console.log("Got error: " + e.message);
    		resXM.send(e.message);
    	});
	});
};

exports.transpond = function(req, resXM) {
	var info = '';
	
	req.addListener('data', function(chunk){
	      info += chunk;  
	   }).addListener('end', function(){
	  	var data = JSON.parse(info);
	  	
	  	console.log(data.domain);
	  	if(config.CN_Domain.indexOf(data.domain) >= 0){
//	  		console.log(config.CN_Domain + " config.CN_Domain");
			var path = config.CN + '&id=' + data.deckId + '&filename=' + data.filename + '&picture=' + data.picture.replace(/\+/g,"%2B");
	    	
			var url = "http://" + data.domain + path;
	    	
	    	console.log(url);
	    	http.get(url, function(res) {
	    		console.log("Got response: " + res.statusCode);
	    	}).on('error', function(e) {
	    		console.log("Got error: " + e.message);
	    	});
	  	}else if(config.BN_Domain.indexOf(data.domain) >= 0){
//	  		console.log(config.BN_Domain + " config.BN_Domain");
	  		var post_data = JSON.stringify({
		  		"cid" : data.deckId,
//		  		"name": data.filename, //Chinese sent wrong
		  		"base64": data.picture.substring(data.picture.indexOf(',') + 1),
		  		"user" : "lxpt",
		  		"password": "milu2008"
		  	});
	  		console.log(post_data);
			var str_length = function(str) {
			    return str.replace(/[^\x00-\xff]/g, "aa").length;
			}; 
			console.log(post_data.length);
			console.log(str_length(post_data));
			
			var post_options = {
	    			  host: data.domain,
	    			  path: config.BN,
	    			  method: 'POST',
	    			  headers: {
//	    		          'Content-Type': 'application/x-www-form-urlencoded'
	    		          "content-Type": "application/json; charset=UTF-8",
//	    		          "Content-Length": post_data。length
	    		          "Content-Length": str_length(post_data)
//	    		          "Transfer-Encoding": "chunked"
	    		      }
	    		};
			
			var post_req = http.request(post_options, function(res) {
//				console.log('STATUS: ' + res.statusCode);
//				console.log('HEADERS: ' + JSON.stringify(res.headers));
//				res.setEncoding('utf8');
					var info = '';
					res.on('data', function (chunk) {
						info += chunk;
					}).on('end', function() {
						console.log('end:' + info);
						resXM.send(info);
					}).on('error', function(e) {
						console.log("Got error: " + e.message);
					});
				});
//			 console.log(post_data);
			  // post the data
			post_req.write(post_data);
			post_req.end();
	  	};
	}).addListener('error', function(e) {
		console.log("Got error: " + e.message);
	});
};
