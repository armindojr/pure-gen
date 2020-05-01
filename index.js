// since we are requiring the top level of pure-gen, load all locales by default
const Pure = require('./src');
const locales = require('./src/modules/locales');

const pure = new Pure({ locales });
module.exports = pure;
