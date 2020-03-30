var Pure = require('../lib');
var pure = new Pure({ locale: 'sv', localeFallback: 'en' });
pure.locales['sv'] = require('../lib/locales/sv');
pure.locales['en'] = require('../lib/locales/en');
module['exports'] = pure;
