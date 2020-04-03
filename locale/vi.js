const Pure = require('../lib');

const pure = new Pure({ locale: 'vi', localeFallback: 'en' });
pure.locales.vi = require('../lib/locales/vi');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
