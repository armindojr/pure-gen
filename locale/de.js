const Pure = require('../lib');

const pure = new Pure({ locale: 'de', localeFallback: 'en' });
pure.locales.de = require('../lib/locales/de');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
