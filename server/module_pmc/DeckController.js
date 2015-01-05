var deck = require('../models/deckModel');
var userModel = require('../models/userModel');
var folder = require('../models/folderModel');

exports.controller = {
    addFolder: function(req, res){
        // console.log(req.body);
        var user = req.session.user;
        var uid = user.uid;
        var folderData = req.body;
        folderData.uid = uid;
        folder.folderModel.count(uid, function(result){
            if(result){
                folderData.index = result + 1;
            }
            folder.folderModel.add(folderData, function(result){
                res.send(result);
            });
        });
    },
    deleteFolder: function(req, res){
        var folderId = req.params.id;
        folder.folderModel.remove(folderId, function(data){
            res.send(data);
        });
    },
    updataFolder: function(req, res){
        var folderData = req.body;
        var updataId = folderData._id;
        delete folderData._id;
        folder.folderModel.update(updataId, folderData, function(result){
            res.send(result);
        });
    },
    findUserFolders: function(req, res){
        var user = req.session.user;
        var uid = user.uid;
        folder.folderModel.findByUid(uid, function(result){
            res.send(result);
        });
    },
    userDecks: function(req, res){
        //用户的所以课件不包括回收站的课件
        var tag = {$and: [{uid: req.query.uid}, {fid: {$ne: req.query.trushId}}]};
        var skip = parseInt(req.query.skip);
        var limit = parseInt(req.query.limit);
        var order = {filename: -1};
        deck.deckModel.findAppoint(tag, skip, limit, order, function(result){
            var data = [];
            result.data.forEach(function(item) {
                data.push({
                    _id: item._id, 
                    fid: item.fid,
                    uid: item.uid,
                    filename: item.filename,
                    picture: item.picture,
                    tag: item.tag,
                    last_modified: item.last_modified,
                    outward: item.outward,
                });
            });
            res.send(data);
        });
    },
    userTags: function(req, res){
        var uid = req.query.uid;
        var query = {uid: uid};
        var fid = req.query.fid;
        var trushId = req.query.trushId;
        if(fid){
            query.fid = fid;
        }
        if(trushId){
            query.fid = {$ne: trushId};
        }
        deck.deckModel.findField(query, function(result){
            // console.log(result.tag);
            var tags = [];
            result.forEach(function(item) {
                if(item.tag){
                    tags = tags.concat(item.tag.split(/[,\n\s，]+/));
                }
            });
            res.send(tags);
        });
    },
    deleteTags: function(req, res){
        var tag = req.query.tag;
        var fid = req.query.fid;
        var uid = req.query.uid;
        var trushId = req.query.trushId;

        var query = {};
        if(fid){
            query.fid = fid;
        }
        if(trushId){
            query.uid = uid;
            query.fid = {$ne: trushId};
        }
        deck.deckModel.findField(query, function(result){
            result.forEach(function(item) {
                if(item.tag){
                    var tagArray = item.tag.split(/[,\n\s，]+/);
                    var tempArray = []
                    tagArray.forEach(function(t){
                        if(t !== tag){
                            tempArray.push(t);
                        }   
                    });
                    item.tag = tempArray;
                    item.save();
                }
            });
            res.send({status: "success"});
        });
    },
    userFolderDecks: function(req, res){
        var uid = req.query.uid;
        var tag = {fid: req.query.fid};
        deck.deckModel.findAppoint(tag, 0, 50, {}, function(result){
            var data = [];
            result.data.forEach(function(item) {
                data.push({
                    _id: item._id,
                    fid: item.fid,
                    uid: item.uid,
                    filename: item.filename,
                    picture: item.picture,
                    tag: item.tag,
                    last_modified: item.last_modified,
                    outward: item.outward,
                });
            });
            res.send(data);
        });
    },
    // findCurrent: function(req, res){
    //     deck.deckModel.findCurrent(20, function(result){
    //         console.log(result);
    //     });
    // },
    searchByTag: function(req, res){
        var tag = req.query.tag;
        var uid = req.query.uid;
        var fid = req.query.fid;
        var trashId = req.query.trashId;

        var query = {uid: uid, tag: {$regex: tag, $options: 'i'}};
        if(fid){
            query.fid = fid;
        }
        if(trashId){
            query.$and = [{uid: uid}, {fid: {$ne: trashId}}];
        }
        //{ "$or" : [ { "user" : "jhon"} , { "owner" : "jhon"}]}
        deck.deckModel.findAppoint(query, 0, 50, {}, function(result){
            var data = [];
            result.data.forEach(function(item) {
                data.push({
                    _id: item._id,
                    fid: item.fid,
                    uid: item.uid,
                    filename: item.filename,
                    outward: item.outward,
                    tag: item.tag,
                    picture: item.picture,
                    last_modified: item.last_modified
                });
            });
            res.send(data);
        });
    },

    search: function(req, res){
        var tag = req.query.tag;
        var uid = req.query.uid;
        var fid = req.query.fid;
        var trashId = req.query.trashId;

        var query = {uid: uid, "$or": [{filename: {$regex: tag, $options: 'i'}}, {tag: {$regex: tag, $options: 'i'}}],};
        if(fid){
            query.fid = fid;
        }
        if(trashId){
            query.$and = [{uid: uid}, {fid: {$ne: trashId}}];
        }
        //{ "$or" : [ { "user" : "jhon"} , { "owner" : "jhon"}]}
        deck.deckModel.findAppoint(query, 0, 50, {}, function(result){
            var data = [];
            result.data.forEach(function(item) {
                data.push({
                    _id: item._id,
                    fid: item.fid,
                    uid: item.uid,
                    filename: item.filename,
                    outward: item.outward,
                    tag: item.tag,
                    picture: item.picture,
                    last_modified: item.last_modified
                });
            });
            res.send(data);
        });
    },
    decks: function(req, res){
        var tag = req.query.tag;
        var sort = req.query.sort;
        var fid = req.query.fid;
        var page = req.query.page;
        var query = {};
        if(tag){
            query.$or = [{filename: {$regex: tag, $options: 'i'}}];
        }
        query.uid =  req.query.uid;
        if(fid){
            query.fid = fid;
        }
        deck.deckModel.findAppoint(query, 0, 20, sort, function(result){
            var data = [];
            result.data.forEach(function(item) {
                data.push({
                    _id: item._id,
                    fid: item.fid,
                    uid: item.uid,
                    filename: item.filename,
                    outward: item.outward,
                    tag: item.tag, 
                    picture: item.picture,
                    last_modified: item.last_modified
                });
            });
            res.send(data);
        });
    },

    checkHandle: function(req, res){
        var uid = req.query.uid;
         deck.deckModel.findAppoint({uid: uid}, 0, null, null, function(result){
            userModel.deckUser.findById(uid, function(user){
                if(user.limitDeck > result.count){
                    res.send({status: 1, limitDeck: user.limitDeck, createdCount: result.count});
                }else{
                    res.send({status: 0, message: "creat deck more then limit"});
                }
            });
        });             
    },
    shareHandle: function(req, res){
        var data = req.body;
        var uid = data.uid;
        var id = data._id;

        delete data._id;
        if(!data.outward){
            deck.deckModel.updateDeck(id, data, function(result) {
                res.send(result);
            });
        }else{
            userModel.deckUser.findById(uid, function(user){
                var dim_dd = new Date().getDate() - new Date(user.latestShareTime).getDate();
                // var dim_dd = 1;
                // console.log(Math.abs(dim_dd));
                // console.log(user.shareTimes);
                if(Math.abs(dim_dd) !== 0){
                    user.shareTimes = 0;
                }
                if(user.limitShare > user.shareTimes){
                    user.shareTimes +=1;
                    user.latestShareTime = new Date().getTime();
                    user.save();

                    data.outwardTime = Date();
                    deck.deckModel.updateDeck(id, data, function(result) {
                        res.send(result);
                    });
                }else{
                    res.send({status: 0, message: "Share more than limit"});
                }
            });
        }

    },
    //add user deck
    addDeck: function(req, res){
        var data = req.body;//classify
        data.tag = data.tag.replace(/[,\n\s，]+/g, ',');
        deck.deckModel.addDeck(data, function(d) {
            res.redirect('/edit/#deck/' + d._id);
            //TODO update folder count at folder model
            // folder.folderModel.findById(fid, function (err, doc) {
            //     if(err){
            //         console.log(err);
            //         return;
            //     }
            //     doc.numberFiles += 1;
            //     doc.save(function (err, product, numberAffected) {
            //         if(err){
            //             console.log(err);
            //         }
            //     });
            // })
        });
    },

    updateDeck: function(req, res){
        var data = req.body;
        var id = data._id;

        delete data._id;
        deck.deckModel.updateDeck(id, data, function(result) {
            res.send(result);
        });
    },
};