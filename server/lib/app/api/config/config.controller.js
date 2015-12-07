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

var config = require('../../../config/environment');
var utils = require('../../../utils');

exports.raspberryPi = function(req, res) {
  var jsonPath = config.jsonDir + '/raspberry-pi-config.json';
  utils.readJSONFile(jsonPath, function(json) {
    res.json(json);
  });
}
