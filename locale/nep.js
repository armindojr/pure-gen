const Pure = require('../lib');

const pure = new Pure({ locale: 'nep', localeFallback: 'en' });
pure.locales.nep = require('../lib/locales/nep');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
