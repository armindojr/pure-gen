const pure = require('../index');
pure.setLocale('en');

console.log(pure.name.findName())
console.log(pure.internet.email())
console.log(pure.date.recent())
console.log(pure.helpers.contextualCard());

pure.setLocale('uk');

console.log(pure.helpers.contextualCard());