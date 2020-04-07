/**
 *
 * @namespace pure.company
 */
function Company(pure) {
    const self = this;

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
    self.suffixes = () => pure.definitions.company.suffix.slice(0);

    /**
     * companyName
     * 
     * @description Generate random company name
     * @param {string} format Format to use when generate name
     * @method pure.company.companyName
     * @example
     * console.log(pure.company.companyName());
     * //outputs: "Corwin and Sons"
     */
    self.companyName = (format) => {
        const def = format;
        let res;
        const formats = [
            '{{name.lastName}} {{company.companySuffix}}',
            '{{name.lastName}} - {{name.lastName}}',
            '{{name.lastName}}, {{name.lastName}} and {{name.lastName}}',
        ];

        if (typeof def !== 'number') {
            res = pure.fake(formats[pure.random.number(formats.length - 1)]);
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
    self.companySuffix = () => pure.random.arrayElement(pure.company.suffixes());

    /**
     * catchPhrase
     * 
     * @description Generate random company catch phrase
     * @method pure.company.catchPhrase
     * @example
     * console.log(pure.company.catchPhrase());
     * //outputs: "Enterprise-wide mission-critical toolset"
     */
    self.catchPhrase = () => pure.fake('{{company.catchPhraseAdjective}}'
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
    self.bs = () => pure.fake('{{company.bsBuzz}} {{company.bsAdjective}} {{company.bsNoun}}');

    /**
     * catchPhraseAdjective
     * 
     * @description Generate random company catch phrase adjective
     * @method pure.company.catchPhraseAdjective
     * @example
     * console.log(pure.company.catchPhraseAdjective());
     * //outputs: "Vision-oriented"
     */
    self.catchPhraseAdjective = () => pure.random.arrayElement(pure.definitions.company.adjective);

    /**
     * catchPhraseDescriptor
     * 
     * @description Generate random company catch phrase descriptor
     * @method pure.company.catchPhraseDescriptor
     * @example
     * console.log(pure.company.catchPhraseDescriptor());
     * //outputs: "actuating"
     */
    self.catchPhraseDescriptor = () => pure.random.arrayElement(pure.definitions.company.descriptor);

    /**
     * catchPhraseNoun
     * 
     * @description Generate random company catch phrase noun
     * @method pure.company.catchPhraseNoun
     * @example
     * console.log(pure.company.catchPhraseNoun());
     * //outputs: "knowledge base"
     */
    self.catchPhraseNoun = () => pure.random.arrayElement(pure.definitions.company.noun);

    /**
     * bsAdjective
     * 
     * @description Generate random company bs adjective
     * @method pure.company.bsAdjective
     * @example
     * console.log(pure.company.bsAdjective());
     * //outputs: "frictionless"
     */
    self.bsAdjective = () => pure.random.arrayElement(pure.definitions.company.bs_adjective);

    /**
     * bsBuzz
     * 
     * @description Generate random company bs buzz
     * @method pure.company.bsBuzz
     * @example
     * console.log(pure.company.bsBuzz());
     * //outputs: "syndicate"
     */
    self.bsBuzz = () => pure.random.arrayElement(pure.definitions.company.bs_verb);

    /**
     * bsNoun
     * 
     * @description Generate random company bs noun
     * @method pure.company.bsNoun
     * @example
     * console.log(pure.company.bsNoun());
     * //outputs: "web services"
     */
    self.bsNoun = () => pure.random.arrayElement(pure.definitions.company.bs_noun);
}

module.exports = Company;
