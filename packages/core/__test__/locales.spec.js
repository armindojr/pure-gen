import pure from '../index.js';
import Pure from '../src/index.js';

// Remark: actual use of locales functionality is currently tested in all.functional.js test

describe('locale', () => {
    describe('Pure()', () => {
        it('set locale on constructor', () => {
            const localeTest = {
                foo: 'bar',
            };

            const test = new Pure(localeTest);

            expect(test.registeredModules.foo).toEqual('bar');
        });
    });

    describe('setLocale()', () => {
        it('setLocale() changes pure.locale', () => {
            const localeTest = {
                foo: 'bar',
            };

            pure.setLocale(localeTest);

            expect(pure.registeredModules.foo).toEqual('bar');
        });
    });
});
