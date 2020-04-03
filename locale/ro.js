const Pure = require('../lib');

const pure = new Pure({ locale: 'ro', localeFallback: 'en' });
pure.locales.ro = require('../lib/locales/ro');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
