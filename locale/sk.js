const Pure = require('../lib');

const pure = new Pure({ locale: 'sk', localeFallback: 'en' });
pure.locales.sk = require('./modules/sk');
pure.locales.en = require('./modules/en');

module.exports = pure;
