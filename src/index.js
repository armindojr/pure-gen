import * as locales from './locale/index.js';
import * as imports from './imports.js';
import * as constants from './constants.js';

// Transform a string to camelCase
const camelize = str =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) => (idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase()))
    .replace(/\s+/g, '');

/**
 *
 * @namespace pure
 */
export default class Pure {
  constructor(locale) {
    this.registeredModules = {};
    this.possibleLocales = constants.possibleLocales;

    if (locale) {
      this.setLocale(locale);
    } else {
      this.registeredModules = locales.en;
    }

    // Dynamic import all modules
    Object.keys(imports).forEach(key => {
      this[camelize(key)] = new imports[key](this);
    });
  }

  seed(value) {
    this.seedValue = value;
    this.random = new imports.Random(this, this.seedValue);
  }

  setLocale(locale) {
    if (this.possibleLocales.indexOf(locale) === -1) {
      throw new Error(`The following locale is not supported: ${locale}`);
    } else {
      this.registeredModules = {
        ...locales.en,
        ...locales[locale]
      };
    }
  }

  getSeed() {
    return this.random.returnSeed();
  }
}
