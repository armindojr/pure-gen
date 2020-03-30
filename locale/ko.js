var Pure = require('../lib');
var pure = new Pure({ locale: 'ko', localeFallback: 'en' });
pure.locales['ko'] = require('../lib/locales/ko');
pure.locales['en'] = require('../lib/locales/en');
module['exports'] = pure;
