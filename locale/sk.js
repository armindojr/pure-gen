var Pure = require('../lib');
var pure = new Pure({ locale: 'sk', localeFallback: 'en' });
pure.locales['sk'] = require('../lib/locales/sk');
pure.locales['en'] = require('../lib/locales/en');
module['exports'] = pure;
