const Pure = require('../lib');

const pure = new Pure({ locale: 'en_GB', localeFallback: 'en' });
pure.locales.en_GB = require('./modules/en_GB');
pure.locales.en = require('./modules/en');

module.exports = pure;
