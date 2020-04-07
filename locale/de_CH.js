const Pure = require('../lib');

const pure = new Pure({ locale: 'de_CH', localeFallback: 'en' });
pure.locales.de_CH = require('./modules/de_CH');
pure.locales.en = require('./modules/en');

module.exports = pure;
