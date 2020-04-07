const Pure = require('../lib');

const pure = new Pure({ locale: 'ar', localeFallback: 'en' });
pure.locales.ar = require('./modules/ar');
pure.locales.en = require('./modules/en');

module.exports = pure;
