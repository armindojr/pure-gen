export class Finance {
  constructor(pure) {
    this.pure = pure;
  }

  account(length) {
    const def = length || 8;
    const template = this.pure.helpers.repeatString({ string: '#', num: def });

    return this.pure.helpers.replaceSymbolWithNumber({ string: template });
  }

  accountName() {
    const result = this.pure.random.arrayElement(this.pure.registeredModules.finance.accountType);

    return [result, 'Account'].join(' ');
  }

  routingNumber() {
    const routingNumber = this.pure.helpers.replaceSymbolWithNumber({ string: '########' });
    // Modules 10 straight summation.
    let sum = 0;

    for (let i = 0; i < routingNumber.length; i += 3) {
      sum += Number(routingNumber[i]) * 3;
      sum += Number(routingNumber[i + 1]) * 7;
      sum += Number(routingNumber[i + 2]) || 0;
    }

    return routingNumber + (Math.ceil(sum / 10) * 10 - sum);
  }

  mask(options) {
    const opt = options || {};
    const { length, parens, ellipsis } = opt;
    // set defaults
    const def = length === 0 || !length || typeof length === 'undefined' ? 4 : length;
    const nParens = parens === null ? true : parens;
    const nEllipsis = ellipsis === null ? true : ellipsis;
    let template = this.pure.helpers.repeatString({ string: '#', num: def });

    // prefix with ellipsis
    template = nEllipsis ? ['...', template].join('') : template;
    template = nParens ? ['(', template, ')'].join('') : template;
    // generate random numbers
    template = this.pure.helpers.replaceSymbolWithNumber({ string: template });

    return template;
  }

  // TODO: rename dec param as precision
  amount(options) {
    const def = options || {};
    const { min = 0, max = 1000, dec = 2, symbol = '' } = def;
    const randValue = this.pure.random.number({ max, min, precision: dec });

    return symbol + randValue.toFixed(dec);
  }

  transactionType() {
    return this.pure.random.arrayElement(this.pure.registeredModules.finance.transactionType);
  }

  currencyCode() {
    return this.pure.random.objectElement(this.pure.registeredModules.finance.currency).code;
  }

  currencyName() {
    return this.pure.random.objectElement(this.pure.registeredModules.finance.currency, 'key');
  }

  currencySymbol() {
    let symbol;

    while (!symbol) {
      symbol = this.pure.random.objectElement(this.pure.registeredModules.finance.currency).symbol;
    }

    return symbol;
  }

  bitcoinAddress() {
    const addressLength = this.pure.random.number({ min: 25, max: 34 });
    const alphanum = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'.split('');
    let address = this.pure.random.arrayElement(['1', '3']);

    for (let i = 0; i < addressLength - 1; i += 1) {
      address += this.pure.random.arrayElement(alphanum);
    }

    return address;
  }

  litecoinAddress() {
    const addressLength = this.pure.random.number({ min: 26, max: 33 });
    const alphanum = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'.split('');
    let address = this.pure.random.arrayElement(['L', 'M', '3']);

    for (let i = 0; i < addressLength; i += 1) {
      address += this.pure.random.arrayElement(alphanum);
    }

    return address;
  }

  creditCardNumber(provider) {
    const prov = provider || '';
    let format;
    let formats;
    const localeFormat = this.pure.registeredModules.finance.creditCard;

    if (Object.prototype.hasOwnProperty.call(localeFormat, provider)) {
      // there chould be multiple formats
      formats = localeFormat[prov];

      if (typeof formats === 'string') {
        format = formats;
      } else {
        format = this.pure.random.arrayElement(formats);
      }
    } else if (prov.match(/#/)) {
      // The user chose an optional scheme
      format = prov;
    } else if (typeof localeFormat === 'string') {
      // Choose a random provider
      format = localeFormat;
    } else if (typeof localeFormat === 'object') {
      // Credit cards are in a object structure
      formats = this.pure.random.objectElement(localeFormat, 'value');
      // There chould be multiple formats
      if (typeof formats === 'string') {
        format = formats;
      } else {
        format = this.pure.random.arrayElement(formats);
      }
    }
    format = format.replace(/\//g, '');

    return this.pure.helpers.replaceCreditCardSymbols({ string: format });
  }

  creditCardCVV() {
    return this.pure.helpers.replaceSymbolWithNumber({ string: '###' });
  }

  ethereumAddress() {
    return `0x${this.pure.random.hexaDecimal(40).toLowerCase()}`;
  }

  iban(options) {
    const def = options || {};
    const { formatted = false, country } = def;
    let ibanFormat;

    if (typeof country === 'undefined') {
      ibanFormat = this.pure.random.arrayElement(this.pure.registeredModules.iban.formats);
    } else {
      const form = format => {
        let res;

        if (format.country === country.toUpperCase()) {
          res = format;
        }

        return res;
      };
      const res = this.pure.registeredModules.iban.formats.filter(form);
      [ibanFormat] = res;

      if (!ibanFormat) {
        ibanFormat = this.pure.random.arrayElement(this.pure.registeredModules.iban.formats);
      }
    }
    let s = '';
    let count = 0;

    for (let b = 0; b < ibanFormat.bban.length; b += 1) {
      const bban = ibanFormat.bban[b];
      let c = bban.count;
      count += bban.count;

      while (c > 0) {
        if (bban.type === 'a') {
          s += this.pure.random.alpha().toUpperCase();
        } else if (bban.type === 'c') {
          if (this.pure.random.number(100) < 80) {
            s += this.pure.random.number(9);
          } else {
            s += this.pure.random.alpha().toUpperCase();
          }
        } else if (c >= 3 && this.pure.random.number(100) < 30) {
          if (this.pure.random.boolean()) {
            s += `00${this.pure.random.number(9)}`;
            c -= 2;
          } else {
            s += `0${this.pure.random.number(9)}`;
            c -= 1;
          }
        } else {
          s += this.pure.random.number(9);
        }
        c -= 1;
      }
      s = s.substring(0, count);
    }

    let checksum = 98 - this.pure.helpers.mod97(this.pure.helpers.toDigitString(`${s + ibanFormat.country}00`));

    if (checksum < 10) {
      checksum = `0${checksum}`;
    }

    const iban = ibanFormat.country + checksum + s;

    return formatted ? iban.match(/.{1,4}/g).join(' ') : iban;
  }

  bic() {
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    const prob = this.pure.random.number(100);
    let verification1 = '';

    if (prob < 10) {
      verification1 = this.pure.helpers.replaceSymbols(`?${this.pure.random.arrayElement(vowels)}?`);
    } else if (prob < 40) {
      verification1 = this.pure.helpers.replaceSymbols('###');
    }

    return `${
      this.pure.helpers.replaceSymbols('???') +
      this.pure.random.arrayElement(vowels) +
      this.pure.random.arrayElement(this.pure.registeredModules.iban.countryCode) +
      this.pure.helpers.replaceSymbols('?')
    }1${verification1}`;
  }
}
