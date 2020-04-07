const Pure = require('../lib');

const pure = new Pure({ locale: 'ja', localeFallback: 'en' });
pure.locales.ja = require('./modules/ja');
pure.locales.en = require('./modules/en');

module.exports = pure;
