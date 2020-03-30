var Pure = require('../lib');
var pure = new Pure({ locale: 'en_CA', localeFallback: 'en' });
pure.locales['en_CA'] = require('../lib/locales/en_CA');
pure.locales['en'] = require('../lib/locales/en');
module['exports'] = pure;
