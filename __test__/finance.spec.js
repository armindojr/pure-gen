const { assert, expect } = require('chai');
const pure = require('../index');
const luhnFormula = require('./support/luhnCheck.js');
const ibanLib = require('../lib/iban');

describe('finance.js', () => {
    describe('account( length )', () => {
        it('should supply a default length if no length is passed', () => {
            const account = pure.finance.account();

            const expected = 8;
            const actual = account.length;

            assert.equal(actual, expected, `The expected default account length is ${expected} but it was ${actual}`);
        });

        it('should supply a length if a length is passed', () => {
            const expected = 9;

            const account = pure.finance.account(expected);

            const actual = account.length;

            assert.equal(actual, expected, `The expected default account length is ${expected} but it was ${actual}`);
        });

        it('should supply a default length if a zero is passed', () => {
            const expected = 8;

            const account = pure.finance.account(0);

            const actual = account.length;

            assert.equal(actual, expected, `The expected default account length is ${expected} but it was ${actual}`);
        });
    });

    describe('accountName()', () => {
        it('should return an account name', () => {
            const actual = pure.finance.accountName();

            assert.ok(actual);
        });
    });

    describe('routingNumber()', () => {
        it('should return a routing number', () => {
            const actual = pure.finance.routingNumber();

            assert.ok(actual);
        });
    });

    describe('mask( length, parens, ellipsis )', () => {
        it('should set a default length', () => {
            // default account mask length
            const expected = 4;

            const mask = pure.finance.mask(null, false, false);

            const actual = mask.length;

            assert.equal(actual, expected, `The expected default mask length is ${expected} but it was ${actual}`);
        });

        it('should set a specified length', () => {
            let expected = pure.random.number(20);

            expected = (expected === 0 || !expected || typeof expected === 'undefined') ? 4 : expected;

            const mask = pure.finance.mask(expected, false, false);

            // picks 4 if the random number generator picks 0
            const actual = mask.length;

            assert.equal(actual, expected, `The expected default mask length is ${expected} but it was ${actual}`);
        });

        it('should set a default length of 4 for a zero value', () => {
            const expected = 4;

            const mask = pure.finance.mask(0, false, false);
            // picks 4 if the random number generator picks 0
            const actual = mask.length;

            assert.equal(actual, expected, `The expected default mask length is ${expected} but it was ${actual}`);
        });


        it('should by default include parentheses around a partial account number', () => {
            const expected = true;

            const mask = pure.finance.mask(null, null, false);

            const regexp = new RegExp(/(\(\d{4}?\))/);
            const actual = regexp.test(mask);

            assert.equal(actual, expected, `The expected match for parentheses is ${expected} but it was ${actual}`);
        });

        it('should by default include an ellipsis', () => {
            const expected = true;

            const mask = pure.finance.mask(null, false, null);

            const regexp = new RegExp(/(\.\.\.\d{4})/);
            const actual = regexp.test(mask);

            assert.equal(actual, expected, `The expected match for parentheses is ${expected} but it was ${actual}`);
        });

        it('should work when random variables are passed into the arguments', () => {
            const length = pure.random.number(20);
            const ellipsis = (length % 2 === 0);
            const parens = !ellipsis;

            const mask = pure.finance.mask(length, ellipsis, parens);
            assert.ok(mask);
        });
    });

    describe('amount(min, max, dec, symbol)', () => {
        it('should use the default amounts when not passing arguments', () => {
            const amount = pure.finance.amount();

            assert.ok(amount);
            assert.equal((amount > 0), true, 'the amount should be greater than 0');
            assert.equal((amount < 1001), true, 'the amount should be greater than 0');
        });

        it('should use the defaul decimal location when not passing arguments', () => {
            const amount = pure.finance.amount();

            const decimal = '.';
            const expected = amount.length - 3;
            const actual = amount.indexOf(decimal);

            assert.equal(actual, expected,
                `The expected location of the decimal is ${expected} but it was ${actual} amount ${amount}`);
        });

        // TODO: add support for more currency and decimal options
        it('should not include a currency symbol by default', () => {
            const amount = pure.finance.amount();

            const regexp = new RegExp(/[0-9.]/);

            const expected = true;
            const actual = regexp.test(amount);

            assert.equal(actual, expected, 'The expected match should not include a currency symbol');
        });


        it('it should handle negative amounts', () => {
            const amount = pure.finance.amount(-200, -1);

            assert.ok(amount);
            assert.equal((amount < 0), true, 'the amount should be greater than 0');
            assert.equal((amount > -201), true, 'the amount should be greater than 0');
        });


        it('it should handle argument dec', () => {
            const amount = pure.finance.amount(100, 100, 1);

            assert.ok(amount);
            assert.strictEqual(amount, '100.0', 'the amount should be equal 100.0');
        });

        it('it should handle argument dec = 0', () => {
            const amount = pure.finance.amount(100, 100, 0);

            assert.ok(amount);
            assert.strictEqual(amount, '100', 'the amount should be equal 100');
        });
    });

    describe('transactionType()', () => {
        it('should return a random transaction type', () => {
            const transactionType = pure.finance.transactionType();

            assert.ok(transactionType);
        });
    });

    describe('currencyCode()', () => {
        it('returns a random currency code with a format', () => {
            const currencyCode = pure.finance.currencyCode();

            assert.ok(currencyCode.match(/[A-Z]{3}/));
        });
    });

    describe('bitcoinAddress()', () => {
        it('returns a random bitcoin address', () => {
            const bitcoinAddress = pure.finance.bitcoinAddress();

            /**
             *  Note: Although the total length of a Bitcoin address can be 25-33 characters,
             *  regex quantifiers only check the proceding token
             *  Therefore we take one from the total length of the address not
             *  including the first character ([13])
             */

            assert.ok(bitcoinAddress.match(/^[13][a-km-zA-HJ-NP-Z1-9]{24,33}$/));
        });
    });

    describe('ethereumAddress()', () => {
        it('returns a random ethereum address', () => {
            const ethereumAddress = pure.finance.ethereumAddress();
            assert.ok(ethereumAddress.match(/^(0x)[0-9a-f]{40}$/));
        });
    });

    describe('litecoinAddress()', () => {
        it('returns a random litecoin address', () => {
            const litecoinAddress = pure.finance.litecoinAddress();
            assert.ok(litecoinAddress.match(/^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$/));
        });
    });

    describe('creditCardNumber()', () => {
        it('returns a random credit card number', () => {
            let number = pure.finance.creditCardNumber();
            number = number.replace(/\D/g, '');
            assert.ok(number.length >= 13 && number.length <= 20);
            assert.ok(number.match(/^[0-9]{13,20}$/));
            assert.ok(luhnFormula(number));
        });
        it('returns a valid credit card number', () => {
            assert.ok(luhnFormula(pure.finance.creditCardNumber('')));
            assert.ok(luhnFormula(pure.finance.creditCardNumber()));
            assert.ok(luhnFormula(pure.finance.creditCardNumber()));
            assert.ok(luhnFormula(pure.finance.creditCardNumber('visa')));
            assert.ok(luhnFormula(pure.finance.creditCardNumber('mastercard')));
            assert.ok(luhnFormula(pure.finance.creditCardNumber('discover')));
            assert.ok(luhnFormula(pure.finance.creditCardNumber()));
            assert.ok(luhnFormula(pure.finance.creditCardNumber()));
        });
        it('returns a correct credit card number when issuer provided', () => {
        // TODO: implement checks for each format with regexp
            const visa = pure.finance.creditCardNumber('visa');
            assert.ok(visa.match(/^4(([0-9]){12}|([0-9]){3}(-([0-9]){4}){3})$/));
            assert.ok(luhnFormula(visa));


            const mastercard = pure.finance.creditCardNumber('mastercard');
            assert.ok(mastercard.match(/^(5[1-5]\d{2}|6771)(-\d{4}){3}$/));
            assert.ok(luhnFormula(mastercard));

            const discover = pure.finance.creditCardNumber('discover');

            assert.ok(luhnFormula(discover));

            const americanExpress = pure.finance.creditCardNumber('american_express');
            assert.ok(luhnFormula(americanExpress));
            const dinersClub = pure.finance.creditCardNumber('diners_club');
            assert.ok(luhnFormula(dinersClub));
            const jcb = pure.finance.creditCardNumber('jcb');
            assert.ok(luhnFormula(jcb));
            const switchC = pure.finance.creditCardNumber('mastercard');
            assert.ok(luhnFormula(switchC));
            const solo = pure.finance.creditCardNumber('solo');
            assert.ok(luhnFormula(solo));
            const maestro = pure.finance.creditCardNumber('maestro');
            assert.ok(luhnFormula(maestro));
            const laser = pure.finance.creditCardNumber('laser');
            assert.ok(luhnFormula(laser));
            const instapayment = pure.finance.creditCardNumber('instapayment');
            assert.ok(luhnFormula(instapayment));
        });
        it('returns custom formated strings', () => {
            let number = pure.finance.creditCardNumber('###-###-##L');
            assert.ok(number.match(/^\d{3}-\d{3}-\d{3}$/));
            assert.ok(luhnFormula(number));
            number = pure.finance.creditCardNumber('234[5-9]#{999}L');
            assert.ok(number.match(/^234[5-9]\d{1000}$/));
            assert.ok(luhnFormula(number));
        });
    });

    describe('creditCardCVV()', () => {
        it('returns a random credit card CVV', () => {
            const cvv = pure.finance.creditCardCVV();
            assert.ok(cvv.length === 3);
            assert.ok(cvv.match(/^[0-9]{3}$/));
        });
    });

    describe('iban()', () => {
        it('returns a random yet formally correct IBAN number', () => {
            const iban = pure.finance.iban();
            const bban = iban.substring(4) + iban.substring(0, 4);

            assert.equal(ibanLib.mod97(ibanLib.toDigitString(bban)), 1, 'the result should be equal to 1');
        });

        it('returns a random yet formally correct IBAN number for specific country', () => {
            const iban = pure.finance.iban(false, 'DE');
            const bban = iban.substring(4) + iban.substring(0, 4);

            assert.equal(ibanLib.mod97(ibanLib.toDigitString(bban)), 1, 'the result should be equal to 1');
            assert.equal(iban.substring(0, 2), 'DE', 'iban should contain country code');
        });

        it('returns a random and formatted correct IBAN number for specific country', () => {
            const iban = pure.finance.iban(true, 'DE');

            const result = iban.split(' ');
            assert.equal(result.length, 6);
            assert.equal(iban.substring(0, 2), 'DE', 'iban should contain country code');
        });

        it('returns a random and formatted correct IBAN number when country don\'t exists', () => {
            const iban = pure.finance.iban(true, 'QQ');

            expect(iban.length).greaterThan(15);
        });
    });

    describe('bic()', () => {
        it('returns a random yet formally correct BIC number', () => {
            const bic = pure.finance.bic();
            const expr = new RegExp(`^[A-Z]{4}(${ibanLib.iso3166.join('|')})[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3})?$`, 'i');

            assert.ok(bic.match(expr));
        });
    });
});
