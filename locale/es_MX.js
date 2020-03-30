var Pure = require('../lib');
var pure = new Pure({ locale: 'es_MX', localeFallback: 'en' });
pure.locales['es_MX'] = require('../lib/locales/es_MX');
pure.locales['en'] = require('../lib/locales/en');
module['exports'] = pure;
