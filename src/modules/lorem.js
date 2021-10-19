class Lorem {
    constructor(pure) {
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

        this.words = (num = 3) => {
            const words = [];

            for (let i = 0; i < num; i += 1) {
                words.push(this.word());
            }

            return words.join(' ');
        };

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

        this.sentences = (options = {}) => {
            let { sentenceCount = pure.random.number({ min: 2, max: 6 }) } = options;
            const { separator = ' ' } = options;
            const sentences = [];

            for (sentenceCount; sentenceCount > 0; sentenceCount -= 1) {
                sentences.push(this.sentence());
            }

            return sentences.join(separator);
        };

        this.slug = (wordCount) => {
            const words = this.words(wordCount);
            return pure.helpers.slugify(words);
        };

        this.paragraph = (sentenceCount = 3) => this.sentences({ sentenceCount });

        this.paragraphs = (options = {}) => {
            let { paragraphCount = 3 } = options;
            const { separator = '\n \r' } = options;
            const paragraphs = [];

            for (paragraphCount; paragraphCount > 0; paragraphCount -= 1) {
                paragraphs.push(this.paragraph());
            }

            return paragraphs.join(separator);
        };

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

        this.lines = (lineCount) => {
            const def = lineCount || pure.random.number({ min: 1, max: 5 });

            return this.sentences({ sentenceCount: def, separator: '\n' });
        };
    }
}

module.exports = Lorem;
