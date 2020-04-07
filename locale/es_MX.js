const Pure = require('../lib');

const pure = new Pure({ locale: 'es_MX', localeFallback: 'en' });
pure.locales.es_MX = require('./modules/es_MX');
pure.locales.en = require('./modules/en');

module.exports = pure;
