var Pure = require('../lib');
var pure = new Pure({ locale: 'en_AU', localeFallback: 'en' });
pure.locales['en_AU'] = require('../lib/locales/en_AU');
pure.locales['en'] = require('../lib/locales/en');
module['exports'] = pure;
