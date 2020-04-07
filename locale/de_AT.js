const Pure = require('../lib');

const pure = new Pure({ locale: 'de_AT', localeFallback: 'en' });
pure.locales.de_AT = require('./modules/de_AT');
pure.locales.en = require('./modules/en');

module.exports = pure;
