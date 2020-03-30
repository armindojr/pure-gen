var Pure = require('../lib');
var pure = new Pure({ locale: 'pt_BR', localeFallback: 'en' });
pure.locales['pt_BR'] = require('../lib/locales/pt_BR');
pure.locales['en'] = require('../lib/locales/en');
module['exports'] = pure;
