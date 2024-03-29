const sinon = require('sinon');
const pure = require('../index');

describe('phone_number.js', () => {
    describe('phoneNumber()', () => {
        it('returns a random phoneNumber with a random format', () => {
            sinon.spy(pure.helpers, 'replaceSymbolWithNumber');

            const phoneNumber = pure.phone.phoneNumber();

            expect(/\d/.test(phoneNumber)).toEqual(true);
            expect(pure.helpers.replaceSymbolWithNumber.called).toEqual(true);

            pure.helpers.replaceSymbolWithNumber.restore();
        });
    });

    describe('phoneNumberFormat()', () => {
        it('returns phone number with requested format (Array index)', () => {
            pure.setLocale('en');

            for (let i = 0; i < 10; i += 1) {
                const phoneNumber = pure.phone.phoneNumberFormat(1);

                expect(/\(\d\d\d\) \d\d\d-\d\d\d\d/.test(phoneNumber)).toEqual(true);
            }
        });

        it('returns phone number with proper format US (Array index)', () => {
            pure.setLocale('en');

            for (let i = 0; i < 25; i += 1) {
                const phoneNumber = pure.phone.phoneNumberFormat(1);

                expect(/\([2-9]\d\d\) [2-9]\d\d-\d\d\d\d/.test(phoneNumber)).toEqual(true);
            }
        });

        it('returns phone number with proper format CA (Array index)', () => {
            pure.setLocale('en_CA');

            for (let i = 0; i < 25; i += 1) {
                const phoneNumber = pure.phone.phoneNumberFormat(1);

                expect(/\([2-9]\d\d\)[2-9]\d\d-\d\d\d\d/.test(phoneNumber)).toEqual(true);
            }
        });
    });
});
