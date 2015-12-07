// Initiate babel for ES2015 code
require("babel-register");

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Initiate and start server
var server = require('./server');
