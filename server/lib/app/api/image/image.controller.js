
import moment from '../../../config/moment';
import {readJSONFile} from '../../../file-operations';
import config from '../../../config/environment';

// var requestImage = require('../../../images').requestNewImage;

export const getImageJson = (req, res) => {
  const jsonPath = config.jsonDir + 'images.json';
  readJSONFile(jsonPath, json => {
    json.forEach(image => {
      image.timeAgo = moment(image.ISOString).fromNow();
    });
    res.json(json);
  });
};

// exports.requestNew = function(req, res) {

//   var now = moment();
//   var jsonPath = config.jsonDir + config.raspberryConfigJSON;
//   utils.readJSONFile(jsonPath, function(json) {
//     var latestRequstedImage = json;
//     var diff = now.diff(latestRequstedImage, 'seconds');
//     if (diff > config.minTimeBetweenPhotos) {
//     // if (false) {
//       requestImage(now);
//       res.json('Picture is beeing taken');
//     } else {
//       res.status(420).send('Enhance Your Calm ');
//   }
//   });
// };
