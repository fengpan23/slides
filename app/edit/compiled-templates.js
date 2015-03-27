define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["header/Header"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"head-tool\">\r\n</div>";
  });

this["JST"]["module/addSlide/AddSlide"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"modal-header\">\r\n	<button class=\"close\">×</button>\r\n	<h3 class=\"title\">create slide</h3>\r\n</div>\r\n<div class=\"modal-body\" style=\"overflow: hidden\">\r\n	<div class=\"errors alert-error\"></div>\r\n	<div class=\"template-list\"></div>\r\n</div>\r\n<div class=\"modal-footer\">\r\n	<a href=\"#!\" class=\"btn btn-primary ok btn-inverse\">Ok</a>\r\n</div>";
  });

this["JST"]["module/setting/UserinfoModal"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-header\">\r\n	<h1>User Setting</h1>\r\n</div>\r\n<div class=\"modal-body\" style=\"overflow: hidden\">\r\n	<div class=\"title\">\r\n		<h3>Deck Title:</h3>\r\n		<input class=\"title-text\" value=\"";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"/>\r\n	</div>\r\n	<div class=\"description\">\r\n		<h3>Deck Description:</h3>\r\n		<textarea class=\"description-text\">";
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</textarea>\r\n	</div>\r\n	<div class=\"bg-audio\">\r\n		<h3>Background Music:</h3>\r\n		<input/>\r\n	</div>\r\n	<div class=\"auto-slide\">\r\n		<h3>Auto-Slide:</h3>\r\n		<select class=\"auto-slide-select\">\r\n			<option value=0>off</option>\r\n			<option value=2>2s</option>\r\n			<option value=4>4s</option>\r\n			<option value=6>6s</option>\r\n			<option value=8>8s</option>\r\n			<option value=10>10s</option>\r\n			<option value=15>15s</option>\r\n			<option value=30>30s</option>\r\n		</select>\r\n	</div>\r\n	<div class=\"auto-save\">\r\n		<h3>Auto-Save:</h3>\r\n		<select class=\"auto-save-select\">\r\n			<option value=0>off</option>\r\n			<option value=15>15s</option>\r\n			<option value=30>30s</option>\r\n			<option value=60>1min</option>\r\n			<option value=180 selected>3min</option>\r\n			<option value=300>5min</option>\r\n			<option value=600>10min</option>\r\n			<option value=900>15min</option>\r\n			<option value=1800>30min</option>\r\n		</select>\r\n	</div>\r\n	<div class=\"slide-well-scale\">\r\n		<h3 style=\"display: inline-block\">Slide-Well-Scale</h3>\r\n		<span class=\"tooltip-text\">(Hold 'Ctrl' and scroll wheel to change scale)</span></br>\r\n		<div class=\"slidewell-scale\"></div>\r\n		<span class=\"slidewell-scale-value\"></span>\r\n	</div>\r\n</div>\r\n<div class=\"modal-footer\">\r\n	<button class=\"btn cancel\">cancel</button>\r\n	<button class=\"btn ok\">Ok</button>\r\n</div>";
  return buffer;
  });

this["JST"]["module/share/ShareModal"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"modal-header\">\r\n	<h1>share</h1>\r\n</div>\r\n<div class=\"modal-body\" style=\"overflow: hidden\">\r\n	<div class=\"copy-link\">\r\n		<h3>link:</h3>\r\n		<input/>\r\n		<button class=\"btn copy\">Copy</button>\r\n	</div>\r\n	<div clas=\"send-email\">\r\n		<h3>Email:</h3>\r\n		<div class=\"email-detail\">\r\n			<div class=\"email-option\">\r\n				<span class=\"email-option-content\">to:</span>\r\n				<input type=\"email\"/>\r\n			</div>\r\n			<div class=\"email-option\">\r\n				<span class=\"email-option-content\">Content:</span>\r\n				<textarea></textarea></br>\r\n			</div>\r\n			<button class=\"btn send\">Send</button>\r\n		</div>\r\n	</div>\r\n</div>\r\n<div class=\"modal-footer\">\r\n	<button class=\"btn cancel\">cancel</button>\r\n	<button class=\"btn ok\">Ok</button>\r\n</div>";
  });

