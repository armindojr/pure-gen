/**
 *
 * @namespace pure.hacker
 */
function Hacker(pure) {
    const self = this;

    /**
   * abbreviation
   *
   * @method pure.hacker.abbreviation
   */
    self.abbreviation = () => pure.random.arrayElement(pure.definitions.hacker.abbreviation);

    /**
   * adjective
   *
   * @method pure.hacker.adjective
   */
    self.adjective = () => pure.random.arrayElement(pure.definitions.hacker.adjective);

    /**
   * noun
   *
   * @method pure.hacker.noun
   */
    self.noun = () => pure.random.arrayElement(pure.definitions.hacker.noun);

    /**
   * verb
   *
   * @method pure.hacker.verb
   */
    self.verb = () => pure.random.arrayElement(pure.definitions.hacker.verb);

    /**
   * ingverb
   *
   * @method pure.hacker.ingverb
   */
    self.ingverb = () => pure.random.arrayElement(pure.definitions.hacker.ingverb);

    /**
   * phrase
   *
   * @method pure.hacker.phrase
   */
    self.phrase = () => {
        const data = {
            abbreviation: self.abbreviation,
            adjective: self.adjective,
            ingverb: self.ingverb,
            noun: self.noun,
            verb: self.verb,
        };

        const phrase = pure.random.arrayElement(pure.definitions.hacker.phrase);
        return pure.helpers.mustache(phrase, data);
    };

    return self;
}

module.exports = Hacker;
