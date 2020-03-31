var assert = require('assert');
var sinon = require('sinon');
var pure = require('../index');
var functionalHelpers = require('./support/function-helpers.js');

var modules = functionalHelpers.modulesList();

describe("functional tests", function () {
  for(var locale in pure.locales) {
    pure.locale = locale;
    Object.keys(modules).forEach(function (module) {
        describe(module, function () {
            modules[module].forEach(function (meth) {
                it(meth + "()", function () {
                    var result = pure[module][meth]();
                    if (meth === 'boolean') {
                        assert.ok(result === true || result === false);
                    } else {
                        assert.ok(result);
                    }
                });
            });
        });
    });
  }
});

describe("pure.fake functional tests", function () {
  for(var locale in pure.locales) {
    pure.locale = locale;
    pure.seed(1);
    Object.keys(modules).forEach(function (module) {
        describe(module, function () {
            modules[module].forEach(function (meth) {
                it(meth + "()", function () {
                    var result = pure.fake('{{' + module + '.' + meth + '}}');
                    // just make sure any result is returned
                    // an undefined result usually means an error
                    assert.ok(typeof result !== 'undefined');
                    /*
                    if (meth === 'boolean') {
                        assert.ok(result === true || result === false);
                    } else {
                        assert.ok(result);
                    }
                    */
                });
            });
        });
    });
  }
});