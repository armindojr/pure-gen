const Pure = require('../lib');

const pure = new Pure({ locale: 'en_ZA', localeFallback: 'en' });
pure.locales.en_ZA = require('./modules/en_ZA');
pure.locales.en = require('./modules/en');

module.exports = pure;
