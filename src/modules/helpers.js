const slugify = require('../../vendor/slugify');
/**
 *
 * @namespace pure.helpers
 */
function Helpers(pure) {
    /**
   * backword-compatibility
   *
   * @method pure.helpers.randomize
   * @param {array} array
   */
    this.randomize = (array) => {
        const def = array || ['a', 'b', 'c'];
        return pure.random.arrayElement(def);
    };

    /**
   * slugifies string
   *
   * @method pure.helpers.slugify
   * @param {string} string
   */
    this.slugify = (string, opts) => {
        const def = string || '';
        return slugify.default(def, opts).replace(/ /g, '-').replace(/[^\w.-]+/g, '');
    };

    /**
   * parses string for a symbol and replace it with a random number from 1-10
   *
   * @method pure.helpers.replaceSymbolWithNumber
   * @param {string} string
   * @param {string} symbol defaults to `"#"`
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
   * parses string for a symbol and replace it with a random hex char
   *
   * @method pure.helpers.replaceSymbolWithHex
   * @param {string} string
   * @param {string} symbol defaults to `"#"`
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
   * parses string for symbols (numbers or letters) and replaces them appropriately (# will be replaced with number,
   * ? with letter and * will be replaced with number or letter)
   *
   * @method pure.helpers.replaceSymbols
   * @param {string} string
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
   * replace symbols in a credit card schems including Luhn checksum
   *
   * @method pure.helpers.replaceCreditCardSymbols
   * @param {string} string
   * @param {string} symbol
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

    /** string repeat helper, alternative to String.prototype.repeat.... See PR #382
   *
   * @method pure.helpers.repeatString
   * @param {string} string
   * @param {number} num
   */
    this.repeatString = (string, num) => {
        const str = string || '';
        const number = num || 0;

        return str.repeat(number);
    };

    /**
    * parse string paterns in a similar way to RegExp
    *
    * e.g. "#{3}test[1-5]" -> "###test4"
    *
    * @method pure.helpers.regexpStyleStringParse
    * @param {string} string
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
   * takes an array and randomizes it in place then returns it
   *
   * uses the modern version of the Fisher–Yates algorithm
   *
   * @method pure.helpers.shuffle
   * @param {array} o
   */
    this.shuffle = (o) => {
        const def = o || [];

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
   * @method pure.helpers.mustache
   * @param {string} str
   * @param {object} data
   */
    this.mustache = (str, data) => {
        let def = str || '';

        if (def !== '') {
            Object.keys(data).forEach((p) => {
                const re = new RegExp(`{{${p}}}`, 'g');
                def = def.replace(re, data[p]);
            });
        }

        return def;
    };

    /**
   * createCard
   *
   * @method pure.helpers.createCard
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
   * @method pure.helpers.contextualCard
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
   * @method pure.helpers.userCard
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
   * @method pure.helpers.createTransaction
   */
    this.createTransaction = () => ({
        amount: pure.finance.amount(),
        date: new Date(pure.date.past(20)),
        business: pure.company.companyName(),
        name: [pure.finance.accountName(), pure.finance.mask()].join(' '),
        type: this.randomize(pure.definitions.finance.transaction_type),
        account: pure.finance.account(),
    });

    /**
   * mod97
   *
   * @method pure.helpers.mod97
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
   * @method pure.helpers.toDigitString
   */
    this.toDigitString = (str) => str.replace(/[A-Z]/gi, (match) => match.toUpperCase().charCodeAt(0) - 55);
}

module.exports = Helpers;
