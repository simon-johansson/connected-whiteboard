'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  raspberryConfigJSON: 'raspberry-pi-config.json',

  // seconds
  minTimeBetweenPhotos: 30,
  timeLimits: {
    // hours
    thinOut: 24,
    // hours
    max: 168,
  },
  saveImageFilter: {
    hour: '12',
    minute: '0'
  },

  // Paths
  root: path.normalize(__dirname + '/../../../..'),
  imageDir: path.normalize(__dirname + '/../../../../images/'),
  jsonDir: path.normalize(__dirname + '/../../../../server/json/'),

  // Server port
  port: process.env.PORT || 9000,
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
