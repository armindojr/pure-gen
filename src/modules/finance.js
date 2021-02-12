/**
 * @namespace pure.finance
 */
class Finance {
    constructor(pure) {
        /**
         * account
         *
         * @description Return random account number
         * @param {Number} [length= Locale] Length of account number
         * @method pure.finance.account
         * @example
         * console.log(pure.finance.account());
         * //outputs: "91143029"
         */
        this.account = (length) => {
            const def = length || 8;
            const template = pure.helpers.repeatString({ string: '#', num: def });

            return pure.helpers.replaceSymbolWithNumber({ string: template });
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
        this.accountName = () => {
            const result = pure.random.arrayElement(pure.registeredModules.finance.account_type);
            return [result, 'Account'].join(' ');
        };

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
            const routingNumber = pure.helpers.replaceSymbolWithNumber({ string: '########' });

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
         * @param {object} [options= {}] Options to be passed
         * @param {Number} [options.length= 4] Length of mask number
         * @param {boolean} [options.parens= false] Format with parentesis
         * @param {boolean} [options.ellipsis= false] Format with ellipsis
         * @method pure.finance.mask
         * @example
         * console.log(pure.finance.mask());
         * //outputs: "3085"
         */
        this.mask = (options = {}) => {
            const { length, parens, ellipsis } = options;

            // set defaults
            const def = (length === 0 || !length || typeof length === 'undefined') ? 4 : length;
            const nParens = (parens === null) ? true : parens;
            const nEllipsis = (ellipsis === null) ? true : ellipsis;

            let template = pure.helpers.repeatString({ string: '#', num: def });

            // prefix with ellipsis
            template = (nEllipsis) ? ['...', template].join('') : template;

            template = (nParens) ? ['(', template, ')'].join('') : template;

            // generate random numbers
            template = pure.helpers.replaceSymbolWithNumber({ string: template });

            return template;
        };

        /**
         * amount
         *
         * @description Return random amount value
         * @param {object} [options= {}] Options to be passed
         * @param {Number} [options.min= 0] Minimum amount value
         * @param {Number} [options.max= 1000] Maximum amount value
         * @param {Number} [options.dec= 2] Floating point precision
         * @param {string} [options.symbol= empty] Amount symbol
         * @method pure.finance.amount
         * @example
         * console.log(pure.finance.amount());
         * //outputs: "891.45"
         */
        this.amount = (options = {}) => {
            const {
                min = 0,
                max = 1000,
                dec = 2,
                symbol = '',
            } = options;
            const randValue = pure.random.number({ max, min, precision: dec });

            return symbol + randValue.toFixed(dec);
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
        this.transactionType = () => pure.random.arrayElement(pure.registeredModules.finance.transaction_type);

        /**
         * currencyCode
         *
         * @description Return random currency code
         * @method pure.finance.currencyCode
         * @example
         * console.log(pure.finance.currencyCode());
         * //outputs: "OMR"
         */
        this.currencyCode = () => pure.random.objectElement(pure.registeredModules.finance.currency).code;

        /**
         * currencyName
         *
         * @description Return random currency name
         * @method pure.finance.currencyName
         * @example
         * console.log(pure.finance.currencyName());
         * //outputs: "US Dollar"
         */
        this.currencyName = () => pure.random.objectElement(pure.registeredModules.finance.currency, 'key');

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
                symbol = pure.random.objectElement(pure.registeredModules.finance.currency).symbol;
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
            const alphanum = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'.split('');
            let address = pure.random.arrayElement(['1', '3']);

            for (let i = 0; i < addressLength - 1; i += 1) {
                address += pure.random.arrayElement(alphanum);
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
            const alphanum = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'.split('');
            let address = pure.random.arrayElement(['L', 'M', '3']);

            for (let i = 0; i < addressLength; i += 1) {
                address += pure.random.arrayElement(alphanum);
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
            const localeFormat = pure.registeredModules.finance.credit_card;
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
            return pure.helpers.replaceCreditCardSymbols({ string: format });
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
        this.creditCardCVV = () => pure.helpers.replaceSymbolWithNumber({ string: '###' });

        /**
         * ethereumAddress
         *
         * @description Return random ethereum address
         * @method  pure.finance.ethereumAddress
         * @example
         * console.log(pure.finance.ethereumAddress());
         * //outputs: "0x43ea6bb9a79e2e12c18dd0f2d8ff08fd205cf97c"
         */
        this.ethereumAddress = () => `0x${pure.random.hexaDecimal(40).toLowerCase()}`;

        /**
         * iban
         *
         * @description Return random International Bank Account Number
         * @param {object} [options= {}] Options to be passed
         * @param {boolean} [options.formatted= false] If output is formatted or not
         * @param {string} [options.country= Random country] Alpha-2 country code
         * @method pure.finance.iban
         * @example
         * console.log(pure.finance.iban());
         * //outputs: "FI2750016855791009"
         */
        this.iban = (options = {}) => {
            const { formatted = false, country } = options;
            let ibanFormat;

            if (typeof country === 'undefined') {
                ibanFormat = pure.random.arrayElement(pure.registeredModules.iban.formats);
            } else {
                const form = (format) => {
                    let res;
                    if (format.country === country.toUpperCase()) {
                        res = format;
                    }
                    return res;
                };
                const res = pure.registeredModules.iban.formats.filter(form);
                [ibanFormat] = res;

                if (!ibanFormat) {
                    ibanFormat = pure.random.arrayElement(pure.registeredModules.iban.formats);
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
                        s += pure.random.alpha().toUpperCase();
                    } else if (bban.type === 'c') {
                        if (pure.random.number(100) < 80) {
                            s += pure.random.number(9);
                        } else {
                            s += pure.random.alpha().toUpperCase();
                        }
                    } else if (c >= 3 && pure.random.number(100) < 30) {
                        if (pure.random.boolean()) {
                            s += `00${pure.random.number(9)}`;
                            c -= 2;
                        } else {
                            s += `0${pure.random.number(9)}`;
                            c -= 1;
                        }
                    } else {
                        s += pure.random.number(9);
                    }
                    c -= 1;
                }
                s = s.substring(0, count);
            }

            let checksum = 98 - pure.helpers.mod97(pure.helpers.toDigitString(`${s + ibanFormat.country}00`));

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
                verification1 = pure.helpers.replaceSymbols(`?${pure.random.arrayElement(vowels)}?`);
            } else if (prob < 40) {
                verification1 = pure.helpers.replaceSymbols('###');
            }
            return `${pure.helpers.replaceSymbols('???')
                + pure.random.arrayElement(vowels)
                + pure.random.arrayElement(pure.registeredModules.iban.countryCode)
                + pure.helpers.replaceSymbols('?')}1${verification1}`;
        };
    }
}

module.exports = Finance;
