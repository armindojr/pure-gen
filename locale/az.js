const Pure = require('../lib');

const pure = new Pure({ locale: 'az', localeFallback: 'en' });
pure.locales.az = require('./modules/az');
pure.locales.en = require('./modules/en');

module.exports = pure;
