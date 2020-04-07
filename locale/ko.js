const Pure = require('../lib');

const pure = new Pure({ locale: 'ko', localeFallback: 'en' });
pure.locales.ko = require('./modules/ko');
pure.locales.en = require('./modules/en');

module.exports = pure;
