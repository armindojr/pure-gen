const { assert, expect } = require('chai');
const sinon = require('sinon');
const pure = require('../index');
const luhnFormula = require('./support/luhnCheck.js');

describe('finance.js', () => {
    describe('account()', () => {
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

    describe('mask()', () => {
        it('should set a default length', () => {
            // default account mask length
            const expected = 4;

            const mask = pure.finance.mask({ length: null });

            const actual = mask.length;

            assert.equal(actual, expected, `The expected default mask length is ${expected} but it was ${actual}`);
        });

        it('should set a specified length', () => {
            let expected = pure.random.number(20);

            expected = (expected === 0 || !expected || typeof expected === 'undefined') ? 4 : expected;

            const mask = pure.finance.mask({ length: expected });

            // picks 4 if the random number generator picks 0
            const actual = mask.length;

            assert.equal(actual, expected, `The expected default mask length is ${expected} but it was ${actual}`);
        });

        it('should set a default length of 4 for a zero value', () => {
            const expected = 4;

            const mask = pure.finance.mask({ length: 0 });
            // picks 4 if the random number generator picks 0
            const actual = mask.length;

            assert.equal(actual, expected, `The expected default mask length is ${expected} but it was ${actual}`);
        });

        it('should by default include parentheses around a partial account number', () => {
            const expected = true;

            const mask = pure.finance.mask({ length: null, parens: null });

            const regexp = new RegExp(/(\(\d{4}?\))/);
            const actual = regexp.test(mask);

            assert.equal(actual, expected, `The expected match for parentheses is ${expected} but it was ${actual}`);
        });

        it('should by default include an ellipsis', () => {
            const expected = true;

            const mask = pure.finance.mask({ length: null, ellipsis: null });

            const regexp = new RegExp(/(\.\.\.\d{4})/);
            const actual = regexp.test(mask);

            assert.equal(actual, expected, `The expected match for parentheses is ${expected} but it was ${actual}`);
        });
    });

    describe('amount()', () => {
        it('should use the default amounts when not passing arguments', () => {
            const amount = pure.finance.amount();

            assert.ok(amount);
            assert.equal((amount > 0), true, 'the amount should be greater than 0');
            assert.equal((amount < 1001), true, 'the amount should be greater than 0');
        });

        it('should use the default decimal location when not passing arguments', () => {
            const amount = pure.finance.amount({ min: 100, max: 100 });

            assert.ok(amount);
            assert.strictEqual(amount, '100.00', 'the amount should be equal 100.00');
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
            const amount = pure.finance.amount({ min: -200, max: -1 });

            assert.ok(amount);
            assert.equal((amount < 0), true, 'the amount should be greater than 0');
            assert.equal((amount > -201), true, 'the amount should be greater than 0');
        });

        it('it should handle argument dec', () => {
            const amount = pure.finance.amount({ min: 100, max: 100, dec: 1 });

            assert.ok(amount);
            assert.equal(amount.length, 5);
        });

        it('it should handle argument dec = 0', () => {
            const amount = pure.finance.amount({ min: 100, max: 100, dec: 0 });

            assert.ok(amount);
            assert.strictEqual(amount, '100', 'the amount should be equal 100');
        });

        it('it should return a string', () => {
            const amount = pure.finance.amount({ min: 100, max: 100, dec: 0 });

            const typeOfAmount = typeof amount;

            assert.ok(amount);
            assert.strictEqual(typeOfAmount, 'string', 'the amount type should be number');
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

    describe('currencySymbol()', () => {
        it('return random currency symbol', () => {
            const symbol = pure.finance.currencySymbol();

            assert.ok(symbol);
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
        it('returns a valid credit card number when locale credit_card provider has only one string', () => {
            const stub = sinon.stub(pure.registeredModules, 'finance').get(() => ({
                credit_card: {
                    visa: '4###########L',
                },
            }));
            const number = pure.finance.creditCardNumber();
            assert.ok(number.length >= 13 && number.length <= 20);
            stub.restore();
        });
        it('returns a valid credit card number when locale credit_card has one string', () => {
            const stub = sinon.stub(pure.registeredModules, 'finance').get(() => ({
                credit_card: '4###########L',
            }));
            const number = pure.finance.creditCardNumber();
            assert.ok(number.length >= 13 && number.length <= 20);
            stub.restore();
        });
        it('returns a valid credit card number when locale credit_card provider has only one string '
        + 'and provider is passed as parameter', () => {
            const stub = sinon.stub(pure.registeredModules, 'finance').get(() => ({
                credit_card: {
                    visa: '4###########L',
                },
            }));
            const number = pure.finance.creditCardNumber('visa');
            assert.ok(number.length >= 13 && number.length <= 20);
            stub.restore();
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

            assert.equal(pure.helpers.mod97(pure.helpers.toDigitString(bban)), 1, 'the result should be equal to 1');
        });

        it('returns a random yet formally correct IBAN number for specific country', () => {
            const iban = pure.finance.iban({ formatted: false, country: 'DE' });
            const bban = iban.substring(4) + iban.substring(0, 4);

            assert.equal(pure.helpers.mod97(pure.helpers.toDigitString(bban)), 1, 'the result should be equal to 1');
            assert.equal(iban.substring(0, 2), 'DE', 'iban should contain country code');
        });

        it('returns a random and formatted correct IBAN number for specific country', () => {
            const iban = pure.finance.iban({ formatted: true, country: 'DE' });

            const result = iban.split(' ');
            assert.equal(result.length, 6);
            assert.equal(iban.substring(0, 2), 'DE', 'iban should contain country code');
        });

        it('returns a random and formatted correct IBAN number when country don\'t exists', () => {
            const iban = pure.finance.iban({ formatted: true, country: 'QQ' });

            expect(iban.length).greaterThan(15);
        });

        it('returns a correct IBAN number when checksum < 10', () => {
            sinon.stub(pure.helpers, 'mod97').returns(90);
            const iban = pure.finance.iban();

            assert.equal(iban.substring(2, 4), 8, 'the result should be equal to 1');
            pure.helpers.mod97.restore();
        });

        it('returns a correct IBAN number when ibanLib.formats.type is a', () => {
            const stub = sinon.stub(pure.registeredModules, 'iban').get(() => ({
                formats: [
                    {
                        country: 'VG',
                        total: 24,
                        bban: [{ type: 'a', count: 4 }],
                        format: 'VGkk bbbb cccc cccc cccc cccc',
                    },
                ],
            }));

            const iban = pure.finance.iban();
            const bban = iban.substring(4) + iban.substring(0, 4);

            assert.equal(pure.helpers.mod97(pure.helpers.toDigitString(bban)), 1, 'the result should be equal to 1');
            stub.restore();
        });

        it('returns a correct IBAN given specific conditions', () => {
            sinon.stub(pure.random, 'number').returns(20);
            sinon.stub(pure.random, 'boolean').returns(true);

            const stub = sinon.stub(pure.registeredModules, 'iban').get(() => ({
                formats: [
                    {
                        country: 'VG',
                        total: 24,
                        bban: [{ type: 'g', count: 4 }],
                        format: 'VGkk bbbb cccc cccc cccc cccc',
                    },
                ],
            }));

            const iban = pure.finance.iban({ formatted: false, country: 'VG' });
            const bban = iban.substring(4) + iban.substring(0, 4);

            assert.equal(pure.helpers.mod97(pure.helpers.toDigitString(bban)), 1, 'the result should be equal to 1');

            pure.random.number.restore();
            pure.random.boolean.restore();
            stub.restore();
        });
    });

    describe('bic()', () => {
        it('returns a random yet formally correct BIC number', () => {
            const bic = pure.finance.bic();
            const exp = `^[A-Z]{4}(${pure.registeredModules.iban.countryCode.join('|')})[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3})?$`;
            const reg = new RegExp(exp, 'i');

            assert.ok(bic.match(reg));
        });
        it('returns correct BIC number when random number < 10', () => {
            sinon.stub(pure.random, 'number').returns(3);
            const bic = pure.finance.bic();
            const exp = `^[A-Z]{4}(${pure.registeredModules.iban.countryCode.join('|')})[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3})?$`;
            const reg = new RegExp(exp, 'i');

            assert.ok(bic.match(reg));
            pure.random.number.restore();
        });
        it('returns correct BIC number when random number < 40', () => {
            sinon.stub(pure.random, 'number').returns(15);
            sinon.stub(pure.random, 'arrayElement').returns('E');
            const bic = pure.finance.bic();

            assert.equal(bic.length, 13);
            pure.random.number.restore();
            pure.random.arrayElement.restore();
        });
    });
});
