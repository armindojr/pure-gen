const Pure = require('../lib');

const pure = new Pure({ locale: 'en_US', localeFallback: 'en' });
pure.locales.en_US = require('./modules/en_US');
pure.locales.en = require('./modules/en');

module.exports = pure;
