/**
 *
 * @namespace pure.company
 */
class Company {
    constructor(pure) {
        /**
         * suffixes
         *
         * @description Generate array of company suffixes
         * @method pure.company.suffixes
         * @example
         * console.log(pure.company.suffixes());
         * //outputs: "[ 'Inc', 'and Sons', 'LLC', 'Group' ]"
         */
        // Don't want the source array exposed to modification, so return a copy
        this.suffixes = () => pure.registeredModules.company.suffix.slice(0);

        /**
         * companyName
         *
         * @description Generate random company name
         * @param {string} [format= random] Format to use when generate name
         * @method pure.company.companyName
         * @example
         * console.log(pure.company.companyName());
         * //outputs: "Corwin and Sons"
         */
        this.companyName = (format) => {
            const def = format;
            let res;
            const formats = [
                '{{name.lastName}} {{company.companySuffix}}',
                '{{name.lastName}} - {{name.lastName}}',
                '{{name.lastName}}, {{name.lastName}} and {{name.lastName}}',
            ];

            if (typeof def !== 'number') {
                res = pure.fake(pure.random.arrayElement(formats));
            } else {
                res = pure.fake(formats[def]);
            }

            return res;
        };

        /**
         * companySuffix
         *
         * @description Generate random company suffix
         * @method pure.company.companySuffix
         * @example
         * console.log(pure.company.companySuffix());
         * //outputs: "Group"
         */
        this.companySuffix = () => pure.random.arrayElement(pure.company.suffixes());

        /**
         * catchPhrase
         *
         * @description Generate random company catch phrase
         * @method pure.company.catchPhrase
         * @example
         * console.log(pure.company.catchPhrase());
         * //outputs: "Enterprise-wide mission-critical toolset"
         */
        this.catchPhrase = () => pure.fake('{{company.catchPhraseAdjective}}'
            + ' {{company.catchPhraseDescriptor}} {{company.catchPhraseNoun}}');

        /**
         * bs
         *
         * @description Generate random company bs string
         * @method pure.company.bs
         * @example
         * console.log(pure.company.bs());
         * //outputs: "cultivate innovative bandwidth"
         */
        this.bs = () => pure.fake('{{company.bsBuzz}} {{company.bsAdjective}} {{company.bsNoun}}');

        /**
         * catchPhraseAdjective
         *
         * @description Generate random company catch phrase adjective
         * @method pure.company.catchPhraseAdjective
         * @example
         * console.log(pure.company.catchPhraseAdjective());
         * //outputs: "Vision-oriented"
         */
        this.catchPhraseAdjective = () => pure.random.arrayElement(pure.registeredModules.company.adjective);

        /**
         * catchPhraseDescriptor
         *
         * @description Generate random company catch phrase descriptor
         * @method pure.company.catchPhraseDescriptor
         * @example
         * console.log(pure.company.catchPhraseDescriptor());
         * //outputs: "actuating"
         */
        this.catchPhraseDescriptor = () => pure.random.arrayElement(pure.registeredModules.company.descriptor);

        /**
         * catchPhraseNoun
         *
         * @description Generate random company catch phrase noun
         * @method pure.company.catchPhraseNoun
         * @example
         * console.log(pure.company.catchPhraseNoun());
         * //outputs: "knowledge base"
         */
        this.catchPhraseNoun = () => pure.random.arrayElement(pure.registeredModules.company.noun);

        /**
         * bsAdjective
         *
         * @description Generate random company bs adjective
         * @method pure.company.bsAdjective
         * @example
         * console.log(pure.company.bsAdjective());
         * //outputs: "frictionless"
         */
        this.bsAdjective = () => pure.random.arrayElement(pure.registeredModules.company.bs_adjective);

        /**
         * bsBuzz
         *
         * @description Generate random company bs buzz
         * @method pure.company.bsBuzz
         * @example
         * console.log(pure.company.bsBuzz());
         * //outputs: "syndicate"
         */
        this.bsBuzz = () => pure.random.arrayElement(pure.registeredModules.company.bs_verb);

        /**
         * bsNoun
         *
         * @description Generate random company bs noun
         * @method pure.company.bsNoun
         * @example
         * console.log(pure.company.bsNoun());
         * //outputs: "web services"
         */
        this.bsNoun = () => pure.random.arrayElement(pure.registeredModules.company.bs_noun);
    }
}

module.exports = Company;
