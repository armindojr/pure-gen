var Pure = require('../lib');
var pure = new Pure({ locale: 'ja', localeFallback: 'en' });
pure.locales['ja'] = require('../lib/locales/ja');
pure.locales['en'] = require('../lib/locales/en');
module['exports'] = pure;
