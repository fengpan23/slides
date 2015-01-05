var userModel = require('../models/userModel');
var http = require('http');

exports.main = {
    remove: function(){
        userModel.deckUser.remove();
    },
    userInfo: function(req, res){
        // var id = req.params.id; //use this id
        if(req.session.user){
            var userId =  req.session.user.uid;
            userModel.deckUser.findById(userId, function(result){
                console.log(result);
                if(result){
                    res.send({userId: userId, userName: result.userName});
                }else{
                    res.send(false);
                }
            });
        }else{
             res.send('load');
        }
    },
    updateUser: function(req, res){
        var id = req.params.id;
        var userData = req.body;
        console.log(userData);

        var userId = userData.userId;
        delete userData.userId
        userModel.deckUser.findByUserName(userData.userName, function(data){
            userData.password = data[0].password;
            userModel.deckUser.updateUser(userId, userData, function(result){
                res.send(result);
            });
        });

    },

    login: function(req, res) {
        var userData = req.body;
        // console.log(req);
        console.log(req.headers);
        userModel.deckUser.findByUserName(userData.userName, function(result){
            //not find this user
            // console.log(result);
            if(result){
                if(result.length === 0){
                    res.redirect('/login');
                    return;
                }
                if(result.locked){
                    res.redirect('/login');
                    return;
                }
                if(result.password === userData.password){
                    var user = {
                            uid : result._id,
                            userName: result.userName,
                            token: '123456789'
                        }; 
                    req.session.user = user;
                    res.redirect('piazza.html'); // goto the pmc?
                }else{
                    res.redirect('/login');
                }
            }else{
                //TODO: 发送错误数据至客户端
                res.redirect('/login');
            }
        });

        //认证
        // var theurl = "http://sso.lisys.cn:8080/uis/identity/authenticate?username=" + userData.userName + "&password=" + userData.password;
        // try {
        //     http.get(theurl, function(resLogin) {
        //         var infos = '';
        //         resLogin.on('data', function(data) {
        //             infos += data;
        //             // console.log("ON infos="+infos);
        //         }).on('end', function() {
        //             var theIndec = infos.indexOf("token.id=");
        //             if(theIndec!=0){
        //                 res.redirect('/login');
        //              }else{
        //                var paramList=infos.split("\n");
        //                var token = paramList[0].substring(9);
        //                var user = {
        //                         uid : userData.userName,
        //                         token: token
        //                     }; 
        //                 req.session.user = user;
        //                 res.redirect('/#list/all');
        //              }
        //         });
        //    }).on('error', function(e){
        //         console.log(e);
        //         res.redirect('/login');
        //    });
        // } catch(e) {
        //     console.log(e);
        //     res.redirect('/login');
        // } 

    },
    logout: function(req, res){
        delete req.session.user;
        res.redirect('/login');
    },
    signup: function(req, res) {
        var signupData = req.body;
        userModel.deckUser.findByUserName(signupData.userName, function(data){
            if(data){
               res.redirect('/login');
                    return;
            }else{
                userModel.deckUser.addUser(signupData, function(result){
                    // console.log(result);
                    if(result){
                        var user = {
                                uid : result._id,
                                userName: result.userName,
                                token: '123456789',
                            }; 
                        req.session.user = user;
                        res.redirect('/');
                    }
                });
            }

        });
    },

    loadLoginPage: function(req, res){
        res.render('login.ejs');
    },
    loadSignupPage: function(req, res){
        res.render('signup.ejs');
    }
};