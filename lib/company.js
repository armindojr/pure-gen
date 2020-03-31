/**
 *
 * @namespace pure.company
 */
function Company(pure) {
    const self = this;
    const f = pure.fake;

    /**
   * suffixes
   *
   * @method pure.company.suffixes
   */
    // Don't want the source array exposed to modification, so return a copy
    self.suffixes = () => pure.definitions.company.suffix.slice(0);

    /**
   * companyName
   *
   * @method pure.company.companyName
   * @param {string} format
   */
    self.companyName = (format) => {
        let def = format;
        const formats = [
            '{{name.lastName}} {{company.companySuffix}}',
            '{{name.lastName}} - {{name.lastName}}',
            '{{name.lastName}}, {{name.lastName}} and {{name.lastName}}',
        ];

        if (typeof def !== 'number') {
            def = pure.random.number(formats.length - 1);
        }

        return f(formats[def]);
    };

    /**
   * companySuffix
   *
   * @method pure.company.companySuffix
   */
    self.companySuffix = () => pure.random.arrayElement(pure.company.suffixes());

    /**
   * catchPhrase
   *
   * @method pure.company.catchPhrase
   */
    self.catchPhrase = () => f('{{company.catchPhraseAdjective}}'
    + ' {{company.catchPhraseDescriptor}} {{company.catchPhraseNoun}}');

    /**
   * bs
   *
   * @method pure.company.bs
   */
    self.bs = () => f('{{company.bsBuzz}} {{company.bsAdjective}} {{company.bsNoun}}');

    /**
   * catchPhraseAdjective
   *
   * @method pure.company.catchPhraseAdjective
   */
    self.catchPhraseAdjective = () => pure.random.arrayElement(pure.definitions.company.adjective);

    /**
   * catchPhraseDescriptor
   *
   * @method pure.company.catchPhraseDescriptor
   */
    self.catchPhraseDescriptor = () => pure.random.arrayElement(pure.definitions.company.descriptor);

    /**
   * catchPhraseNoun
   *
   * @method pure.company.catchPhraseNoun
   */
    self.catchPhraseNoun = () => pure.random.arrayElement(pure.definitions.company.noun);

    /**
   * bsAdjective
   *
   * @method pure.company.bsAdjective
   */
    self.bsAdjective = () => pure.random.arrayElement(pure.definitions.company.bs_adjective);

    /**
   * bsBuzz
   *
   * @method pure.company.bsBuzz
   */
    self.bsBuzz = () => pure.random.arrayElement(pure.definitions.company.bs_verb);

    /**
   * bsNoun
   *
   * @method pure.company.bsNoun
   */
    self.bsNoun = () => pure.random.arrayElement(pure.definitions.company.bs_noun);
}

module.exports = Company;
