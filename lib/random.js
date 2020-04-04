const mersenne = require('../vendor/mersenne');

/**
 *
 * @namespace pure.random
 */
function Random(pure, seed) {
    var gen = new mersenne.MersenneTwister19937();

    // Preserve past behavior and fall back to the default time-based seed if an
    // empty array is passed.
    if (Array.isArray(seed) && !seed.length) {
        seed = undefined;
    }

    if (seed === undefined) {
        // Default seed copied from the marsenne package for compatibility.
        seed = (new Date).getTime() % 1000000000;
    }

    if (Array.isArray(seed)) {
        gen.init_by_array(seed, seed.length);
    }
    else {
        gen.init_genrand(seed);
    }

    // Copied from the marsenne package for compatibility.
    function rand(max, min) {
        // is never used by this way
        // if (max === undefined) {
        //     min = 0;
        //     max = 32768;
        // }
        return Math.floor(gen.genrand_real2() * (max - min) + min);
    }
    /**
   * returns a single random number based on a max number or range
   *
   * @method pure.random.number
   * @param {mixed} options {min, max, precision}
   */
    this.number = (options) => {
        let def = options;
        if (typeof def === 'number') {
            def = {
                max: def,
            };
        }

        def = def || {};

        if (typeof def.max === 'undefined') {
            def.max = Number.MAX_SAFE_INTEGER;
        }

        if (typeof def.min === 'undefined') {
            def.min = def.max < 0 ? -99999 : 0;
        }

        if (typeof def.precision === 'undefined') {
            def.precision = 1;
        }

        // Make the range inclusive of the max value
        let { max } = def;
        if (max >= 0) {
            max += def.precision;
        }

        let randomNumber = Math.floor(
            rand(max / def.precision, def.min / def.precision),
        );
        // Workaround problem in Float point arithmetics for e.g. 6681493 / 0.01
        randomNumber /= (1 / def.precision);

        return randomNumber;
    };

    /**
   * returns a single random floating-point number based on a max number or range
   *
   * @method pure.random.float
   * @param {mixed} options
   */
    this.float = (options) => {
        let def = options;
        if (typeof def === 'number') {
            def = {
                precision: def,
            };
        }
        def = def || {};
        const opts = {};
        Object.keys(def).forEach((key) => {
            opts[key] = def[key];
        });
        if (typeof opts.precision === 'undefined') {
            opts.precision = 0.01;
        }
        return pure.random.number(opts);
    };

    /**
   * takes an array and returns a random element of the array
   *
   * @method pure.random.arrayElement
   * @param {array} array
   */
    this.arrayElement = (array) => {
        const def = array || ['a', 'b', 'c'];
        const r = pure.random.number({ max: def.length - 1 });
        return def[r];
    };

    /**
   * takes an array and returns a subset with random elements of the array
   *
   * @method pure.random.arrayElements
   * @param {array} array
   * @param {number} count number of elements to pick
   */
    this.arrayElements = (array, count) => {
        const def = array || ['a', 'b', 'c'];
        let value = count;

        if (typeof value !== 'number') {
            value = pure.random.number({ min: 1, max: def.length });
        } else if (value > def.length) {
            value = def.length;
        } else if (value < 0) {
            value = 0;
        }

        const arrayCopy = def.slice();
        const countToRemove = arrayCopy.length - value;
        for (let i = 0; i < countToRemove; i += 1) {
            const indexToRemove = pure.random.number({ max: arrayCopy.length - 1 });
            arrayCopy.splice(indexToRemove, 1);
        }

        return arrayCopy;
    };

    /**
   * takes an object and returns the randomly key or value
   *
   * @method pure.random.objectElement
   * @param {object} object
   * @param {mixed} field
   */
    this.objectElement = (object, field) => {
        let def = object;
        def = def || { foo: 'bar', too: 'car' };
        const array = Object.keys(def);
        const key = pure.random.arrayElement(array);

        return field === 'key' ? key : def[key];
    };

    /**
   * uuid
   *
   * @method pure.random.uuid
   */
    this.uuid = () => {
        const RFC4122_TEMPLATE = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        const replacePlaceholders = (placeholder) => {
            const random = pure.random.number({ min: 0, max: 15 });
            const value = placeholder === 'x' ? random : ((random & 0x3) | 0x8);
            return value.toString(16);
        };
        return RFC4122_TEMPLATE.replace(/[xy]/g, replacePlaceholders);
    };

    /**
   * boolean
   *
   * @method pure.random.boolean
   */
    this.boolean = () => !!pure.random.number(1);

    // TODO: have ability to return specific type of word? As in: noun, adjective, verb, etc
    /**
   * word
   *
   * @method pure.random.word
   * @param {string} type
   */
    this.word = () => {
        // TODO: (type) isn't used
        const wordMethods = [
            'commerce.department',
            'commerce.productName',
            'commerce.productAdjective',
            'commerce.productMaterial',
            'commerce.product',
            'commerce.color',

            'company.catchPhraseAdjective',
            'company.catchPhraseDescriptor',
            'company.catchPhraseNoun',
            'company.bsAdjective',
            'company.bsBuzz',
            'company.bsNoun',
            'address.streetSuffix',
            'address.county',
            'address.country',
            'address.state',

            'finance.accountName',
            'finance.transactionType',
            'finance.currencyName',

            'hacker.noun',
            'hacker.verb',
            'hacker.adjective',
            'hacker.ingverb',
            'hacker.abbreviation',

            'name.jobDescriptor',
            'name.jobArea',
            'name.jobType'];

        // randomly pick from the many pure methods that can generate words
        const randomWordMethod = pure.random.arrayElement(wordMethods);
        const result = pure.fake(`{{${randomWordMethod}}}`);
        return pure.random.arrayElement(result.split(' '));
    };

    /**
   * words
   *
   * @method pure.random.words
   * @param {number} count defaults to a random value between 1 and 3
   */
    this.words = (count) => {
        let def;
        const words = [];
        if (typeof count === 'undefined') {
            def = pure.random.number({ min: 1, max: 3 });
        } else {
            def = count;
        }
        for (let i = 0; i < def; i += 1) {
            words.push(pure.random.word());
        }
        return words.join(' ');
    };

    /**
   * locale
   *
   * @method pure.random.image
   */
    this.image = () => pure.image.image();

    /**
   * locale
   *
   * @method pure.random.locale
   */
    this.locale = () => pure.random.arrayElement(Object.keys(pure.locales));

    /**
   * alpha. returns lower/upper alpha characters based count and upcase options
   *
   * @method pure.random.alpha
   * @param {mixed} options // defaults to { count: 1, upcase: false }
   */
    this.alpha = (options) => {
        let def = options;
        if (typeof def === 'undefined') {
            def = {
                count: 1,
            };
        } else if (typeof def === 'number') {
            def = {
                count: def,
            };
        } else if (typeof def.count === 'undefined') {
            def.count = 1;
        }

        if (typeof def.upcase === 'undefined') {
            def.upcase = false;
        }

        let wholeString = '';
        for (let i = 0; i < def.count; i += 1) {
            wholeString += pure.random.arrayElement([
                'a',
                'b',
                'c',
                'd',
                'e',
                'f',
                'g',
                'h',
                'i',
                'j',
                'k',
                'l',
                'm',
                'n',
                'o',
                'p',
                'q',
                'r',
                's',
                't',
                'u',
                'v',
                'w',
                'x',
                'y',
                'z',
            ]);
        }

        return def.upcase ? wholeString.toUpperCase() : wholeString;
    };

    /**
   * alphaNumeric
   *
   * @method pure.random.alphaNumeric
   * @param {number} count defaults to 1
   */
    this.alphaNumeric = (count = 1) => {
        let wholeString = '';
        for (let i = 0; i < count; i += 1) {
            wholeString += pure.random.arrayElement([
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                'a',
                'b',
                'c',
                'd',
                'e',
                'f',
                'g',
                'h',
                'i',
                'j',
                'k',
                'l',
                'm',
                'n',
                'o',
                'p',
                'q',
                'r',
                's',
                't',
                'u',
                'v',
                'w',
                'x',
                'y',
                'z',
            ]);
        }

        return wholeString;
    };

    /**
   * hexaDecimal
   *
   * @method pure.random.hexaDecimal
   * @param {number} count defaults to 1
   */
    this.hexaDecimal = (count = 1) => {
        let wholeString = '';
        for (let i = 0; i < count; i += 1) {
            wholeString += pure.random.arrayElement([
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                'a',
                'b',
                'c',
                'd',
                'e',
                'f',
                'A',
                'B',
                'C',
                'D',
                'E',
                'F',
            ]);
        }

        return `0x${wholeString}`;
    };

    return this;
}

module.exports = Random;
