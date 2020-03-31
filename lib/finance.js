const ibanLib = require('./iban');
/**
 * @namespace pure.finance
 */
function Finance(pure) {
    const Helpers = pure.helpers;
    const self = this;

    /**
   * account
   *
   * @method pure.finance.account
   * @param {number} length
   */
    self.account = (length) => {
        let def = length || 8;

        let template = '';

        for (let i = 0; i < def; i += 1) {
            template = `${template}#`;
        }
        def = null;
        return Helpers.replaceSymbolWithNumber(template);
    };

    /**
   * accountName
   *
   * @method pure.finance.accountName
   */
    self.accountName = () => [Helpers.randomize(pure.definitions.finance.account_type), 'Account'].join(' ');

    /**
   * routingNumber
   *
   * @method pure.finance.routingNumber
   */
    self.routingNumber = () => {
        const routingNumber = Helpers.replaceSymbolWithNumber('########');

        // Modules 10 straight summation.
        let sum = 0;

        for (let i = 0; i < routingNumber.length; i += 3) {
            sum += Number(routingNumber[i]) * 3;
            sum += Number(routingNumber[i + 1]) * 7;
            sum += Number(routingNumber[i + 2]) || 0;
        }

        return routingNumber + (Math.ceil(sum / 10) * 10 - sum);
    };

    /**
   * mask
   *
   * @method pure.finance.mask
   * @param {number} length
   * @param {boolean} parens
   * @param {boolean} ellipsis
   */
    self.mask = (length, parens, ellipsis) => {
        // set defaults
        const def = (length === 0 || !length || typeof length === 'undefined') ? 4 : length;
        const nParens = (parens === null) ? true : parens;
        const nEllipsis = (ellipsis === null) ? true : ellipsis;

        // create a template for length
        let template = '';

        for (let i = 0; i < def; i += 1) {
            template = `${template}#`;
        }

        // prefix with ellipsis
        template = (nEllipsis) ? ['...', template].join('') : template;

        template = (nParens) ? ['(', template, ')'].join('') : template;

        // generate random numbers
        template = Helpers.replaceSymbolWithNumber(template);

        return template;
    };

    // min and max take in minimum and maximum amounts, dec is the
    // decimal place you want rounded to, symbol is $, €, £, etc
    // NOTE: this returns a string representation of the value, if
    // you want a number use parseFloat and no symbol

    /**
   * amount
   *
   * @method pure.finance.amount
   * @param {number} min
   * @param {number} max
   * @param {number} dec
   * @param {string} symbol
   *
   * @return {string}
   */
    self.amount = (min, max, dec, symbol) => {
        const nMin = min || 0;
        const nMax = max || 1000;
        const nDec = dec === undefined ? 2 : dec;
        const nSymbol = symbol || '';
        const randValue = pure.random.number({ max: nMax, min: nMin, precision: (10 ** -nDec) });

        return nSymbol + randValue.toFixed(nDec);
    };

    /**
   * transactionType
   *
   * @method pure.finance.transactionType
   */
    self.transactionType = () => Helpers.randomize(pure.definitions.finance.transaction_type);

    /**
   * currencyCode
   *
   * @method pure.finance.currencyCode
   */
    self.currencyCode = () => pure.random.objectElement(pure.definitions.finance.currency).code;

    /**
   * currencyName
   *
   * @method pure.finance.currencyName
   */
    self.currencyName = () => pure.random.objectElement(pure.definitions.finance.currency, 'key');

    /**
   * currencySymbol
   *
   * @method pure.finance.currencySymbol
   */
    self.currencySymbol = () => {
        let symbol;

        while (!symbol) {
            symbol = pure.random.objectElement(pure.definitions.finance.currency).symbol;
        }
        return symbol;
    };

    /**
   * bitcoinAddress
   *
   * @method  pure.finance.bitcoinAddress
   */
    self.bitcoinAddress = () => {
        const addressLength = pure.random.number({ min: 25, max: 34 });

        let address = pure.random.arrayElement(['1', '3']);

        for (let i = 0; i < addressLength - 1; i += 1) {
            address += pure.random.arrayElement('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'.split(''));
        }

        return address;
    };

    /**
   * litecoinAddress
   *
   * @method  pure.finance.litecoinAddress
  */
    self.litecoinAddress = () => {
        const addressLength = pure.random.number({ min: 26, max: 33 });

        let address = pure.random.arrayElement(['L', 'M', '3']);

        for (let i = 0; i < addressLength; i += 1) {
            address += pure.random.arrayElement('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'.split(''));
        }

        return address;
    };

    /**
   * Credit card number
   * @method pure.finance.creditCardNumber
   * @param {string} provider | scheme
  */
    self.creditCardNumber = (provider) => {
        const prov = provider || '';
        let format; let
            formats;
        const localeFormat = pure.definitions.finance.credit_card;
        if (prov in localeFormat) {
            formats = localeFormat[prov]; // there chould be multiple formats
            if (typeof formats === 'string') {
                format = formats;
            } else {
                format = pure.random.arrayElement(formats);
            }
        } else if (prov.match(/#/)) { // The user chose an optional scheme
            format = prov;
        } else if (typeof localeFormat === 'string') { // Choose a random provider
            format = localeFormat;
        } else if (typeof localeFormat === 'object') {
            // Credit cards are in a object structure
            formats = pure.random.objectElement(localeFormat, 'value'); // There chould be multiple formats
            if (typeof formats === 'string') {
                format = formats;
            } else {
                format = pure.random.arrayElement(formats);
            }
        }
        format = format.replace(/\//g, '');
        return Helpers.replaceCreditCardSymbols(format);
    };
    /**
   * Credit card CVV
   * @method pure.finance.creditCardCVV
  */
    self.creditCardCVV = () => {
        let cvv = '';
        for (let i = 0; i < 3; i += 1) {
            cvv += pure.random.number({ max: 9 }).toString();
        }
        return cvv;
    };

    /**
   * ethereumAddress
   *
   * @method  pure.finance.ethereumAddress
   */
    self.ethereumAddress = () => {
        const address = pure.random.hexaDecimal(40).toLowerCase();

        return address;
    };

    /**
   * iban
   *
   * @method  pure.finance.iban
   */
    self.iban = (formatted, country) => {
        let ibanFormat;
        if (typeof country === 'undefined') {
            ibanFormat = pure.random.arrayElement(ibanLib.formats);
        } else {
            const form = (format) => {
                let res;
                if (format.country === country.toUpperCase()) {
                    res = format;
                }
                return res;
            };
            const res = ibanLib.formats.filter(form);
            [ibanFormat] = res;

            if (!ibanFormat) {
                ibanFormat = pure.random.arrayElement(ibanLib.formats);
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
                    s += pure.random.arrayElement(ibanLib.alpha);
                } else if (bban.type === 'c') {
                    if (pure.random.number(100) < 80) {
                        s += pure.random.number(9);
                    } else {
                        s += pure.random.arrayElement(ibanLib.alpha);
                    }
                } else if (c >= 3 && pure.random.number(100) < 30) {
                    if (pure.random.boolean()) {
                        s += pure.random.arrayElement(ibanLib.pattern100);
                        c -= 2;
                    } else {
                        s += pure.random.arrayElement(ibanLib.pattern10);
                        c -= 1;
                    }
                } else {
                    s += pure.random.number(9);
                }
                c -= 1;
            }
            s = s.substring(0, count);
        }
        let checksum = 98 - ibanLib.mod97(ibanLib.toDigitString(`${s + ibanFormat.country}00`));
        if (checksum < 10) {
            checksum = `0${checksum}`;
        }
        const iban = ibanFormat.country + checksum + s;
        return formatted ? iban.match(/.{1,4}/g).join(' ') : iban;
    };

    /**
   * bic
   *
   * @method  pure.finance.bic
   */
    self.bic = () => {
        const vowels = ['A', 'E', 'I', 'O', 'U'];
        const prob = pure.random.number(100);
        let verification1 = '';
        if (prob < 10) {
            verification1 = Helpers.replaceSymbols(`?${pure.random.arrayElement(vowels)}?`);
        } else if (prob < 40) {
            verification1 = Helpers.replaceSymbols('###');
        }
        return `${Helpers.replaceSymbols('???')
          + pure.random.arrayElement(vowels)
          + pure.random.arrayElement(ibanLib.iso3166)
          + Helpers.replaceSymbols('?')}1${verification1}`;
    };
}

module.exports = Finance;
