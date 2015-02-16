
'use strict';

var express = require('express');
var app = express();
require('_/config/express')(app);
require('./routes')(app);

// Expose app
exports = module.exports = app;
