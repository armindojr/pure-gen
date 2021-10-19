class Company {
    constructor(pure) {
        this.suffixes = () => pure.registeredModules.company.suffix.slice(0);

        this.companyName = (format) => {
            const def = format;
            let res;
            const formats = [
                '{{name.lastName}} {{company.companySuffix}}',
                '{{name.lastName}} - {{name.lastName}}',
                '{{name.lastName}}, {{name.lastName}} and {{name.lastName}}',
            ];

            if (typeof def !== 'string') {
                res = pure.fake(pure.random.arrayElement(formats));
            } else {
                res = pure.fake(def);
            }

            return res;
        };

        this.companySuffix = () => pure.random.arrayElement(this.suffixes());

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
