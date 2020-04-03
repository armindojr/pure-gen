const Pure = require('../lib');

const pure = new Pure({ locale: 'lv', localeFallback: 'en' });
pure.locales.lv = require('../lib/locales/lv');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
