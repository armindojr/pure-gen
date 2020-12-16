/**
 *
 * @namespace pure.lorem
 */
class Lorem {
    constructor(pure) {
        /**
         * word
         *
         * @description Generates a word of a specified length
         * @param {Number} [length= random] length of the word that should be returned
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
                properLengthWords = pure.registeredModules.lorem.words;
            } else {
                properLengthWords = pure.registeredModules.lorem.words.filter(hasRightLength.bind(this, length));
                if (properLengthWords.length === 0) {
                    properLengthWords = pure.registeredModules.lorem.words.filter(hasRightLength.bind(this, 14));
                }
            }

            return pure.random.arrayElement(properLengthWords);
        };

        /**
         * words
         *
         * @description Generates a space separated list of words
         * @param {Number} [num= 3] number of words
         * @method pure.lorem.words
         * @example
         * console.log(pure.lorem.words());
         * //outputs: "et id voluptatem"
         */
        this.words = (num = 3) => {
            const words = [];

            for (let i = 0; i < num; i += 1) {
                words.push(this.word());
            }

            return words.join(' ');
        };

        /**
         * sentence
         *
         * @description Generates a random sentence
         * @param {Number} [wordCount= random] number of words
         * @method pure.lorem.sentence
         * @example
         * console.log(pure.lorem.sentence());
         * //outputs: "Facere enim quibusdam."
         */
        this.sentence = (wordCount) => {
            const def = wordCount || pure.random.number({ min: 3, max: 10 });
            const { sentences } = pure.registeredModules.lorem;
            let sentence;

            if (sentences instanceof Object && def in sentences) {
                sentence = pure.random.arrayElement(sentences[def]);
            } else {
                sentence = this.words(def);
            }

            return `${sentence.charAt(0).toUpperCase() + sentence.slice(1)}.`;
        };

        /**
         * slug
         *
         * @description Generates a random word slugify
         * @param {Number} [wordCount= 3] number of words
         * @method pure.lorem.slug
         * @example
         * console.log(pure.lorem.slug());
         * //outputs: "beatae-magni-fugiat"
         */
        this.slug = (wordCount) => {
            const words = this.words(wordCount);
            return pure.helpers.slugify(words);
        };

        /**
         * sentences
         *
         * @description Generates random sentences
         * @param {object} [options= {}] Options to be passed
         * @param {Number} [options.sentenceCount= random] number of sentences
         * @param {string} [options.separator= ' '] Separator of sentences
         * @method pure.lorem.sentences
         * @example
         * console.log(pure.lorem.sentences());
         * //outputs: "Voluptatem eius ab exercitationem sint ut provident
         * // et cupiditate. Et omnis natus qui. Velit qui dolore. Alias sed similique voluptate delectus."
         */
        this.sentences = (options = {}) => {
            let { sentenceCount = pure.random.number({ min: 2, max: 6 }) } = options;
            const { separator = ' ' } = options;
            const sentences = [];

            for (sentenceCount; sentenceCount > 0; sentenceCount -= 1) {
                sentences.push(this.sentence());
            }

            return sentences.join(separator);
        };

        /**
         * paragraph
         *
         * @description Generates a random paragraph
         * @param {Number} [sentenceCount= 3] number of sentences
         * @method pure.lorem.paragraph
         * @example
         * console.log(pure.lorem.paragraph());
         * //outputs: "Odit voluptas laudantium illo sit animi ut. Atque doloribus suscipit.
         * // Ut dolore iusto modi corrupti facere."
         */
        this.paragraph = (sentenceCount = 3) => this.sentences({ sentenceCount });

        /**
         * paragraphs
         *
         * @description Generates random paragraphs
         * @param {object} [options= {}] Options to be passed
         * @param {Number} [options.paragraphCount= 3] number of paragraphs
         * @param {string} [options.separator= '\n \r'] Separator of paragraphs
         * @method pure.lorem.paragraphs
         * @example
         * console.log(pure.lorem.paragraphs());
         * //outputs: "Autem et vero voluptates. Commodi et ipsam sed aut dolorem sapiente ut. Ut assumenda
         * // ut sed id iusto et quaerat tempora. Itaque accusantium doloremque quae nisi et dignissimos rerum
         * // et quis. Rerum sint ex aliquam. Quis ut voluptatem nostrum odio expedita. Consequuntur illo magnam.
         * // Provident nihil ut est. Exercitationem sed aliquam soluta molestiae fugit."
         */
        this.paragraphs = (options = {}) => {
            let { paragraphCount = 3 } = options;
            const { separator = '\n \r' } = options;
            const paragraphs = [];

            for (paragraphCount; paragraphCount > 0; paragraphCount -= 1) {
                paragraphs.push(this.paragraph());
            }

            return paragraphs.join(separator);
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
         * @param {Number} [lineCount= random] Number of lines
         * @method pure.lorem.lines
         * @example
         * console.log(pure.lorem.lines());
         * //outputs: "Earum repellendus dolores ea sint non eum libero."
         */
        this.lines = (lineCount) => {
            const def = lineCount || pure.random.number({ min: 1, max: 5 });

            return this.sentences({ sentenceCount: def, separator: '\n' });
        };
    }
}

module.exports = Lorem;
