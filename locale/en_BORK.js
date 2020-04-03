const Pure = require('../lib');

const pure = new Pure({ locale: 'en_BORK', localeFallback: 'en' });
pure.locales.en_BORK = require('../lib/locales/en_BORK');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
