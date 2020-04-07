const Pure = require('../lib');

const pure = new Pure({ locale: 'sv', localeFallback: 'en' });
pure.locales.sv = require('./modules/sv');
pure.locales.en = require('./modules/en');

module.exports = pure;
