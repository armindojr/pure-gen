const Pure = require('../lib');

const pure = new Pure({ locale: 'zu_ZA', localeFallback: 'en' });
pure.locales.zu_ZA = require('../lib/locales/zu_ZA');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
