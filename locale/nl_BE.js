const Pure = require('../lib');

const pure = new Pure({ locale: 'nl_BE', localeFallback: 'nl' });
pure.locales.nl_BE = require('../lib/locales/nl_BE');
pure.locales.nl = require('../lib/locales/nl');

module.exports = pure;
