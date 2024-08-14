import sinon from 'sinon';
import pure from '../src/index.js';

describe('document.js', () => {
  describe('brazilianCitizenNumber()', () => {
    it('returns a valid cpf', () => {
      const document = pure.document.brazilianCitizenNumber();

      expect(document.length).toEqual(11);
    });

    it('returns a valid formatted cpf', () => {
      const document = pure.document.brazilianCitizenNumber({ format: true });

      expect(document.length).toEqual(14);
    });

    it('passing wrong parameter return a valid cpf', () => {
      const document = pure.document.brazilianCitizenNumber('ececefesds');

      expect(document.length).toEqual(11);
    });

    it('when mod 11 returns 10', () => {
      sinon.stub(pure.helpers, 'replaceSymbolWithNumber').returns('111119999');

      const document = pure.document.brazilianCitizenNumber();

      expect(document.length).toEqual(11);

      pure.helpers.replaceSymbolWithNumber.restore();
    });
  });

  describe('brazilianCompanyNumber()', () => {
    it('returns a valid cnpj', () => {
      const document = pure.document.brazilianCompanyNumber();

      expect(document.length).toEqual(14);
    });

    it('returns a valid formatted cnpj', () => {
      const document = pure.document.brazilianCompanyNumber({ format: true });

      expect(document.length).toEqual(18);
    });

    it('passing wrong parameter return a valid cnpj', () => {
      const document = pure.document.brazilianCompanyNumber('ececefesds');

      expect(document.length).toEqual(14);
    });
  });

  describe('brazilianId()', () => {
    it('returns a valid rg', () => {
      const document = pure.document.brazilianId();

      expect(document.length).toEqual(9);
    });

    it('returns a valid formatted rg', () => {
      const document = pure.document.brazilianId({ format: true });

      expect(document.length).toEqual(12);
    });

    it('passing wrong parameter return a valid rg', () => {
      const document = pure.document.brazilianId('ececefesds');

      expect(document.length).toEqual(9);
    });

    it('when verificationNum is 11', () => {
      sinon.stub(pure.helpers, 'replaceSymbolWithNumber').returns('63475332');

      const document = pure.document.brazilianId();

      expect(document.length).toEqual(9);

      pure.helpers.replaceSymbolWithNumber.restore();
    });

    it('when verificationNum is 10', () => {
      sinon.stub(pure.helpers, 'replaceSymbolWithNumber').returns('00871244');

      const document = pure.document.brazilianId();

      expect(document.length).toEqual(9);

      pure.helpers.replaceSymbolWithNumber.restore();
    });
  });
});
