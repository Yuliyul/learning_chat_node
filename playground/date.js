const moment = require('moment');
var dateT = moment().valueOf();
console.log(dateT);
// date.add(1,'year').subtract(3,'month');
var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('H:mm A'));
