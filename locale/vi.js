const Pure = require('../lib');

const pure = new Pure({ locale: 'vi', localeFallback: 'en' });
pure.locales.vi = require('./modules/vi');
pure.locales.en = require('./modules/en');

module.exports = pure;
