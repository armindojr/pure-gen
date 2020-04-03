const slugify = require('slugify');
const randomUa = require('../vendor/user-agent');

/**
 *
 * @namespace pure.internet
 */
function Internet(pure) {
    const self = this;
    /**
   * avatar
   *
   * @method pure.internet.avatar
   */
    self.avatar = () => pure.random.arrayElement(pure.definitions.internet.avatar_uri);

    self.avatar.schema = {
        description: 'Generates a URL for an avatar.',
        sampleResults: ['https://s3.amazonaws.com/uifaces/faces/twitter/igorgarybaldi/128.jpg'],
    };

    /**
   * email
   *
   * @method pure.internet.email
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} provider
   */
    self.email = (firstName, lastName, provider) => {
        let def = provider;
        const first = firstName;
        const last = lastName;
        def = def || pure.random.arrayElement(pure.definitions.internet.free_email);
        return `${pure.helpers.slugify(pure.internet.userName(first, last))}@${def}`;
    };

    self.email.schema = {
        description: 'Generates a valid email address based on optional input criteria',
        sampleResults: ['foo.bar@gmail.com'],
        properties: {
            firstName: {
                type: 'string',
                required: false,
                description: 'The first name of the user',
            },
            lastName: {
                type: 'string',
                required: false,
                description: 'The last name of the user',
            },
            provider: {
                type: 'string',
                required: false,
                description: 'The domain of the user',
            },
        },
    };
    /**
   * exampleEmail
   *
   * @method pure.internet.exampleEmail
   * @param {string} firstName
   * @param {string} lastName
   */
    self.exampleEmail = (firstName, lastName) => {
        const first = firstName;
        const last = lastName;
        const provider = pure.random.arrayElement(pure.definitions.internet.example_email);
        return self.email(first, last, provider);
    };

    /**
   * userName
   *
   * @method pure.internet.userName
   * @param {string} firstName
   * @param {string} lastName
   */
    self.userName = (firstName, lastName) => {
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
        result = result.toString().replace(/'/g, '');
        result = result.replace(/ /g, '');
        return result;
    };

    self.userName.schema = {
        description: 'Generates a username based on one of several patterns. The pattern is chosen randomly.',
        sampleResults: [
            'Kirstin39',
            'Kirstin.Smith',
            'Kirstin.Smith39',
            'KirstinSmith',
            'KirstinSmith39',
        ],
        properties: {
            firstName: {
                type: 'string',
                required: false,
                description: 'The first name of the user',
            },
            lastName: {
                type: 'string',
                required: false,
                description: 'The last name of the user',
            },
        },
    };

    /**
   * protocol
   *
   * @method pure.internet.protocol
   */
    self.protocol = () => {
        const protocols = ['http', 'https'];
        return pure.random.arrayElement(protocols);
    };

    self.protocol.schema = {
        description: 'Randomly generates http or https',
        sampleResults: ['https', 'http'],
    };

    /**
   * url
   *
   * @method pure.internet.url
   */
    self.url = () => `${pure.internet.protocol()}://${pure.internet.domainName()}`;

    self.url.schema = {
        description: 'Generates a random URL. The URL could be secure or insecure.',
        sampleResults: [
            'http://rashawn.name',
            'https://rashawn.name',
        ],
    };

    /**
   * domainName
   *
   * @method pure.internet.domainName
   */
    self.domainName = () => `${pure.internet.domainWord()}.${pure.internet.domainSuffix()}`;

    self.domainName.schema = {
        description: 'Generates a random domain name.',
        sampleResults: ['marvin.org'],
    };

    /**
   * domainSuffix
   *
   * @method pure.internet.domainSuffix
   */
    self.domainSuffix = () => pure.random.arrayElement(pure.definitions.internet.domain_suffix);

    self.domainSuffix.schema = {
        description: 'Generates a random domain suffix.',
        sampleResults: ['net'],
    };

    /**
   * domainWord
   *
   * @method pure.internet.domainWord
   */
    self.domainWord = () => {
        let name = slugify.default(pure.name.firstName(), { lower: true, strict: true });

        if (name.length === 0) {
            name = slugify(pure.lorem.word(), { lower: true, strict: true });
        }

        return name;
    };

    self.domainWord.schema = {
        description: 'Generates a random domain word.',
        sampleResults: ['alyce'],
    };

    /**
   * ip
   *
   * @method pure.internet.ip
   */
    self.ip = () => {
        const randNum = () => (pure.random.number(255)).toFixed(0);

        const result = [];
        for (let i = 0; i < 4; i += 1) {
            result[i] = randNum();
        }

        return result.join('.');
    };

    self.ip.schema = {
        description: 'Generates a random IP.',
        sampleResults: ['97.238.241.11'],
    };

    /**
   * ipv6
   *
   * @method pure.internet.ipv6
   */
    self.ipv6 = () => {
        const randHash = () => {
            let result = '';
            for (let i = 0; i < 4; i += 1) {
                result += (pure.random.arrayElement([
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
                ]));
            }
            return result;
        };

        const result = [];
        for (let i = 0; i < 8; i += 1) {
            result[i] = randHash();
        }
        return result.join(':');
    };

    self.ipv6.schema = {
        description: 'Generates a random IPv6 address.',
        sampleResults: ['2001:0db8:6276:b1a7:5213:22f1:25df:c8a0'],
    };

    /**
   * userAgent
   *
   * @method pure.internet.userAgent
   */
    self.userAgent = () => randomUa.generate();

    self.userAgent.schema = {
        description: 'Generates a random user agent.',
        sampleResults: [
            'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_7_5 rv:6.0; SL) AppleWebKit/532.0.1 '
            + '(KHTML, like Gecko) Version/7.1.6 Safari/532.0.1',
        ],
    };

    /**
   * color
   *
   * @method pure.internet.color
   * @param {number} baseRed255
   * @param {number} baseGreen255
   * @param {number} baseBlue255
   */
    self.color = (baseRed255, baseGreen255, baseBlue255) => {
        const baseRed = baseRed255 || 0;
        const baseGreen = baseGreen255 || 0;
        const baseBlue = baseBlue255 || 0;
        // based on awesome response : http://stackoverflow.com/questions/43044/
        // algorithm-to-randomly-generate-an-aesthetically-pleasing-color-palette
        const red = Math.floor((pure.random.number(256) + baseRed) / 2);
        const green = Math.floor((pure.random.number(256) + baseGreen) / 2);
        const blue = Math.floor((pure.random.number(256) + baseBlue) / 2);
        const redStr = red.toString(16);
        const greenStr = green.toString(16);
        const blueStr = blue.toString(16);
        return `#${
            redStr.length === 1 ? '0' : ''}${redStr
        }${greenStr.length === 1 ? '0' : ''}${greenStr
        }${blueStr.length === 1 ? '0' : ''}${blueStr}`;
    };

    self.color.schema = {
        description: 'Generates a random hexadecimal color.',
        sampleResults: ['#06267f'],
        properties: {
            baseRed255: {
                type: 'number',
                required: false,
                description: 'The red value. Valid values are 0 - 255.',
            },
            baseGreen255: {
                type: 'number',
                required: false,
                description: 'The green value. Valid values are 0 - 255.',
            },
            baseBlue255: {
                type: 'number',
                required: false,
                description: 'The blue value. Valid values are 0 - 255.',
            },
        },
    };

    /**
   * mac
   *
   * @method pure.internet.mac
   * @param {string} sep
   */
    self.mac = (sep) => {
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

    self.mac.schema = {
        description: 'Generates a random mac address.',
        sampleResults: ['78:06:cc:ae:b3:81'],
    };

    /**
   * password
   *
   * @method pure.internet.password
   * @param {number} len
   * @param {boolean} memorable
   * @param {string} pattern
   * @param {string} prefix
   */
    self.password = (len, memorable, pattern, prefix) => {
        const nlen = len || 15;
        let nmemorable = memorable;
        if (typeof nmemorable === 'undefined') {
            nmemorable = false;
        }
        /*
      * password-generator ( function )
      * Copyright(c) 2011-2013 Bermi Ferrer <bermi@bermilabs.com>
      * MIT Licensed
      */
        const vowel = /[aeiouAEIOU]$/;
        const consonant = /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]$/;
        const password = (length, mem, pat, pre) => {
            let char;
            const nlength = length;
            let nmem = mem;
            let npat = pat;
            let npre = pre;
            // if (nlength == null) {
            //     nlength = 10;
            // }
            if (nmem == null) {
                nmem = true;
            }
            if (npat == null) {
                npat = /\w/;
            }
            if (npre == null) {
                npre = '';
            }
            if (npre.length >= nlength) {
                return npre;
            }
            if (nmem) {
                if (npre.match(consonant)) {
                    npat = vowel;
                } else {
                    npat = consonant;
                }
            }
            const n = pure.random.number(94) + 33;
            char = String.fromCharCode(n);
            if (nmem) {
                char = char.toLowerCase();
            }
            if (!char.match(npat)) {
                return password(nlength, nmem, npat, npre);
            }
            return password(nlength, nmem, npat, `${npre}${char}`);
        };
        return password(nlen, nmemorable, pattern, prefix);
    };

    self.password.schema = {
        description: 'Generates a random password.',
        sampleResults: [
            'AM7zl6Mg',
            'susejofe',
        ],
        properties: {
            length: {
                type: 'number',
                required: false,
                description: 'The number of characters in the password.',
            },
            memorable: {
                type: 'boolean',
                required: false,
                description: 'Whether a password should be easy to remember.',
            },
            pattern: {
                type: 'regex',
                required: false,
                description: 'A regex to match each character of the password against.'
                + ' This parameter will be negated if the memorable setting is turned on.',
            },
            prefix: {
                type: 'string',
                required: false,
                description: 'A value to prepend to the generated password. The prefix counts'
                + ' towards the length of the password.',
            },
        },
    };
}


module.exports = Internet;
