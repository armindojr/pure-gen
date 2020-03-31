// since we are requiring the top level of pure-gen, load all locales by default
const Pure = require('./lib');
const locales = require('./lib/locales');

const pure = new Pure({ locales });
module.exports = pure;
