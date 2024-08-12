import sinon from 'sinon';
import pure from '../index.js';
import luhnFormula from './support/luhnCheck';

describe('finance.js', () => {
  describe('account()', () => {
    it('should supply a default length if no length is passed', () => {
      const account = pure.finance.account();
      const expected = 8;
      const actual = account.length;

      expect(actual).toEqual(expected);
    });

    it('should supply a length if a length is passed', () => {
      const expected = 9;
      const account = pure.finance.account(expected);
      const actual = account.length;

      expect(actual).toEqual(expected);
    });

    it('should supply a default length if a zero is passed', () => {
      const expected = 8;
      const account = pure.finance.account(0);
      const actual = account.length;

      expect(actual).toEqual(expected);
    });
  });

  describe('accountName()', () => {
    it('should return an account name', () => {
      const actual = pure.finance.accountName();

      expect(actual).toBeDefined();
    });
  });

  describe('routingNumber()', () => {
    it('should return a routing number', () => {
      const actual = pure.finance.routingNumber();

      expect(actual).toBeDefined();
    });
  });

  describe('mask()', () => {
    it('sould return value even when no parameter is required', () => {
      const expected = 4;
      const mask = pure.finance.mask();
      const actual = mask.length;

      expect(actual).toEqual(expected);
    });

    it('should set a default length', () => {
      const expected = 4;
      const mask = pure.finance.mask({ length: null });
      const actual = mask.length;

      expect(actual).toEqual(expected);
    });

    it('should set a specified length', () => {
      let expected = pure.random.number(20);

      expected = expected === 0 || !expected || typeof expected === 'undefined' ? 4 : expected;

      const mask = pure.finance.mask({ length: expected });
      const actual = mask.length;

      expect(actual).toEqual(expected);
    });

    it('should set a default length of 4 for a zero value', () => {
      const expected = 4;
      const mask = pure.finance.mask({ length: 0 });
      const actual = mask.length;

      expect(actual).toEqual(expected);
    });

    it('should by default include parentheses around a partial account number', () => {
      const expected = true;
      const mask = pure.finance.mask({ length: null, parens: null });
      const regexp = /(\(\d{4}?\))/;
      const actual = regexp.test(mask);

      expect(actual).toEqual(expected);
    });

    it('should by default include an ellipsis', () => {
      const expected = true;
      const mask = pure.finance.mask({ length: null, ellipsis: null });
      const regexp = /(\.\.\.\d{4})/;
      const actual = regexp.test(mask);

      expect(actual).toEqual(expected);
    });
  });

  describe('amount()', () => {
    it('should use the default amounts when not passing arguments', () => {
      const amount = pure.finance.amount();

      expect(amount).toBeDefined();
      expect(parseInt(amount, 10)).toBeGreaterThan(0);
      expect(parseInt(amount, 10)).toBeLessThan(1001);
    });

    it('should use the default decimal location when not passing arguments', () => {
      const amount = pure.finance.amount({ min: 100, max: 100 });

      expect(amount).toBeDefined();
      expect(amount).toEqual('100.00');
    });

    it('should not include a currency symbol by default', () => {
      const amount = pure.finance.amount();
      const actual = /[0-9.]/.test(amount);

      expect(actual).toEqual(true);
    });

    it('should handle negative amounts', () => {
      const amount = pure.finance.amount({ min: -200, max: -1 });

      expect(amount).toBeDefined();
      expect(parseInt(amount, 10)).toBeLessThan(0);
      expect(parseInt(amount, 10)).toBeGreaterThan(-201);
    });

    it('should handle argument dec', () => {
      const amount = pure.finance.amount({ min: 100, max: 100, dec: 1 });

      expect(amount).toBeDefined();
      expect(amount.length).toEqual(5);
    });

    it('should handle argument dec = 0', () => {
      const amount = pure.finance.amount({ min: 100, max: 100, dec: 0 });

      expect(amount).toBeDefined();
      expect(amount).toEqual('100');
    });

    it('should return a string', () => {
      const amount = pure.finance.amount({ min: 100, max: 100, dec: 0 });

      expect(amount).toBeDefined();
      expect(typeof amount).toBe('string');
    });
  });

  describe('transactionType()', () => {
    it('should return a random transaction type', () => {
      const transactionType = pure.finance.transactionType();

      expect(transactionType).toBeDefined();
    });
  });

  describe('currencyCode()', () => {
    it('returns a random currency code with a format', () => {
      const currencyCode = pure.finance.currencyCode();

      expect(/[A-Z]{3}/.test(currencyCode)).toEqual(true);
    });
  });

  describe('currencySymbol()', () => {
    it('return random currency symbol', () => {
      const symbol = pure.finance.currencySymbol();

      expect(symbol).toBeDefined();
    });
  });

  describe('currencyName()', () => {
    it('return random currency name', () => {
      const name = pure.finance.currencyName();

      expect(name).toBeDefined();
    });
  });

  describe('bitcoinAddress()', () => {
    it('returns a random bitcoin address', () => {
      const bitcoinAddress = pure.finance.bitcoinAddress();
      const regex = /^[13][a-km-zA-HJ-NP-Z1-9]{24,33}$/;

      /**
       *  Note: Although the total length of a Bitcoin address can be 25-33 characters,
       *  regex quantifiers only check the proceding token
       *  Therefore we take one from the total length of the address not
       *  including the first character ([13])
       */

      expect(regex.test(bitcoinAddress)).toEqual(true);
    });
  });

  describe('ethereumAddress()', () => {
    it('returns a random ethereum address', () => {
      const ethereumAddress = pure.finance.ethereumAddress();
      const regex = /^(0x)[0-9a-f]{40}$/;

      expect(regex.test(ethereumAddress)).toEqual(true);
    });
  });

  describe('litecoinAddress()', () => {
    it('returns a random litecoin address', () => {
      const litecoinAddress = pure.finance.litecoinAddress();
      const regex = /^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$/;

      expect(regex.test(litecoinAddress)).toEqual(true);
    });
  });

  describe('creditCardNumber()', () => {
    it('returns a random credit card number', () => {
      let number = pure.finance.creditCardNumber();
      number = number.replace(/\D/g, '');
      const regex = /^[0-9]{13,20}$/;

      expect(number.length).toBeGreaterThanOrEqual(13);
      expect(number.length).toBeLessThanOrEqual(20);
      expect(regex.test(number)).toEqual(true);
      expect(luhnFormula(number)).toEqual(true);
    });

    it('returns a valid credit card number', () => {
      expect(luhnFormula(pure.finance.creditCardNumber(''))).toEqual(true);
      expect(luhnFormula(pure.finance.creditCardNumber())).toEqual(true);
      expect(luhnFormula(pure.finance.creditCardNumber())).toEqual(true);
      expect(luhnFormula(pure.finance.creditCardNumber('visa'))).toEqual(true);
      expect(luhnFormula(pure.finance.creditCardNumber('mastercard'))).toEqual(true);
      expect(luhnFormula(pure.finance.creditCardNumber('discover'))).toEqual(true);
      expect(luhnFormula(pure.finance.creditCardNumber())).toEqual(true);
      expect(luhnFormula(pure.finance.creditCardNumber())).toEqual(true);
    });

    it('returns a correct credit card number when issuer provided', () => {
      // TODO: implement checks for each format with regexp
      const visa = pure.finance.creditCardNumber('visa');
      const mastercard = pure.finance.creditCardNumber('mastercard');
      const discover = pure.finance.creditCardNumber('discover');
      const americanExpress = pure.finance.creditCardNumber('american express');
      const dinersClub = pure.finance.creditCardNumber('diners club');
      const jcb = pure.finance.creditCardNumber('jcb');
      const switchC = pure.finance.creditCardNumber('mastercard');
      const solo = pure.finance.creditCardNumber('solo');
      const maestro = pure.finance.creditCardNumber('maestro');
      const laser = pure.finance.creditCardNumber('laser');
      const instapayment = pure.finance.creditCardNumber('instapayment');

      expect(/^4(([0-9]){12}|([0-9]){3}(-([0-9]){4}){3})$/.test(visa)).toEqual(true);
      expect(luhnFormula(visa)).toEqual(true);
      expect(/^(5[1-5]\d{2}|6771)(-\d{4}){3}$/.test(mastercard)).toEqual(true);
      expect(luhnFormula(mastercard)).toEqual(true);
      expect(luhnFormula(discover)).toEqual(true);
      expect(luhnFormula(americanExpress)).toEqual(true);
      expect(luhnFormula(dinersClub)).toEqual(true);
      expect(luhnFormula(jcb)).toEqual(true);
      expect(luhnFormula(switchC)).toEqual(true);
      expect(luhnFormula(solo)).toEqual(true);
      expect(luhnFormula(maestro)).toEqual(true);
      expect(luhnFormula(laser)).toEqual(true);
      expect(luhnFormula(instapayment)).toEqual(true);
    });

    it('returns custom formated strings', () => {
      const number = pure.finance.creditCardNumber('###-###-##L');
      const number2 = pure.finance.creditCardNumber('234[5-9]#{999}L');

      expect(/^\d{3}-\d{3}-\d{3}$/.test(number)).toEqual(true);
      expect(luhnFormula(number)).toEqual(true);
      expect(/^234[5-9]\d{1000}$/.test(number2)).toEqual(true);
      expect(luhnFormula(number2)).toEqual(true);
    });

    it('returns a valid credit card number when locale creditCard provider has only one string', () => {
      const stub = sinon.stub(pure.registeredModules, 'finance').get(() => ({
        creditCard: {
          visa: '4###########L'
        }
      }));
      const number = pure.finance.creditCardNumber();

      expect(number.length).toBeGreaterThanOrEqual(13);
      expect(number.length).toBeLessThanOrEqual(20);

      stub.restore();
    });

    it('returns a valid credit card number when locale creditCard has one string', () => {
      const stub = sinon.stub(pure.registeredModules, 'finance').get(() => ({
        creditCard: '4###########L'
      }));
      const number = pure.finance.creditCardNumber();

      expect(number.length).toBeGreaterThanOrEqual(13);
      expect(number.length).toBeLessThanOrEqual(20);

      stub.restore();
    });

    it(
      'returns a valid credit card number when locale creditCard provider has only one string ' +
        'and provider is passed as parameter',
      () => {
        const stub = sinon.stub(pure.registeredModules, 'finance').get(() => ({
          creditCard: {
            visa: '4###########L'
          }
        }));
        const number = pure.finance.creditCardNumber('visa');

        expect(number.length).toBeGreaterThanOrEqual(13);
        expect(number.length).toBeLessThanOrEqual(20);

        stub.restore();
      }
    );
  });

  describe('creditCardCVV()', () => {
    it('returns a random credit card CVV', () => {
      const cvv = pure.finance.creditCardCVV();

      expect(cvv.length).toEqual(3);
      expect(/^[0-9]{3}$/.test(cvv)).toEqual(true);
    });
  });

  describe('iban()', () => {
    it('returns a random yet formally correct IBAN number', () => {
      const iban = pure.finance.iban();
      const bban = iban.substring(4) + iban.substring(0, 4);

      expect(pure.helpers.mod97(pure.helpers.toDigitString(bban))).toEqual(1);
    });

    it('returns a random yet formally correct IBAN number when country is AL', () => {
      const iban = pure.finance.iban('AL');
      const bban = iban.substring(4) + iban.substring(0, 4);

      expect(pure.helpers.mod97(pure.helpers.toDigitString(bban))).toEqual(1);
    });

    it('returns a random yet formally correct IBAN number for specific country', () => {
      const iban = pure.finance.iban({ formatted: false, country: 'DE' });
      const bban = iban.substring(4) + iban.substring(0, 4);

      expect(pure.helpers.mod97(pure.helpers.toDigitString(bban))).toEqual(1);
      expect(iban.substring(0, 2)).toEqual('DE');
    });

    it('returns a random and formatted correct IBAN number for specific country', () => {
      const iban = pure.finance.iban({ formatted: true, country: 'DE' });
      const result = iban.split(' ');

      expect(result.length).toEqual(6);
      expect(iban.substring(0, 2)).toEqual('DE');
    });

    it("returns a random and formatted correct IBAN number when country don't exists", () => {
      const iban = pure.finance.iban({ formatted: true, country: 'QQ' });

      expect(iban.length).toBeGreaterThan(15);
    });

    it('returns a correct IBAN number when checksum < 10', () => {
      sinon.stub(pure.helpers, 'mod97').returns(90);

      const iban = pure.finance.iban();

      expect(iban.substring(2, 4)).toEqual('08');

      pure.helpers.mod97.restore();
    });

    it('returns a correct IBAN number when ibanLib.formats.type is a', () => {
      const stub = sinon.stub(pure.registeredModules, 'iban').get(() => ({
        formats: [
          {
            country: 'VG',
            total: 24,
            bban: [{ type: 'a', count: 4 }],
            format: 'VGkk bbbb cccc cccc cccc cccc'
          }
        ]
      }));

      const iban = pure.finance.iban();
      const bban = iban.substring(4) + iban.substring(0, 4);

      expect(pure.helpers.mod97(pure.helpers.toDigitString(bban))).toEqual(1);

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
            format: 'VGkk bbbb cccc cccc cccc cccc'
          }
        ]
      }));

      const iban = pure.finance.iban({ formatted: false, country: 'VG' });
      const bban = iban.substring(4) + iban.substring(0, 4);

      expect(pure.helpers.mod97(pure.helpers.toDigitString(bban))).toEqual(1);

      pure.random.number.restore();
      pure.random.boolean.restore();
      stub.restore();
    });

    it('returns a correct IBAN when type A and number is less than 100', () => {
      sinon.stub(pure.random, 'number').returns(20);
      sinon.stub(pure.random, 'boolean').returns(true);

      const stub = sinon.stub(pure.registeredModules, 'iban').get(() => ({
        formats: [
          {
            country: 'VG',
            total: 24,
            bban: [{ type: 'a', count: 4 }],
            format: 'VGkk bbbb cccc cccc cccc cccc'
          }
        ]
      }));

      const iban = pure.finance.iban();
      const bban = iban.substring(4) + iban.substring(0, 4);

      expect(pure.helpers.mod97(pure.helpers.toDigitString(bban))).toEqual(1);

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

      expect(reg.test(bic)).toEqual(true);
    });

    it('returns correct BIC number when random number < 10', () => {
      sinon.stub(pure.random, 'number').returns(3);

      const bic = pure.finance.bic();
      const exp = `^[A-Z]{4}(${pure.registeredModules.iban.countryCode.join('|')})[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3})?$`;
      const reg = new RegExp(exp, 'i');

      expect(reg.test(bic)).toEqual(true);

      pure.random.number.restore();
    });

    it('returns correct BIC number when random number < 40', () => {
      sinon.stub(pure.random, 'number').returns(15);
      sinon.stub(pure.random, 'arrayElement').returns('E');

      const bic = pure.finance.bic();

      expect(bic.length).toEqual(13);

      pure.random.number.restore();
      pure.random.arrayElement.restore();
    });
  });
});
