const Pure = require('../lib');

const pure = new Pure({ locale: 'uk', localeFallback: 'en' });
pure.locales.uk = require('./modules/uk');
pure.locales.en = require('./modules/en');

module.exports = pure;
