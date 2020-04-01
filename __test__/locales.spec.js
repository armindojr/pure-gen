const { assert } = require('chai');
const pure = require('../index');

// TODO: make some tests for getting / setting locales

// Remark: actual use of locales functionality is currently tested in all.functional.js test

describe('locale', () => {
    describe('setLocale()', () => {
        it('setLocale() changes pure.locale', () => {
            Object.keys(pure.locales).forEach((locale) => {
                pure.setLocale(locale);
                assert.equal(pure.locale, locale);
            });
        });
    });
});
