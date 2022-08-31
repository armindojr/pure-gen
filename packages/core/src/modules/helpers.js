import mustache from 'mustache';
import slugify from 'slugify';

mustache.escape = (text) => text;

export default class Helpers {
    constructor(pure) {
        this.pure = pure;
    }

    slugify(string, opts) {
        const def = string || '';
        const opt = opts || {};
        opt.remove = opt.remove || /['"~´`/]+/g;

        return slugify.default(def, opt);
    }

    replaceSymbolWithNumber(options = {}) {
        const { string = '', symbol = '#' } = options;
        let str = '';

        for (let i = 0; i < string.length; i += 1) {
            if (string.charAt(i) === symbol) {
                str += this.pure.random.number(9);
            } else if (string.charAt(i) === '!') {
                str += this.pure.random.number({ min: 2, max: 9 });
            } else {
                str += string.charAt(i);
            }
        }

        return str;
    }

    replaceSymbolWithHex(options = {}) {
        const { string = '', symbol = '#' } = options;
        const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
        let str = '';

        for (let i = 0; i < string.length; i += 1) {
            if (string.charAt(i) === symbol) {
                str += this.pure.random.arrayElement(hex);
            } else {
                str += string.charAt(i);
            }
        }

        return str;
    }

    replaceSymbols(string) {
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
                str += this.pure.random.number(9);
            } else if (def.charAt(i) === '?') {
                str += this.pure.random.arrayElement(alpha);
            } else if (def.charAt(i) === '*') {
                str += this.pure.random.boolean() ? this.pure.random.arrayElement(alpha) : this.pure.random.number(9);
            } else {
                str += def.charAt(i);
            }
        }

