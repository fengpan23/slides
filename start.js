var express = require('express'),
    path = require('path'),
    http = require('http');
var app = express(); 

app.set("jsonp callback", true);

app.use(express.cookieParser('sctalk admin manager'));
app.use(express.session({key: 'cloudSlide', cookie: {maxAge: 12*60*60*1000}, secret: 'keyboard cat'}));

app.use(express.logger('dev'));                      /* 'default', 'short', 'tiny', 'dev' */
app.use(express.bodyParser({uploadDir: "upload.tmp", limit: '50mb'}));// parses request body and populates req.body Request Entity limit 5mb
// app.use(express.bodyParser({limit: '50mb'}));
app.use(express.methodOverride());          // checks req.body for HTTP method overrides
app.use(app.router);                       // perform route lookup based on url and HTTP method
app.set('view engine', 'ejs');               // set up ejs for templates
app.set('views', __dirname + '/views');
app.use(express.errorHandler({ dumpExceptions:true, showStack:true })); // Show all errors
if(process.env.USE_PRODUCT){
    app.set('port', process.env.PORT || 8080);
    app.use(express.static(path.join(__dirname, 'dist')));
} else if(process.env.USE_TEST ){
    app.set('port', process.env.PORT || 3002);
    app.use(express.static(path.join(__dirname, 'dist')));
}else{
    app.set('port', process.env.PORT || 2323);
    app.use(express.static(path.join(__dirname, 'app')));
}
var filter = require('./server/filter');

var testAPI = require('./server/api/test');
    // app.get('/test', testAPI.saveBase64ToOpenStack);
    // app.get('/deleteComment', testAPI.deleteComment);
     // app.get('/drawCanvas', testAPI.drawCanvas);
     app.get('/openstack', testAPI.openstack);

var internalAPI = require('./server/api/internalAPI');
    // app.get('/', filter.authorize);
    app.get('/decks', internalAPI.findById);
    app.get('/search', internalAPI.searchByTag);
    app.post('/decks', internalAPI.addDeck);
    app.put('/decks', internalAPI.updateDeck);
    app.delete('/decks/:id', internalAPI.deleteDeck);
    // app.get('/all', internalAPI.findAllDeck);

var foreignAPI = require('./server/api/foreignAPI');
    app.get('/api/delete/:id', foreignAPI.deleteDeck);
    app.get('/api/search/:searchTag/:skip?/:limit?/:order?', foreignAPI.findByTag);
    app.put('/api/add', foreignAPI.addDeck);
    // app.get('/api/rename/:id/:name', foreignAPI.rename);
// app.get('/api/all', foreignAPI.findAllDeck);
//app.get('/api/find/:filename', foreignAPI.findByName);

var fileAPI = require('./server/api/fileAPI');
    app.post('/ppt', fileAPI.putFile);
    app.get('/ppt/:filename', fileAPI.getFile);

var fileStackAPI = require('./server/api/fileStackAPI');
    app.get('/file/load', fileStackAPI.loadFile);
    app.post('/file/upload', fileStackAPI.uploadFile);

var transformAPI = require('./server/api/transformAPI');
    app.get('/transform', transformAPI.transform);

var transpond = require('./server/api/transpond');
    app.post('/transpond', transpond.transpond);
    app.post('/transpond/lxUser', transpond.lxUser);
    app.get('/transpond/BaiduMusicSearch', transpond.bMusic);
    app.get('/transpond/BaiduMusicInfo', transpond.bMusicInfo);
    app.get('/transpond/bImage', transpond.bImageInfo);

var user = require('./server/module_user/main');
    app.get('/login', user.main.loadLoginPage); //发送登陆页面
    app.get('/signup', user.main.loadSignupPage); //发送用户注册页面

    app.post('/login', user.main.login); //验证用户登陆
    app.get('/logout', user.main.logout); //用户退出
    app.post('/signup', user.main.signup); //对用户注册信息操作

    //用户id保存在服务端了，所以请求中未包含用户请求id
    app.get('/userInfo', user.main.userInfo);
    app.put('/userInfo/:id', filter.authorize, user.main.updateUser);
    app.post('/userInfo', filter.authorize, user.main.updateUser);

    app.get('/remove', user.main.remove);

