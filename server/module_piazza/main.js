var deck = require('../models/deckModel');
var user = require('../models/userModel');
var nodemailer = require('nodemailer');
exports.search = function(req, res){
	var searchTag = req.query.tag;
	var tag = {};
	//输入搜索的searchTag为纯数字，进入搜索最近天数。 以纯数字作为文件名的情况,可忽略。
	if(/^\d+$/.test(searchTag)){ //'number'
		var date = new Date();
		var section = date.getDate() - parseInt(searchTag);
			date.setDate(section);
		// tag = {createTime: {$gte: start, $lt: end}};
		tag = {outwardTime: {$gte: date}};
	}else if(typeof searchTag === 'object'){
		tag = searchTag;
	}else if(searchTag === 'user'){
		tag = {'uid': req.query.uid};
	}else if(searchTag === 'Chinese' || searchTag ==='Art' || searchTag === 'English' || searchTag === 'Math'){
		tag = {'type': searchTag};
	}else{
		tag = {'filename': {$regex: searchTag, $options: 'i'}};
	}
	var page = parseInt(req.query.page);
	var limit = parseInt(req.query.limit || 20);
	var order = JSON.parse(req.query.order);
	var skip = limit * (page - 1);

	tag.outward = true;

	deck.deckModel.findAppoint(tag, skip, limit, order, function(result){
		// console.log(result);
		var data = [];
        result.data.forEach(function(item) {
            data.push({_id: item._id, fid: item.fid, uid: item.uid, uname: item.uname, filename: item.filename, comments: item.comments, loveCount: item.loveCount, viewCount: item.viewCount, picture: item.picture});
        });
        result.data = data;
		res.send(result);
	});
};
exports.share = function(req, res){
	var toEmail = req.body.toEmail;
	var deckId = req.body.deckId;
	// deck.deckModel.findById(deckId, function(data){
	// 	delete data._id;
	// 	if(data.sharetimes){
	// 		data.sharetimes += 1;
	// 	}else{
	// 		data.sharetimes = 1;
	// 	}
	// 	data.save(function (err, product, numberAffected) {
	// 		if (err){
	// 			console.log(err);
	// 		}else{
	// 			console.log(product);
	// 		}
	// 	});
	// });
	var transport = nodemailer.createTransport("SMTP", {
	    	host: "pod51022.outlook.com",
	    	//secureConnection: false, // use SSL
	    	//port: 587, // port for secure SMTP
	    	auth: {
	        	user: "notice@lisystec.com",
	        	pass: "xe5RJS4C"
	    	}
		});
	var url="http://" + req.headers.host + "/preview/display/" + deckId;
	var htm= "<a href='" + url + "'>点击查看课件</a>";
	var sendMessage={
	    from: "notice@lisystec.com",
	    to: toEmail, 
	    subject: "领新教育@云课件分享",
	    generateTextFromHTML: true,
	    html: htm
	};
	transport.sendMail(sendMessage, function(error, response){
	    if(error){
	        console.log(error);
	        res.send(false)
	    }else{
	        console.log("Message sent: " + response.message);
	        res.send('success');
	    }
	    transport.close();
	});	
};
exports.report = function(req, res){
	var deckId = req.body.deckId;
	var report = {};
	report.message = req.body.message;
	report.type = req.body.type;
	// report.uid = req.body.uid;
	// console.log(report);
	deck.deckModel.findById(deckId, function(data){
		var uid = data.uid;
		if(uid){
			user.deckUser.findById(uid, function(result){
				if(result.cheaters){
					result.cheaters += 1; 
				}else{
					result.cheaters = 1;
				}
				user.deckUser.update(uid, {$set:{cheaters: result.cheaters}}, function(result0){
					console.log(result0);
				});
			});
		};
		if(!data.report){
			data.report = [];
		}
		data.report.push(report);
		data.save(function (err, product, numberAffected) {
			if (err){
				console.log(err);
			}else{
				// console.log(product);
				res.send('success');
			}
		});
	});
};
exports.collect = function(req, res){
	var deckId = req.body.deckId;
	var folderId = req.body.folderId;
	var uid = req.body.uid; //下载别人的课件是否需要添加此字段???

    deck.deckModel.findAppoint({uid: uid}, 0, null, null, function(result){
        user.deckUser.findById(uid, function(user){
            if(user.limitDeck > result.count){

            	deck.deckModel.findById(deckId, function(data){
					data.totaldowns += 1;
					data.save(function (err, product, numberAffected) {
						if (err){
							console.log(err);
						}else{
							// console.log(product);
						}
					});
					var newDeck = {};
					newDeck.fid = folderId;
					newDeck.uid = uid;
					newDeck.filename = data.filename;
					newDeck.type = data.type;
					newDeck.slides = data.slides;
					newDeck.activeSlide = data.activeSlide;
					newDeck.background = data.background;
					newDeck.picture = data.picture;
					newDeck.surface = data.surface;
					newDeck.previewText = data.previewText;

					deck.deckModel.addDeck(newDeck, function(re){
						if(re._id){
                			res.send({status: 1, limitDeck: user.limitDeck, createdCount: result.count});
						}else{
							res.send({status: 0, message: "add deck fail"});
						}
					})
				});
            }else{
                res.send({status: 0, message: "creat deck more then limit"});
            }
        });
    });         
};
exports.addComment = function(req, res){
	var comment = req.body.comment;
	var deckId = req.body.deckId;
	comment.ctime = new Date();
	deck.deckModel.findById(deckId, function(data){
		data.comments.push(comment);
		data.save(function(err, product, numberAffected){
			if (err){
				console.log(err);
				data.comments = [];
				data.comments.push(comment);
				data.save(function(err, product, numberAffected){
					console.log(err);
				});
			}else{
				// console.log(product);
				res.send({state: 200, message: 'success', comments: product.comments});
			}
		});
	});
};
exports.preview = function(req, res){
	var deckId = req.query.deckId;
	deck.deckModel.findById(deckId, function(result){
		console.log(result.viewCount);
		result.viewCount += 1;
		result.save(function (err, product, numberAffected) {
			if (err){
				console.log(err);
			}else{
				// console.log(product);
			}
		});
		res.send(result);	
	});
};
exports.love = function(req, res){
	var deckId = req.body.deckId;
	deck.deckModel.findById(deckId, function(result){
		console.log(result.loveCount);
		result.loveCount += 1;
		result.save(function (err, product, numberAffected) {
			if (err){
				console.log(err);
			}else{
				// console.log(product);
			}
		});
		res.send({state: 200, message: "success"});	
	});
};