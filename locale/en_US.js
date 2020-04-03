const Pure = require('../lib');

const pure = new Pure({ locale: 'en_US', localeFallback: 'en' });
pure.locales.en_US = require('../lib/locales/en_US');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
