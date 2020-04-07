const Pure = require('../lib');

const pure = new Pure({ locale: 'cz', localeFallback: 'en' });
pure.locales.cz = require('./modules/cz');
pure.locales.en = require('./modules/en');

module.exports = pure;
