
var moment = require('moment');

moment.locale('en', {
  longDateFormat : {
    LT : "HH:mm",
    LTS : "HH:mm:ss",
    L : "DD/MM/YYYY",
    LL : "D MMMM YYYY",
    // LLL : "D MMMM YYYY LT",
    // LLLL : "dddd D MMMM YYYY LT",
    LLL: "ddd, MMM Do",
    LLLL: "HH:mm dddd, MMMM Do",
  },
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years"
  }
});

// Set new thresholds
moment.relativeTimeThreshold('s', 59);
moment.relativeTimeThreshold('m', 59);
moment.relativeTimeThreshold('h', 23);
moment.relativeTimeThreshold('d', 26);
moment.relativeTimeThreshold('M', 11);

module.exports = moment;

