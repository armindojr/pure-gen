
/**
 *
 * @namespace pure.lorem
 */
function Lorem(pure) {
    const Helpers = pure.helpers;

    /**
     * word
     *
     * @description Generates a word of a specified length
     * @param {number} [length= random] length of the word that should be returned
     * @method pure.lorem.word
     * @example
     * console.log(pure.lorem.word());
     * //outputs: "quidem"
     */
    this.word = (length) => {
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
     * words
     *
     * @description Generates a space separated list of words
     * @param {number} [num= 3] number of words
     * @method pure.lorem.words
     * @example
     * console.log(pure.lorem.words());
     * //outputs: "et id voluptatem"
     */
    this.words = (num) => {
        const def = num || 3;
        const words = [];

        for (let i = 0; i < def; i += 1) {
            words.push(pure.lorem.word());
        }

        return words.join(' ');
    };

    /**
     * sentence
     *
     * @description Generates a random sentence
     * @param {number} [wordCount= random] number of words
     * @method pure.lorem.sentence
     * @example
     * console.log(pure.lorem.sentence());
     * //outputs: "Facere enim quibusdam."
     */
    this.sentence = (wordCount) => {
        const def = wordCount || pure.random.number({ min: 3, max: 10 });
        const { sentences } = pure.definitions.lorem;
        let sentence;

        if (sentences instanceof Object && def in sentences) {
            sentence = pure.random.arrayElement(sentences[def]);
        } else {
            sentence = pure.lorem.words(def);
        }

        return `${sentence.charAt(0).toUpperCase() + sentence.slice(1)}.`;
    };

    /**
     * slug
     *
     * @description Generates a random word slugify
     * @param {number} [wordCount= 3] number of words
     * @method pure.lorem.slug
     * @example
     * console.log(pure.lorem.slug());
     * //outputs: "beatae-magni-fugiat"
     */
    this.slug = (wordCount) => {
        const words = pure.lorem.words(wordCount);
        return Helpers.slugify(words);
    };

    /**
     * sentences
     *
     * @description Generates random sentences
     * @param {number} [sentenceCount= random] number of sentences
     * @param {string} [separator= ' '] Separator of sentences
     * @method pure.lorem.sentences
     * @example
     * console.log(pure.lorem.sentences());
     * //outputs: "Voluptatem eius ab exercitationem sint ut provident
     * // et cupiditate. Et omnis natus qui. Velit qui dolore. Alias sed similique voluptate delectus."
     */
    this.sentences = (sentenceCount, separator) => {
        let count = sentenceCount || pure.random.number({ min: 2, max: 6 });
        const def = separator || ' ';
        const sentences = [];

        for (count; count > 0; count -= 1) {
            sentences.push(pure.lorem.sentence());
        }

        return sentences.join(def);
    };

    /**
     * paragraph
     *
     * @description Generates a random paragraph
     * @param {number} [sentenceCount= 3] number of sentences
     * @method pure.lorem.paragraph
     * @example
     * console.log(pure.lorem.paragraph());
     * //outputs: "Odit voluptas laudantium illo sit animi ut. Atque doloribus suscipit.
     * // Ut dolore iusto modi corrupti facere."
     */
    this.paragraph = (sentenceCount) => {
        const def = sentenceCount || 3;

        return pure.lorem.sentences(def);
    };

    /**
     * paragraphs
     *
     * @description Generates random paragraphs
     * @param {number} [paragraphCount= 3] number of paragraphs
     * @param {string} [separator= '\n \r'] Separator of paragraphs
     * @method pure.lorem.paragraphs
     * @example
     * console.log(pure.lorem.paragraphs());
     * //outputs: "Autem et vero voluptates. Commodi et ipsam sed aut dolorem sapiente ut. Ut assumenda
     * // ut sed id iusto et quaerat tempora. Itaque accusantium doloremque quae nisi et dignissimos rerum
     * // et quis. Rerum sint ex aliquam. Quis ut voluptatem nostrum odio expedita. Consequuntur illo magnam.
     * // Provident nihil ut est. Exercitationem sed aliquam soluta molestiae fugit."
     */
    this.paragraphs = (paragraphCount, separator) => {
        let count = paragraphCount || 3;
        const def = separator || '\n \r';
        const paragraphs = [];

        for (count; count > 0; count -= 1) {
            paragraphs.push(pure.lorem.paragraph());
        }

        return paragraphs.join(def);
    };

    /**
     * text
     *
     * @description Returns random text based on a random lorem method
     * @method pure.lorem.text
     * @example
     * console.log(pure.lorem.text());
     * //outputs: "Fuga nesciunt laudantium autem nisi. Illo nulla illo ut. In ipsam quia consequatur
     * //dolorem nesciunt quia sint et."
     */
    this.text = () => {
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
     * lines
     *
     * @description Returns lines of lorem separated by `'\n'`
     * @param {number} [lineCount= random] Number of lines
     * @method pure.lorem.lines
     * @example
     * console.log(pure.lorem.lines());
     * //outputs: "Earum repellendus dolores ea sint non eum libero."
     */
    this.lines = (lineCount) => {
        const def = lineCount || pure.random.number({ min: 1, max: 5 });

        return pure.lorem.sentences(def, '\n');
    };
}


module.exports = Lorem;
