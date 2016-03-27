#!/usr/bin/env node

var fs = require('fs');
var SettingsGen = require('../lib/app.js');
var argv = require('minimist')(process.argv.slice(2));

var err = function (message) {
  console.log(message);
  process.exit(1);
};

if (argv._[0]) {
  var output = argv.o || argv.output;
  var data = new SettingsGen(argv._[0]);
  
  if (output) {
    fs.writeFileSync(output, data);
  } else {
    process.stdout.write(data);
  }
  process.exit(0);
  
} else {
  err('ERR: Please supply an input file');
}