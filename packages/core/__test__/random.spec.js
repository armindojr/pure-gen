import sinon from 'sinon';
import pure from '../index.js';
import Pure from '../src/index.js';

describe('random.js', () => {
    describe('number()', () => {
        it('returns a random number given a maximum value as Number', () => {
            const max = 10;

            expect(pure.random.number(max)).toBeLessThanOrEqual(max);
        });

        it('returns a random number given a maximum value as Object', () => {
            const options = { max: 10 };

            expect(pure.random.number(options)).toBeLessThanOrEqual(options.max);
        });

        it('returns a random number given a maximum value of 0', () => {
            const options = { max: 0 };

            expect(pure.random.number(options)).toEqual(0);
        });

        it('returns a random number given a negative number minimum and maximum value of 0', () => {
            const options = { min: -100, max: 0 };

            expect(pure.random.number(options)).toBeLessThanOrEqual(options.max);
        });

        it('returns a random number between a range', () => {
            const options = { min: 22, max: 33 };
            const result = pure.random.number(options);

            expect(result).toBeGreaterThanOrEqual(options.min);
            expect(result).toBeLessThanOrEqual(options.max);
        });

        it('provides numbers with a given precision and a seed', () => {
            pure.seed(1);

            const options = { min: 0, max: 1.5, precision: 1 };
            const result = pure.random.number(options);

            expect(result).toBeGreaterThanOrEqual(options.min);
            expect(result).toBeLessThanOrEqual(options.max);

            pure.seed();
        });

        it('provides numbers with precision greather than 10', () => {
            const options = { min: 0, max: 2, precision: 15 };
            const result = pure.random.number(options);

            expect(result.toString().length).toBeLessThan(13);
            expect(result).toBeGreaterThanOrEqual(options.min);
            expect(result).toBeLessThanOrEqual(options.max);
        });

        it('provides numbers with precision less than 1', () => {
            const options = { min: 0, max: 2, precision: -1 };
            const result = pure.random.number(options);

            expect(result).toBeGreaterThanOrEqual(options.min);
            expect(result).toBeLessThanOrEqual(options.max);
        });

        it('provides numbers with a with exact precision', () => {
            const options = { min: 0.5, max: 0.99, precision: 1 };
            const number = pure.random.number(options);

            expect(number).toEqual(Number(number.toFixed(2)));
        });

        it('should return number less than maximum determined', () => {
            sinon.stub(Math, 'round').returns(4);

            const options = { min: 2, max: 3, precision: 2 };
            const result = pure.random.number(options);

            expect(result).toBeGreaterThanOrEqual(options.min);
            expect(result).toBeLessThanOrEqual(options.max);

            Math.round.restore();
        });

        it('should not return a value below minimum when using precision', () => {
            sinon.stub(Math, 'round').returns(-10);

            const options = { min: -5, max: 5, precision: 4 };
            const result = pure.random.number(options);

            expect(result).toBeGreaterThanOrEqual(options.min);
            expect(result).toBeLessThanOrEqual(options.max);

            Math.round.restore();
        });
    });

    describe('float()', () => {
        it('returns a random float with a default precision value (0.01)', () => {
            const number = pure.random.float();

            expect(number).toEqual(Number(number.toFixed(2)));
        });

        it('returns a random float given a precision value', () => {
            const number = pure.random.float(0.001);

            expect(number).toEqual(Number(number.toFixed(3)));
        });

        it('returns a random number given a maximum value as Object', () => {
            const options = { max: 10 };

            expect(pure.random.float(options)).toBeLessThanOrEqual(options.max);
        });

        it('returns a random number given a maximum value of 0', () => {
            const options = { max: 0 };

            expect(pure.random.float(options)).toEqual(0);
        });

        it('returns a random number given no minimum and a negative number maximum', () => {
            const options = { max: -10 };

            expect(pure.random.number(options)).toBeLessThanOrEqual(options.max);
        });

        it('returns a random number given a negative number minimum and maximum value of 0', () => {
            const options = { min: -100, max: 0 };

            expect(pure.random.float(options)).toBeLessThanOrEqual(options.max);
        });

        it('returns a random number between a range', () => {
            const options = { min: 22, max: 33 };
            const randomNumber = pure.random.float(options);

            expect(randomNumber).toBeGreaterThanOrEqual(options.min);
            expect(randomNumber).toBeLessThanOrEqual(options.max);
        });

        it('provides numbers with a given precision', () => {
            const options = { min: 0, max: 1.5, precision: 1 };
            const result = pure.random.number(options);

            expect(result).toBeLessThanOrEqual(1.5);
            expect(result).toBeGreaterThanOrEqual(0);
        });

        it('provides numbers with a with exact precision', () => {
            const options = { min: 0.5, max: 0.99, precision: 1 };
            const number = pure.random.float(options);

            expect(number).toEqual(Number(number.toFixed(2)));
        });
    });

    describe('arrayElement()', () => {
        it('returns a random element in the array', () => {
            const testArray = ['hello', 'to', 'you', 'my', 'friend'];

            expect(testArray.indexOf(pure.random.arrayElement(testArray))).toBeGreaterThan(-1);
        });

        it('returns a random element in the array when there is only 1', () => {
            const testArray = ['hello'];

            expect(testArray.indexOf(pure.random.arrayElement(testArray))).toBeGreaterThan(-1);
        });
    });

    describe('arrayElements()', () => {
        it('returns random array element', () => {
            const elem = pure.random.arrayElements();

            expect(elem).toBeDefined();
        });

        it('returns a subset with random elements in the array', () => {
            const testArray = ['hello', 'to', 'you', 'my', 'friend'];
            const subset = pure.random.arrayElements(testArray);

            // Check length
            expect(subset.length).toBeGreaterThanOrEqual(1);
            expect(subset.length).toBeLessThanOrEqual(testArray.length);

            // Check elements
            subset.forEach((element) => {
                expect(testArray.indexOf(element)).toBeGreaterThan(-1);
            });

            // Check uniqueness
            subset.forEach(function check(element) {
                expect(!Object.prototype.hasOwnProperty.call(this, element)).toEqual(true);
                this[element] = true;
            }, {});
        });

        it('returns a subset of fixed length with random elements in the array', () => {
            const testArray = ['hello', 'to', 'you', 'my', 'friend'];
            const subset = pure.random.arrayElements(testArray, 3);

            // Check length
            expect(subset.length).toEqual(3);

            // Check elements
            subset.forEach((element) => {
                expect(testArray.indexOf(element)).toBeGreaterThan(-1);
            });

            // Check uniqueness
            subset.forEach(function check(element) {
                expect(!Object.prototype.hasOwnProperty.call(this, element)).toEqual(true);
                this[element] = true;
            }, {});
        });

        it('returns a subset of lenght equal to one passed by', () => {
            const testArray = ['hello', 'to', 'you', 'my', 'friend'];
            const subset = pure.random.arrayElements(testArray, 8);

            // Check length
            expect(subset.length).toEqual(testArray.length);

            // Check elements
            subset.forEach((element) => {
                expect(testArray.indexOf(element)).toBeGreaterThan(-1);
            });

            // Check uniqueness
            subset.forEach(function check(element) {
                expect(!Object.prototype.hasOwnProperty.call(this, element)).toEqual(true);
                this[element] = true;
            }, {});
        });

        it('returns an empty array if count is 0', () => {
            const testArray = ['hello', 'to', 'you', 'my', 'friend'];
            const subset = pure.random.arrayElements(testArray, -1);

            // Check length
            expect(subset.length).toEqual(0);
        });
    });

    describe('objectElement()', () => {
        it('return random object element', () => {
            const elem = pure.random.objectElement();

            expect(elem).toBeDefined();
        });
    });

    describe('generateObj()', () => {
        it('returns an object of two elements with random keys and values', () => {
            const object = pure.random.generateObj();
            const keys = Object.keys(object);

            expect(keys.length).toEqual(2);
        });

        it('returns an object of four elements with random keys and values', () => {
            const length = 2;
            const object = pure.random.generateObj(length);
            const keys = Object.keys(object);

            expect(keys.length).toEqual(length);
        });
    });

    describe('UUID()', () => {
        it('should generate a valid UUID v1', () => {
            const UUID = pure.random.uuid();
            const RFC4122 = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

            expect(RFC4122.test(UUID)).toEqual(true);
        });

        it('should generate a valid UUID v4', () => {
            const UUID = pure.random.uuid('v4');
            const RFC4122 = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

            expect(RFC4122.test(UUID)).toEqual(true);
        });

        it('should generate a valid UUID v5', () => {
            const UUID = pure.random.uuid('v5', { name: undefined, namespace: undefined });
            const RFC4122 = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

            expect(RFC4122.test(UUID)).toEqual(true);
        });

        it('should generate a valid UUID v5 passing name as opt', () => {
            const UUID = pure.random.uuid('v5', { name: 'uuid', namespace: undefined });
            const RFC4122 = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

            expect(RFC4122.test(UUID)).toEqual(true);
        });
    });

    describe('boolean()', () => {
        it('should generate a boolean value', () => {
            const bool = pure.random.boolean();

            expect(typeof bool).toEqual('boolean');
        });
    });

    describe('semver()', () => {
        const semver = pure.system.semver();

        it('should generate a string', () => {
            expect(typeof semver).toEqual('string');
        });

        it('should generate a valid semver', () => {
            expect(/^\d+\.\d+\.\d+$/.test(semver)).toEqual(true);
        });
    });

    describe('locale()', () => {
        it('return random locale', () => {
            const loc = pure.random.locale();

            expect(loc).toBeDefined();
        });
    });

    describe('alpha()', () => {
        it('should return single letter when no count provided', () => {
            expect(pure.random.alpha().length).toEqual(1);
        });

        it('should return lowercase letter when no upcase option provided', () => {
            expect(/[a-z]/.test(pure.random.alpha())).toEqual(true);
        });

        it('should return uppercase when upcase option is true', () => {
            expect(/[A-Z]/.test(pure.random.alpha({ upcase: true }))).toEqual(true);
        });

        it('should generate many random letters', () => {
            expect(pure.random.alpha(5).length).toEqual(5);
        });
    });

    describe('alphaNumeric()', () => {
        it('should generate single character when no additional argument was provided', () => {
            expect(pure.random.alphaNumeric().length).toEqual(1);
        });

        it('should generate many random characters', () => {
            expect(pure.random.alphaNumeric(5).length).toEqual(5);
        });
    });

    describe('hexaDecimal()', () => {
        it('should generate single hex character when no additional argument was provided', () => {
            const hex = pure.random.hexaDecimal();

            expect(/^[0-9a-f]{1}$/i.test(hex)).toEqual(true);
        });

        it('should generate a random hex string', () => {
            const hex = pure.random.hexaDecimal(5);

            expect(/^[0-9a-f]+$/i.test(hex)).toEqual(true);
        });
    });

    describe('independent()', () => {
        it('generates independent sequences', () => {
            const pure1 = new Pure();
            pure1.seed(1);

            const pure2 = new Pure();
            pure2.seed(1);

            expect(pure1.random.number()).toEqual(pure2.random.number());
        });

        it('has different default seeds across invocations', (done) => {
            const pure1 = new Pure();

            // Execute the rest of the test after a short delay, so the second
            // instance gets a different random seed.
            setTimeout(() => {
                const pure2 = new Pure();

                expect(pure1.random.number()).not.toEqual(pure2.random.number());
                done();
            }, 2);
        });
    });

    describe('seed()', () => {
        it('passing empty array to seed', () => {
            pure.seed([]);

            const name = pure.name.findName();

            expect(name.length).toBeGreaterThan(1);

            pure.seed();
        });

        it('should return deterministic results when seeded with integer', () => {
            pure.seed(100);

            const name = pure.name.findName();

            expect(name).toEqual('Carlos Bernhard V');

            pure.seed();
        });

        it('should return deterministic results when seeded with array - one element', () => {
            pure.seed([10]);

            const name = pure.name.findName();

            expect(name).toEqual('Jenna Kuhic II');

            pure.seed();
        });

        it('should return deterministic results when seeded with array - multiple elements', () => {
            pure.seed([10, 100, 1000]);

            const name = pure.name.findName();

            expect(name).toEqual('Roman Cremin');

            pure.seed();
        });
    });

    describe('words()', () => {
        it('passing \'count\' parameter', () => {
            const words = pure.random.words(5);
            const result = words.split(' ');

            expect(result.length).toEqual(5);
        });
    });
});
