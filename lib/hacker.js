/**
 *
 * @namespace pure.hacker
 */
var Hacker = function (pure) {
  var self = this;
  
  /**
   * abbreviation
   *
   * @method pure.hacker.abbreviation
   */
  self.abbreviation = function () {
    return pure.random.arrayElement(pure.definitions.hacker.abbreviation);
  };

  /**
   * adjective
   *
   * @method pure.hacker.adjective
   */
  self.adjective = function () {
    return pure.random.arrayElement(pure.definitions.hacker.adjective);
  };

  /**
   * noun
   *
   * @method pure.hacker.noun
   */
  self.noun = function () {
    return pure.random.arrayElement(pure.definitions.hacker.noun);
  };

  /**
   * verb
   *
   * @method pure.hacker.verb
   */
  self.verb = function () {
    return pure.random.arrayElement(pure.definitions.hacker.verb);
  };

  /**
   * ingverb
   *
   * @method pure.hacker.ingverb
   */
  self.ingverb = function () {
    return pure.random.arrayElement(pure.definitions.hacker.ingverb);
  };

  /**
   * phrase
   *
   * @method pure.hacker.phrase
   */
  self.phrase = function () {

    var data = {
      abbreviation: self.abbreviation,
      adjective: self.adjective,
      ingverb: self.ingverb,
      noun: self.noun,
      verb: self.verb
    };

    var phrase = pure.random.arrayElement(pure.definitions.hacker.phrase);
    return pure.helpers.mustache(phrase, data);
  };
  
  return self;
};

module['exports'] = Hacker;