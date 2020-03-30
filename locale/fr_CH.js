var Pure = require('../lib');
var pure = new Pure({ locale: 'fr_CH', localeFallback: 'fr' });
pure.locales['fr_CH'] = require('../lib/locales/fr_CH');
pure.locales['fr'] = require('../lib/locales/fr');
module['exports'] = pure;
