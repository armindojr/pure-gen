const { assert } = require('chai');
const sinon = require('sinon');
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

        it('when mod 11 returns 10', () => {
            sinon.stub(pure.helpers, 'replaceSymbolWithNumber').returns('111119999');
            const document = pure.document.brazilianCitizenNumber();

            assert.equal(document.length, 11);
            pure.helpers.replaceSymbolWithNumber.restore();
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

        it('when verificationNum is 11', () => {
            sinon.stub(pure.helpers, 'replaceSymbolWithNumber').returns('63475332');
            const document = pure.document.brazilianId();

            assert.equal(document.length, 9);
            pure.helpers.replaceSymbolWithNumber.restore();
        });

        it('when verificationNum is 10', () => {
            sinon.stub(pure.helpers, 'replaceSymbolWithNumber').returns('00871244');
            const document = pure.document.brazilianId();

            assert.equal(document.length, 9);
            pure.helpers.replaceSymbolWithNumber.restore();
        });
    });
});
