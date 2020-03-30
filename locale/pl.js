var Pure = require('../lib');
var pure = new Pure({ locale: 'pl', localeFallback: 'en' });
pure.locales['pl'] = require('../lib/locales/pl');
pure.locales['en'] = require('../lib/locales/en');
module['exports'] = pure;
