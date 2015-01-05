define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["deck_list/DeckList"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n	<div class=\"deckItem\" index=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-id=\"";
  if (helper = helpers._id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0._id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n		<div class=\"itemHeader\">\r\n		</div>\r\n		<div class=\"itemBodyer\">\r\n			<div class=\"display\">\r\n				<span class=\"delete\"></span>\r\n				<span class=";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.outward), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\r\n				<span class=\"edit\"></span>\r\n				<span class=\"moveTo\">\r\n					<a class=\"dropdown-toggle move\" data-toggle=\"dropdown\"></a>\r\n					<ul class=\"dropdown-menu\">\r\n						<div class=\"moveToBar\">移动到...</div>\r\n						<li class=\"divider\"></li>\r\n						<div class=\"moveToList\">\r\n						</div>\r\n					</ul>\r\n				</span>\r\n			</div>\r\n			<img src=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.picture), {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\r\n			<i class=\"tagSwitch\"></i>\r\n			<div class=\"tag-bar\">\r\n				";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.tags), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n				<span class=\"inputTag\">\r\n					<input type=\"text\" pattern=\"[^?!@#$%\\\\^&*(),\\n\\s，]+\" maxlength=\"5\"></input>\r\n				</span>\r\n				<span class=\"tag addTag\">+</span>\r\n			</div>\r\n		</div>\r\n		<div class=\"itemFooter\">\r\n			<div class=\"filename\" title=\"";
  if (helper = helpers.filename) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.filename); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-toggle=\"tooltip\" data-placement=\"bottom\">";
  if (helper = helpers.showFilename) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.showFilename); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\r\n			<div class=\"last_modified\">\r\n				<i class=\"last-modified-icon\"></i>\r\n				<span class=\"timeDetail\">";
  if (helper = helpers.last_modified) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.last_modified); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n			</div>\r\n		</div>\r\n	</div>\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "\"cloud-icon-cancelShare\" title=\"取消公开\"";
  }

function program4(depth0,data) {
  
  
  return "\"cloud-icon-share\" title=\"公开\"";
  }

function program6(depth0,data) {
  
  var stack1, helper;
  if (helper = helpers.picture) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.picture); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  return escapeExpression(stack1);
  }

function program8(depth0,data) {
  
  
  return "styles/img/default.jpg";
  }

function program10(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n				<span class=\"tag\" title=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\r\n					<span class=\"delete-btn\">x</span>\r\n				</span>\r\n				";
  return buffer;
  }

  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["JST"]["deck_list/MenuLi"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n	<li class=\"classify\" id=\"";
  if (helper = helpers._id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0._id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"><a>";
  if (helper = helpers.folderName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.folderName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></li>\r\n";
  return buffer;
  }

  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["JST"]["deck_list/NewDeck"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"newDeck\"></div>\r\n";
  });

this["JST"]["deck_list/TrashList"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n	<div class=\"deckItem\" index=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-id=\"";
  if (helper = helpers._id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0._id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n		<div class=\"itemHeader\">\r\n			<span class=\"cloud-icon\"/>\r\n			<span class=\"filename\" title=\"";
  if (helper = helpers.filename) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.filename); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-toggle=\"tooltip\" data-placement=\"top\">";
  if (helper = helpers.showFilename) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.showFilename); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n			<span class=\"delete\"></span>\r\n		</div>\r\n		<div class=\"itemBodyer\">\r\n			<div class=\"restore\"/>\r\n			<img src=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.picture), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\r\n		</div>\r\n		<div class=\"itemFooter\">\r\n			<div class=\"moveTo\">\r\n				<a class=\"dropdown-toggle move\" data-toggle=\"dropdown\"></a>\r\n				<ul class=\"dropdown-menu moveToList\">\r\n					<div class=\"moveToBar\">恢复到...</div>\r\n					<li class=\"divider\"></li>\r\n					<div class=\"moveToList\">\r\n					</div>\r\n				</ul>\r\n			</div>\r\n		</div>\r\n	</div>\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var stack1, helper;
  if (helper = helpers.picture) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.picture); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  return escapeExpression(stack1);
  }

function program4(depth0,data) {
  
  
  return "styles/img/default.jpg";
  }

  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["JST"]["header/Header"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"container\">\r\n	<div class=\"header_left\">\r\n		<div class=\"logo\">\r\n			<a href=\"/piazza.html\" target=\"_parent\" title=\"主页\"></a>\r\n		</div>\r\n		<div class=\"inform\">\r\n			<span class=\"inform-ico\"></span>通知:\r\n		</div>\r\n	</div>\r\n	<div class=\"header_right\">\r\n		<div class=\"user_message\">\r\n			<span class=\"user\"></span>\r\n			<span class=\"userDrop-ico\" data-toggle=\"dropdown\"></span>\r\n			<ul class=\"dropdown-menu\">\r\n				<li><a class=\"logout\" href=\"/logout\">退出登陆</a></li>\r\n			</ul>\r\n		</div>\r\n		<div class=\"setting\"></div>\r\n	</div>\r\n</div>\r\n";
  });

