const RandExp = require('randexp');
const slugify = require('../../vendor/slugify');
const randomUa = require('../../vendor/user-agent');

/**
 *
 * @namespace pure.internet
 */
class Internet {
    constructor(pure) {
        /**
         * avatar
         *
         * @description Generate a random avatar url
         * @method pure.internet.avatar
         * @example
         * console.log(pure.internet.avatar());
         * //outputs: "https://s3.amazonaws.com/uifaces/faces/twitter/..."
         */
        this.avatar = () => pure.random.arrayElement(pure.registeredModules.internet.avatar_uri);

        /**
         * email
         *
         * @description Generates a random email
         * @param {string} [firstName= random] First name
         * @param {string} [lastName= random] Last name
         * @param {string} [provider= random] Provider to use on email
         * @method pure.internet.email
         * @example
         * console.log(pure.internet.email());
         * //outputs: "myrtice.cronin@gmail.com"
         */
        this.email = (firstName, lastName, provider) => {
            let def = provider;
            def = def || pure.random.arrayElement(pure.registeredModules.internet.free_email);
            return `${pure.helpers.slugify(pure.internet.userName(firstName, lastName), { lower: true })}@${def}`;
        };

        /**
         * exampleEmail
         *
         * @description Generates a random example email
         * @param {string} [firstName= random] First name
         * @param {string} [lastName= random] Last name
         * @method pure.internet.exampleEmail
         * @example
         * console.log(pure.internet.exampleEmail());
         * //outputs: "golden.prohaska@example.org"
         */
        this.exampleEmail = (firstName, lastName) => {
            const provider = pure.random.arrayElement(pure.registeredModules.internet.example_email);
            return this.email(firstName, lastName, provider);
        };

        /**
         * userName
         *
         * @description Generates a random user name
         * @param {string} [firstName= random] First name
         * @param {string} [lastName= random] Last name
         * @method pure.internet.userName
         * @example
         * console.log(pure.internet.userName());
         * //outputs: "Kirstin39"
         */
        this.userName = (firstName, lastName) => {
            let result;
            const first = firstName || pure.name.firstName();
            const last = lastName || pure.name.lastName();
            switch (pure.random.number(2)) {
            case 0:
                result = first + pure.random.number(99);
                break;
            case 1:
                result = first + pure.random.arrayElement(['.', '_']) + last;
                break;
            case 2:
                result = first + pure.random.arrayElement(['.', '_']) + last + pure.random.number(99);
                break;
            default:
                result = first + pure.random.number(99);
            }
            result = pure.helpers.slugify(result);
            result = result.replace(/ /g, '');
            return result;
        };

        /**
         * protocol
         *
         * @description Generates a random protocol
         * @method pure.internet.protocol
         * @example
         * console.log(pure.internet.protocol());
         * //outputs: "https"
         */
        this.protocol = () => pure.random.arrayElement(['http', 'https']);

        /**
         * url
         *
         * @description Generates a random url
         * @param {string} [protocol= random] What protocol to use.
         * @param {string} [domainName= random] What domain to use.
         * @method pure.internet.url
         * @example
         * console.log(pure.internet.url());
         * //outputs: "http://harvey.net"
         */
        this.url = (protocol, domainName) => {
            const nProtocol = protocol || pure.internet.protocol();
            const nDomainName = domainName || pure.internet.domainName();

            return `${nProtocol}://${nDomainName}`;
        };

        /**
         * domainName
         *
         * @description Generates a random domain name
         * @method pure.internet.domainName
         * @example
         * console.log(pure.internet.domainName());
         * //outputs: "marvin.org"
         */
        this.domainName = () => `${pure.internet.domainWord()}.${pure.internet.domainSuffix()}`;

        /**
         * domainSuffix
         *
         * @description Generates a random domain suffix
         * @method pure.internet.domainSuffix
         * @example
         * console.log(pure.internet.domainSuffix());
         * //outputs: "net"
         */
        this.domainSuffix = () => pure.random.arrayElement(pure.registeredModules.internet.domain_suffix);

        /**
         * domainWord
         *
         * @description Generates a random domain word
         * @method pure.internet.domainWord
         * @example
         * console.log(pure.internet.domainWord());
         * //outputs: "alyce"
         */
        this.domainWord = () => {
            let name = pure.helpers.slugify(pure.name.firstName(), { lower: true, strict: true });

            if (name.length === 0) {
                name = slugify(pure.lorem.word(), { lower: true, strict: true });
            }

            return name;
        };

        /**
         * ip
         *
         * @description Generates a random ip
         * @method pure.internet.ip
         * @example
         * console.log(pure.internet.ip());
         * //outputs: "97.238.241.11"
         */
        this.ip = () => {
            const digit1 = pure.random.number(255);
            const digit2 = pure.random.number(255);
            const digit3 = pure.random.number(255);
            const digit4 = pure.random.number(255);

            return `${digit1}.${digit2}.${digit3}.${digit4}`;
        };

        /**
         * ipv6
         *
         * @description Generates a random ipv6
         * @method pure.internet.ipv6
         * @example
         * console.log(pure.internet.ipv6());
         * //outputs: "2001:0db8:6276:b1a7:5213:22f1:25df:c8a0"
         */
        this.ipv6 = () => {
            const randHash = () => {
                const template = pure.helpers.repeatString('#', 4);
                return pure.helpers.replaceSymbolWithHex(template);
            };

            const result = [];
            for (let i = 0; i < 8; i += 1) {
                result[i] = randHash();
            }
            return result.join(':');
        };

        /**
         * userAgent
         *
         * @description Generates a random user agent
         * @method pure.internet.userAgent
         * @example
         * console.log(pure.internet.userAgent());
         * //outputs: "Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_7_5 rv:6.0; SL) AppleWebKit/532.0.1
         * // (KHTML, like Gecko) Version/7.1.6 Safari/532.0.1"
         */
        this.userAgent = () => randomUa.generate();

        /**
         * color
         *
         * @description Generates a random color
         * @param {Number} [baseRed255= 0] The red value. Valid values are 0 - 255.
         * @param {Number} [baseGreen255= 0] The green value. Valid values are 0 - 255.
         * @param {Number} [baseBlue255= 0] The blue value. Valid values are 0 - 255.
         * @method pure.internet.color
         * @example
         * console.log(pure.internet.color());
         * //outputs: "#06267f"
         */
        this.color = (baseRed255 = 0, baseGreen255 = 0, baseBlue255 = 0) => {
            // based on awesome response : http://stackoverflow.com/questions/43044/
            // algorithm-to-randomly-generate-an-aesthetically-pleasing-color-palette
            const red = Math.floor((pure.random.number(256) + baseRed255) / 2);
            const green = Math.floor((pure.random.number(256) + baseGreen255) / 2);
            const blue = Math.floor((pure.random.number(256) + baseBlue255) / 2);
            const redStr = red.toString(16);
            const greenStr = green.toString(16);
            const blueStr = blue.toString(16);
            return `#${redStr.length === 1 ? '0' : ''}${redStr}${greenStr.length === 1 ? '0' : ''}${greenStr}${blueStr.length === 1 ? '0' : ''}${blueStr}`;
        };

        /**
         * mac
         *
         * @description Generates a random mac address
         * @param {string} [sep= ':'] Separator to use in mac address. ['-', '', ':']
         * @method pure.internet.mac
         * @example
         * console.log(pure.internet.mac());
         * //outputs: "78:06:cc:ae:b3:81"
         */
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

        /**
         * password
         *
         * @description Generates a random password
         * @param {Number} [len= 15] The number of characters in the password.
         * @param {boolean} [memorable= false] Whether a password should be easy to remember.
         * @param {string} [pattern= '/\w/'] A regex to match each character of the password against.
         * If memorable is true, then this will be ignored. If pattern has limit inside regex, it will be ignored.
         * @param {string} [prefix= ''] A value to prepend to the generated password.
         * @method pure.internet.password
         * @example
         * console.log(pure.internet.password());
         * //outputs: "AM7zl6Mg"
         */
        this.password = (len, memorable, pattern, prefix) => {
            const nlen = len || 15;
            const nmemorable = memorable || false;
            const npattern = pattern || /\w/;
            let generated = prefix || '';

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
                const nmem = mem || true;
                let pat = /\w/;
                const npre = pre || '';

                if (npre.length >= nlength) {
                    return npre;
                }

                if (nmem) {
                    if (npre.match(consonant)) {
                        pat = vowel;
                    } else {
                        pat = consonant;
                    }
                }

                const n = pure.random.number(94) + 33;
                char = String.fromCharCode(n);

                if (nmem) {
                    char = char.toLowerCase();
                }

                if (!char.match(pat)) {
                    return password(nlength, nmem, npre);
                }

                return password(nlength, nmem, `${npre}${char}`);
            };

            if (nmemorable) {
                generated = password(nlen, nmemorable, prefix);
            } else {
                while (nlen > generated.length) {
                    generated += new RandExp(npattern).gen();
                }
            }

            return generated.substr(0, nlen);
        };
    }
}

module.exports = Internet;