this["JST"]["module/style/StyleModal"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n			<li class=\"theme-item ";
  if (helper = helpers.klass) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.klass); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-theme=\"";
  if (helper = helpers.klass) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.klass); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></li>\r\n			";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n			<li class=\"transition-item ";
  if (helper = helpers.klass) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.klass); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-transition=\"";
  if (helper = helpers.klass) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.klass); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></li>\r\n			";
  return buffer;
  }

  buffer += "<div class=\"modal-body\" style=\"overflow: hidden\">\r\n	<div class=\"errors alert-error\"></div>\r\n	<div class=\"themes\">\r\n		<h1>Background Theme</h1>\r\n		<ul class=\"theme-list\">\r\n			";
  stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.themes)),stack1 == null || stack1 === false ? stack1 : stack1.themes)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		</ul>\r\n	</div>\r\n	<div class=\"transition\">\r\n		<h1>Transition</h1>\r\n		<ul class=\"transition-list\">\r\n			";
  stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.transition)),stack1 == null || stack1 === false ? stack1 : stack1.transition)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		</ul>\r\n	</div>\r\n</div>\r\n<div class=\"modal-footer\">\r\n	<button class=\"btn cancel\">cancel</button>\r\n	<button class=\"btn ok\">Ok</button>\r\n</div>";
  return buffer;
  });

this["JST"]["slideSnapshot/draw/Audio"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, helper, options, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n";
  stack1 = self.invokePartial(partials.ComponentContainer, 'ComponentContainer', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n<img style=\"width: 220px; height: 220px; ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.bgsound), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" src=\"edit/styles/img/player.png\"></img>\r\n</div>\r\n</div>\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "opacity: 0";
  }

  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.attributes) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.attributes); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.attributes) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["JST"]["slideSnapshot/draw/ComponentContainer"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "animate-step-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.animate)),stack1 == null || stack1 === false ? stack1 : stack1.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-animo=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.animate)),stack1 == null || stack1 === false ? stack1 : stack1.animo)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "rotate(";
  if (helper = helpers.rotate) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.rotate); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "rad)";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "skewX(";
  if (helper = helpers.skewX) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.skewX); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "rad)";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "skewY(";
  if (helper = helpers.skewY) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.skewY); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "rad)";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  stack1 = (helper = helpers.round || (depth0 && depth0.round),options={hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.scale)),stack1 == null || stack1 === false ? stack1 : stack1.width), options) : helperMissing.call(depth0, "round", ((stack1 = (depth0 && depth0.scale)),stack1 == null || stack1 === false ? stack1 : stack1.width), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "px";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  stack1 = (helper = helpers.round || (depth0 && depth0.round),options={hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.scale)),stack1 == null || stack1 === false ? stack1 : stack1.height), options) : helperMissing.call(depth0, "round", ((stack1 = (depth0 && depth0.scale)),stack1 == null || stack1 === false ? stack1 : stack1.height), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "px";
  return buffer;
  }

  buffer += "<div class=\"componentContainer ";
  if (helper = helpers.customClasses) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.customClasses); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.animate), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" style=\"top: ";
  stack1 = (helper = helpers.round || (depth0 && depth0.round),options={hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.y), options) : helperMissing.call(depth0, "round", (depth0 && depth0.y), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "px; left: ";
  stack1 = (helper = helpers.round || (depth0 && depth0.round),options={hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.x), options) : helperMissing.call(depth0, "round", (depth0 && depth0.x), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "px; -webkit-transform: ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rotate), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.skewX), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.skewY), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "; -moz-transform: ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rotate), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.skewX), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.skewY), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "; transform: ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rotate), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.skewX), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.skewY), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "; width: ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.scale), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "; height: ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.scale), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ";\">";
  return buffer;
  });

