
import fs from 'fs';
import nop from 'nop';
import config from './config/environment';

export const readFile = (path, format, clb = nop) => {
  format = format || null;
  fs.readFile(path, format, (err, data) => {
    if(err) return console.log(err);
    clb(data);
  });
}

export const writeFile = (path, data, clb = nop) => {
  fs.writeFile(path, data, err => {
    if(err) return console.log(err);
    clb();
  });
}

export const deleteFile = path => {
  var unlink = path => {
    fs.unlink(path, err => {
      if(err) return console.log(err);
      console.log('successfully deleted', path);
    });
  }
  if (process.env.NODE_ENV === 'development' &&
      path.indexOf('.jpg') !== -1){
    readFile(path, false, data => {
      var newPath = config.deletedImageDir + path.split('/').pop();
      writeFile(newPath, data, () => {
        console.log('Moved file');
        unlink(path);
      });
    });
  } else {
    unlink(path);
  }
}

export const readJSONFile = (path, clb = nop) => {
  readFile(path, 'utf8', data => clb(JSON.parse(data)));
}
