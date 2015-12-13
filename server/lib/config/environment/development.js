
import path from 'path';

module.exports = {

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