this["JST"]["slideSnapshot/draw/Image"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n";
  stack1 = self.invokePartial(partials.ComponentContainer, 'ComponentContainer', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.src), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>\r\n</div>\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n	<img src=\"";
  if (helper = helpers.src) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.src); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" style=\"opacity: ";
  if (helper = helpers.opacity) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.opacity); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "; width:";
  if (helper = helpers.width) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.width); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "px\">\r\n";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "\r\n	<div class=\"icon-picture\"></div>\r\n";
  }

  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.attributes) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.attributes); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.attributes) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["JST"]["slideSnapshot/draw/Shape"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, helper, options, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n";
  stack1 = self.invokePartial(partials.ComponentContainer, 'ComponentContainer', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	";
  options={hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data}
  if (helper = helpers.shapeSvg) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.shapeSvg); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.shapeSvg) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>\r\n</div>\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.attributes) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.attributes); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.attributes) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["JST"]["slideSnapshot/draw/TextBox"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n";
  stack1 = self.invokePartial(partials.ComponentContainer, 'ComponentContainer', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n<div class=\"antialias\" style=\"width:";
  if (helper = helpers.width) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.width); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "px; color: ";
  if (helper = helpers.textColor) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.textColor); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "; background:";
  if (helper = helpers.bgColor) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.bgColor); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "; line-height:";
  if (helper = helpers.lineSpacing) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.lineSpacing); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "; opacity: ";
  if (helper = helpers.opacity) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.opacity); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "; border: ";
  stack1 = ((stack1 = ((stack1 = (depth0 && depth0.border)),stack1 == null || stack1 === false ? stack1 : stack1.width)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "px ";
  stack1 = ((stack1 = ((stack1 = (depth0 && depth0.border)),stack1 == null || stack1 === false ? stack1 : stack1.style)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = ((stack1 = ((stack1 = (depth0 && depth0.border)),stack1 == null || stack1 === false ? stack1 : stack1.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "; border-radius: ";
  stack1 = ((stack1 = ((stack1 = (depth0 && depth0.border)),stack1 == null || stack1 === false ? stack1 : stack1.radius)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "px;\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.link), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  if (helper = helpers.text) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.text); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.link), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>\r\n</div>\r\n</div>\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "<a href=\"/preview_export/impress.html#/step-";
  if (helper = helpers.link) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.link); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "</a>";
  }

  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.attributes) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.attributes); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.attributes) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["JST"]["slideSnapshot/draw/Video"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, helper, options, self=this, functionType="function", escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n";
  stack1 = self.invokePartial(partials.ComponentContainer, 'ComponentContainer', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n<video controls>\r\n	<source src=\"";
  if (helper = helpers.src) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.src); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" type=\"";
  if (helper = helpers.srcType) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.srcType); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" preload=\"metadata\"></source>\r\n</video>\r\n</div>\r\n</div>\r\n";
  return buffer;
  }

  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.attributes) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.attributes); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.attributes) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["JST"]["slideSnapshot/draw/WebFrame"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, helper, options, self=this, functionType="function", escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n";
  stack1 = self.invokePartial(partials.ComponentContainer, 'ComponentContainer', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n<div class=\"icon-website\" style=\"font-size:";
  if (helper = helpers.height) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.height); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "px; width:";
  if (helper = helpers.width) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.width); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "px\"></div>\r\n</div>\r\n</div>\r\n";
  return buffer;
  }

  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.attributes) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.attributes); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.attributes) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["JST"]["slideSnapshot/SlideDrawer"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, helper, options, self=this, helperMissing=helpers.helperMissing, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n";
  stack1 = (helper = helpers.renderComponent || (depth0 && depth0.renderComponent),options={hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data},helper ? helper.call(depth0, depth0, "", options) : helperMissing.call(depth0, "renderComponent", depth0, "", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.components) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.components); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.components) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["JST"]["slideSnapshot/SlideSnapshot"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"thumbnail\">\r\n<div>";
  });

this["JST"]["toolkit/ToolbarList"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"toolbar\" data-type=\"add\"></div>\r\n<div class=\"toolbar\" data-type=\"edit\"></div>";
  });

this["JST"]["toolkit/UnitItem"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"unit-btn\" data-type=\"";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n	<div class=\"";
  if (helper = helpers.icon) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.icon); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></div>\r\n	<div>";
  if (helper = helpers.text) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.text); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\r\n</div>";
  return buffer;
  });

