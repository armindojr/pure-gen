/**
 *
 * @namespace pure.company
 */
var Company = function (pure) {
  
  var self = this;
  var f = pure.fake;
  
  /**
   * suffixes
   *
   * @method pure.company.suffixes
   */
  this.suffixes = function () {
    // Don't want the source array exposed to modification, so return a copy
    return pure.definitions.company.suffix.slice(0);
  }

  /**
   * companyName
   *
   * @method pure.company.companyName
   * @param {string} format
   */
  this.companyName = function (format) {

    var formats = [
      '{{name.lastName}} {{company.companySuffix}}',
      '{{name.lastName}} - {{name.lastName}}',
      '{{name.lastName}}, {{name.lastName}} and {{name.lastName}}'
    ];

    if (typeof format !== "number") {
      format = pure.random.number(formats.length - 1);
    }

    return f(formats[format]);
  }

  /**
   * companySuffix
   *
   * @method pure.company.companySuffix
   */
  this.companySuffix = function () {
      return pure.random.arrayElement(pure.company.suffixes());
  }

  /**
   * catchPhrase
   *
   * @method pure.company.catchPhrase
   */
  this.catchPhrase = function () {
    return f('{{company.catchPhraseAdjective}} {{company.catchPhraseDescriptor}} {{company.catchPhraseNoun}}')
  }

  /**
   * bs
   *
   * @method pure.company.bs
   */
  this.bs = function () {
    return f('{{company.bsBuzz}} {{company.bsAdjective}} {{company.bsNoun}}');
  }

  /**
   * catchPhraseAdjective
   *
   * @method pure.company.catchPhraseAdjective
   */
  this.catchPhraseAdjective = function () {
      return pure.random.arrayElement(pure.definitions.company.adjective);
  }

  /**
   * catchPhraseDescriptor
   *
   * @method pure.company.catchPhraseDescriptor
   */
  this.catchPhraseDescriptor = function () {
      return pure.random.arrayElement(pure.definitions.company.descriptor);
  }

  /**
   * catchPhraseNoun
   *
   * @method pure.company.catchPhraseNoun
   */
  this.catchPhraseNoun = function () {
      return pure.random.arrayElement(pure.definitions.company.noun);
  }

  /**
   * bsAdjective
   *
   * @method pure.company.bsAdjective
   */
  this.bsAdjective = function () {
      return pure.random.arrayElement(pure.definitions.company.bs_adjective);
  }

  /**
   * bsBuzz
   *
   * @method pure.company.bsBuzz
   */
  this.bsBuzz = function () {
      return pure.random.arrayElement(pure.definitions.company.bs_verb);
  }

  /**
   * bsNoun
   *
   * @method pure.company.bsNoun
   */
  this.bsNoun = function () {
      return pure.random.arrayElement(pure.definitions.company.bs_noun);
  }
  
}

module['exports'] = Company;