import * as locales from './locale/index.js';
import * as imports from './imports.js';
import * as constants from './constants.js';

/**
 *
 * @namespace pure
 */
export default class Pure {
  constructor(locale) {
    this.registeredModules = {};
    this.possibleLocales = constants.possibleLocales;

    if (locale) {
      if (this.possibleLocales.indexOf(locale) === -1) {
        throw new Error(`The following locale is not supported: ${locale}`);
      } else {
        this.registeredModules = {
          ...locales.en,
          ...locales[locale]
        };
      }
    } else {
      this.registeredModules = locales.en;
    }

    this.random = new imports.Random(this);
    this.fake = new imports.Fake(this);
    this.unique = new imports.Unique(this);
    this.helpers = new imports.Helpers(this);
    this.name = new imports.Name(this);
    this.address = new imports.Address(this);
    this.company = new imports.Company(this);
    this.finance = new imports.Finance(this);
    this.image = new imports.Image(this);
    this.lorem = new imports.Lorem(this);
    this.hacker = new imports.Hacker(this);
    this.internet = new imports.Internet(this);
    this.database = new imports.Database(this);
    this.phone = new imports.Phone(this);
    this.date = new imports.Date(this);
    this.commerce = new imports.Commerce(this);
    this.system = new imports.System(this);
    this.git = new imports.Git(this);
    this.markdown = new imports.Markdown(this);
    this.transport = new imports.Transport(this);
    this.music = new imports.Music(this);
    this.document = new imports.Document(this);
    this.dessert = new imports.Dessert(this);
    this.games = new imports.Games(this);
    this.electricalComponents = new imports.ElectricalComponents(this);
    this.esport = new imports.Esport(this);
  }

  seed(value) {
    this.seedValue = value;
    this.random = new imports.Random(this, this.seedValue);
  }

  setLocale(locale) {
    this.registeredModules = {
      ...locales.en,
      ...locales[locale]
    };
  }

  getSeed() {
    return this.random.returnSeed();
  }
}
