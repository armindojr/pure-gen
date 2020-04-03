const Pure = require('../lib');

const pure = new Pure({ locale: 'zh_CN', localeFallback: 'en' });
pure.locales.zh_CN = require('../lib/locales/zh_CN');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
