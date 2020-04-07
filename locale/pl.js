const Pure = require('../lib');

const pure = new Pure({ locale: 'pl', localeFallback: 'en' });
pure.locales.pl = require('./modules/pl');
pure.locales.en = require('./modules/en');

module.exports = pure;
