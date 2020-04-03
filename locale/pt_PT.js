const Pure = require('../lib');

const pure = new Pure({ locale: 'pt_PT', localeFallback: 'en' });
pure.locales.pt_PT = require('../lib/locales/pt_PT');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
