const RandExp = require('randexp');
const slugify = require('slugify');
const randomUa = require('../vendor/user-agent');

class Internet {
    constructor(pure) {
        this.avatar = (width) => {
            let opt = width;
            let url = 'https://i.pravatar.cc';

            if (typeof opt === 'undefined') {
                opt = 200;
            }

            url += `/${opt}`;

            return url;
        };

        this.email = (options = {}) => {
            let { provider } = options;
            const { firstName, lastName } = options;

            if (typeof provider === 'undefined') {
                provider = pure.random.arrayElement(pure.registeredModules.internet.free_email);
            }

            return `${pure.helpers.slugify(this.userName({ firstName, lastName }), { lower: true })}@${provider}`;
        };

        this.exampleEmail = (options = {}) => {
            const { firstName, lastName } = options;
            const provider = pure.random.arrayElement(pure.registeredModules.internet.example_email);
            return this.email({ firstName, lastName, provider });
        };

        this.userName = (options = {}) => {
            const { firstName = pure.name.firstName(), lastName = pure.name.lastName() } = options;
            let r = pure.random.number(2);
            let result;

            if (r === 0) {
                result = firstName + pure.random.number(99);
            } else if (r === 1) {
                result = firstName + pure.random.arrayElement(['.', '_']) + lastName;
            } else if (r === 2) {
                result = firstName + pure.random.arrayElement(['.', '_']) + lastName + pure.random.number(99);
            } else {
                result = firstName + pure.random.number(99);
            }

            result = pure.helpers.slugify(result);
            result = result.replace(/ /g, '');

            return result;
        };

        this.protocol = () => pure.random.arrayElement(['http', 'https']);

        this.url = (options = {}) => {
            const { protocol = this.protocol(), domainName = this.domainName() } = options;

            return `${protocol}://${domainName}`;
        };

        this.domainName = () => `${this.domainWord()}.${this.domainSuffix()}`;

        this.domainSuffix = () => pure.random.arrayElement(pure.registeredModules.internet.domain_suffix);

        this.domainWord = () => {
            let name = pure.helpers.slugify(pure.name.firstName(), { lower: true, strict: true });

            if (name.length === 0) {
                name = slugify(pure.lorem.word(), { lower: true, strict: true });
            }

            return name;
        };

        this.ip = () => {
            const digit1 = pure.random.number(255);
            const digit2 = pure.random.number(255);
            const digit3 = pure.random.number(255);
            const digit4 = pure.random.number(255);

            return `${digit1}.${digit2}.${digit3}.${digit4}`;
        };

        this.ipv6 = () => {
            const randHash = () => {
                const template = pure.helpers.repeatString({ string: '#', num: 4 });
                return pure.helpers.replaceSymbolWithHex({ string: template });
            };

            const result = [];
            for (let i = 0; i < 8; i += 1) {
                result[i] = randHash();
            }
            return result.join(':');
        };

        this.userAgent = () => randomUa.generate();

        this.color = (options = {}) => {
            const { baseRed255 = 0, baseGreen255 = 0, baseBlue255 = 0 } = options;

            // based on awesome response : http://stackoverflow.com/questions/43044/
            // algorithm-to-randomly-generate-an-aesthetically-pleasing-color-palette
            const red = Math.floor((pure.random.number(256) + baseRed255) / 2);
            const green = Math.floor((pure.random.number(256) + baseGreen255) / 2);
            const blue = Math.floor((pure.random.number(256) + baseBlue255) / 2);
            const redStr = red.toString(16);
            const greenStr = green.toString(16);
            const blueStr = blue.toString(16);
            return `#${redStr.length === 1 ? '0' : ''}${redStr}${greenStr.length === 1 ? '0' : ''}`
            + `${greenStr}${blueStr.length === 1 ? '0' : ''}${blueStr}`;
        };

        this.mac = (sep) => {
            let i;
            let mac = '';
            let validSep = ':';

            // if the client passed in a different separator than `:`,
            // we will use it if it is in the list of acceptable separators (dash or no separator)
            if (['-', ''].indexOf(sep) !== -1) {
                validSep = sep;
            }

            for (i = 0; i < 12; i += 1) {
                mac += pure.random.number(15).toString(16);
                if (i % 2 === 1 && i !== 11) {
                    mac += validSep;
                }
            }

            return mac;
        };

        this.password = (options = {}) => {
            let { prefix = '' } = options;
            const {
                len = 15,
                memorable = false,
                pattern = /\w/,
            } = options;

            /*
             * password-generator ( function )
             * Copyright(c) 2011-2013 Bermi Ferrer <bermi@bermilabs.com>
             * MIT Licensed
             */
            const vowel = /[aeiouAEIOU]$/;
            const consonant = /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]$/;

            const password = (length, mem, pre) => {
                let char;
                const nlength = length;
                let pat = /\w/;
                const npre = pre || '';

                if (npre.length >= nlength) {
                    return npre;
                }

                if (mem) {
                    if (npre.match(consonant)) {
                        pat = vowel;
                    } else {
                        pat = consonant;
                    }
                }

                const n = pure.random.number(94) + 33;
                char = String.fromCharCode(n);

                if (mem) {
                    char = char.toLowerCase();
                }

                if (!char.match(pat)) {
                    return password(nlength, mem, npre);
                }

                return password(nlength, mem, `${npre}${char}`);
            };

            if (memorable) {
                prefix = password(len, memorable, prefix);
            } else {
                while (len > prefix.length) {
                    prefix += new RandExp(pattern).gen();
                }
            }

            return prefix.substr(0, len);
        };
    }
}

module.exports = Internet;
