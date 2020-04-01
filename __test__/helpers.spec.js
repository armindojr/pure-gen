const { assert } = require('chai');
const sinon = require('sinon');
const pure = require('../index');
const luhnCheck = require('./support/luhnCheck');

describe('helpers.js', () => {
    describe('replaceSymbolWithNumber()', () => {
        context('when no symbol passed in', () => {
            it("uses '#' by default", () => {
                const num = pure.helpers.replaceSymbolWithNumber('#AB');
                assert.ok(num.match(/\dAB/));
            });
        });

        context('when symbol passed in', () => {
            it('replaces that symbol with integers', () => {
                const num = pure.helpers.replaceSymbolWithNumber('#AB', 'A');
                assert.ok(num.match(/#\dB/));
            });
        });
    });

    describe('replaceSymbols()', () => {
        context("when '*' passed", () => {
            it('replaces it with alphanumeric', () => {
                const num = pure.helpers.replaceSymbols('*AB');
                assert.ok(num.match(/\wAB/));
            });
        });
    });

    describe('shuffle()', () => {
        it('the output is the same length as the input', () => {
            sinon.spy(pure.random, 'number');
            const shuffled = pure.helpers.shuffle(['a', 'b']);
            assert.ok(shuffled.length === 2);
            assert.ok(pure.random.number.calledWith(1));
            pure.random.number.restore();
        });

        it('empty array returns empty array', () => {
            const shuffled = pure.helpers.shuffle([]);
            assert.ok(shuffled.length === 0);
        });

        it('mutates the input array in place', () => {
            const input = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
            const shuffled = pure.helpers.shuffle(input);
            assert.deepEqual(shuffled, input);
        });

        it('all items shuffled as expected when seeded', () => {
            const input = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
            pure.seed(100);
            const shuffled = pure.helpers.shuffle(input);
            assert.deepEqual(shuffled, ['b', 'e', 'a', 'd', 'j', 'i', 'h', 'c', 'g', 'f']);
        });
    });

    describe('slugify()', () => {
        it('removes unwanted characters from URI string', () => {
            assert.equal(pure.helpers.slugify('Aiden.Harªann'), 'Aiden.Harann');
            assert.equal(pure.helpers.slugify("d'angelo.net"), 'dangelo.net');
        });
    });

    describe('mustache()', () => {
        it('returns empty string with no arguments', () => {
            assert.equal(pure.helpers.mustache(), '');
        });
    });

    describe('repeatString()', () => {
        it('returns empty string with no arguments', () => {
            assert.equal(pure.helpers.repeatString(), '');
        });
    });

    describe('replaceSymbols()', () => {
        it('returns empty string with no arguments', () => {
            assert.equal(pure.helpers.replaceSymbols(), '');
        });
    });

    /*
    describe("replaceCreditCardSymbols()", function () {
        it("returns empty string with no arguments", function () {
            assert.equal(pure.helpers.replaceCreditCardSymbols(), "");
        });
    });
    */

    describe('createCard()', () => {
        it('returns an object', () => {
            const card = pure.helpers.createCard();
            assert.ok(typeof card === 'object');
        });
    });

    describe('contextualCard()', () => {
        it('returns an object', () => {
            const card = pure.helpers.contextualCard();
            assert.ok(typeof card === 'object');
        });
    });

    describe('userCard()', () => {
        it('returns an object', () => {
            const card = pure.helpers.userCard();
            assert.ok(typeof card === 'object');
        });
    });

    // Make sure we keep this function for backward-compatibility.
    describe('randomize()', () => {
        it('returns a random element from an array', () => {
            const arr = ['a', 'b', 'c'];
            const elem = pure.helpers.randomize(arr);
            assert.ok(elem);
            assert.ok(arr.indexOf(elem) !== -1);
        });
    });

    describe('replaceCreditCardSymbols()', () => {
        it('returns a credit card number given a schema', () => {
            const number = pure.helpers.replaceCreditCardSymbols('6453-####-####-####-###L');
            assert.ok(number.match(/^6453-([0-9]){4}-([0-9]){4}-([0-9]){4}-([0-9]){4}$/));
            assert.ok(luhnCheck(number));
        });
        it('supports different symbols', () => {
            const number = pure.helpers.replaceCreditCardSymbols('6453-****-****-****-***L', '*');
            assert.ok(number.match(/^6453-([0-9]){4}-([0-9]){4}-([0-9]){4}-([0-9]){4}$/));
            assert.ok(luhnCheck(number));
        });
        it('handles regexp style input', () => {
            let number = pure.helpers.replaceCreditCardSymbols('6453-*{4}-*{4}-*{4}-*{3}L', '*');
            assert.ok(number.match(/^6453-([0-9]){4}-([0-9]){4}-([0-9]){4}-([0-9]){4}$/));
            assert.ok(luhnCheck(number));
            number = pure.helpers.replaceCreditCardSymbols('645[5-9]-#{4,6}-#{1,2}-#{4,6}-#{3}L');
            assert.ok(number.match(/^645[5-9]-([0-9]){4,6}-([0-9]){1,2}-([0-9]){4,6}-([0-9]){4}$/));
            assert.ok(luhnCheck(number));
        });
    });

    describe('regexpStyleStringParse()', () => {
        it('returns an empty string when called without param', () => {
            assert.ok(pure.helpers.regexpStyleStringParse() === '');
        });
        it('deals with range repeat', () => {
            const string = pure.helpers.regexpStyleStringParse('#{5,10}');
            assert.ok(string.length <= 10 && string.length >= 5);
            assert.ok(string.match(/^#{5,10}$/));
        });
        it('flips the range when min > max', () => {
            const string = pure.helpers.regexpStyleStringParse('#{10,5}');
            assert.ok(string.length <= 10 && string.length >= 5);
            assert.ok(string.match(/^#{5,10}$/));
        });
        it('repeats string {n} number of times', () => {
            assert.ok(pure.helpers.regexpStyleStringParse('%{10}') === pure.helpers.repeatString('%', 10));
            assert.ok(pure.helpers.regexpStyleStringParse('%{30}') === pure.helpers.repeatString('%', 30));
            assert.ok(pure.helpers.regexpStyleStringParse('%{5}') === pure.helpers.repeatString('%', 5));
        });
        it('creates a numerical range', () => {
            const string = pure.helpers.regexpStyleStringParse('Hello[0-9]');
            assert.ok(string.match(/^Hello[0-9]$/));
        });
        it('deals with multiple tokens in one string', () => {
            const string = pure.helpers.regexpStyleStringParse('Test#{5}%{2,5}Testing**[1-5]**{10}END');
            assert.ok(string.match(/^Test#{5}%{2,5}Testing\*\*[1-5]\*\*{10}END$/));
        });
    });

    describe('createTransaction()', () => {
        it('should create a random transaction', () => {
            const transaction = pure.helpers.createTransaction();
            assert.ok(transaction);
            assert.ok(transaction.amount);
            assert.ok(transaction.date);
            assert.ok(transaction.business);
            assert.ok(transaction.name);
            assert.ok(transaction.type);
            assert.ok(transaction.account);
        });
    });
});
