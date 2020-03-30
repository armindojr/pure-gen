var Pure = require('../lib');
var pure = new Pure({ locale: 'en', localeFallback: 'en' });
pure.locales['en'] = require('../lib/locales/en');
pure.locales['en'] = require('../lib/locales/en');
module['exports'] = pure;
