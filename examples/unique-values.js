var pure = require('../index');

var emails = {};
var conflicts = 0;
// emails estimated: 1,055,881
// full names estimated: 1,185,139
for (var i = 0; i < 100000; i++) {

  // call function with no arguments
  var email = pure.unique(pure.internet.email);

  if (typeof emails[email] === 'undefined') {
    // found a unique new item
    emails[email] = true;
  } else {
    // found a conflicting item ( should not happen using pure.unique() )
    conflicts++;
  }
}
console.log('total conflicts', conflicts); // should be zero using pure.unique()
console.log('total uniques generated', Object.keys(emails).length);