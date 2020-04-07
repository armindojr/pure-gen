const Pure = require('../lib');

const pure = new Pure({ locale: 'af_ZA', localeFallback: 'en' });
pure.locales.af_ZA = require('./modules/af_ZA');
pure.locales.en = require('./modules/en');

module.exports = pure;
