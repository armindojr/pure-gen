const Pure = require('../lib');

const pure = new Pure({ locale: 'az', localeFallback: 'en' });
pure.locales.az = require('../lib/locales/az');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
