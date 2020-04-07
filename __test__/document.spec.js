const { assert } = require('chai');
const pure = require('../index');

describe('document.js', () => {
    describe('brazilianCitizenNumber()', () => {
        it('returns a valid cpf', () => {
            const document = pure.document.brazilianCitizenNumber();

            assert.equal(document.length, 11);
        });

        it('returns a valid formatted cpf', () => {
            const document = pure.document.brazilianCitizenNumber({ format: true });

            assert.equal(document.length, 14);
        });

        it('passing wrong parameter return a valid cpf', () => {
            const document = pure.document.brazilianCitizenNumber('ececefesds');

            assert.equal(document.length, 11);
        });
    });

    describe('brazilianCompanyNumber()', () => {
        it('returns a valid cnpj', () => {
            const document = pure.document.brazilianCompanyNumber();

            assert.equal(document.length, 14);
        });

        it('returns a valid formatted cnpj', () => {
            const document = pure.document.brazilianCompanyNumber({ format: true });

            assert.equal(document.length, 18);
        });

        it('passing wrong parameter return a valid cnpj', () => {
            const document = pure.document.brazilianCompanyNumber('ececefesds');

            assert.equal(document.length, 14);
        });
    });

    describe('brazilianId()', () => {
        it('returns a valid rg', () => {
            const document = pure.document.brazilianId();

            assert.equal(document.length, 9);
        });

        it('returns a valid formatted rg', () => {
            const document = pure.document.brazilianId({ format: true });

            assert.equal(document.length, 12);
        });

        it('passing wrong parameter return a valid rg', () => {
            const document = pure.document.brazilianId('ececefesds');

            assert.equal(document.length, 9);
        });
    });
});
