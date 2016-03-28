var Liquid = require('liquid.js');
var includes_handlers = {};

var Renderer = function (handler_key, include_handler) {
  // Collect include handlers for use later on
  this.handler_key = handler_key;
  includes_handlers[handler_key] = include_handler;
  
  // Register custom filters
  Liquid.registerFilters({
    handle: function(input) {
      return input.toString().replace(/\s/g, '-').toLowerCase();
    }
  });
};

Renderer.prototype.render = function (template, data) {
  // Set includes handler
  // Note: this is done each time render is called so that we get the correct one depending on the context.
  var _this = this;
  Liquid.readTemplateFile = function (path) {
    return includes_handlers[_this.handler_key](path);
  };
  
  // Render liquid
  var context = Liquid.parse(template);
  return context.render(data);
};

module.exports = Renderer;