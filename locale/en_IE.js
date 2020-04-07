const Pure = require('../lib');

const pure = new Pure({ locale: 'en_IE', localeFallback: 'en' });
pure.locales.en_IE = require('./modules/en_IE');
pure.locales.en = require('./modules/en');

module.exports = pure;
