const Pure = require('../lib');

const pure = new Pure({ locale: 'fa', localeFallback: 'en' });
pure.locales.fa = require('./modules/fa');
pure.locales.en = require('./modules/en');

module.exports = pure;
