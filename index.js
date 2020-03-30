// since we are requiring the top level of pure-gen, load all locales by default
var Pure = require('./lib');
var pure = new Pure({ locales: require('./lib/locales') });
module['exports'] = pure;