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

  pure.possibleLocales.forEach(locale => {
    it(`setup ${locale} locale on setLocale method`, () => {
      pure.setLocale(locale);
      expect(pure.registeredModules.localeName).toEqual(locale);
    });
  });

  it('setup invalid locale on setLocale method', () => {
    expect(() => {
      pure.setLocale('XX');
    }).toThrow('The following locale is not supported: XX');
  });
});
