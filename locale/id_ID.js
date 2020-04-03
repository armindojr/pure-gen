const Pure = require('../lib');

const pure = new Pure({ locale: 'id_ID', localeFallback: 'en' });
pure.locales.id_ID = require('../lib/locales/id_ID');
pure.locales.en = require('../lib/locales/en');

module.exports = pure;
