
'use strict';

var fs = require('fs');

var _ = require('lodash');
var moment = require('moment');

var config = require('../config/environment');
var utils = require('../utils');
var Image = require('./Image');

(function init () {
  console.log('Init');
  onNewImage();
  requestNewImage(moment());
})()

function requestNewImage (timestamp) {
  utils.writeFile(
    config.jsonDir + config.raspberryConfigJSON,
    JSON.stringify(timestamp),
    function() {
      console.log('Saved new', config.raspberryConfigJSON);
  });
}

function onNewImage () {
  var files = getImageFilenames();
  var arr = [];
  files.forEach(function(filename) {
    if (fileShouldBeSaved(filename))
      arr.push(new Image(filename));
    else
      utils.deleteFile(config.imageDir + filename);
  });
  arr.sort(utils.sortImageArray).reverse();
  createJSON(arr);
  // Gör ny timestamp i raspberry-pi-config.jso
}

function getImageFilenames () {
  var files = fs.readdirSync(config.imageDir);
  var filtered = _.filter(files, function(f) { return f.indexOf('.jpg') !== -1; });
  return filtered.map(function(filename) {
    return filename;
  })
}

function createJSON (obj) {
  utils.writeFile(
    config.jsonDir + 'images.json',
    JSON.stringify(obj),
    function() {
      console.log('Saved new images.json');
  });
}

function fileShouldBeSaved (filename) {
  var date = utils.getDateFromFilename(filename);
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

module.exports = {
    onNewImage: onNewImage,
    requestNewImage: requestNewImage
}