        return str;
    }

    replaceCreditCardSymbols(options = {}) {
        const { string, symbol = '#' } = options;
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
        str = this.pure.helpers.regexpStyleStringParse(str);
        // replace ### with random numbers
        str = this.pure.helpers.replaceSymbolWithNumber({ string: str, symbol });
        const numberList = str.replace(/\D/g, '').split('').map((num) => parseInt(num, 10));
        const checkNum = getCheckBit(numberList);

        return str.replace('L', checkNum);
    }

    repeatString(options = {}) {
        const { string = '', num = 0 } = options;

        return string.repeat(num);
    }

    regexpStyleStringParse(string) {
        let def = string || '';
        const rangeRepeat = /(.)\{(\d+),(\d+)\}/;
        const exactRepeat = /(.)\{(\d+)\}/;
        const digitInterval = /\[(\d+)-(\d+)\]/;
        let min;
        let max;
        let tmp;
        let repetitions;
        // Deal with range repeat char `{min,max}`
        let token = def.match(rangeRepeat);

        while (token !== null) {
            min = parseInt(token[2], 10);
            max = parseInt(token[3], 10);

            // switch min and max
            if (min > max) {
                tmp = max;
                max = min;
                min = tmp;
            }

            repetitions = this.pure.random.number({ min, max });
            def = def.slice(0, token.index)
                + this.pure.helpers.repeatString({ string: token[1], num: repetitions })
                + def.slice(token.index + token[0].length);
            token = def.match(rangeRepeat);
        }

        // Deal with exactly repeat `{num}`
        token = def.match(exactRepeat);

        while (token !== null) {
            repetitions = parseInt(token[2], 10);
            def = def.slice(0, token.index)
                + this.pure.helpers.repeatString({ string: token[1], num: repetitions })
                + def.slice(token.index + token[0].length);
            token = def.match(exactRepeat);
        }

        // Deal with random digit from interval `[min-max]`
        // TODO: implement for letters e.g. [0-9a-zA-Z] etc.
        token = def.match(digitInterval);

        while (token !== null) {
            // This time we are not capturing the char before `[]`
            min = parseInt(token[1], 10);
            max = parseInt(token[2], 10);
            // switch min and max
            if (min > max) {
                tmp = max;
                max = min;
                min = tmp;
            }
            def = def.slice(0, token.index)
                + this.pure.random.number({ min, max }).toString()
                + def.slice(token.index + token[0].length);
            token = def.match(digitInterval);
        }

        return def;
    }

    shuffle(data) {
        const def = data || [];

        for (let x, j, i = def.length - 1; i > 0; i -= 1) {
            j = this.pure.random.number(i);
            x = def[i];
            def[i] = def[j];
            def[j] = x;
        }

        return def;
    }

    mustache(options = {}) {
        const { str = '', data } = options;

        return mustache.render(str, data);
    }

    mustacheParse(str = '') {
        return mustache.parse(str);
    }

    createCard() {
        return {
            name: this.pure.name.findName(),
            username: this.pure.internet.userName(),
            email: this.pure.internet.email(),
            address: {
                streetA: this.pure.address.streetName(),
                streetB: this.pure.address.streetAddress(),
                streetC: this.pure.address.streetAddress(true),
                streetD: this.pure.address.secondaryAddress(),
                city: this.pure.address.city(),
                state: this.pure.address.state(),
                country: this.pure.address.country(),
                zipcode: this.pure.address.zipCode(),
                geo: {
                    lat: this.pure.address.latitude(),
                    lng: this.pure.address.longitude(),
                },
            },
            phone: this.pure.phone.phoneNumber(),
            website: this.pure.internet.domainName(),
            company: {
                name: this.pure.company.companyName(),
                catchPhrase: this.pure.company.catchPhrase(),
                bs: this.pure.company.bs(),
            },
            posts: [
                {
                    words: this.pure.lorem.words(),
                    sentence: this.pure.lorem.sentence(),
                    sentences: this.pure.lorem.sentences(),
                    paragraph: this.pure.lorem.paragraph(),
                },
                {
                    words: this.pure.lorem.words(),
                    sentence: this.pure.lorem.sentence(),
                    sentences: this.pure.lorem.sentences(),
                    paragraph: this.pure.lorem.paragraph(),
                },
                {
                    words: this.pure.lorem.words(),
                    sentence: this.pure.lorem.sentence(),
                    sentences: this.pure.lorem.sentences(),
                    paragraph: this.pure.lorem.paragraph(),
                },
            ],
            accountHistory: [
                this.pure.helpers.createTransaction(),
                this.pure.helpers.createTransaction(),
                this.pure.helpers.createTransaction(),
            ],
        };
    }

    contextualCard() {
        const name = this.pure.name.firstName();
        const userName = this.pure.internet.userName({ firstName: name });

        return {
            name,
            username: userName,
            avatar: this.pure.internet.avatar(),
            email: this.pure.internet.email({ firstName: userName }),
            dob: this.pure.date.past({ years: 50, refDate: new Date('Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)') }),
            phone: this.pure.phone.phoneNumber(),
            address: {
                street: this.pure.address.streetName(true),
                suite: this.pure.address.secondaryAddress(),
                city: this.pure.address.city(),
                zipcode: this.pure.address.zipCode(),
                geo: {
                    lat: this.pure.address.latitude(),
                    lng: this.pure.address.longitude(),
                },
            },
            website: this.pure.internet.domainName(),
            company: {
                name: this.pure.company.companyName(),
                catchPhrase: this.pure.company.catchPhrase(),
                bs: this.pure.company.bs(),
            },
        };
    }

    userCard() {
        return {
            name: this.pure.name.findName(),
            username: this.pure.internet.userName(),
            email: this.pure.internet.email(),
            address: {
                street: this.pure.address.streetName(true),
                suite: this.pure.address.secondaryAddress(),
                city: this.pure.address.city(),
                zipcode: this.pure.address.zipCode(),
                geo: {
                    lat: this.pure.address.latitude(),
                    lng: this.pure.address.longitude(),
                },
            },
            phone: this.pure.phone.phoneNumber(),
            website: this.pure.internet.domainName(),
            company: {
                name: this.pure.company.companyName(),
                catchPhrase: this.pure.company.catchPhrase(),
                bs: this.pure.company.bs(),
            },
        };
    }

    createTransaction() {
        return {
            amount: this.pure.finance.amount(),
            date: new Date(this.pure.date.past({ years: 20 })),
            business: this.pure.company.companyName(),
            name: [this.pure.finance.accountName(), this.pure.finance.mask()].join(' '),
            type: this.pure.random.arrayElement(this.pure.registeredModules.finance.transactionType),
            account: this.pure.finance.account(),
        };
    }

    mod97(digitStr) {
        return this.pure.helpers.mod({ digitStr, modValue: 97 });
    }

    mod(options = {}) {
        const { digitStr = '1', modValue = 1 } = options;
        let m = 0;

        for (let i = 0; i < digitStr.length; i += 1) {
            m = ((m * 10) + (digitStr[i] | 0)) % modValue;
        }

        return m;
    }

    toDigitString(str) {
        return str.replace(/[A-Z]/gi, (match) => match.toUpperCase().charCodeAt(0) - 55);
    }
}
