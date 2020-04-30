const ibanLib = require('./iban');
/**
 * @namespace pure.finance
 */
function Finance(pure) {
    const Helpers = pure.helpers;

    /**
     * account
     *
     * @description Return random account number
     * @param {number} [length= Locale] Length of account number
     * @method pure.finance.account
     * @example
     * console.log(pure.finance.account());
     * //outputs: "91143029"
     */
    this.account = (length) => {
        const def = length || 8;

        const template = '#'.repeat(def);

        return Helpers.replaceSymbolWithNumber(template);
    };

    /**
     * accountName
     *
     * @description Return random account name
     * @method pure.finance.accountName
     * @example
     * console.log(pure.finance.accountName());
     * //outputs: "Personal Loan Account"
     */
    this.accountName = () => [Helpers.randomize(pure.definitions.finance.account_type), 'Account'].join(' ');

    /**
     * routingNumber
     *
     * @description Return random routing number
     * @method pure.finance.routingNumber
     * @example
     * console.log(pure.finance.routingNumber());
     * //outputs: "104791008"
     */
    this.routingNumber = () => {
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
     * @description Return random mask number
     * @param {number} [length= 4] Length of mask number
     * @param {boolean} [parens= false] Format with parentesis
     * @param {boolean} [ellipsis= false] Format with ellipsis
     * @method pure.finance.mask
     * @example
     * console.log(pure.finance.mask());
     * //outputs: "3085"
     */
    this.mask = (length, parens, ellipsis) => {
        // set defaults
        const def = (length === 0 || !length || typeof length === 'undefined') ? 4 : length;
        const nParens = (parens === null) ? true : parens;
        const nEllipsis = (ellipsis === null) ? true : ellipsis;

        let template = '#'.repeat(def);

        // prefix with ellipsis
        template = (nEllipsis) ? ['...', template].join('') : template;

        template = (nParens) ? ['(', template, ')'].join('') : template;

        // generate random numbers
        template = Helpers.replaceSymbolWithNumber(template);

        return template;
    };

    /**
     * amount
     *
     * @description Return random amount value
     * @param {number} [min= 0] Minimum amount value
     * @param {number} [max= 1000] Maximum amount value
     * @param {number} [dec= 2] Floating point precision
     * @param {string} [symbol= empty] Amount symbol
     * @method pure.finance.amount
     * @example
     * console.log(pure.finance.amount());
     * //outputs: "891.45"
     */
    this.amount = (min, max, dec, symbol) => {
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
     * @description Return random transaction type
     * @method pure.finance.transactionType
     * @example
     * console.log(pure.finance.transactionType());
     * //outputs: "deposit"
     */
    this.transactionType = () => Helpers.randomize(pure.definitions.finance.transaction_type);

    /**
     * currencyCode
     *
     * @description Return random currency code
     * @method pure.finance.currencyCode
     * @example
     * console.log(pure.finance.currencyCode());
     * //outputs: "OMR"
     */
    this.currencyCode = () => pure.random.objectElement(pure.definitions.finance.currency).code;

    /**
     * currencyName
     *
     * @description Return random currency name
     * @method pure.finance.currencyName
     * @example
     * console.log(pure.finance.currencyName());
     * //outputs: "US Dollar"
     */
    this.currencyName = () => pure.random.objectElement(pure.definitions.finance.currency, 'key');

    /**
     * currencySymbol
     *
     * @description Return random currency symbol
     * @method pure.finance.currencySymbol
     * @example
     * console.log(pure.finance.currencySymbol());
     * //outputs: "₡"
     */
    this.currencySymbol = () => {
        let symbol;

        while (!symbol) {
            symbol = pure.random.objectElement(pure.definitions.finance.currency).symbol;
        }
        return symbol;
    };

    /**
     * bitcoinAddress
     *
     * @description Return random bitcoin address
     * @method  pure.finance.bitcoinAddress
     * @example
     * console.log(pure.finance.bitcoinAddress());
     * //outputs: "1Xm61sVQkERphwvJ5QHY2UggghKZXuXas"
     */
    this.bitcoinAddress = () => {
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
     * @description Return random litecoin address
     * @method  pure.finance.litecoinAddress
     * @example
     * console.log(pure.finance.litecoinAddress());
     * //outputs: "3jiLj9MZrdXGkBPcmEfX4ka1Yrgm9WQ"
     */
    this.litecoinAddress = () => {
        const addressLength = pure.random.number({ min: 26, max: 33 });

        let address = pure.random.arrayElement(['L', 'M', '3']);

        for (let i = 0; i < addressLength; i += 1) {
            address += pure.random.arrayElement('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'.split(''));
        }

        return address;
    };

    /**
     * Credit card number
     *
     * @description Return random localized credit card number
     * @param {string} [provider= empty] Provider to generate from schema
     * @method pure.finance.creditCardNumber
     * @example
     * console.log(pure.finance.creditCardNumber());
     * //outputs: "3677-158240-5783"
     */
    this.creditCardNumber = (provider) => {
        const prov = provider || '';
        let format;
        let formats;
        const localeFormat = pure.definitions.finance.credit_card;
        if (Object.prototype.hasOwnProperty.call(localeFormat, provider)) {
            // there chould be multiple formats
            formats = localeFormat[prov];
            if (typeof formats === 'string') {
                format = formats;
            } else {
                format = pure.random.arrayElement(formats);
            }
        } else if (prov.match(/#/)) {
            // The user chose an optional scheme
            format = prov;
        } else if (typeof localeFormat === 'string') {
            // Choose a random provider
            format = localeFormat;
        } else if (typeof localeFormat === 'object') {
            // Credit cards are in a object structure
            formats = pure.random.objectElement(localeFormat, 'value');
            // There chould be multiple formats
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
     *
     * @description Return random CVV
     * @method pure.finance.creditCardCVV
     * @example
     * console.log(pure.finance.creditCardCVV());
     * //outputs: "256"
     */
    this.creditCardCVV = () => {
        const digit1 = pure.random.number({ min: 0, max: 9 });
        const digit2 = pure.random.number({ min: 0, max: 9 });
        const digit3 = pure.random.number({ min: 0, max: 9 });
        return `${digit1}${digit2}${digit3}`;
    };

    /**
     * ethereumAddress
     *
     * @description Return random ethereum address
     * @method  pure.finance.ethereumAddress
     * @example
     * console.log(pure.finance.ethereumAddress());
     * //outputs: "0x43ea6bb9a79e2e12c18dd0f2d8ff08fd205cf97c"
     */
    this.ethereumAddress = () => {
        const address = pure.random.hexaDecimal(40).toLowerCase();

        return address;
    };

    /**
     * iban
     *
     * @description Return random International Bank Account Number
     * @param {boolean} [formatted= false] If output is formatted or not
     * @param {string} [country= Random country] Alpha-2 country code
     * @method pure.finance.iban
     * @example
     * console.log(pure.finance.iban());
     * //outputs: "FI2750016855791009"
     */
    this.iban = (formatted, country) => {
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
     * @description Return random Bank Identifier Code
     * @method  pure.finance.bic
     * @example
     * console.log(pure.finance.bic());
     * //outputs: "WMCAAFT1479"
     */
    this.bic = () => {
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
