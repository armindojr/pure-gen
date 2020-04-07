const Pure = require('../lib');

const pure = new Pure({ locale: 'it', localeFallback: 'en' });
pure.locales.it = require('./modules/it');
pure.locales.en = require('./modules/en');

module.exports = pure;
