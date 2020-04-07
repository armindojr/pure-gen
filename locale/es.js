const Pure = require('../lib');

const pure = new Pure({ locale: 'es', localeFallback: 'en' });
pure.locales.es = require('./modules/es');
pure.locales.en = require('./modules/en');

module.exports = pure;