var user = require('./server/module_edit/main');
    app.get('/edit', user.main.edit);
    app.get('/edit/getTemplate', user.main.getTemplate);
    app.get('/edit/userTemplates', user.main.userTemplates);
    app.put('/edit/addTemplates', user.main.addTemplate);
    app.post('/edit/updateTemplates', user.main.updateTemplate);
    app.delete('/edit/deleteTemplate/:_id', user.main.deleteTemplate);

var pmc = require('./server/module_pmc/main');
    app.get('/pmc', filter.authorize, pmc.main.pmc);
    
var pmcController = require('./server/module_pmc/DeckController');
    app.post('/pmc/addfolder', filter.authorize, pmcController.controller.addFolder);
    app.post('/pmc/updatafolder', filter.authorize, pmcController.controller.updataFolder);
    app.get('/pmc/userfolders', filter.authorize, pmcController.controller.findUserFolders);
    app.delete('/pmc/folder/:id', filter.authorize, pmcController.controller.deleteFolder);
    app.get('/pmc/folder/decks', filter.authorize, pmcController.controller.userFolderDecks);
    app.get('/pmc/search', filter.authorize, pmcController.controller.search);
    app.get('/pmc/searchByTag', filter.authorize, pmcController.controller.searchByTag);
    app.post('/pmc/addDeck', filter.authorize, pmcController.controller.addDeck);

    // app.get('/pmc/decks/current', filter.authorize, pmcController.controller.findCurrent);
    app.post('/pmc/updateDeck',  filter.authorize, pmcController.controller.updateDeck);
    app.get('/pmc/userdecks',  filter.authorize, pmcController.controller.userDecks);
    app.get('/pmc/userTags',  filter.authorize, pmcController.controller.userTags);
    app.get('/pmc/deleteTags', filter.authorize, pmcController.controller.deleteTags);
    app.get('/pmc/decks',  filter.authorize, pmcController.controller.decks);

    app.get('/pmc/checkHandle', filter.authorize, pmcController.controller.checkHandle);
    app.post('/pmc/shareHandle', filter.authorize, pmcController.controller.shareHandle);

var piazza = require('./server/module_piazza/main');
    app.get('/piazza/search', piazza.search);
    app.post('/piazza/share', piazza.share);
    app.post('/piazza/report', piazza.report);
    app.post('/piazza/collect', piazza.collect);
    app.get('/piazza/preview', piazza.preview);
    app.post('/piazza/addComment', piazza.addComment);
    app.post('/piazza/love', piazza.love);

var preview = require('./server/module_preview/main');
    app.get('/preview/display/:id', preview.display);
    app.get('/preview/:id', preview.preview);


var admin = require('./server/module_admin/main');
    app.get('/admin', filter.adminAuthorize, admin.main.admin);  //页面转发
    app.get('/decklist', filter.adminAuthorize, admin.main.decklist); //页面转发
    app.get('/userlist', filter.adminAuthorize, admin.main.userlist); //页面转发
    app.get('/usernotice', filter.adminAuthorize, admin.main.usernotice); //页面转发
    app.get('/applications', filter.adminAuthorize, admin.main.applications); //页面转发

    app.post('/admin/login', admin.main.login);
    app.get('/admin/login', admin.main.login);

    app.get('/admin/alluser', filter.adminAuthorize, admin.allUser); //获取所有课件用户
    app.post('/admin/updateuser', filter.adminAuthorize, admin.updateUser);
    app.get('/admin/alldeck', filter.adminAuthorize, admin.allDeck); //获取所有课件
    app.post('/admin/deleteDeckByIds', filter.adminAuthorize, admin.deleteDeckByIds);

    console.log(app.routes)
    // app.route('/ttt').all(function(req, res, next) {
    //     console.log('all');
    //   // runs for all HTTP verbs first
    //   // think of it as route specific middleware!
    // }).get(function(req, res, next) {
    //     console.log('get');
    //   // runs for all HTTP verbs first
    //   // think of it as route specific middleware!
    // }).post(function(req, res, next) {
    //     console.log('post');
    //   // runs for all HTTP verbs first
    //   // think of it as route specific middleware!
    // }).put(function(req, res, next) {
    //     console.log('put');
    //   // runs for all HTTP verbs first
    //   // think of it as route specific middleware!
    // });
    console.log(process);
    
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
