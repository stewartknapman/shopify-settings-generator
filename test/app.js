var assert = require('chai').assert;
var SettingsGen = require('../lib/app.js');

describe('Settings generator', function() {
  
  it('recives a path to target input file', function () {
    var path = './test/input/settings_schema.json.liquid';
    var settings = new SettingsGen(path);
    
    assert.equal(settings.target, path);
    assert.equal(settings.currentPath, './test/input');
  });
  
  it('outputs a concatenated json string', function () {
    var path = './test/input/settings_schema.json.liquid';
    var settings = new SettingsGen(path);
    var data = settings.render();
    
    var expectedOutput = '[\n  {\n  "name": "theme_info",\n  "logo": "https:\\/\\/cdn.shopify.com\\/s\\/files\\/1\\/0000\\/1712\\/files\\/Lucid-logo-03-512px.png",\n  "settings": [\n    {\n      "type": "header",\n      "content": "Shopify Skeleton Starter Theme by [Lucid](http:\\/\\/lucid.co.nz)"\n    },\n    {\n      "type": "paragraph",\n      "content": "For theme support please contact us at [shopify@lucid.co.nz](mailto:shopify@lucid.co.nz)"\n    }\n  ]\n},\n  {\n  "name": "General",\n  "settings": [\n    {\n      "type": "header",\n      "content": "Branding"\n    },\n    {\n      "label": "Logo image",\n      "id": "logo.png",\n      "type": "image"\n    },\n    {\n      "label": "Site Favicon",\n      "id": "favicon.png",\n      "type": "image"\n    },\n  \n    {\n      "type": "paragraph",\n      "content": "Test Paragraph 1"\n    },\n  \n    {\n      "type": "paragraph",\n      "content": "Test Paragraph 2"\n    },\n  \n    {\n      "type": "paragraph",\n      "content": "Test Paragraph 3"\n    },\n  \n    {\n      "type": "paragraph",\n      "content": "Test Paragraph 4"\n    },\n  \n    {\n      "type": "paragraph",\n      "content": "Test Paragraph 5"\n    }\n  \n  ]\n}\n\n]';
    
    assert.equal(data, expectedOutput);
  });
  
});