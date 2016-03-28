var fs = require('fs');
var Renderer = require('./renderer.js');

var SettingsGen = function (target) {
  var _this = this;
  this.target = target;
  this.currentPath = this._getPath(target);
  this.renderer = new Renderer('includes', function (include) {
    var path = _this._extendPath([_this.currentPath, include]);
    var jsonPath = path+'.json';
    var liquidPath = jsonPath+'.liquid';
    
    if (fs.statSync(liquidPath).isFile()) {
      return fs.readFileSync(liquidPath, 'utf8');
    } else if (fs.statSync(jsonPath).isFile()) {
      return fs.readFileSync(jsonPath, 'utf8');
    }
    return '';
  });
};

SettingsGen.prototype.render = function () {
  var content = fs.readFileSync(this.target, 'utf8');
  return this.renderer.render(content, {});
};

// Private
SettingsGen.prototype._getPath = function (target) {
  var pathParts = target.split('/');
  pathParts.pop();
  return this._extendPath(pathParts);
};

SettingsGen.prototype._extendPath = function (parts) {
  return parts.join('/');
};

module.exports = SettingsGen;