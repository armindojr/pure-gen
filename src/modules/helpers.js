const mustache = require('mustache');
const slugify = require('slugify');

mustache.escape = (text) => text;

class Helpers {
    constructor(pure) {
        this.slugify = (string, opts) => {
            const def = string || '';
            const opt = opts || {};
            opt.remove = opt.remove || /['"~´`/]+/g;
            return slugify.default(def, opt);
        };

        this.replaceSymbolWithNumber = (options = {}) => {
            const { string = '', symbol = '#' } = options;
            let str = '';

            for (let i = 0; i < string.length; i += 1) {
                if (string.charAt(i) === symbol) {
                    str += pure.random.number(9);
                } else if (string.charAt(i) === '!') {
                    str += pure.random.number({ min: 2, max: 9 });
                } else {
                    str += string.charAt(i);
                }
            }

            return str;
        };

        this.replaceSymbolWithHex = (options = {}) => {
            const { string = '', symbol = '#' } = options;
            const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
            let str = '';

            for (let i = 0; i < string.length; i += 1) {
                if (string.charAt(i) === symbol) {
                    str += pure.random.arrayElement(hex);
                } else {
                    str += string.charAt(i);
                }
            }

            return str;
        };

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

        this.replaceCreditCardSymbols = (options = {}) => {
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
            str = this.regexpStyleStringParse(str);
            // replace ### with random numbers
            str = this.replaceSymbolWithNumber({ string: str, symbol });

            const numberList = str.replace(/\D/g, '').split('').map((num) => parseInt(num, 10));
            const checkNum = getCheckBit(numberList);
            return str.replace('L', checkNum);
        };

        this.repeatString = (options = {}) => {
            const { string = '', num = 0 } = options;

            return string.repeat(num);
        };

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
                    + this.repeatString({ string: token[1], num: repetitions })
                    + def.slice(token.index + token[0].length);
                token = def.match(RANGE_REP_REG);
            }
            // Deal with repeat `{num}`
            token = def.match(REP_REG);
            while (token !== null) {
                repetitions = parseInt(token[2], 10);
                def = def.slice(0, token.index)
                    + this.repeatString({ string: token[1], num: repetitions })
                    + def.slice(token.index + token[0].length);
                token = def.match(REP_REG);
            }
            // Deal with range `[min-max]` (only works with numbers for now)
            // TODO: implement for letters e.g. [0-9a-zA-Z] etc.
            token = def.match(RANGE_REG);
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
                    + pure.random.number({ min, max }).toString()
                    + def.slice(token.index + token[0].length);
                token = def.match(RANGE_REG);
            }
            return def;
        };

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

        this.mustache = (options = {}) => {
            const { str = '', data } = options;

            return mustache.render(str, data);
        };

        this.mustacheParse = (str = '') => mustache.parse(str);

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
                this.createTransaction(),
                this.createTransaction(),
                this.createTransaction(),
            ],
        });

        this.contextualCard = () => {
            const name = pure.name.firstName();
            const userName = pure.internet.userName({ firstName: name });
            return {
                name,
                username: userName,
                avatar: pure.internet.avatar(),
                email: pure.internet.email({ firstName: userName }),
                dob: pure.date.past({ years: 50, refDate: new Date('Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)') }),
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

        this.createTransaction = () => ({
            amount: pure.finance.amount(),
            date: new Date(pure.date.past({ years: 20 })),
            business: pure.company.companyName(),
            name: [pure.finance.accountName(), pure.finance.mask()].join(' '),
            type: pure.random.arrayElement(pure.registeredModules.finance.transaction_type),
            account: pure.finance.account(),
        });

        this.mod97 = (digitStr) => this.mod({ digitStr, modValue: 97 });

        this.mod = (options = {}) => {
            const { digitStr = '1', modValue = 1 } = options;
            let m = 0;

            for (let i = 0; i < digitStr.length; i += 1) {
                m = ((m * 10) + (digitStr[i] | 0)) % modValue;
            }

            return m;
        };

        this.toDigitString = (str) => str.replace(/[A-Z]/gi, (match) => match.toUpperCase().charCodeAt(0) - 55);
    }
}

module.exports = Helpers;
