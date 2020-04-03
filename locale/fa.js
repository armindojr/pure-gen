const Pure = require('../lib');

const pure = new Pure({ locale: 'fa', localeFallback: 'en' });
pure.locales.fa = require('../lib/locales/fa');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
