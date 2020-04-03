const Pure = require('../lib');

const pure = new Pure({ locale: 'de_AT', localeFallback: 'en' });
pure.locales.de_AT = require('../lib/locales/de_AT');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
