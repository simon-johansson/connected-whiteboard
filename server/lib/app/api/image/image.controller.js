/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var fs = require('fs');

var _ = require('lodash');
var moment = require('moment');

var requestImage = require('../../../images').requestNewImage;
var utils = require('../../../utils');
var config = require('../../../config/environment');

exports.getImageJson = function(req, res) {
  var jsonPath = config.jsonDir + 'images.json';
  utils.readJSONFile(jsonPath, function(json) {
    _.forEach(json, function(image) {
      image.timeAgo = moment(image.ISOString).fromNow();
    });
    console.log(json);
    res.json(json);
  });
};

exports.requestNew = function(req, res) {
  // Kolla om requesten kommer från rätt ställe
  // sdfsdfasd

  var now = moment();
  var jsonPath = config.jsonDir + config.raspberryConfigJSON;
  utils.readJSONFile(jsonPath, function(json) {
    var latestRequstedImage = json;
    var diff = now.diff(latestRequstedImage, 'seconds');
    if (diff > config.minTimeBetweenPhotos) {
    // if (false) {
      requestImage(now);
      res.json('Picture is beeing taken');
    } else {
      res.status(420).send('Enhance Your Calm ');
  }
  });
};
