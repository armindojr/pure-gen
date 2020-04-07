const Pure = require('../lib');

const pure = new Pure({ locale: 'en_CA', localeFallback: 'en' });
pure.locales.en_CA = require('./modules/en_CA');
pure.locales.en = require('./modules/en');

module.exports = pure;
