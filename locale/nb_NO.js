var Pure = require('../lib');
var pure = new Pure({ locale: 'nb_NO', localeFallback: 'en' });
pure.locales['nb_NO'] = require('../lib/locales/nb_NO');
pure.locales['en'] = require('../lib/locales/en');
module['exports'] = pure;
