const Pure = require('../lib');

const pure = new Pure({ locale: 'en_NG', localeFallback: 'en' });
pure.locales.en_NG = require('./modules/en_NG');
pure.locales.en = require('./modules/en');

module.exports = pure;
