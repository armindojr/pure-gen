var Pure = require('../lib');
var pure = new Pure({ locale: 'tr', localeFallback: 'en' });
pure.locales['tr'] = require('../lib/locales/tr');
pure.locales['en'] = require('../lib/locales/en');
module['exports'] = pure;
