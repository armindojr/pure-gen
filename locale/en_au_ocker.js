const Pure = require('../lib');

const pure = new Pure({ locale: 'en_au_ocker', localeFallback: 'en' });
pure.locales.en_au_ocker = require('../lib/locales/en_au_ocker');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
