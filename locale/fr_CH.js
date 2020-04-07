const Pure = require('../lib');

const pure = new Pure({ locale: 'fr_CH', localeFallback: 'fr' });
pure.locales.fr_CH = require('./modules/fr_CH');
pure.locales.fr = require('./modules/fr');

module.exports = pure;
