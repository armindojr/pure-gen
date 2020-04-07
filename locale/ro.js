const Pure = require('../lib');

const pure = new Pure({ locale: 'ro', localeFallback: 'en' });
pure.locales.ro = require('./modules/ro');
pure.locales.en = require('./modules/en');

module.exports = pure;
