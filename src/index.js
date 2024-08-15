import * as locales from './locale/index.js';
import * as imports from './imports.js';
import * as constants from './constants.js';

/**
 *
 * @namespace pure
 */
export class Pure {
  constructor(locale) {
    this.registeredModules = new Object();
    this.possibleLocales = constants.possibleLocales;

    if (locale) {
      this.setLocale(locale);
    } else {
      this.registeredModules = locales.en;
    }

    // Dynamic import all modules
    Object.keys(imports).forEach(key => {
      this[key] = new imports[key](this);
    });
  }

  seed(value) {
    this.random = new imports.random(this, value);
  }

  setLocale(locale) {
    if (this.possibleLocales.indexOf(locale) === -1) {
      throw new Error(`The following locale is not supported: ${locale}`);
    } else {
      this.registeredModules = locales[locale];
    }
  }

  getSeed() {
    return this.random.returnSeed();
  }
}

export default new Pure();
