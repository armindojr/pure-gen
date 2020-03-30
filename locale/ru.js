var Pure = require('../lib');
var pure = new Pure({ locale: 'ru', localeFallback: 'en' });
pure.locales['ru'] = require('../lib/locales/ru');
pure.locales['en'] = require('../lib/locales/en');
module['exports'] = pure;