this["JST"]["unit/audio/Audio"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<!-- The jPlayer div must not be hidden. Keep it at the root of the body element to avoid any such problems. -->\r\n<div id=\"jquery_jplayer_";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"cp-jplayer\"></div>\r\n\r\n<!-- The container for the interface can go where you want to display it. Show and hide it as you need. -->\r\n\r\n<div id=\"cp_container_";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"cp-container\">\r\n	<div class=\"cp-buffer-holder\"> <!-- .cp-gt50 only needed when buffer is > than 50% -->\r\n		<div class=\"cp-buffer-1\"></div>\r\n		<div class=\"cp-buffer-2\"></div>\r\n	</div>\r\n	<div class=\"cp-progress-holder\"> <!-- .cp-gt50 only needed when progress is > than 50% -->\r\n		<div class=\"cp-progress-1\"></div>\r\n		<div class=\"cp-progress-2\"></div>\r\n	</div>\r\n	<div class=\"cp-circle-control\"></div>\r\n	<ul class=\"cp-controls\">\r\n		<li><a class=\"cp-play\" tabindex=\"1\">play</a></li>\r\n		<li><a class=\"cp-pause\" style=\"display:none;\" tabindex=\"1\">pause</a></li> <!-- Needs the inline style here, or jQuery.show() uses display:inline instead of display:block -->\r\n	</ul>\r\n	<span class=\"jp-current-time\"></span>\r\n	<span class=\"jp-duration\"></span>\r\n</div>";
  return buffer;
  });

this["JST"]["unit/audio/AudioTool"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, helper, options, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n<div class=\"edit-tool-list\">\r\n	<div class=\"tool-import\">\r\n		<div class=\"tool-content\">File:</div>\r\n		<div class=\"import-content\">\r\n			<input type=\"file\" title=\"upload file\" accept=\"audio/*\"/>\r\n			<span class=\"change-audio-btn\">upload</span>\r\n			<span class=\"filename\"></span>\r\n			<span class=\"upload-progress\"></span>\r\n		</div>\r\n	</div>\r\n	<div class=\"tool-search\">\r\n		<div class=\"tool-content\">Search:</div>\r\n		<div class=\"search-content\">\r\n			<input accept=\"audio/*\"/>\r\n		</div>\r\n	</div>\r\n	<div class=\"tool-bg-music-switch\">\r\n		<div class=\"tool-content\">As bgsound:</div>\r\n		<input type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.bgsound), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\r\n	</div>\r\n	<div class=\"tool-loop-switch\">\r\n		<div class=\"tool-content\">Loop:</div>\r\n		<input type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.loop), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\r\n	</div>\r\n</div>\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "checked";
  }

  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.attributes) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.attributes); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.attributes) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["JST"]["unit/audio/ComponentTool"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<span class=\"tl mark\" data-delta=\"width\"></span>\r\n<span class=\"tc mark\" data-delta=\"rotate\"></span>\r\n<span class=\"tr mark\" data-delta=\"rotate\"></span>\r\n<span class=\"cl mark\" data-delta=\"scale\"></span>\r\n<span class=\"cr mark\" data-delta=\"scale\"></span>\r\n<span class=\"bl mark\" data-delta=\"scale\"></span>\r\n<span class=\"bc mark\" data-delta=\"scale\"></span>\r\n<span class=\"br mark\" data-delta=\"scale\"></span>";
  });

this["JST"]["unit/frame/ComponentTool"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<span class=\"tl mark\" data-delta=\"size\" data-place=\"tl\"></span>\r\n<span class=\"tr mark\" data-delta=\"size\" data-place=\"tr\"></span>\r\n<span class=\"bl mark\" data-delta=\"size\" data-place=\"bl\"></span>\r\n<span class=\"br mark\" data-delta=\"size\" data-place=\"br\"></span>";
  });

