const { assert } = require('chai');
const sinon = require('sinon');
const pure = require('../index');

describe('phone_number.js', () => {
    describe('phoneNumber()', () => {
        it('returns a random phoneNumber with a random format', () => {
            sinon.spy(pure.helpers, 'replaceSymbolWithNumber');
            const phoneNumber = pure.phone.phoneNumber();

            assert.ok(phoneNumber.match(/\d/));
            assert.ok(pure.helpers.replaceSymbolWithNumber.called);

            pure.helpers.replaceSymbolWithNumber.restore();
        });
    });

    describe('phoneNumberFormat()', () => {
        it('returns phone number with requested format (Array index)', () => {
            pure.locale = 'en';
            for (let i = 0; i < 10; i += 1) {
                const phoneNumber = pure.phone.phoneNumberFormat(1);
                assert.ok(phoneNumber.match(/\(\d\d\d\) \d\d\d-\d\d\d\d/));
            }
        });

        it('returns phone number with proper format US (Array index)', () => {
            pure.locale = 'en';
            for (let i = 0; i < 25; i += 1) {
                const phoneNumber = pure.phone.phoneNumberFormat(1);
                assert.ok(phoneNumber.match(/\([2-9]\d\d\) [2-9]\d\d-\d\d\d\d/));
            }
        });

        it('returns phone number with proper format CA (Array index)', () => {
            pure.locale = 'en_CA';
            for (let i = 0; i < 25; i += 1) {
                const phoneNumber = pure.phone.phoneNumberFormat(1);
                assert.ok(phoneNumber.match(/\([2-9]\d\d\)[2-9]\d\d-\d\d\d\d/));
            }
        });
    });
});
