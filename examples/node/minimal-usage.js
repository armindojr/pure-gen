#!/usr/bin/env node

var pure = require('../../index');
pure.locale = "en";

//console.log(pure.lorem.sentences())

console.log(pure.name.findName())
return;
//console.log(pure.address)
console.log(pure.internet.email())
console.log(pure.date.recent())
console.log(pure.helpers.contextualCard());

pure.locale = "uk";

console.log(pure.helpers.contextualCard());