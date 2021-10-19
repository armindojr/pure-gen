class Hacker {
    constructor(pure) {
        this.abbreviation = () => pure.random.arrayElement(pure.registeredModules.hacker.abbreviation);

        this.adjective = () => pure.random.arrayElement(pure.registeredModules.hacker.adjective);

        this.noun = () => pure.random.arrayElement(pure.registeredModules.hacker.noun);

        this.verb = () => pure.random.arrayElement(pure.registeredModules.hacker.verb);

        this.ingverb = () => pure.random.arrayElement(pure.registeredModules.hacker.ingverb);

        this.phrase = () => {
            const data = {
                abbreviation: this.abbreviation,
                adjective: this.adjective,
                ingverb: this.ingverb,
                noun: this.noun,
                verb: this.verb,
            };

            const phrase = pure.random.arrayElement(pure.registeredModules.hacker.phrase);
            return pure.helpers.mustache({ str: phrase, data });
        };
    }
}

module.exports = Hacker;
