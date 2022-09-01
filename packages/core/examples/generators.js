import pure from '../index.js';

console.log(pure.fake.parse('{{random.uuid}}, {{name.firstName}} {{name.suffix}}'));
console.log(pure.fake.parse('{{finance.currencyName}} - {{finance.amount}}'));
console.log(pure.fake.parse('{{name.firstName}} {{name.lastName}}'));
