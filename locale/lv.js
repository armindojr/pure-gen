const Pure = require('../lib');

const pure = new Pure({ locale: 'lv', localeFallback: 'en' });
pure.locales.lv = require('./modules/lv');
pure.locales.en = require('./modules/en');

module.exports = pure;
