import Pure from '../src/index';
import pure from '../index';

describe('Setting up all possible locales', () => {
  pure.possibleLocales.forEach(locale => {
    it(`setup ${locale} locale on constructor`, () => {
      const newLocale = new Pure(locale);

      expect(newLocale.registeredModules.localeName).toEqual(locale);
    });
  });

  it('setup invalid locale on constructor', () => {
    expect(() => {
      new Pure('XX');
    }).toThrow('The following locale is not supported: XX');
  });
});
