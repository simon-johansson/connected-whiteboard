// Initiate babel for ES2015 code
require("babel-register")({
  presets: ['es2015', 'stage-0']
});

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Initiate and start server
var server = require('./server');
