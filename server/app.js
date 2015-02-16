/**
 * Main application file
 */

 // Set default node environment to development
 process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var watch = require('watch');

var moment = require('moment');
require('_/config/moment')(moment);

var app = require('_/app')
var imageTools = require('_/images');
var config = require('_/config/environment');

var server = require('http').createServer(app);

// Start server
server.listen(config.port, config.ip, function () {
 console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

watch.createMonitor(config.root + '/images/', function (monitor) {
 monitor.on("created", function (f, stat) {
   imageTools.onNewImage();
 });
});
