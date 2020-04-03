const Pure = require('../lib');

const pure = new Pure({ locale: 'en', localeFallback: 'en' });
pure.locales.en = require('../lib/locales/en');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
