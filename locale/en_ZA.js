const Pure = require('../lib');

const pure = new Pure({ locale: 'en_ZA', localeFallback: 'en' });
pure.locales.en_ZA = require('../lib/locales/en_ZA');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
