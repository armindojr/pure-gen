const Pure = require('../lib');

const pure = new Pure({ locale: 'en_BORK', localeFallback: 'en' });
pure.locales.en_BORK = require('./modules/en_BORK');
pure.locales.en = require('./modules/en');

module.exports = pure;
