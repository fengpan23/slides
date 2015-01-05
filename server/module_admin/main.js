var deck = require('../models/deckModel');
var user = require('../models/userModel');

exports.main = {
    login: function(req, res){
        console.log(req.body)
        if(!req._body){
            res.render('backstage/adminlogin.ejs');
            return;
        }
        var userName = req.body.userName;
        var password = req.body.password;
        if(userName === 'admin' && password === 'admin'){
            req.session.user = userName;
            res.redirect('admin');
        }else{
            res.render('backstage/adminlogin.ejs');
            return;
        }
    },
    admin: function(req, res) {
        res.render('backstage/admin.ejs');
    },
    decklist: function(req, res){
        res.render('backstage/decklist.ejs');
    },
    userlist: function(req, res){
        res.render('backstage/userlist.ejs');
    },
    usernotice: function(req, res){
        // res.render('backstage/admin.ejs');
    },
    applications: function(req, res){
        // res.render('backstage/admin.ejs');
    },
};
exports.allDeck = function(req, res){
    // console.log(req.query);
    //skip(number),limit(number),tag(obj(filename: /asd/)),order(obj({filename: -1}))
    var page = parseInt(req.query.page);
    var limit = parseInt(req.query.limit);
    var skip = (page - 1) * limit;
    var tag = req.query.tag;
    // console.log(req.query.order);
    var order = JSON.parse(req.query.order);
    // console.log(typeof order.filename); 排序方式 1 或者 -1 必须为number
    if(tag){
        tag = {filename: {$regex: tag, $options:'i'}};
    }else{
        tag = {};
    }
    deck.deckModel.findAppoint(tag, skip, limit, order, function(result){
        if(result.data){
            var data = [];
            result.data.forEach(function(item){
                if(item.report){
                    var reportNub = item.report.length
                }else{
                    var reportNub = 0;
                }
                data.push({_id: item._id, filename: item.filename, uid: item.uid, report: reportNub, favtimes: item.favtimes});
            })
            if(order.report){
                data.sort(function(a, b){
                    return order.report * (a.report - b.report);
                });
            }
            result.data = data;
            res.send(result);
        }else{
            console.log('find appoint deck error ');
        }
    });
};
exports.allUser = function(req, res){
    var page = parseInt(req.query.page);
    var limit = parseInt(req.query.limit);
    var skip = (page - 1) * limit;
    var tag = req.query.tag;
    // console.log(req.query.order);
    var order = JSON.parse(req.query.order);
    // console.log(typeof order.filename); 排序方式 1 或者 -1 必须为number
    user.deckUser.findAppoint(tag, skip, limit, order, function(result){
        // console.log(result);
        if(result){
            res.send(result);
        }else{
            console.log('find appoint deck error ');
        }
    });
};
exports.updateUser = function(req, res){
    // console.log(req.body);
    var deckIds = req.body.deckIds;
    var lockState = req.body.lockState;
    if(deckIds.length > 0){
        deckIds.forEach(function(item, i){
            user.deckUser.update(item, {locked: lockState}, function(result){
                if(deckIds.length === (i + 1)){
                    res.jsonp(result);
                }
            });
        });
    }
};
exports.deleteDeckByIds = function(req, res){
    var deckIds = req.body.deckIds;
    // console.log(deckIds);
    if(deckIds.length > 0){
        deckIds.forEach(function(item, i){
            deck.deckModel.deleteDeck(item, function(result){
                if(deckIds.length === (i + 1)){
                    res.jsonp(result);
                }
            });
        });
    }
};