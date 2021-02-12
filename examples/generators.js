var pure = require('../index');
pure.setLocale('en');

console.log(pure.fake('{{random.uuid}}, {{name.firstName}} {{name.suffix}}'));
console.log(pure.fake('{{finance.currencyName}} - {{finance.amount}}'));
console.log(pure.fake('{{name.firstName}} {{name.lastName}}'));