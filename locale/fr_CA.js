var Pure = require('../lib');
var pure = new Pure({ locale: 'fr_CA', localeFallback: 'en' });
pure.locales['fr_CA'] = require('../lib/locales/fr_CA');
pure.locales['en'] = require('../lib/locales/en');
module['exports'] = pure;
