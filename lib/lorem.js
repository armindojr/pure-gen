
/**
 *
 * @namespace pure.lorem
 */
function Lorem(pure) {
    const self = this;
    const Helpers = pure.helpers;

    /**
   * generates a word of a specified length
   *
   * @method pure.lorem.word
   * @param {number} length length of the word that should be returned. Defaults to a random length
   */
    self.word = (length) => {
        // when receiving parameter from bind, for somewhat they are in inverse order
        const hasRightLength = (len, word) => word.length === len;
        let properLengthWords;
        if (typeof length === 'undefined') {
            properLengthWords = pure.definitions.lorem.words;
        } else {
            properLengthWords = pure.definitions.lorem.words.filter(hasRightLength.bind(this, length));
            if (properLengthWords.length === 0) {
                properLengthWords = pure.definitions.lorem.words.filter(hasRightLength.bind(this, 14));
            }
        }

        return pure.random.arrayElement(properLengthWords);
    };

    /**
   * generates a space separated list of words
   *
   * @method pure.lorem.words
   * @param {number} num number of words, defaults to 3
   */
    self.words = (num) => {
        let def = num;
        if (typeof def === 'undefined') { def = 3; }
        const words = [];
        for (let i = 0; i < def; i += 1) {
            words.push(pure.lorem.word());
        }
        return words.join(' ');
    };

    /**
   * sentence
   *
   * @method pure.lorem.sentence
   * @param {number} wordCount defaults to a random number between 3 and 10
   * @param {number} range
   */
    self.sentence = (wordCount) => {
        // TODO: (range) isn't used
        let def = wordCount;
        if (typeof def === 'undefined') {
            def = pure.random.number({ min: 3, max: 10 });
        }
        // if (typeof range == 'undefined') { range = 7; }

        // strange issue with the node_min_test failing for captialize, please fix and add pure.lorem.back
        // return  pure.lorem.words(def + Helpers.randomNumber(range)).join(' ').capitalize();

        const { sentences } = pure.definitions.lorem;
        let sentence;
        if (sentences instanceof Object && def in sentences) {
            sentence = pure.random.arrayElement(sentences[def]);
            if (sentence) {
                return sentence;
            }
        }
        sentence = pure.lorem.words(def);
        return `${sentence.charAt(0).toUpperCase() + sentence.slice(1)}.`;
    };

    /**
   * slug
   *
   * @method pure.lorem.slug
   * @param {number} wordCount number of words, defaults to 3
   */
    self.slug = (wordCount) => {
        const words = pure.lorem.words(wordCount);
        return Helpers.slugify(words);
    };

    /**
   * sentences
   *
   * @method pure.lorem.sentences
   * @param {number} sentenceCount defautls to a random number between 2 and 6
   * @param {string} separator defaults to `' '`
   */
    self.sentences = (sentenceCount, separator) => {
        let count = sentenceCount;
        let def = separator;
        if (typeof count === 'undefined') { count = pure.random.number({ min: 2, max: 6 }); }
        if (typeof def === 'undefined') { def = ' '; }
        const sentences = [];
        for (count; count > 0; count -= 1) {
            sentences.push(pure.lorem.sentence());
        }
        return sentences.join(def);
    };

    /**
   * paragraph
   *
   * @method pure.lorem.paragraph
   * @param {number} sentenceCount defaults to 3
   */
    self.paragraph = (sentenceCount) => {
        let def = sentenceCount;
        if (typeof def === 'undefined') { def = 3; }
        return pure.lorem.sentences(def + pure.random.number(3));
    };

    /**
   * paragraphs
   *
   * @method pure.lorem.paragraphs
   * @param {number} paragraphCount defaults to 3
   * @param {string} separator defaults to `'\n \r'`
   */
    self.paragraphs = (paragraphCount, separator) => {
        let count = paragraphCount;
        let def = separator;
        if (typeof def === 'undefined') {
            def = '\n \r';
        }
        if (typeof count === 'undefined') { count = 3; }
        const paragraphs = [];
        for (count; count > 0; count -= 1) {
            paragraphs.push(pure.lorem.paragraph());
        }
        return paragraphs.join(def);
    };

    /**
   * returns random text based on a random lorem method
   *
   * @method pure.lorem.text
   * @param {number} times
   */
    self.text = () => {
        // TODO: (times) isn't used
        const loremMethods = [
            'lorem.word',
            'lorem.words',
            'lorem.sentence',
            'lorem.sentences',
            'lorem.paragraph',
            'lorem.paragraphs',
            'lorem.lines',
        ];
        const randomLoremMethod = pure.random.arrayElement(loremMethods);
        return pure.fake(`{{${randomLoremMethod}}}`);
    };

    /**
   * returns lines of lorem separated by `'\n'`
   *
   * @method pure.lorem.lines
   * @param {number} lineCount defaults to a random number between 1 and 5
   */
    self.lines = (lineCount) => {
        let def = lineCount;
        if (typeof def === 'undefined') { def = pure.random.number({ min: 1, max: 5 }); }
        return pure.lorem.sentences(def, '\n');
    };

    return self;
}


module.exports = Lorem;
