var Pure = require('../lib');
var pure = new Pure({ locale: 'es', localeFallback: 'en' });
pure.locales['es'] = require('../lib/locales/es');
pure.locales['en'] = require('../lib/locales/en');
module['exports'] = pure;
