if (typeof module !== 'undefined') {
    var assert = require('assert');
    var sinon = require('sinon');
    var pure = require('../index');
}

// TODO: make some tests for getting / setting locales

// Remark: actual use of locales functionality is currently tested in all.functional.js test

describe("locale", function () {
    describe("setLocale()", function () {
        it("setLocale() changes pure.locale", function () {
          for(var locale in pure.locales) {
            pure.setLocale(locale)
            assert.equal(pure.locale, locale);
          }
        });
    });
});
