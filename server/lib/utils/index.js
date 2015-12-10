
'use strict';

var _ = require('lodash');
var moment = require('../config/moment');

var fileOps = require('./file-operations');

var sortImageArray = function (a, b) {
  var date1 = new Date(a.ISOString),
      date2 = new Date(b.ISOString);
  if (+date1 < +date2) return -1
  if (+date1 > +date2) return 1
  else return 0
}

var getDateFromFilename = function(filename) {
    var f = filename.replace('.jpg', '').split('-');
    // Lyft ut format till config
    var d = moment(f, 'YYYY-MM-DD-HHmm');
    return d;
}

var readJSONFile = function(path, clb) {
  fileOps.readFile(path, 'utf8', function(data) {
    if (clb) return clb(JSON.parse(data));
  })
}

var deleteModuleCache = function(path) {
  var arr = Array.isArray(path) ? path : [path];
  arr.forEach(function(p) {
    delete require.cache[require.resolve(p)];
  })
}

module.exports = _.merge({
    sortImageArray: sortImageArray,
    getDateFromFilename: getDateFromFilename,
    readJSONFile: readJSONFile,
    deleteModuleCache: deleteModuleCache
  },
  fileOps);
