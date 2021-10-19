const { assert, expect } = require('chai');
const sinon = require('sinon');
const pure = require('../index');
const luhnCheck = require('./support/luhnCheck');

describe('helpers.js', () => {
    describe('replaceSymbolWithNumber()', () => {
        describe('when no symbol passed in', () => {
            it("uses '#' by default", () => {
                const num = pure.helpers.replaceSymbolWithNumber({ string: '#AB' });
                assert.ok(num.match(/\dAB/));
            });
        });

        describe('when no string passed in', () => {
            it('returns an empty string', () => {
                const num = pure.helpers.replaceSymbolWithNumber();
                assert.equal(num, '');
            });
        });

        describe('when symbol passed in', () => {
            it('replaces that symbol with integers', () => {
                const num = pure.helpers.replaceSymbolWithNumber({ string: '#AB', symbol: 'A' });
                assert.ok(num.match(/#\dB/));
            });
        });
    });

    describe('replaceSymbols()', () => {
        describe("when '*' passed", () => {
            it('replaces it with alphanumeric', () => {
                const num = pure.helpers.replaceSymbols('*AB');
                assert.ok(num.match(/\wAB/));
            });
        });

        describe('when random boolean return false', () => {
            it('symbol is replaced with random number', () => {
                sinon.stub(pure.random, 'boolean').returns(false);
                const num = pure.helpers.replaceSymbols('*AB');
                assert.ok(num.match(/\wAB/));

                pure.random.boolean.restore();
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

        it('empty parameter returns empty array', () => {
            const shuffled = pure.helpers.shuffle();
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
            assert.deepEqual(shuffled, ['c', 'h', 'f', 'g','a', 'i', 'd', 'e','j', 'b']);
            pure.seed();
        });
    });

    describe('slugify()', () => {
        it('removes unwanted characters from URI string', () => {
            assert.equal(pure.helpers.slugify('Aiden.Harªann'), 'Aiden.Haraann');
            assert.equal(pure.helpers.slugify("d'angelo.net"), 'dangelo.net');
        });

        it('return empty string if passed one is empty too', () => {
            assert.equal(pure.helpers.slugify(), '');
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

    describe('replaceCreditCardSymbols()', () => {
        it('returns a credit card number given a schema', () => {
            const number = pure.helpers.replaceCreditCardSymbols({ string: '6453-####-####-####-###L' });
            assert.ok(number.match(/^6453-([0-9]){4}-([0-9]){4}-([0-9]){4}-([0-9]){4}$/));
            assert.ok(luhnCheck(number));
        });
        it('returns only one digit if no string is passed', () => {
            const number = pure.helpers.replaceCreditCardSymbols();

            assert.equal(number.length, 1);
        });
        it('supports different symbols', () => {
            const number = pure.helpers.replaceCreditCardSymbols({ string: '6453-****-****-****-***L', symbol: '*' });
            assert.ok(number.match(/^6453-([0-9]){4}-([0-9]){4}-([0-9]){4}-([0-9]){4}$/));
            assert.ok(luhnCheck(number));
        });
        it('handles regexp style input', () => {
            let number = pure.helpers.replaceCreditCardSymbols({ string: '6453-*{4}-*{4}-*{4}-*{3}L', symbol: '*' });
            assert.ok(number.match(/^6453-([0-9]){4}-([0-9]){4}-([0-9]){4}-([0-9]){4}$/));
            assert.ok(luhnCheck(number));
            number = pure.helpers.replaceCreditCardSymbols({ string: '645[5-9]-#{4,6}-#{1,2}-#{4,6}-#{3}L' });
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
            assert.ok(pure.helpers.regexpStyleStringParse('%{10}') === pure.helpers.repeatString({ string: '%', num: 10 }));
            assert.ok(pure.helpers.regexpStyleStringParse('%{30}') === pure.helpers.repeatString({ string: '%', num: 30 }));
            assert.ok(pure.helpers.regexpStyleStringParse('%{5}') === pure.helpers.repeatString({ string: '%', num: 5 }));
        });
        it('creates a numerical range', () => {
            const string = pure.helpers.regexpStyleStringParse('Hello[0-9]');
            assert.ok(string.match(/^Hello[0-9]$/));
        });
        it('creates a numerical range with min greater than max', () => {
            const string = pure.helpers.regexpStyleStringParse('Hello[9-7]');
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

    describe('replaceSymbolWithHex', () => {
        it('replace symbol without passing string', () => {
            const replace = pure.helpers.replaceSymbolWithHex();

            assert.equal(replace, '');
        });

        it('replace symbol and don\'t replace number', () => {
            const replace = pure.helpers.replaceSymbolWithHex({ string: '92hd7##' });

            expect(replace).to.contain('92hd7');
        });
    });
});
