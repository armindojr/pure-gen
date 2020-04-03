const Pure = require('../lib');

const pure = new Pure({ locale: 'ar', localeFallback: 'en' });
pure.locales.ar = require('../lib/locales/ar');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