this["JST"]["unit/frame/FrameTool"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n<div class=\"edit-tool-list\">\r\n	<div class=\"tool-href\">\r\n		<input type=\"input\" value=\"";
  if (helper = helpers.src) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.src); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" placeholder=\"please input url\"/>\r\n	</div>\r\n	<div class=\"tool-visit-switch\">\r\n		<div class=\"tool-content\">Visit:</div>\r\n		<div class=\"switch\">\r\n			<input type=\"checkbox\" name=\"toggle\">\r\n			<label for=\"toggle\"><i></i></label>\r\n			<span></span>\r\n	   </div>\r\n	</div>\r\n</div>\r\n";
  return buffer;
  }

  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.attributes) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.attributes); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.attributes) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["JST"]["unit/image/ComponentTool"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<span class=\"tl mark\" data-delta=\"size\"></span>\r\n<span class=\"tc mark\" data-delta=\"size\"></span>\r\n<span class=\"tr mark\" data-delta=\"size\"></span>\r\n<span class=\"cl mark\" data-delta=\"size\"></span>\r\n<span class=\"cr mark\" data-delta=\"size\"></span>\r\n<span class=\"bl mark\" data-delta=\"size\"></span>\r\n<span class=\"bc mark\" data-delta=\"size\"></span>\r\n<span class=\"br mark\" data-delta=\"size\"></span>";
  });

this["JST"]["unit/image/ImageTool"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n<div class=\"edit-tool-list\">\r\n	<div class=\"tool-import\">\r\n		<div class=\"status\">\r\n			<span class=\"import\">\r\n				<span class=\"icon-picture\"></span>\r\n				<span class=\"upload-btn\">upload</span>\r\n				<input type=\"file\" title=\"click upload file\" accept=\"image/*\"/>\r\n			</span>\r\n			<span class=\"progress\"></span>\r\n			<span class=\"replace\"></span>\r\n		</div>\r\n		<div class=\"content\">\r\n			<img src=\"";
  if (helper = helpers.src) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.src); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"/>\r\n		</div>\r\n	</div>\r\n</div>\r\n";
  return buffer;
  }

  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.attributes) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.attributes); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.attributes) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["JST"]["unit/shape/ComponentTool"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<span class=\"tl mark\" data-delta=\"size\" data-place=\"tl\"></span>\r\n<span class=\"tr mark\" data-delta=\"size\" data-place=\"tr\"></span>\r\n<span class=\"bl mark\" data-delta=\"size\" data-place=\"bl\"></span>\r\n<span class=\"br mark\" data-delta=\"size\" data-place=\"br\"></span>";
  });

this["JST"]["unit/shape/ShapeTool"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n<div class=\"edit-tool-list\">\r\n	<div class=\"tool-select\">\r\n		<span class=\"shape-content\">";
  if (helper = helpers.content) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.content); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\r\n		<span class=\"shape-replace\">replace</span>\r\n	</div>\r\n	<div class=\"tool-shape-color\">\r\n		<div class=\"tool-content\">图形颜色:</div>\r\n		<div class=\"color-pick-trigger\" data-nature=\"color\" style=\"background:";
  if (helper = helpers.color) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.color); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></div>\r\n	</div>\r\n</div>\r\n";
  return buffer;
  }

  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.attributes) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.attributes); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.attributes) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["JST"]["unit/Component"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"content\" style=\"border:"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.border)),stack1 == null || stack1 === false ? stack1 : stack1.width)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "px "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.border)),stack1 == null || stack1 === false ? stack1 : stack1.style)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.border)),stack1 == null || stack1 === false ? stack1 : stack1.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "; border-radius: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.border)),stack1 == null || stack1 === false ? stack1 : stack1.radius)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "px; opacity: ";
  if (helper = helpers.opacity) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.opacity); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ";\"></div>\r\n<div class=\"component-tool\"></div>\r\n";
  return buffer;
  });

