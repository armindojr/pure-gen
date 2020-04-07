const Pure = require('../lib');

const pure = new Pure({ locale: 'zh_CN', localeFallback: 'en' });
pure.locales.zh_CN = require('./modules/zh_CN');
pure.locales.en = require('./modules/en');

module.exports = pure;
