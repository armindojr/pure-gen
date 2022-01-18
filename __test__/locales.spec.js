const pure = require('../index');

// Remark: actual use of locales functionality is currently tested in all.functional.js test

describe('locale', () => {
    describe('setLocale()', () => {
        it('setLocale() changes pure.locale', () => {
            Object.keys(pure.possibleLocales).forEach((locale) => {
                pure.setLocale(locale);
                expect(pure.locale).toEqual(locale);
            });
        });
    });
});
