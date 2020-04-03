const Pure = require('../lib');

const pure = new Pure({ locale: 'uk', localeFallback: 'en' });
pure.locales.uk = require('../lib/locales/uk');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
