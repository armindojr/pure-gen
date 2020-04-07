const Pure = require('../lib');

const pure = new Pure({ locale: 'ge', localeFallback: 'en' });
pure.locales.ge = require('./modules/ge');
pure.locales.en = require('./modules/en');

module.exports = pure;
