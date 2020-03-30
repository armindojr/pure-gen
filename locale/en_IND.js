var Pure = require('../lib');
var pure = new Pure({ locale: 'en_IND', localeFallback: 'en' });
pure.locales['en_IND'] = require('../lib/locales/en_IND');
pure.locales['en'] = require('../lib/locales/en');
module['exports'] = pure;
