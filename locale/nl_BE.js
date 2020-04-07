const Pure = require('../lib');

const pure = new Pure({ locale: 'nl_BE', localeFallback: 'nl' });
pure.locales.nl_BE = require('./modules/nl_BE');
pure.locales.nl = require('./modules/nl');

module.exports = pure;