this["JST"]["main_content/MainContent"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"searchBar\">\r\n	<input type=\"text\" placeholder=\"搜   索   课   件\"/>\r\n	<input type=\"button\" value=\"搜索\"/>\r\n</div>\r\n<div class=\"listState\">\r\n	<span class=\"stateContent\">所有课件</span>\r\n</div>\r\n<div class=\"expandMenu\">\r\n	<div class=\"import\" title=\"导入课件\"></div>\r\n	<div class=\"moreFeatures\">\r\n		<a class=\"dropdown-toggle more\" data-toggle=\"dropdown\"></a>\r\n		<ul class=\"dropdown-menu\">\r\n			<li class=\"deleteFolder\"><a>删除文件夹</a></li>\r\n			<li class=\"sortDeck\" sort-type=\"filename\" des=\"1\"><a>按文件名排序</a></li>\r\n			<li class=\"sortDeck\" sort-type=\"last_modified\" des=\"1\"><a>按时间排序</a></li>\r\n			<li class=\"disabled\"><a>导入课件</a></li>\r\n		</ul>\r\n	</div>\r\n</div>\r\n";
  });

this["JST"]["menu_list/Menu"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"pmc_menu\">\r\n	<ul>\r\n		<li><i class=\"default-ico\"/><div class=\"classify alldeck\" data-type=\"all\">所有课件<span class=\"deck-number\"></span></div></li>\r\n		<li class=\"open\"><i class=\"classify-ico\" title=\"从云端同步\"/>\r\n			<div>我的文件夹<i class=\"addClassify\"/></div>\r\n			<div class=\"error\">已有此文件夹</div>\r\n			<span class=\"addClassifyBar\">\r\n				<input type=\"text\" class=\"classInputBar\" maxlength=\"20\"/>\r\n			</span>\r\n			<ul class=\"userFolder\">\r\n			</ul>\r\n		</li>\r\n		<li>\r\n			<i class=\"removed-ico\"/>\r\n			<div class=\"classify trashdeck\" data-type=\"trash\">垃圾篓\r\n				<span class=\"deck-number\"></span>\r\n			</div>\r\n		</li>\r\n	</ul>\r\n</div>\r\n<div class=\"pmc_tag\">\r\n	<div class=\"tag-header\">\r\n		<i></i>\r\n		<span class=\"tag-text\">标签</span>\r\n		<span class=\"getTag\">刷新</span>\r\n		<button>删除</button>\r\n	</div>\r\n	<div class=\"tagContainer\">\r\n	</div>\r\n</div>";
  });

this["JST"]["menu_list/MenuLi"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n<li data-type=\"";
  if (helper = helpers.folderName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.folderName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"classify\" id=\"";
  if (helper = helpers._id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0._id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.folderName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.folderName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n	<span class=\"deck-number\">";
  if (helper = helpers.numberFiles) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.numberFiles); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n</li>\r\n";
  return buffer;
  }

  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["JST"]["models/add_deck/AddDeck"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"modal-header\">\r\n	<button class=\"close\" data-dismiss=\"modal\">×</button>\r\n	<h3><span class=\"userClassify\"></span> > <span class=\"tool-title\"><i></i>新建课件</span></h3>\r\n</div>\r\n<form action=\"pmc/addDeck\" method=\"post\" autocomplete=\"on\" target=\"view_frame\">\r\n<div class=\"modal-body\">\r\n		<input name=\"uid\" value=\"\" type=\"hidden\">\r\n		<input name=\"uname\" value=\"\" type=\"hidden\">\r\n		<input name=\"fid\" value=\"\" type=\"hidden\">\r\n		<div class=\"filenameBar\">\r\n			<span>课件名：</span><input type=\"text\" name=\"filename\" required=\"yes\"/>\r\n		</div>\r\n		<div class=\"typeBar\">\r\n			<span>类  型：</span>\r\n			<select name=\"type\">\r\n				<option value=\"Default\">默认</option>\r\n			  	<option value=\"Chinese\">语文</option>  \r\n			  	<option value=\"Math\">数学</option>  \r\n			  	<option value=\"English\">英语</option>  \r\n			  	<option value=\"Art\">美术</option>  \r\n			</select>\r\n		</div>\r\n		<div class=\"tagBar\">\r\n			<div class=\"message\"></div>\r\n			<span>标  签： </span><input type=\"text\" name=\"tag\" placeholder=\"多标签中间加逗号或空格\" maxlength=\"25\"/>\r\n		</div>\r\n</div>\r\n<div class=\"modal-footer\">\r\n	<input type=\"button\" value=\"开始编辑\" />\r\n	<i class=\"edit-icon\"></i>\r\n</div>\r\n</form>\r\n";
  });

this["JST"]["models/callboard/Callboard"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div>\r\n</div>";
  });

this["JST"]["models/import/Import"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"import_header\">\r\n	<button class=\"close\" data-dismiss=\"modal\">×</button>\r\n	<h3>上传课件</h3>\r\n</div>\r\n<div class=\"import_bodyer\">\r\n	<input type=\"file\"/>\r\n</div>\r\n<div class=\"import_footer\">\r\n	<button>开始转换</button><button>取消</button>\r\n</div>\r\n";
  });

this["JST"]["models/preview/Preview"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"preview_header\">\r\n	<span class=\"cloud-icon\"></span>\r\n	<span class=\"filename\"></span>\r\n	<span class=\"playIndex\"></span>\r\n	<button class=\"close\" data-dismiss=\"modal\">×</button>\r\n</div>\r\n<div class=\"preview_bodyer\">\r\n	<iframe src=\"\"></iframe>\r\n	<div class=\"previous_page\"></div>\r\n	<div class=\"next_page\"></div>\r\n</div>\r\n<div class=\"preview_footer\">\r\n	<div class=\"jumpBar\">\r\n		预览第<input type=\"text\" maxlength=\"3\">页<input type=\"button\" value=\"GO\">\r\n	</div>\r\n</div>\r\n";
  });

return this["JST"];

});