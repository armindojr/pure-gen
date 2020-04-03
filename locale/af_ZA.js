const Pure = require('../lib');

const pure = new Pure({ locale: 'af_ZA', localeFallback: 'en' });
pure.locales.af_ZA = require('../lib/locales/af_ZA');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
