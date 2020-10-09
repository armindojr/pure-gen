const lfib = require('../../vendor/lfib');

/**
 *
 * @namespace pure.random
 */
function Random(pure, seed) {
    let num = seed;

    // Preserve past behavior and fall back to the default time-based seed if an
    // empty array is passed.
    if (Array.isArray(num) && !num.length) {
        num = undefined;
    }

    if (num === undefined) {
        // Default seed copied from the marsenne package for compatibility.
        num = (new Date()).getTime() % 1000000000;
    }

    const lfibGen = lfib(num);

    // Copied from the marsenne package for compatibility.
    function rand(max = 0, min = 99999) {
        return Math.floor(lfibGen() * (max - min) + min);
    }
    /**
     * number
     *
     * @description Returns a single random number based on a max number or range
     * @param {object} options
     * @param {Number} [options.min= 0] Minimum number to generate *inclusive*
     * @param {Number} [options.max= 99999] Maximum number to generate *exclusive*
     * @param {Number} [options.precision= 1] Numbers of digits after floating point, due to node limitations
     *  this is limited to 10
     * @method pure.random.number
     * @example
     * console.log(pure.random.number());
     * //outputs: "20173"
     */
    this.number = (options) => {
        let def = (typeof options === 'number') ? { max: options } : options;
        def = def || {};

        if (typeof def.max === 'undefined') {
            def.max = 99999;
        }

        if (typeof def.min === 'undefined') {
            def.min = def.max < 0 ? -99999 : 0;
        }

        if (typeof def.precision === 'undefined') {
            def.precision = 0;
        }

        if (def.precision > 10) {
            def.precision = 10;
        } else if (def.precision < 0) {
            def.precision = 1;
        }

        let result = '';
        const randomNumber = rand(def.max, def.min);

        if (def.min === def.max) {
            result = def.max;
        } else if (def.precision >= 1) {
            const template = pure.helpers.repeatString('#', def.precision);
            result = parseFloat(`${randomNumber}.${pure.helpers.replaceSymbolWithNumber(template)}`);
            if (result > def.max) {
                result = parseFloat((result - def.max).toFixed(def.precision));
            }
        } else {
            result = randomNumber;
        }

        return result;
    };

    /**
     * float
     *
     * @description Returns a single random floating-point number based on a max number or range
     * @param {object} options
     * @param {Number} [options.min= 0] Minimum number to generate
     * @param {Number} [options.max= 99999] Maximum number to generate
     * @param {Number} [options.precision= 1] Numbers of digits after floating point
     * @method pure.random.float
     * @example
     * console.log(pure.random.float());
     * //outputs: "397.5"
     */
    this.float = (options) => {
        let def = options || {};

        if (typeof def === 'number') {
            def = {
                precision: def,
            };
        }

        def.precision = def.precision || 1;

        return pure.random.number(def);
    };

    /**
     * arrayElement
     *
     * @description Takes an array and returns a random element of the array
     * @param {array} [array= ['a', 'b', 'c']] Array to randomize
     * @method pure.random.arrayElement
     * @example
     * console.log(pure.random.arrayElement());
     * //outputs: "c"
     */
    this.arrayElement = (array) => {
        const def = array || ['a', 'b', 'c'];
        const r = pure.random.number({ max: def.length - 1 });

        const result = def[r] ? def[r] : def[0];
        return result;
    };

    /**
     * arrayElements
     *
     * @description Takes an array and returns a subset with random elements of the array
     * @param {array} [array= ['a', 'b', 'c']] Array to randomize
     * @param {Number} [count= random] number of elements to pick
     * @method pure.random.arrayElements
     * @example
     * console.log(pure.random.arrayElements());
     * //outputs: "[ 'b', 'c' ]"
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
     * objectElement
     *
     * @description Takes an object and returns the randomly key or value
     * @param {object} [object= { foo: 'bar', too: 'car' }] Object to randomize
     * @param {string} [field= 'value'] What field to return 'value' or 'key'
     * @method pure.random.objectElement
     * @example
     * console.log(pure.random.objectElement());
     * //outputs: "car"
     */
    this.objectElement = (object, field) => {
        const def = object || { foo: 'bar', too: 'car' };
        const array = Object.keys(def);
        const key = pure.random.arrayElement(array);

        return field === 'key' ? key : def[key];
    };

    /**
     * generateObj
     *
     * @description Generate an object populated with random things
     * @param {Number} [length= 2] What length object generated will have
     * @method pure.random.object
     * @example
     * console.log(pure.random.generateObj());
     * //outputs: "{ Isle: '3rd', Soft: 'blue' }"
     */
    this.generateObj = (length) => {
        const nLength = length || 2;
        const obj = {};

        while (Object.keys(obj).length < nLength) {
            obj[pure.random.word()] = pure.random.word();
        }

        return obj;
    };

    /**
     * uuid
     *
     * @description Generates a random uuid
     * @method pure.random.uuid
     * @example
     * console.log(pure.random.uuid());
     * //outputs: "39d601f5-131d-4539-b279-7232d4cec989"
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
     * @description Generates a random boolean
     * @method pure.random.boolean
     * @example
     * console.log(pure.random.boolean());
     * //outputs: "true"
     */
    this.boolean = () => !!pure.random.number(1);

    /**
     * word
     *
     * @description Generates a random word
     * @method pure.random.word
     * @example
     * console.log(pure.random.word());
     * //outputs: "Steel"
     */
    this.word = () => {
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
     * @description Generates random words
     * @param {Number} [count= random] defaults to a random value between 1 and 3
     * @method pure.random.words
     * @example
     * console.log(pure.random.words());
     * //outputs: "web-readiness Future-proofed"
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
     * image
     *
     * @description Generates random image url
     * @method pure.random.image
     * @example
     * console.log(pure.random.image());
     * //outputs: "http://placeimg.com/640/480/sports"
     */
    this.image = () => pure.image.image();

    /**
     * locale
     *
     * @description Generates random locale
     * @method pure.random.locale
     * @example
     * console.log(pure.random.locale());
     * //outputs: "nb_NO"
     */
    this.locale = () => pure.random.arrayElement(Object.keys(pure.locales));

    /**
     * alpha
     *
     * @description Returns lower/upper alpha characters based count and upcase options
     * @param {object} options
     * @param {Number} [options.count= 1] Letters to return
     * @param {boolean} [options.upcase= false] Return upcase letters or not
     * @method pure.random.alpha
     * @example
     * console.log(pure.random.alpha());
     * //outputs: "e"
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
     * @description Returns random alphanumeric caracters
     * @param {Number} [count= 1] Caracters to return
     * @method pure.random.alphaNumeric
     * @example
     * console.log(pure.random.alphaNumeric());
     * //outputs: "0"
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
     * @description Returns random hexadecimal caracters
     * @param {Number} [count= 1] Caracters to return
     * @method pure.random.hexaDecimal
     * @example
     * console.log(pure.random.hexaDecimal());
     * //outputs: "0xA"
     */
    this.hexaDecimal = (count = 1) => {
        const template = pure.helpers.repeatString('#', count);

        return pure.helpers.replaceSymbolWithHex(template);
    };

    this.returnSeed = () => num;
}

module.exports = Random;
