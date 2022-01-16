const uuid = require('uuid');
const lfib = require('../vendor/lfib');

class Random {
    constructor(pure, seed) {
        let num = seed || (new Date()).getTime() % 1000000000;

        // Preserve past behavior and fall back to the default time-based seed if an
        // empty array is passed.
        if (Array.isArray(num) && !num.length) {
            num = (new Date()).getTime() % 1000000000;
        }

        const lfibGen = lfib(num);

        this.number = (options = {}) => {
            const def = (typeof options === 'number') ? { max: options } : options;

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
            const randomNumber = Math.round(lfibGen() * (def.max - def.min) + def.min);

            if (def.min === def.max) {
                result = def.max;
            } else if (def.precision >= 1) {
                const template = pure.helpers.repeatString({ string: '#', num: def.precision });
                result = parseFloat(`${randomNumber}.${pure.helpers.replaceSymbolWithNumber({ string: template })}`);
                if (result > def.max) {
                    result = def.max;
                } else if (result < def.min) {
                    result = def.min;
                }
            } else {
                result = randomNumber;
            }

            return result;
        };

        this.float = (options = {}) => {
            let def = options;

            if (typeof def === 'number') {
                def = {
                    precision: def,
                };
            }

            def.precision = def.precision || 1;

            return this.number(def);
        };

        this.arrayElement = (array = ['a', 'b', 'c']) => {
            const number = this.number({ max: array.length });

            return array[number] ? array[number] : array[0];
        };

        this.arrayElements = (array = ['a', 'b', 'c'], count) => {
            let value = count;

            if (typeof value !== 'number') {
                value = this.number({ min: 1, max: array.length });
            } else if (value > array.length) {
                value = array.length;
            } else if (value < 0) {
                value = 0;
            }

            const arrayCopy = array.slice();
            const countToRemove = arrayCopy.length - value;
            for (let i = 0; i < countToRemove; i += 1) {
                const indexToRemove = this.number({ max: arrayCopy.length - 1 });
                arrayCopy.splice(indexToRemove, 1);
            }

            return arrayCopy;
        };

        this.objectElement = (object = { foo: 'bar', too: 'car' }, field) => {
            const array = Object.keys(object);
            const key = this.arrayElement(array);

            return field === 'key' ? key : object[key];
        };

        this.generateObj = (length = 2) => {
            const obj = {};

            while (Object.keys(obj).length < length) {
                obj[this.word()] = this.word();
            }

            return obj;
        };

        this.uuid = (version = 'v1', opts = {}) => {
            let generated = '';
            let def = opts;

            if (version === 'v4') {
                generated = uuid.v4();
            } else if (version === 'v5') {
                if (typeof opts.name === 'undefined' || typeof opts.namespace === 'undefined') {
                    def = {
                        name: 'uuid',
                        namespace: uuid.v1(),
                    };
                }

                generated = uuid.v5(def.name, def.namespace);
            } else {
                generated = uuid.v1();
            }

            return generated;
        };

        this.boolean = () => !!this.number(1);

        this.word = () => {
            // regex statement used to remove unwanted characters from beginning/end of words
            const wordSanitizerRegex = /^[\s()[\]{}.,\-'"]+|[\s()[\]{}.,\-'"]+$/g;

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
                'name.jobType',
            ];

            // randomly pick from the many pure methods that can generate words
            const randomWordMethod = this.arrayElement(wordMethods);
            let result = pure.fake(`{{${randomWordMethod}}}`);
            result = this.arrayElement(result.split(' '));

            return result.replace(wordSanitizerRegex, '');
        };

        this.words = (count) => {
            const def = count || this.number({ min: 1, max: 3 });
            const words = [];

            for (let i = 0; i < def; i += 1) {
                words.push(this.word());
            }

            return words.join(' ');
        };

        this.locale = () => this.arrayElement(pure.possibleLocales);

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
                wholeString += this.arrayElement([
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

        this.alphaNumeric = (count = 1) => {
            let wholeString = '';
            for (let i = 0; i < count; i += 1) {
                wholeString += this.arrayElement([
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

        this.hexaDecimal = (count = 1) => {
            const template = pure.helpers.repeatString({ string: '#', num: count });

            return pure.helpers.replaceSymbolWithHex({ string: template });
        };

        this.returnSeed = () => num;
    }
}

module.exports = Random;
