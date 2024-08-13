import RandExp from 'randexp';
import slugify from 'slugify';

export class Internet {
  constructor(pure) {
    this.pure = pure;
  }

  avatar(width) {
    let opt = width;
    let url = 'https://i.pravatar.cc';

    if (typeof opt === 'undefined') {
      opt = 200;
    }

    url += `/${opt}`;

    return url;
  }

  email(options = {}) {
    let { provider } = options;
    const { firstName, lastName } = options;

    if (typeof provider === 'undefined') {
      provider = this.pure.random.arrayElement(this.pure.registeredModules.internet.freeEmail);
    }

    return `${this.pure.helpers.slugify(
      this.pure.internet.userName({
        firstName,
        lastName
      }),
      { lower: true }
    )}@${provider}`;
  }

  exampleEmail(options = {}) {
    const { firstName, lastName } = options;
    const provider = this.pure.random.arrayElement(
      this.pure.registeredModules.internet.exampleEmail
    );

    return this.pure.internet.email({ firstName, lastName, provider });
  }

  userName(options = {}) {
    const { firstName = this.pure.name.firstName(), lastName = this.pure.name.lastName() } =
      options;
    const r = this.pure.random.number(2);
    let result;

    if (r === 0) {
      result = firstName + this.pure.random.number(99);
    } else if (r === 1) {
      result = firstName + this.pure.random.arrayElement(['.', '_']) + lastName;
    } else if (r === 2) {
      result =
        firstName +
        this.pure.random.arrayElement(['.', '_']) +
        lastName +
        this.pure.random.number(99);
    } else {
      result = firstName + this.pure.random.number(99);
    }

    result = this.pure.helpers.slugify(result);
    result = result.replace(/ /g, '');

    return result;
  }

  protocol() {
    return this.pure.random.arrayElement(['http', 'https']);
  }

  url(options = {}) {
    const {
      protocol = this.pure.internet.protocol(),
      domainName = this.pure.internet.domainName()
    } = options;

    return `${protocol}://${domainName}`;
  }

  domainName() {
    return `${this.pure.internet.domainWord()}.${this.pure.internet.domainSuffix()}`;
  }

  domainSuffix() {
    return this.pure.random.arrayElement(this.pure.registeredModules.internet.domainSuffix);
  }

  domainWord() {
    let name = this.pure.helpers.slugify(this.pure.name.firstName(), { lower: true, strict: true });

    if (name.length === 0) {
      name = slugify(this.pure.lorem.word(), { lower: true, strict: true });
    }

    return name;
  }

  ip() {
    const digit1 = this.pure.random.number(255);
    const digit2 = this.pure.random.number(255);
    const digit3 = this.pure.random.number(255);
    const digit4 = this.pure.random.number(255);

    return `${digit1}.${digit2}.${digit3}.${digit4}`;
  }

  ipv6() {
    const randHash = () => {
      const template = this.pure.helpers.repeatString({ string: '#', num: 4 });
      return this.pure.helpers.replaceSymbolWithHex({ string: template });
    };
    const result = [];

    for (let i = 0; i < 8; i += 1) {
      result[i] = randHash();
    }

    return result.join(':');
  }

  userAgent(options = {}) {
    const { provider } = options;

    let result = '';

    if (provider) {
      result = this.pure.registeredModules.internet.userAgent[provider];
    } else {
      result = this.pure.random.objectElement(this.pure.registeredModules.internet.userAgent);
    }

    return result;
  }

  botUserAgent(options = {}) {
    const { provider } = options;

    let result = '';

    if (provider) {
      result = this.pure.random.arrayElement(
        this.pure.registeredModules.internet.botUserAgent[provider]
      );
    } else {
      const arr = this.pure.random.objectElement(this.pure.registeredModules.internet.botUserAgent);
      result = this.pure.random.arrayElement(arr);
    }

    return result;
  }

  color(options = {}) {
    const { baseRed255 = 0, baseGreen255 = 0, baseBlue255 = 0 } = options;
    // based on awesome response : http://stackoverflow.com/questions/43044/
    // algorithm-to-randomly-generate-an-aesthetically-pleasing-color-palette
    const red = Math.floor((this.pure.random.number(256) + baseRed255) / 2);
    const green = Math.floor((this.pure.random.number(256) + baseGreen255) / 2);
    const blue = Math.floor((this.pure.random.number(256) + baseBlue255) / 2);
    const redStr = red.toString(16);
    const greenStr = green.toString(16);
    const blueStr = blue.toString(16);

    return (
      `#${redStr.length === 1 ? '0' : ''}${redStr}${greenStr.length === 1 ? '0' : ''}` +
      `${greenStr}${blueStr.length === 1 ? '0' : ''}${blueStr}`
    );
  }

  mac(sep) {
    let i;
    let mac = '';
    let validSep = ':';

    // if the client passed in a different separator than `:`,
    // we will use it if it is in the list of acceptable separators (dash or no separator)
    if (['-', ''].indexOf(sep) !== -1) {
      validSep = sep;
    }

    for (i = 0; i < 12; i += 1) {
      mac += this.pure.random.number(15).toString(16);
      if (i % 2 === 1 && i !== 11) {
        mac += validSep;
      }
    }

    return mac;
  }

  password(options = {}) {
    let { prefix = '' } = options;
    const { len = 15, memorable = false, pattern = /\w/ } = options;
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

      const n = this.pure.random.number(94) + 33;
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
  }
}
