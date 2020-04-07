const Pure = require('../lib');

const pure = new Pure({ locale: 'nep', localeFallback: 'en' });
pure.locales.nep = require('./modules/nep');
pure.locales.en = require('./modules/en');

module.exports = pure;
