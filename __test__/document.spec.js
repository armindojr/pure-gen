const { assert } = require('chai');
const sinon = require('sinon');
const pure = require('../index');

describe('document.js', () => {
    describe('cpf()', () => {
        it('returns a valid cpf', () => {
            const document = pure.document.cpf();

            assert.equal(document.length, 11);
        });

        it('returns a valid formatted cpf', () => {
            const document = pure.document.cpf({ format: true });

            assert.equal(document.length, 14);
        });

        it('passing wrong parameter return a valid cpf', () => {
            const document = pure.document.cpf('ececefesds');

            assert.equal(document.length, 11);
        });
    });

    describe('cnpj()', () => {
        it('returns a valid cnpj', () => {
            const document = pure.document.cnpj();

            assert.equal(document.length, 14);
        });

        it('returns a valid formatted cnpj', () => {
            const document = pure.document.cnpj({ format: true });

            assert.equal(document.length, 18);
        });

        it('passing wrong parameter return a valid cnpj', () => {
            const document = pure.document.cnpj('ececefesds');

            assert.equal(document.length, 14);
        });
    });
});
