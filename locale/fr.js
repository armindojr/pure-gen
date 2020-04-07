const Pure = require('../lib');

const pure = new Pure({ locale: 'fr', localeFallback: 'en' });
pure.locales.fr = require('./modules/fr');
pure.locales.en = require('./modules/en');

module.exports = pure;