this["JST"]["unit/ComponentTool"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n<div class=\"tool-opacity\">\r\n	<div class=\"tool-content\">透明度:<span class=\"opacity-value\">";
  if (helper = helpers.opacity) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.opacity); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "%</span></div>\r\n	<div class=\"tool-slider\"></div>\r\n</div>\r\n<div class=\"tool-border\">\r\n	<div class=\"tool-content\">边框<span class=\"border-switch\">></span></div>\r\n	<div class=\"border-property\">\r\n		<div class=\"tool-content\">宽度:</div>\r\n		<div class=\"stepper\">\r\n			<input type=\"text\" class=\"stepper-munber\" data-nature=\"border.width\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.border)),stack1 == null || stack1 === false ? stack1 : stack1.width)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "px\"/>\r\n		</div>\r\n		<div class=\"tool-content\">样式:</div>\r\n		<div class=\"stepper\">\r\n			<div class=\"border-style-select-trigger icon-chevron-down\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.border)),stack1 == null || stack1 === false ? stack1 : stack1.style)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\r\n		</div>\r\n		<div class=\"tool-content\">颜色:</div>\r\n		<div class=\"stepper\">\r\n			<div class=\"color-pick-trigger\" data-nature=\"border.color\" style=\"background: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.border)),stack1 == null || stack1 === false ? stack1 : stack1.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";\"></div>\r\n		</div>\r\n		<div class=\"tool-content\">边角半径:</div>\r\n		<div class=\"stepper\">\r\n			<input type=\"text\" class=\"stepper-munber\" data-nature=\"border.radius\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.border)),stack1 == null || stack1 === false ? stack1 : stack1.radius)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "px\"/>\r\n		</div>\r\n	</div>\r\n</div>\r\n<div class=\"tool-depth\">\r\n	<div class=\"tool-content\">Depth:</div>\r\n	<div class=\"depth-option-btn\">\r\n		<div class=\"item-btn depth-down\">\r\n			<span class=\"icon-arrow-down\"></span>\r\n		</div>\r\n		<div class=\"item-btn depth-up\">\r\n			<span class=\"icon-arrow-up\"></span>\r\n		</div>\r\n	</div>\r\n</div>\r\n<div class=\"tool-action\">\r\n	<div class=\"tool-content\">Action:</div>\r\n	<div class=\"action-option-btn\">\r\n		<div class=\"item-btn action-expand\">\r\n			<span class=\"icon-expand\"></span>\r\n		</div>\r\n		<div class=\"item-btn action-contract\">\r\n			<span class=\"icon-contract\"></span>\r\n		</div>\r\n	</div>\r\n</div>\r\n";
  return buffer;
  }

  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.attributes) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.attributes); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.attributes) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["JST"]["unit/textbox/ComponentTool"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<span class=\"cl mark\" data-delta=\"width\"></span>\r\n<span class=\"cr mark\" data-delta=\"width\"></span>\r\n";
  });

this["JST"]["unit/textbox/TextBoxTool"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n<div class=\"edit-tool-list\">\r\n	<div class=\"tool-text-color\">\r\n		<div class=\"tool-content\">字体颜色:</div>\r\n		<div class=\"color-pick-trigger\" data-nature=\"textColor\" style=\"background:";
  if (helper = helpers.textColor) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.textColor); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></div>\r\n	</div>\r\n	<div class=\"tool-background-color\">\r\n		<div class=\"tool-content\">背景颜色:</div>\r\n		<div class=\"color-pick-trigger\" data-nature=\"bgColor\" style=\"background:";
  if (helper = helpers.bgColor) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.bgColor); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></div>\r\n	</div>\r\n	<div class=\"tool-linespacing\">\r\n		<div class=\"tool-content\">行间距:</div>\r\n		<div class=\"linespacing-value icon-chevron-down\" data-nature=\"lineSpacing\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.lineSpacing), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\r\n	</div>\r\n</div>\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var stack1, helper;
  if (helper = helpers.lineSpacing) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.lineSpacing); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  return escapeExpression(stack1);
  }

function program4(depth0,data) {
  
  
  return "normal";
  }

  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.attributes) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.attributes); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.attributes) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["JST"]["unit/video/VideoTool"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"edit-tool-list\">\r\n	<div class=\"tool-opacity\">\r\n		<div class=\"tool-content\">透明度</div>\r\n		<div></div>\r\n	</div>\r\n	<div class=\"tool-border\">\r\n		<div class=\"tool-content\">边框</div>\r\n		<div></div>\r\n	</div>\r\n<div>";
  });

this["JST"]["communal/widgets/ToolbarPanel"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"toolbar-panel\">\r\n</div>\r\n";
  });

return this["JST"];

});