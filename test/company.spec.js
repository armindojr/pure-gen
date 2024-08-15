import sinon from 'sinon';
import pure from '../src/index.js';

describe('company.js', () => {
  describe('companyName()', () => {
    it('sometimes returns three last names', () => {
      sinon.spy(pure.name, 'lastName');
      sinon.stub(pure.random, 'number').returns(2);

      const name = pure.company.companyName();
      const parts = name.split(' ');

      expect(parts.length).toEqual(4);
      expect(pure.name.lastName.calledOnce).toBe(true);

      pure.random.number.restore();
      pure.name.lastName.restore();
    });

    it('sometimes returns two last names separated by a hyphen', () => {
      sinon.spy(pure.name, 'lastName');
      sinon.stub(pure.random, 'number').returns(1);

      const name = pure.company.companyName();
      const parts = name.split('-');

      expect(parts.length).toBeGreaterThanOrEqual(2);
      expect(pure.name.lastName.calledOnce).toBe(true);

      pure.random.number.restore();
      pure.name.lastName.restore();
    });

    it('sometimes returns a last name with a company suffix', () => {
      sinon.spy(pure.company, 'companySuffix');
      sinon.spy(pure.name, 'lastName');
      sinon.stub(pure.random, 'number').returns(0);

      const name = pure.company.companyName();
      const parts = name.split(' ');

      expect(parts.length).toBeGreaterThanOrEqual(2);
      expect(pure.name.lastName.calledOnce).toBe(true);
      expect(pure.company.companySuffix.calledOnce).toBe(true);

      pure.random.number.restore();
      pure.name.lastName.restore();
      pure.company.companySuffix.restore();
    });

    it('returns three last names when parameter is a specific format', () => {
      sinon.spy(pure.name, 'lastName');
      const name = pure.company.companyName(
        '{{name.lastName}}, {{name.lastName}} and {{name.lastName}}'
      );
      const parts = name.split(' ');

      expect(parts.length).toEqual(4);
      expect(pure.name.lastName.calledOnce).toBe(true);

      pure.name.lastName.restore();
    });
  });

  describe('companyPrefix()', () => {
    it('returns random value from company prefix', () => {
      const stub = sinon.stub(pure.registeredModules, 'company').get(() => ({
        prefix: ['foo']
      }));

      const prefix = pure.company.companyPrefix();

      expect(prefix).toEqual('foo');

      stub.restore();
    });
  });

  describe('catchPhrase()', () => {
    it('returns phrase comprising of a catch phrase adjective, descriptor, and noun', () => {
      sinon.spy(pure.random, 'arrayElement');
      sinon.spy(pure.company, 'catchPhraseAdjective');
      sinon.spy(pure.company, 'catchPhraseDescriptor');
      sinon.spy(pure.company, 'catchPhraseNoun');

      const phrase = pure.company.catchPhrase();

      expect(phrase.split(' ').length).toBeGreaterThanOrEqual(3);
      expect(pure.random.arrayElement.calledThrice).toBe(true);
      expect(pure.company.catchPhraseAdjective.calledOnce).toBe(true);
      expect(pure.company.catchPhraseDescriptor.calledOnce).toBe(true);
      expect(pure.company.catchPhraseNoun.calledOnce).toBe(true);

      pure.random.arrayElement.restore();
      pure.company.catchPhraseAdjective.restore();
      pure.company.catchPhraseDescriptor.restore();
      pure.company.catchPhraseNoun.restore();
    });
  });

  describe('bs()', () => {
    it('returns phrase comprising of a BS buzz, adjective, and noun', () => {
      sinon.spy(pure.random, 'arrayElement');
      sinon.spy(pure.company, 'bsBuzz');
      sinon.spy(pure.company, 'bsAdjective');
      sinon.spy(pure.company, 'bsNoun');

      const bs = pure.company.bs();

      expect(typeof bs).toBe('string');
      expect(pure.random.arrayElement.calledThrice).toBe(true);
      expect(pure.company.bsBuzz.calledOnce).toBe(true);
      expect(pure.company.bsAdjective.calledOnce).toBe(true);
      expect(pure.company.bsNoun.calledOnce).toBe(true);

      pure.random.arrayElement.restore();
      pure.company.bsBuzz.restore();
      pure.company.bsAdjective.restore();
      pure.company.bsNoun.restore();
    });
  });
});
