
'use strict';

var express = require('express');
var app = express();
require('../config/express')(app);
require('./routes')(app);

// Expose app
exports = module.exports = app;
