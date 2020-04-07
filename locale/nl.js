const Pure = require('../lib');

const pure = new Pure({ locale: 'nl', localeFallback: 'en' });
pure.locales.nl = require('./modules/nl');
pure.locales.en = require('./modules/en');

module.exports = pure;
