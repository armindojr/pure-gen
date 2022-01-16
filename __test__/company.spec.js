const { assert, expect } = require('chai');
const sinon = require('sinon');
const pure = require('../index');

describe('company.js', () => {
    describe('companyName()', () => {
        it('sometimes returns three last names', () => {
            sinon.spy(pure.name, 'lastName');
            sinon.stub(pure.random, 'number').returns(2);
            const name = pure.company.companyName();
            const parts = name.split(' ');

            assert.strictEqual(parts.length, 4);
            assert.ok(pure.name.lastName.calledOnce);

            pure.random.number.restore();
            pure.name.lastName.restore();
        });

        it('sometimes returns two last names separated by a hyphen', () => {
            sinon.spy(pure.name, 'lastName');
            sinon.stub(pure.random, 'number').returns(1);
            const name = pure.company.companyName();
            const parts = name.split('-');

            assert.ok(parts.length >= 2);
            assert.ok(pure.name.lastName.calledOnce);

            pure.random.number.restore();
            pure.name.lastName.restore();
        });

        it('sometimes returns a last name with a company suffix', () => {
            sinon.spy(pure.company, 'companySuffix');
            sinon.spy(pure.name, 'lastName');
            sinon.stub(pure.random, 'number').returns(0);
            const name = pure.company.companyName();
            const parts = name.split(' ');

            assert.ok(parts.length >= 2);
            assert.ok(pure.name.lastName.calledOnce);
            assert.ok(pure.company.companySuffix.calledOnce);

            pure.random.number.restore();
            pure.name.lastName.restore();
            pure.company.companySuffix.restore();
        });

        it('returns three last names when parameter is a specific format', () => {
            sinon.spy(pure.name, 'lastName');
            const name = pure.company.companyName('{{name.lastName}}, {{name.lastName}} and {{name.lastName}}');
            const parts = name.split(' ');

            assert.strictEqual(parts.length, 4);
            assert.ok(pure.name.lastName.calledOnce);

            pure.name.lastName.restore();
        });
    });

    describe('companySuffix()', () => {
        it('returns random value from company.suffixes array', () => {
            const suffix = pure.company.companySuffix();
            assert.ok(pure.company.suffixes().indexOf(suffix) !== -1);
        });
    });

    describe('companyPrefix()', () => {
        it('returns random value from company prefix', () => {
            const stub = sinon.stub(pure.registeredModules, 'company').get(() => ({
                prefix: [ 'foo' ],
            }));

            const prefix = pure.company.companyPrefix();
            expect(prefix).to.equal('foo')

            stub.restore();
        });
    });

    describe('catchPhrase()', () => {
        it('returns phrase comprising of a catch phrase adjective, descriptor, and noun', () => {
            sinon.spy(pure.random, 'arrayElement');
            sinon.spy(pure.company, 'catchPhraseAdjective');
            sinon.spy(pure.company, 'catchPhraseDescriptor');
            sinon.spy(pure.company, 'catchPhraseNoun');
            const phrase = pure.company.catchPhrase();

            assert.ok(phrase.split(' ').length >= 3);
            assert.ok(pure.random.arrayElement.calledThrice);
            assert.ok(pure.company.catchPhraseAdjective.calledOnce);
            assert.ok(pure.company.catchPhraseDescriptor.calledOnce);
            assert.ok(pure.company.catchPhraseNoun.calledOnce);

            pure.random.arrayElement.restore();
            pure.company.catchPhraseAdjective.restore();
            pure.company.catchPhraseDescriptor.restore();
            pure.company.catchPhraseNoun.restore();
        });
    });

    describe('bs()', () => {
        it('returns phrase comprising of a BS buzz, adjective, and noun', () => {
            sinon.spy(pure.random, 'arrayElement');
            sinon.spy(pure.company, 'bsBuzz');
            sinon.spy(pure.company, 'bsAdjective');
            sinon.spy(pure.company, 'bsNoun');
            const bs = pure.company.bs();

            assert.ok(typeof bs === 'string');
            assert.ok(pure.random.arrayElement.calledThrice);
            assert.ok(pure.company.bsBuzz.calledOnce);
            assert.ok(pure.company.bsAdjective.calledOnce);
            assert.ok(pure.company.bsNoun.calledOnce);

            pure.random.arrayElement.restore();
            pure.company.bsBuzz.restore();
            pure.company.bsAdjective.restore();
            pure.company.bsNoun.restore();
        });
    });
});
