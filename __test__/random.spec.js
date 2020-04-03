
const { assert } = require('chai');
const lodash = require('lodash');
const pure = require('../index');
const mersenne = require('../vendor/mersenne');

describe('random.js', () => {
    describe('number', () => {
        it('returns a random number given a maximum value as Number', () => {
            const max = 10;
            assert.ok(pure.random.number(max) <= max);
        });

        it('returns a random number given a maximum value as Object', () => {
            const options = { max: 10 };
            assert.ok(pure.random.number(options) <= options.max);
        });

        it('returns a random number given a maximum value of 0', () => {
            const options = { max: 0 };
            assert.ok(pure.random.number(options) === 0);
        });

        it('returns a random number given a negative number minimum and maximum value of 0', () => {
            const options = { min: -100, max: 0 };
            assert.ok(pure.random.number(options) <= options.max);
        });

        it('returns a random number between a range', () => {
            const options = { min: 22, max: 33 };
            for (let i = 0; i < 100; i += 1) {
                const randomNumber = pure.random.number(options);
                assert.ok(randomNumber >= options.min);
                assert.ok(randomNumber <= options.max);
            }
        });

        it('provides numbers with a given precision', () => {
            const options = { min: 0, max: 1.5, precision: 0.5 };
            const results = lodash.chain(lodash.range(50))
                .map(() => pure.random.number(options))
                .uniq()
                .value()
                .sort();

            assert.ok(lodash.includes(results, 0.5));
            assert.ok(lodash.includes(results, 1.0));

            assert.equal(results[0], 0);
            assert.equal(lodash.last(results), 1.5);
        });

        it('provides numbers with a with exact precision', () => {
            const options = { min: 0.5, max: 0.99, precision: 0.01 };
            for (let i = 0; i < 100; i += 1) {
                const number = pure.random.number(options);
                assert.equal(number, Number(number.toFixed(2)));
            }
        });

        it('should not modify the input object', () => {
            const min = 1;
            const max = 2;
            const opts = {
                min,
                max,
            };

            pure.random.number(opts);

            assert.equal(opts.min, min);
            assert.equal(opts.max, max);
        });

        it('should return deterministic results when seeded with integer', () => {
            pure.seed(100);
            const name = pure.name.findName();
            assert.equal(name, 'Eva Jenkins');
        });

        it('should return deterministic results when seeded with array - one element', () => {
            pure.seed([10]);
            const name = pure.name.findName();
            assert.equal(name, 'Duane Kub');
        });

        it('should return deterministic results when seeded with array - multiple elements', () => {
            pure.seed([10, 100, 1000]);
            const name = pure.name.findName();
            assert.equal(name, 'Alma Shanahan');
        });
    });

    describe('float', () => {
        it('returns a random float with a default precision value (0.01)', () => {
            const number = pure.random.float();
            assert.equal(number, Number(number.toFixed(2)));
        });

        it('returns a random float given a precision value', () => {
            const number = pure.random.float(0.001);
            assert.equal(number, Number(number.toFixed(3)));
        });

        it('returns a random number given a maximum value as Object', () => {
            const options = { max: 10 };
            assert.ok(pure.random.float(options) <= options.max);
        });

        it('returns a random number given a maximum value of 0', () => {
            const options = { max: 0 };
            assert.ok(pure.random.float(options) === 0);
        });

        it('returns a random number given no minimum and a negative number maximum', () => {
            const options = { max: -10 };
            assert.ok(pure.random.number(options) <= options.max);
        });

        it('returns a random number given a negative number minimum and maximum value of 0', () => {
            const options = { min: -100, max: 0 };
            assert.ok(pure.random.float(options) <= options.max);
        });

        it('returns a random number between a range', () => {
            const options = { min: 22, max: 33 };
            for (let i = 0; i < 5; i += 1) {
                const randomNumber = pure.random.float(options);
                assert.ok(randomNumber >= options.min);
                assert.ok(randomNumber <= options.max);
            }
        });

        it('provides numbers with a given precision', () => {
            const options = { min: 0, max: 1.5, precision: 0.5 };
            const results = lodash.chain(lodash.range(50))
                .map(() => pure.random.float(options))
                .uniq()
                .value()
                .sort();

            assert.ok(lodash.includes(results, 0.5));
            assert.ok(lodash.includes(results, 1.0));

            assert.equal(results[0], 0);
            assert.equal(lodash.last(results), 1.5);
        });

        it('provides numbers with a with exact precision', () => {
            const options = { min: 0.5, max: 0.99, precision: 0.01 };
            for (let i = 0; i < 100; i += 1) {
                const number = pure.random.float(options);
                assert.equal(number, Number(number.toFixed(2)));
            }
        });

        it('should not modify the input object', () => {
            const min = 1;
            const max = 2;
            const opts = {
                min,
                max,
            };

            pure.random.float(opts);

            assert.equal(opts.min, min);
            assert.equal(opts.max, max);
        });
    });

    describe('arrayElement', () => {
        it('returns a random element in the array', () => {
            const testArray = ['hello', 'to', 'you', 'my', 'friend'];
            assert.ok(testArray.indexOf(pure.random.arrayElement(testArray)) > -1);
        });

        it('returns a random element in the array when there is only 1', () => {
            const testArray = ['hello'];
            assert.ok(testArray.indexOf(pure.random.arrayElement(testArray)) > -1);
        });
    });

    describe('arrayElements', () => {
        it('returns a subset with random elements in the array', () => {
            const testArray = ['hello', 'to', 'you', 'my', 'friend'];
            const subset = pure.random.arrayElements(testArray);

            // Check length
            assert.ok(subset.length >= 1 && subset.length <= testArray.length);

            // Check elements
            subset.forEach((element) => {
                assert.ok(testArray.indexOf(element) > -1);
            });

            // Check uniqueness
            subset.forEach(function check(element) {
                assert.ok(!Object.prototype.hasOwnProperty.call(this, element));
                this[element] = true;
            }, {});
        });

        it('returns a subset of fixed length with random elements in the array', () => {
            const testArray = ['hello', 'to', 'you', 'my', 'friend'];
            const subset = pure.random.arrayElements(testArray, 3);

            // Check length
            assert.ok(subset.length === 3);

            // Check elements
            subset.forEach((element) => {
                assert.ok(testArray.indexOf(element) > -1);
            });

            // Check uniqueness
            subset.forEach(function check(element) {
                assert.ok(!Object.prototype.hasOwnProperty.call(this, element));
                this[element] = true;
            }, {});
        });

        it('returns a subset of lenght equal to one passed by', () => {
            const testArray = ['hello', 'to', 'you', 'my', 'friend'];
            const subset = pure.random.arrayElements(testArray, 8);

            // Check length
            assert.ok(subset.length === testArray.length);

            // Check elements
            subset.forEach((element) => {
                assert.ok(testArray.indexOf(element) > -1);
            });

            // Check uniqueness
            subset.forEach(function check(element) {
                assert.ok(!Object.prototype.hasOwnProperty.call(this, element));
                this[element] = true;
            }, {});
        });

        it('returns an empty array if count is 0', () => {
            const testArray = ['hello', 'to', 'you', 'my', 'friend'];
            const subset = pure.random.arrayElements(testArray, -1);

            // Check length
            assert.ok(subset.length === 0);
        });
    });

    describe('UUID', () => {
        it('should generate a valid UUID', () => {
            const UUID = pure.random.uuid();
            const RFC4122 = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
            assert.ok(RFC4122.test(UUID));
        });
    });

    describe('boolean', () => {
        it('should generate a boolean value', () => {
            const bool = pure.random.boolean();
            assert.ok(typeof bool === 'boolean');
        });
    });

    describe('semver', () => {
        const semver = pure.system.semver();

        it('should generate a string', () => {
            assert.ok(typeof semver === 'string');
        });

        it('should generate a valid semver', () => {
            assert.ok(/^\d+\.\d+\.\d+$/.test(semver));
        });
    });

    describe('alpha', () => {
        const { alpha } = pure.random;

        it('should return single letter when no count provided', () => {
            assert.ok(alpha().length === 1);
        });

        it('should return lowercase letter when no upcase option provided', () => {
            assert.ok(alpha().match(/[a-z]/));
        });

        it('should return uppercase when upcase option is true', () => {
            assert.ok(alpha({ upcase: true }).match(/[A-Z]/));
        });

        it('should generate many random letters', () => {
            assert.ok(alpha(5).length === 5);
        });
    });

    describe('alphaNumeric', () => {
        const { alphaNumeric } = pure.random;

        it('should generate single character when no additional argument was provided', () => {
            assert.ok(alphaNumeric().length === 1);
        });

        it('should generate many random characters', () => {
            assert.ok(alphaNumeric(5).length === 5);
        });
    });

    describe('hexaDecimal', () => {
        const { hexaDecimal } = pure.random;

        it('should generate single hex character when no additional argument was provided', () => {
            const hex = hexaDecimal();
            assert.ok(hex.match(/^(0x)[0-9a-f]{1}$/i));
        });

        it('should generate a random hex string', () => {
            const hex = hexaDecimal(5);
            assert.ok(hex.match(/^(0x)[0-9a-f]+$/i));
        });
    });

    describe('mersenne twister', () => {
        it('returns a random number without given min / max arguments', () => {
            const randomNumber = mersenne.rand();
            assert.ok(typeof randomNumber === 'number');
        });

        it('throws an error when attempting to seed() a non-integer', () => {
            assert.throws(() => {
                mersenne.seed('abc');
            }, Error);
        });

        it('throws an error when attempting to seed() a non-integer', () => {
            assert.throws(() => {
                mersenne.seed_array('abc');
            }, Error);
        });
    });
});
