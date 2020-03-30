var Pure = require('../lib');
var pure = new Pure({ locale: 'en_GB', localeFallback: 'en' });
pure.locales['en_GB'] = require('../lib/locales/en_GB');
pure.locales['en'] = require('../lib/locales/en');
module['exports'] = pure;
