
import moment from '../config/moment';
import {getDateFromFilename} from './utils';

export default class Image {
  constructor(filename) {
    this.filename = filename;
    this.ISOString = getDateFromFilename(filename).toISOString()
    this.id = Math.random().toString(16).slice(2)
    this.timestamp = {
      long: moment(this.ISOString).format('LLLL'),
      short: moment(this.ISOString).format('LLL')
    }
  }
}
