const Pure = require('../lib');

const pure = new Pure({ locale: 'en_IND', localeFallback: 'en' });
pure.locales.en_IND = require('./modules/en_IND');
pure.locales.en = require('./modules/en');

module.exports = pure;
