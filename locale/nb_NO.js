const Pure = require('../lib');

const pure = new Pure({ locale: 'nb_NO', localeFallback: 'en' });
pure.locales.nb_NO = require('./modules/nb_NO');
pure.locales.en = require('./modules/en');

module.exports = pure;
