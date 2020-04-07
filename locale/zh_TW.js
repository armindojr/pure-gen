const Pure = require('../lib');

const pure = new Pure({ locale: 'zh_TW', localeFallback: 'en' });
pure.locales.zh_TW = require('./modules/zh_TW');
pure.locales.en = require('./modules/en');

module.exports = pure;
