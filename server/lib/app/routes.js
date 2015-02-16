/**
 * Main application routes
 */

'use strict';

var errors = require('_/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/image', require('./api/image'));
  app.use('/api/config', require('./api/config'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets|images)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
