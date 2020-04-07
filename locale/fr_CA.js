const Pure = require('../lib');

const pure = new Pure({ locale: 'fr_CA', localeFallback: 'en' });
pure.locales.fr_CA = require('./modules/fr_CA');
pure.locales.en = require('./modules/en');

module.exports = pure;
