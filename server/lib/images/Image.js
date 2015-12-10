
'use strict';

var moment = require('moment');
var utils = require('../utils');

class Image {
  constructor(filename) {
    this.filename = filename;
    this.ISOString = utils.getDateFromFilename(filename).toISOString()
    this.id = Math.random().toString(16).slice(2)
    this.timestamp = {
      long: moment(this.ISOString).format('LLLL'),
      short: moment(this.ISOString).format('LLL')
    }
  }
}

module.exports = Image;

