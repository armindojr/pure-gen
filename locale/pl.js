const Pure = require('../lib');

const pure = new Pure({ locale: 'pl', localeFallback: 'en' });
pure.locales.pl = require('../lib/locales/pl');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
