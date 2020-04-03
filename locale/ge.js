const Pure = require('../lib');

const pure = new Pure({ locale: 'ge', localeFallback: 'en' });
pure.locales.ge = require('../lib/locales/ge');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
