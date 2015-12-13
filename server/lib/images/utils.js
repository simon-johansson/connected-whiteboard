
import moment from '../config/moment';

export const sortImageArray = (a, b) => {
  var date1 = new Date(a.ISOString),
      date2 = new Date(b.ISOString);
  if (+date1 < +date2) return -1
  if (+date1 > +date2) return 1
  else return 0
}

export const getDateFromFilename = filename => {
  var f = filename.replace('.jpg', '').split('-');
  // Lyft ut format till config
  var d = moment(f, 'YYYY-MM-DD-HHmm');
  return d;
}
