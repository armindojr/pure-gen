const Pure = require('../lib');

const pure = new Pure({ locale: 'en', localeFallback: 'en' });
pure.locales.en = require('./modules/en');
pure.locales.en = require('./modules/en');

module.exports = pure;
