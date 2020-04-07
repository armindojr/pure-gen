const Pure = require('../lib');

const pure = new Pure({ locale: 'el', localeFallback: 'en' });
pure.locales.el = require('./modules/el');
pure.locales.en = require('./modules/en');

module.exports = pure;
