var Pure = require('../lib');
var pure = new Pure({ locale: 'de_CH', localeFallback: 'en' });
pure.locales['de_CH'] = require('../lib/locales/de_CH');
pure.locales['en'] = require('../lib/locales/en');
module['exports'] = pure;
