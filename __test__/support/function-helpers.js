const pure = require('../../index');

const functionHelpers = {};

module.exports = functionHelpers;


const IGNORED_MODULES = ['locales', 'locale', 'localeFallback', 'definitions', 'fake', 'helpers'];
const IGNORED_METHODS = {};

function isTestableModule(mod) {
    return IGNORED_MODULES.indexOf(mod) === -1;
}

function isMethodOf(mod) {
    return (meth) => typeof pure[mod][meth] === 'function';
}

function isTestableMethod(mod) {
    return (meth) => !(mod in IGNORED_METHODS && IGNORED_METHODS[mod].indexOf(meth) >= 0);
}

function both(pred1, pred2) {
    return (value) => pred1(value) && pred2(value);
}

// Basic smoke tests to make sure each method is at least implemented and returns a value.

functionHelpers.modulesList = function modulesList() {
    const modules = Object.keys(pure)
        .filter(isTestableModule)
        .reduce((result, mod) => {
            const def = result;
            def[mod] = Object.keys(pure[mod]).filter(both(isMethodOf(mod), isTestableMethod(mod)));
            return def;
        }, {});

    return modules;
};
