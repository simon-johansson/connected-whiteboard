'use strict';

var path = require('path');

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/cw-dev'
  },
  seedDB: true,

  // seconds
  minTimeBetweenPhotos: 5,
  timeLimits: {
    // hours
    thinOut: 240, // 24
    // hours
    max: 1680, // 168
  },

  deletedImageDir: path.normalize(__dirname + '/../../../../images/deleted/'),
  clientDir: 'client',
};
