/**
 *
 * @namespace pure.hacker
 */
class Hacker {
    constructor(pure) {
        /**
         * abbreviation
         *
         * @description Return random abbreviation
         * @method pure.hacker.abbreviation
         * @example
         * console.log(pure.hacker.abbreviation());
         * //outputs: "SSL"
         */
        this.abbreviation = () => pure.random.arrayElement(pure.registeredModules.hacker.abbreviation);

        /**
         * adjective
         *
         * @description Return random adjective
         * @method pure.hacker.adjective
         * @example
         * console.log(pure.hacker.adjective());
         * //outputs: "1080p"
         */
        this.adjective = () => pure.random.arrayElement(pure.registeredModules.hacker.adjective);

        /**
         * noun
         *
         * @description Return random noun
         * @method pure.hacker.noun
         * @example
         * console.log(pure.hacker.noun());
         * //outputs: "alarm"
         */
        this.noun = () => pure.random.arrayElement(pure.registeredModules.hacker.noun);

        /**
         * verb
         *
         * @description Return random verb
         * @method pure.hacker.verb
         * @example
         * console.log(pure.hacker.verb());
         * //outputs: "override"
         */
        this.verb = () => pure.random.arrayElement(pure.registeredModules.hacker.verb);

        /**
         * ingverb
         *
         * @description Return random ing verb
         * @method pure.hacker.ingverb
         * @example
         * console.log(pure.hacker.ingverb());
         * //outputs: "synthesizing"
         */
        this.ingverb = () => pure.random.arrayElement(pure.registeredModules.hacker.ingverb);

        /**
         * phrase
         *
         * @description Return random phrase
         * @method pure.hacker.phrase
         * @example
         * console.log(pure.hacker.phrase());
         * //outputs: "You can't bypass the hard drive without synthesizing the multi-byte RSS microchip!"
         */
        this.phrase = () => {
            const data = {
                abbreviation: this.abbreviation,
                adjective: this.adjective,
                ingverb: this.ingverb,
                noun: this.noun,
                verb: this.verb,
            };

            const phrase = pure.random.arrayElement(pure.registeredModules.hacker.phrase);
            return pure.helpers.mustache(phrase, data);
        };
    }
}

module.exports = Hacker;
