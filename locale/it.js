const Pure = require('../lib');

const pure = new Pure({ locale: 'it', localeFallback: 'en' });
pure.locales.it = require('../lib/locales/it');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
