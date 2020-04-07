const Pure = require('../lib');

const pure = new Pure({ locale: 'ru', localeFallback: 'en' });
pure.locales.ru = require('./modules/ru');
pure.locales.en = require('./modules/en');

module.exports = pure;
