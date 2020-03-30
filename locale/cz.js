var Pure = require('../lib');
var pure = new Pure({ locale: 'cz', localeFallback: 'en' });
pure.locales['cz'] = require('../lib/locales/cz');
pure.locales['en'] = require('../lib/locales/en');
module['exports'] = pure;
