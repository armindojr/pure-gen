var pure = require('../../index');

pure.locale = "en";

console.log(pure.fake('{{random.uuid}}, {{name.firstName}} {{name.suffix}}'));


return;


console.log(pure.fake('{{finance.currencyName}} - {{finance.amount}}'));


console.log(pure.fake('{{name.firstName}} {{name.lastName}}'));