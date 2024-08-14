import sinon from 'sinon';
import pure from '../src/index.js';
import luhnCheck from './support/luhnCheck';

describe('helpers.js', () => {
  describe('replaceSymbolWithNumber()', () => {
    describe('when no symbol passed in', () => {
      it("uses '#' by default", () => {
        const num = pure.helpers.replaceSymbolWithNumber({ string: '#AB' });

        expect(/\dAB/.test(num)).toEqual(true);
      });
    });

    describe('when no string passed in', () => {
      it('returns an empty string', () => {
        const num = pure.helpers.replaceSymbolWithNumber();

        expect(num).toEqual('');
      });
    });

    describe('when symbol passed in', () => {
      it('replaces that symbol with integers', () => {
        const num = pure.helpers.replaceSymbolWithNumber({ string: '#AB', symbol: 'A' });

        expect(/#\dB/.test(num)).toEqual(true);
      });
    });
  });

  describe('replaceSymbols()', () => {
    it('replace symbols on specific string', () => {
      const num = pure.helpers.replaceSymbols('#');
      const alpha = pure.helpers.replaceSymbols('?');
      const regexNum = /\d/;
      const regexAlpha = /[A-Z]/;

      expect(regexNum.test(num)).toEqual(true);
      expect(regexAlpha.test(alpha)).toEqual(true);
    });

    it('replaces it with alphanumeric', () => {
      const num = pure.helpers.replaceSymbols('*AB');

      expect(/\wAB/.test(num)).toEqual(true);
    });

    it('symbol is replaced with random number', () => {
      sinon.stub(pure.random, 'boolean').returns(false);

      const num = pure.helpers.replaceSymbols('*AB');

      expect(/\wAB/.test(num)).toEqual(true);

      pure.random.boolean.restore();
    });
  });

  describe('shuffle()', () => {
    it('the output is the same length as the input', () => {
      sinon.spy(pure.random, 'number');

      const shuffled = pure.helpers.shuffle(['a', 'b']);

      expect(shuffled.length).toEqual(2);
      expect(pure.random.number.calledWith(1)).toEqual(true);

      pure.random.number.restore();
    });

    it('empty array returns empty array', () => {
      const shuffled = pure.helpers.shuffle([]);

      expect(shuffled.length).toEqual(0);
    });

    it('empty parameter returns empty array', () => {
      const shuffled = pure.helpers.shuffle();

      expect(shuffled.length).toEqual(0);
    });

    it('mutates the input array in place', () => {
      const input = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      const shuffled = pure.helpers.shuffle(input);

      expect(shuffled).toEqual(input);
    });

    it('all items shuffled as expected when seeded', () => {
      const input = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      pure.seed(100);
      const shuffled = pure.helpers.shuffle(input);

      expect(shuffled).toEqual(['c', 'h', 'f', 'g', 'a', 'i', 'd', 'e', 'j', 'b']);

      pure.seed();
    });
  });

  describe('slugify()', () => {
    it('removes unwanted characters from URI string', () => {
      expect(pure.helpers.slugify('Aiden.Harªann')).toEqual('Aiden.Haraann');
      expect(pure.helpers.slugify("d'angelo.net")).toEqual('dangelo.net');
    });

    it('return empty string if passed one is empty too', () => {
      expect(pure.helpers.slugify()).toEqual('');
    });
  });

  describe('mustache()', () => {
    it('returns empty string with no arguments', () => {
      expect(pure.helpers.mustache()).toEqual('');
    });
  });

  describe('repeatString()', () => {
    it('repeat string with specific parameters', () => {
      expect(pure.helpers.repeatString({ string: 'a', num: '2' })).toEqual('aa');
    });
  });

  describe('createCard()', () => {
    it('returns an object', () => {
      const card = pure.helpers.createCard();

      expect(typeof card).toBe('object');
    });
  });

  describe('contextualCard()', () => {
    it('returns an object', () => {
      const card = pure.helpers.contextualCard();

      expect(typeof card).toBe('object');
    });
  });

  describe('userCard()', () => {
    it('returns an object', () => {
      const card = pure.helpers.userCard();

      expect(typeof card).toBe('object');
    });
  });

  describe('replaceCreditCardSymbols()', () => {
    it('returns a credit card number given a schema', () => {
      const number = pure.helpers.replaceCreditCardSymbols({ string: '6453-####-####-####-###L' });

      expect(/^6453-([0-9]){4}-([0-9]){4}-([0-9]){4}-([0-9]){4}$/.test(number)).toEqual(true);
      expect(luhnCheck(number)).toEqual(true);
    });

    it('returns only one digit if no string is passed', () => {
      const number = pure.helpers.replaceCreditCardSymbols();

      expect(number.length).toEqual(1);
    });

    it('supports different symbols', () => {
      const number = pure.helpers.replaceCreditCardSymbols({
        string: '6453-****-****-****-***L',
        symbol: '*'
      });

      expect(/^6453-([0-9]){4}-([0-9]){4}-([0-9]){4}-([0-9]){4}$/.test(number)).toEqual(true);
      expect(luhnCheck(number)).toEqual(true);
    });

    it('handles regexp style input', () => {
      const number = pure.helpers.replaceCreditCardSymbols({
        string: '6453-*{4}-*{4}-*{4}-*{3}L',
        symbol: '*'
      });
      const number2 = pure.helpers.replaceCreditCardSymbols({
        string: '645[5-9]-#{4,6}-#{1,2}-#{4,6}-#{3}L'
      });

      expect(/^6453-([0-9]){4}-([0-9]){4}-([0-9]){4}-([0-9]){4}$/.test(number)).toEqual(true);
      expect(luhnCheck(number)).toEqual(true);
      expect(/^645[5-9]-([0-9]){4,6}-([0-9]){1,2}-([0-9]){4,6}-([0-9]){4}$/.test(number2)).toEqual(
        true
      );
      expect(luhnCheck(number2)).toEqual(true);
    });
  });

  describe('regexpStyleStringParse()', () => {
    it('returns an empty string when called without param', () => {
      expect(pure.helpers.regexpStyleStringParse()).toEqual('');
    });

    it('deals with range repeat', () => {
      const string = pure.helpers.regexpStyleStringParse('#{5,10}');

      expect(string.length).toBeLessThanOrEqual(10);
      expect(string.length).toBeGreaterThanOrEqual(5);
      expect(/^#{5,10}$/.test(string)).toEqual(true);
    });

    it('flips the range when min > max', () => {
      const string = pure.helpers.regexpStyleStringParse('#{10,5}');

      expect(string.length).toBeLessThanOrEqual(10);
      expect(string.length).toBeGreaterThanOrEqual(5);
      expect(/^#{5,10}$/.test(string)).toEqual(true);
    });

    it('repeats string {n} number of times', () => {
      expect(pure.helpers.regexpStyleStringParse('%{10}')).toEqual(
        pure.helpers.repeatString({ string: '%', num: 10 })
      );
      expect(pure.helpers.regexpStyleStringParse('%{30}')).toEqual(
        pure.helpers.repeatString({ string: '%', num: 30 })
      );
      expect(pure.helpers.regexpStyleStringParse('%{5}')).toEqual(
        pure.helpers.repeatString({ string: '%', num: 5 })
      );
    });

    it('creates a numerical range', () => {
      const string = pure.helpers.regexpStyleStringParse('Hello[0-9]');

      expect(/^Hello[0-9]$/.test(string)).toEqual(true);
    });

    it('creates a numerical range with min greater than max', () => {
      const string = pure.helpers.regexpStyleStringParse('Hello[9-7]');

      expect(/^Hello[0-9]$/.test(string)).toEqual(true);
    });

    it('deals with multiple tokens in one string', () => {
      const string = pure.helpers.regexpStyleStringParse('Test#{5}%{2,5}Testing**[1-5]**{10}END');

      expect(/^Test#{5}%{2,5}Testing\*\*[1-5]\*\*{10}END$/.test(string)).toEqual(true);
    });
  });

  describe('createTransaction()', () => {
    it('should create a random transaction', () => {
      const transaction = pure.helpers.createTransaction();

      expect(transaction).toBeDefined();
      expect(transaction.amount).toBeDefined();
      expect(transaction.date).toBeDefined();
      expect(transaction.business).toBeDefined();
      expect(transaction.name).toBeDefined();
      expect(transaction.type).toBeDefined();
      expect(transaction.account).toBeDefined();
    });
  });

  describe('replaceSymbolWithHex', () => {
    it('replace symbol without passing string', () => {
      const replace = pure.helpers.replaceSymbolWithHex();

      expect(replace).toEqual('');
    });

    it("replace symbol and don't replace number", () => {
      const replace = pure.helpers.replaceSymbolWithHex({ string: '92hd7##' });

      expect(replace).toContain('92hd7');
    });
  });
});
