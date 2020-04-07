const Pure = require('../lib');

const pure = new Pure({ locale: 'tr', localeFallback: 'en' });
pure.locales.tr = require('./modules/tr');
pure.locales.en = require('./modules/en');

module.exports = pure;
