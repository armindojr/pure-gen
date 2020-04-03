const Pure = require('../lib');

const pure = new Pure({ locale: 'en_NG', localeFallback: 'en' });
pure.locales.en_NG = require('../lib/locales/en_NG');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
