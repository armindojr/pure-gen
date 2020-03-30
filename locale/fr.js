var Pure = require('../lib');
var pure = new Pure({ locale: 'fr', localeFallback: 'en' });
pure.locales['fr'] = require('../lib/locales/fr');
pure.locales['en'] = require('../lib/locales/en');
module['exports'] = pure;
