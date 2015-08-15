'use strict';

var path = require('path');
var srcDir = path.join(__dirname, 'server');

require('blanket')({
  pattern: srcDir
});
