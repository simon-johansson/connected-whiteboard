
import {normalize} from 'path';
import {merge} from 'lodash';

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
  root: normalize(__dirname + '/../../../..'),
  imageDir: normalize(__dirname + '/../../../../images/'),
  jsonDir: normalize(__dirname + '/../../../../server/json/'),

  // Server port
  port: process.env.PORT || 9000,
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = merge(
  all,
  require(`./${process.env.NODE_ENV}.js`) || {}
);
