
var watch = require('watch');
var app = require('./lib/app')
var imageTools = require('./lib/images');
var config = require('./lib/config/environment');
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
