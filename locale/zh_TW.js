var Pure = require('../lib');
var pure = new Pure({ locale: 'zh_TW', localeFallback: 'en' });
pure.locales['zh_TW'] = require('../lib/locales/zh_TW');
pure.locales['en'] = require('../lib/locales/en');
module['exports'] = pure;
