const Pure = require('../lib');

const pure = new Pure({ locale: 'zu_ZA', localeFallback: 'en' });
pure.locales.zu_ZA = require('./modules/zu_ZA');
pure.locales.en = require('./modules/en');

module.exports = pure;
