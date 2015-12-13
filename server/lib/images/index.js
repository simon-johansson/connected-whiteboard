
import fs from 'fs';
import _ from 'lodash';
import moment from '../config/moment';
import config from '../config/environment';
import {
  writeFile,
  deleteFile,
} from '../file-operations';
import Image from './Image';
import {
  sortImageArray,
  getDateFromFilename,
} from './utils';

// function requestNewImage (timestamp) {
//   writeFile(
//     config.jsonDir + config.raspberryConfigJSON,
//     JSON.stringify(timestamp),
//     () => console.log('Saved new', config.raspberryConfigJSON));
// }

export const createImageJSON = () => {
  var files = getImageFilenames();
  var arr = [];
  files.forEach(filename => {
    if (fileShouldBeSaved(filename))
      arr.push(new Image(filename));
    else
      deleteFile(config.imageDir + filename);
  });
  arr.sort(sortImageArray).reverse();
  createJSON(arr);
  // Gör ny timestamp i raspberry-pi-config.jso
}

const getImageFilenames = () => {
  var files = fs.readdirSync(config.imageDir);
  var filtered = _.filter(files, function(f) { return f.indexOf('.jpg') !== -1; });
  return filtered.map(filename => filename);
}

const createJSON = obj => {
  writeFile(
    config.jsonDir + 'images.json',
    JSON.stringify(obj),
    () => console.log('Saved new images.json')
  );
}

const fileShouldBeSaved = filename => {
  var date = getDateFromFilename(filename);
  var diff = moment().diff(date, 'hours');
  if (diff < 2) {
    return true;
  }
  else if (diff > config.timeLimits.thinOut ||
           date.minute().toString() !== config.saveImageFilter.minute) {
    // console.log(
    //   date.hour().toString() === config.saveImageFilter.hour,
    //   date.minute().toString() === config.saveImageFilter.min,
    //   diff < config.timeLimits.max
    // )
    if (date.hour().toString()   === config.saveImageFilter.hour &&
        date.minute().toString() === config.saveImageFilter.minute &&
        diff < config.timeLimits.max) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}
