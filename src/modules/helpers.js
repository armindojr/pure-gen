const mustache = require('mustache');
const slugify = require('../../vendor/slugify');

mustache.escape = (text) => text;

/**
 *
 * @namespace pure.helpers
 */
function Helpers(pure) {
    /**
     * slugify
     *
     * @description Method to remove special characters and diacritics of an string
     * @param {string} [string= empty] String to apply slugify and remove diacritic
     * @param {object} [opts] Options to be passed to slugify package.
     * See npm slugify for more
     * @method pure.helpers.slugify
     * @example
     * console.log(pure.helpers.slugify('string to test slugify áéíóúãçù'));
     * //outputs: "string-to-test-slugify-aeiouacu"
     */
    this.slugify = (string, opts) => {
        const def = string || '';
        const opt = opts || {};
        opt.remove = opt.remove || /['"~´`/]+/g;
        return slugify.default(def, opt);
    };

    /**
     * replaceSymbolWithNumber
     *
     * @description Method to parse a string and replace match symbols with random numbers
     * @param {string} [string= empty] String to be parsed and replaced
     * @param {string} [symbol= '#'] What symbol to search and replace
     * @method pure.helpers.replaceSymbolWithNumber
     * @example
     * console.log(pure.helpers.replaceSymbolWithNumber('test@', '@'))
     * //outputs: "test4"
     */
    this.replaceSymbolWithNumber = (string, symbol) => {
        const def = string || '';
        const sym = symbol || '#';
        let str = '';

        for (let i = 0; i < def.length; i += 1) {
            if (def.charAt(i) === sym) {
                str += pure.random.number(9);
            } else if (def.charAt(i) === '!') {
                str += pure.random.number({ min: 2, max: 9 });
            } else {
                str += def.charAt(i);
            }
        }

        return str;
    };

    /**
     * replaceSymbolWithHex
     *
     * @description Method to parse a string and replace match symbols with random hex char
     * @param {string} [string= empty] String to be parsed and replaced
     * @param {string} [symbol= '#'] What symbol to search and replace
     * @method pure.helpers.replaceSymbolWithHex
     * @example
     * console.log(pure.helpers.replaceSymbolWithHex('test@', '@'))
     * //outputs: "testc"
     */
    this.replaceSymbolWithHex = (string, symbol) => {
        const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
        const def = string || '';
        const sym = symbol || '#';
        let str = '';

        for (let i = 0; i < def.length; i += 1) {
            if (def.charAt(i) === sym) {
                str += pure.random.arrayElement(hex);
            } else {
                str += def.charAt(i);
            }
        }

        return str;
    };

    /**
     * replaceSymbols
     *
     * @description Method that parses a string for symbols (numbers or letters) and replaces them appropriately
     * (# will be replaced with number,? with letter and * will be replaced with number or letter)
     * @param {string} [string= empty] String to be parsed and replaced
     * @method pure.helpers.replaceSymbols
     * @example
     * console.log(pure.helpers.replaceSymbols('test#?*'))
     * //outputs: "test6J4"
     */
    this.replaceSymbols = (string) => {
        const def = string || '';
        const alpha = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G',
            'H', 'I', 'J', 'K', 'L', 'M', 'N',
            'O', 'P', 'Q', 'R', 'S', 'T', 'U',
            'V', 'W', 'X', 'Y', 'Z',
        ];
        let str = '';

        for (let i = 0; i < def.length; i += 1) {
            if (def.charAt(i) === '#') {
                str += pure.random.number(9);
            } else if (def.charAt(i) === '?') {
                str += pure.random.arrayElement(alpha);
            } else if (def.charAt(i) === '*') {
                str += pure.random.boolean() ? pure.random.arrayElement(alpha) : pure.random.number(9);
            } else {
                str += def.charAt(i);
            }
        }

        return str;
    };

    /**
     * replaceCreditCardSymbols
     *
     * @description Replace symbols in a credit card schems including Luhn checksum
     * @param {string} string String to be parsed and replaced
     * @param {string} [symbol= '#'] What symbol to search and replace
     * @method pure.helpers.replaceCreditCardSymbols
     * @example
     * console.log(pure.helpers.replaceCreditCardSymbols('6453-****-****-****-***L', '*'));
     * //outputs: "6453-7421-8282-1032-2312"
     */
    this.replaceCreditCardSymbols = (string, symbol) => {
        const def = symbol || '#';

        // Function calculating the Luhn checksum of a number string
        const getCheckBit = (number) => {
            let nNumber = number;
            nNumber.reverse();
            nNumber = nNumber.map((num, index) => {
                let nNum = num;
                if (index % 2 === 0) {
                    nNum *= 2;
                    if (nNum > 9) {
                        nNum -= 9;
                    }
                }
                return nNum;
            });
            const sum = nNumber.reduce((prev, curr) => prev + curr);
            return sum % 10;
        };

        let str = string || '#';
        // replace [4-9] with a random number in range etc...
        str = pure.helpers.regexpStyleStringParse(str);
        // replace ### with random numbers
        str = pure.helpers.replaceSymbolWithNumber(str, def);

        const numberList = str.replace(/\D/g, '').split('').map((num) => parseInt(num, 10));
        const checkNum = getCheckBit(numberList);
        return str.replace('L', checkNum);
    };

    /**
     * repeatString
     *
     * @description Method to repeat string given times alternative to String.prototype.repeat
     * @param {string} [string= empty] String to be repeated
     * @param {Number} [num= 0] Times to repeat given string
     * @method pure.helpers.repeatString
     * @example
     * console.log(pure.helpers.repeatString('pure-gen ', 5));
     * //outputs: "pure-gen pure-gen pure-gen pure-gen pure-gen "
     */
    this.repeatString = (string = '', num = 0) => string.repeat(num);

    /**
     * regexpStyleStringParse
     *
     * @description Parse string paterns in a similar way to RegExp
     * @param {string} [string= empty] String to be parsed
     * @method pure.helpers.regexpStyleStringParse
     * @example
     * console.log(pure.helpers.regexpStyleStringParse('#{3}test[1-5]'));
     * //outputs: "###test4"
     */
    this.regexpStyleStringParse = (string) => {
        let def = string || '';
        // Deal with range repeat `{min,max}`
        const RANGE_REP_REG = /(.)\{(\d+),(\d+)\}/;
        const REP_REG = /(.)\{(\d+)\}/;
        const RANGE_REG = /\[(\d+)-(\d+)\]/;
        let min;
        let max;
        let tmp;
        let repetitions;
        let token = def.match(RANGE_REP_REG);
        while (token !== null) {
            min = parseInt(token[2], 10);
            max = parseInt(token[3], 10);
            // switch min and max
            if (min > max) {
                tmp = max;
                max = min;
                min = tmp;
            }
            repetitions = pure.random.number({ min, max });
            def = def.slice(0, token.index)
                + pure.helpers.repeatString(token[1], repetitions)
                + def.slice(token.index + token[0].length);
            token = def.match(RANGE_REP_REG);
        }
        // Deal with repeat `{num}`
        token = def.match(REP_REG);
        while (token !== null) {
            repetitions = parseInt(token[2], 10);
            def = def.slice(0, token.index)
                + pure.helpers.repeatString(token[1], repetitions)
                + def.slice(token.index + token[0].length);
            token = def.match(REP_REG);
        }
        // Deal with range `[min-max]` (only works with numbers for now)
        // TODO: implement for letters e.g. [0-9a-zA-Z] etc.

        token = def.match(RANGE_REG);
        while (token !== null) {
            // This time we are not capturing the char befor `[]`
            min = parseInt(token[1], 10);
            max = parseInt(token[2], 10);
            // switch min and max
            if (min > max) {
                tmp = max;
                max = min;
                min = tmp;
            }
            def = def.slice(0, token.index)
                + pure.random.number({ min, max }).toString()
                + def.slice(token.index + token[0].length);
            token = def.match(RANGE_REG);
        }
        return def;
    };

    /**
     * shuffle
     *
     * @description Takes an array and randomizes it in place then returns it
     * @param {array} data Array with items that will be randomized
     * @method pure.helpers.shuffle
     * @example
     * console.log(pure.helpers.shuffle([1,2,3,4]));
     * //outputs: [ 4, 3, 1, 2 ]
     */
    this.shuffle = (data) => {
        const def = data || [];

        for (let x, j, i = def.length - 1; i > 0; i -= 1) {
            j = pure.random.number(i);
            x = def[i];
            def[i] = def[j];
            def[j] = x;
        }

        return def;
    };

    /**
     * mustache
     *
     * @description Replace value inside string based on specific template (Ex: {{}} )
     * @param {string} [str= empty] String to replace with template
     * @param {object} data Object with data that will replace template
     * @method pure.helpers.mustache
     * @example
     * console.log(pure.helpers.mustache('Creating string to replace: {{foo}}', { foo: 'lorem' }));
     * //outputs: "Creating string to replace: lorem"
     */
    this.mustache = (str = '', data) => mustache.render(str, data);

    this.mustacheParse = (str = '') => mustache.parse(str);

    /**
     * createCard
     *
     * @description Create person card with multiple faked info
     * @method pure.helpers.createCard
     * @example
     * console.log(pure.helpers.createCard());
     * //outputs: Object with multiple itens
     */
    this.createCard = () => ({
        name: pure.name.findName(),
        username: pure.internet.userName(),
        email: pure.internet.email(),
        address: {
            streetA: pure.address.streetName(),
            streetB: pure.address.streetAddress(),
            streetC: pure.address.streetAddress(true),
            streetD: pure.address.secondaryAddress(),
            city: pure.address.city(),
            state: pure.address.state(),
            country: pure.address.country(),
            zipcode: pure.address.zipCode(),
            geo: {
                lat: pure.address.latitude(),
                lng: pure.address.longitude(),
            },
        },
        phone: pure.phone.phoneNumber(),
        website: pure.internet.domainName(),
        company: {
            name: pure.company.companyName(),
            catchPhrase: pure.company.catchPhrase(),
            bs: pure.company.bs(),
        },
        posts: [
            {
                words: pure.lorem.words(),
                sentence: pure.lorem.sentence(),
                sentences: pure.lorem.sentences(),
                paragraph: pure.lorem.paragraph(),
            },
            {
                words: pure.lorem.words(),
                sentence: pure.lorem.sentence(),
                sentences: pure.lorem.sentences(),
                paragraph: pure.lorem.paragraph(),
            },
            {
                words: pure.lorem.words(),
                sentence: pure.lorem.sentence(),
                sentences: pure.lorem.sentences(),
                paragraph: pure.lorem.paragraph(),
            },
        ],
        accountHistory: [
            pure.helpers.createTransaction(),
            pure.helpers.createTransaction(),
            pure.helpers.createTransaction(),
        ],
    });

    /**
     * contextualCard
     *
     * @description Create person card with multiple contextual faked info
     * @method pure.helpers.contextualCard
     * @example
     * console.log(pure.helpers.contextualCard());
     * //outputs: Object with multiple itens
     */
    this.contextualCard = () => {
        const name = pure.name.firstName();
        const userName = pure.internet.userName(name);
        return {
            name,
            username: userName,
            avatar: pure.internet.avatar(),
            email: pure.internet.email(userName),
            dob: pure.date.past(50, new Date('Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)')),
            phone: pure.phone.phoneNumber(),
            address: {
                street: pure.address.streetName(true),
                suite: pure.address.secondaryAddress(),
                city: pure.address.city(),
                zipcode: pure.address.zipCode(),
                geo: {
                    lat: pure.address.latitude(),
                    lng: pure.address.longitude(),
                },
            },
            website: pure.internet.domainName(),
            company: {
                name: pure.company.companyName(),
                catchPhrase: pure.company.catchPhrase(),
                bs: pure.company.bs(),
            },
        };
    };

    /**
     * userCard
     *
     * @description Create user card with multiple faked info
     * @method pure.helpers.userCard
     * @example
     * console.log(pure.helpers.userCard());
     * //outputs: Object with multiple itens
     */
    this.userCard = () => ({
        name: pure.name.findName(),
        username: pure.internet.userName(),
        email: pure.internet.email(),
        address: {
            street: pure.address.streetName(true),
            suite: pure.address.secondaryAddress(),
            city: pure.address.city(),
            zipcode: pure.address.zipCode(),
            geo: {
                lat: pure.address.latitude(),
                lng: pure.address.longitude(),
            },
        },
        phone: pure.phone.phoneNumber(),
        website: pure.internet.domainName(),
        company: {
            name: pure.company.companyName(),
            catchPhrase: pure.company.catchPhrase(),
            bs: pure.company.bs(),
        },
    });

    /**
     * createTransaction
     *
     * @description Create transaction with multiple contextual faked info
     * @method pure.helpers.createTransaction
     * @example
     * console.log(pure.helpers.createTransaction());
     * //outputs: Object with multiple itens
     */
    this.createTransaction = () => ({
        amount: pure.finance.amount(),
        date: new Date(pure.date.past(20)),
        business: pure.company.companyName(),
        name: [pure.finance.accountName(), pure.finance.mask()].join(' '),
        type: pure.random.arrayElement(pure.definitions.finance.transaction_type),
        account: pure.finance.account(),
    });

    /**
     * mod97
     *
     * @description Calculate mod 97 of given string
     * @param {String} digitStr String to apply mod97
     * @method pure.helpers.mod97
     * @example
     * console.log(pure.helpers.mod97('111'));
     * //outputs: 14
     */
    this.mod97 = (digitStr) => {
        let m = 0;
        for (let i = 0; i < digitStr.length; i += 1) {
            m = ((m * 10) + (digitStr[i] | 0)) % 97;
        }
        return m;
    };

    /**
     * toDigitString
     *
     * @description Method that parses string and convert letters to numbers
     * @param {String} str String to be replaced
     * @method pure.helpers.toDigitString
     * @example
     * console.log(pure.helpers.toDigitString('ABC123'));
     * //outputs: 101112123
     */
    this.toDigitString = (str) => str.replace(/[A-Z]/gi, (match) => match.toUpperCase().charCodeAt(0) - 55);
}

module.exports = Helpers;
