const Pure = require('../lib');

const pure = new Pure({ locale: 'de', localeFallback: 'en' });
pure.locales.de = require('./modules/de');
pure.locales.en = require('./modules/en');

module.exports = pure;
