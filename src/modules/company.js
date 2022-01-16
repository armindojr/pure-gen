class Company {
    constructor(pure) {
        // TODO: Remove this method
        this.suffixes = () => pure.registeredModules.company.suffix.slice(0);

        this.companyName = (format) => {
            let res;

            if (typeof format !== 'string') {
                res = pure.fake(pure.random.arrayElement(pure.registeredModules.company.name));
            } else {
                res = pure.fake(format);
            }

            return res;
        };

        this.companySuffix = () => pure.random.arrayElement(pure.registeredModules.company.suffix);

        this.companyPrefix = () => pure.random.arrayElement(pure.registeredModules.company.prefix);

        this.catchPhrase = () => `${this.catchPhraseAdjective()} ${this.catchPhraseDescriptor()}`
        + ` ${this.catchPhraseNoun()}`;

        this.catchPhraseAdjective = () => pure.random.arrayElement(pure.registeredModules.company.adjective);

        this.catchPhraseDescriptor = () => pure.random.arrayElement(pure.registeredModules.company.descriptor);

        this.catchPhraseNoun = () => pure.random.arrayElement(pure.registeredModules.company.noun);

        this.bs = () => `${this.bsBuzz()} ${this.bsAdjective()} ${this.bsNoun()}`;

        this.bsAdjective = () => pure.random.arrayElement(pure.registeredModules.company.bs_adjective);

        this.bsBuzz = () => pure.random.arrayElement(pure.registeredModules.company.bs_verb);

        this.bsNoun = () => pure.random.arrayElement(pure.registeredModules.company.bs_noun);
    }
}

module.exports = Company;
