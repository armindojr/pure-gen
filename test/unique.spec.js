import pure from '../src/index.js';

describe('unique.js', () => {
  describe('exec()', () => {
    it('is able to call a function with no arguments and return a result', () => {
      const result = pure.unique.exec(pure.internet.email);

      expect(typeof result).toBe('string');
      pure.unique.clear();
    });

    it('is able to call a function with arguments and return a result', () => {
      // third argument is provider, or domain for email
      const result = pure.unique.exec(pure.internet.email, [
        { firstName: 'a', lastName: 'b', provider: 'c' }
      ]);

      expect(/[@]c/.test(result)).toEqual(true);
      pure.unique.clear();
    });

    it('is able to call same function with arguments and return a result', () => {
      // third argument is provider, or domain for email
      const result = pure.unique.exec(pure.internet.email, [
        { firstName: 'a', lastName: 'b', provider: 'c' }
      ]);

      expect(/[@]c/.test(result)).toEqual(true);
      pure.unique.clear();
    });

    it('is able to exclude results as array', () => {
      const result = pure.unique.exec(pure.internet.protocol, [], { exclude: ['https'] });

      expect(result).toEqual('http');
      pure.unique.clear();
    });

    it('is able to exclude results as string', () => {
      const result = pure.unique.exec(pure.internet.protocol, [], { exclude: 'https' });

      expect(result).toEqual('http');
      pure.unique.clear();
    });

    it('is able to limit unique call by maxTime in ms', () => {
      expect(() => {
        pure.unique.exec(pure.internet.protocol, [], {
          maxTime: 1,
          maxRetries: 9999,
          exclude: ['https', 'http']
        });
      }).toThrow(/Exceeded maxTime/);
    });

    it('is able to limit unique call by maxRetries', () => {
      expect(() => {
        pure.unique.exec(pure.internet.protocol, [], {
          maxTime: 5000,
          maxRetries: 5,
          exclude: ['https', 'http']
        });
      }).toThrow(/Exceeded maxRetries/);
    });
  });

  describe('clear()', () => {
    it('is able to clear the found items at global scope', () => {
      pure.unique.exec(pure.internet.protocol, [], {
        exclude: ['https']
      });

      pure.unique.clear();

      const result = pure.unique.exec(pure.internet.protocol, [], {
        exclude: ['https']
      });

      expect(result).toEqual('http');
    });

    it('is able to clear the found items at functional scope', () => {
      pure.unique.exec(pure.internet.protocol, [], {
        exclude: ['https'],
        scope: 'pureInternetProtocol'
      });

      pure.unique.clear('pureInternetProtocol');

      const result = pure.unique.exec(pure.internet.protocol, [], {
        exclude: ['https'],
        scope: 'pureInternetProtocol'
      });

      expect(result).toEqual('http');
    });
  });
});
