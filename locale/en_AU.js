const Pure = require('../lib');

const pure = new Pure({ locale: 'en_AU', localeFallback: 'en' });
pure.locales.en_AU = require('./modules/en_AU');
pure.locales.en = require('./modules/en');

module.exports = pure;
