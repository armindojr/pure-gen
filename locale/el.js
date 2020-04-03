const Pure = require('../lib');

const pure = new Pure({ locale: 'el', localeFallback: 'en' });
pure.locales.el = require('../lib/locales/el');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
