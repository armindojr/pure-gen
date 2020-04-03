const Pure = require('../lib');

const pure = new Pure({ locale: 'en_IE', localeFallback: 'en' });
pure.locales.en_IE = require('../lib/locales/en_IE');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
