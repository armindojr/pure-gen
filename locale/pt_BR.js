const Pure = require('../lib');

const pure = new Pure({ locale: 'pt_BR', localeFallback: 'en' });
pure.locales.pt_BR = require('./modules/pt_BR');
pure.locales.en = require('./modules/en');

module.exports = pure;
