class Finance {
    constructor(pure) {
        this.account = (length) => {
            const def = length || 8;
            const template = pure.helpers.repeatString({ string: '#', num: def });

            return pure.helpers.replaceSymbolWithNumber({ string: template });
        };

        this.accountName = () => {
            const result = pure.random.arrayElement(pure.registeredModules.finance.account_type);
            return [result, 'Account'].join(' ');
        };

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

        this.mask = (options) => {
            const opt = options || {};
            const { length, parens, ellipsis } = opt;

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

        // TODO: rename dec param as precision
        this.amount = (options) => {
            const def = options || {};
            const {
                min = 0,
                max = 1000,
                dec = 2,
                symbol = '',
            } = def;
            const randValue = pure.random.number({ max, min, precision: dec });

            return symbol + randValue.toFixed(dec);
        };

        this.transactionType = () => pure.random.arrayElement(pure.registeredModules.finance.transaction_type);

        this.currencyCode = () => pure.random.objectElement(pure.registeredModules.finance.currency).code;

        this.currencyName = () => pure.random.objectElement(pure.registeredModules.finance.currency, 'key');

        this.currencySymbol = () => {
            let symbol;

            while (!symbol) {
                symbol = pure.random.objectElement(pure.registeredModules.finance.currency).symbol;
            }

            return symbol;
        };

        this.bitcoinAddress = () => {
            const addressLength = pure.random.number({ min: 25, max: 34 });
            const alphanum = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'.split('');
            let address = pure.random.arrayElement(['1', '3']);

            for (let i = 0; i < addressLength - 1; i += 1) {
                address += pure.random.arrayElement(alphanum);
            }

            return address;
        };

        this.litecoinAddress = () => {
            const addressLength = pure.random.number({ min: 26, max: 33 });
            const alphanum = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'.split('');
            let address = pure.random.arrayElement(['L', 'M', '3']);

            for (let i = 0; i < addressLength; i += 1) {
                address += pure.random.arrayElement(alphanum);
            }

            return address;
        };

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

        this.creditCardCVV = () => pure.helpers.replaceSymbolWithNumber({ string: '###' });

        this.ethereumAddress = () => `0x${pure.random.hexaDecimal(40).toLowerCase()}`;

        this.iban = (options) => {
            const def = options || {};
            const { formatted = false, country } = def;
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
