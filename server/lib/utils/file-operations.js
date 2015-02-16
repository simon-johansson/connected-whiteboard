
'use strict';

var fs = require('fs');

var config = require('_/config/environment');

var readFile = function (path, format, clb) {
  format = format || null;
  fs.readFile(path, format, function(err, data) {
    if(err) return console.log(err);
    if(clb) clb(data);
  });
}

var writeFile = function (path, data, clb) {
  fs.writeFile(path, data, function(err) {
    if(err) return console.log(err);
    if(clb) clb();
  });
}

var deleteFile = function (path) {
  var unlink = function(path) {
    fs.unlink(path, function (err) {
      if(err) return console.log(err);
      console.log('successfully deleted', path);
    });
  }
  if (process.env.NODE_ENV === 'development' &&
      path.indexOf('.jpg') !== -1){
    readFile(path, false, function(data) {
      var newPath = config.deletedImageDir + path.split('/').pop();
      writeFile(newPath, data, function() {
        console.log('Moved file');
        unlink(path);
      });
    });
  } else {
    unlink(path);
  }
}

module.exports = {
    deleteFile: deleteFile,
    readFile: readFile,
    writeFile: writeFile,
}
