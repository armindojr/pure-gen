const Pure = require('../lib');

const pure = new Pure({ locale: 'en_au_ocker', localeFallback: 'en' });
pure.locales.en_au_ocker = require('./modules/en_au_ocker');
pure.locales.en = require('./modules/en');

module.exports = pure;
