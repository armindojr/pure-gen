/**
 *
 * @namespace pure.hacker
 */
function Hacker(pure) {
    const self = this;

    /**
     * abbreviation
     * 
     * @description Return random abbreviation
     * @method pure.hacker.abbreviation
     * @example
     * console.log(pure.hacker.abbreviation());
     * //outputs: "SSL"
     */
    self.abbreviation = () => pure.random.arrayElement(pure.definitions.hacker.abbreviation);

    /**
     * adjective
     * 
     * @description Return random adjective
     * @method pure.hacker.adjective
     * @example
     * console.log(pure.hacker.adjective());
     * //outputs: "1080p"
     */
    self.adjective = () => pure.random.arrayElement(pure.definitions.hacker.adjective);

    /**
     * noun
     * 
     * @description Return random noun
     * @method pure.hacker.noun
     * @example
     * console.log(pure.hacker.noun());
     * //outputs: "alarm"
     */
    self.noun = () => pure.random.arrayElement(pure.definitions.hacker.noun);

    /**
     * verb
     * 
     * @description Return random verb
     * @method pure.hacker.verb
     * @example
     * console.log(pure.hacker.verb());
     * //outputs: "override"
     */
    self.verb = () => pure.random.arrayElement(pure.definitions.hacker.verb);

    /**
     * ingverb
     * 
     * @description Return random ing verb
     * @method pure.hacker.ingverb
     * @example
     * console.log(pure.hacker.ingverb());
     * //outputs: "synthesizing"
     */
    self.ingverb = () => pure.random.arrayElement(pure.definitions.hacker.ingverb);

    /**
     * phrase
     * 
     * @description Return random phrase
     * @method pure.hacker.phrase
     * @example
     * console.log(pure.hacker.phrase());
     * //outputs: "You can't bypass the hard drive without synthesizing the multi-byte RSS microchip!"
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
