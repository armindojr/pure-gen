const Pure = require('../lib');

const pure = new Pure({ locale: 'pt_PT', localeFallback: 'en' });
pure.locales.pt_PT = require('./modules/pt_PT');
pure.locales.en = require('./modules/en');

module.exports = pure;
