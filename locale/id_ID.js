const Pure = require('../lib');

const pure = new Pure({ locale: 'id_ID', localeFallback: 'en' });
pure.locales.id_ID = require('./modules/id_ID');
pure.locales.en = require('./modules/en');

module.exports = pure;
