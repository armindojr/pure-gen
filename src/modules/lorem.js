export class Lorem {
  constructor(pure) {
    this.pure = pure;
  }

  word(length) {
    // when receiving parameter from bind, for somewhat they are in inverse order
    const hasRightLength = (len, word) => word.length === len;
    let properLengthWords;

    if (typeof length === 'undefined') {
      properLengthWords = this.pure.registeredModules.lorem.words;
    } else {
      properLengthWords = this.pure.registeredModules.lorem.words.filter(hasRightLength.bind(this, length));
      if (properLengthWords.length === 0) {
        properLengthWords = this.pure.registeredModules.lorem.words.filter(hasRightLength.bind(this, 14));
      }
    }

    return this.pure.random.arrayElement(properLengthWords);
  }

  words(num = 3) {
    const words = [];

    for (let i = 0; i < num; i += 1) {
      words.push(this.pure.lorem.word());
    }

    return words.join(' ');
  }

  sentence(wordCount) {
    const def = wordCount || this.pure.random.number({ min: 3, max: 10 });

    const sentence = this.pure.lorem.words(def);

    return `${sentence.charAt(0).toUpperCase() + sentence.slice(1)}.`;
  }

  sentences(options = {}) {
    let { sentenceCount = this.pure.random.number({ min: 2, max: 6 }) } = options;
    const { separator = ' ' } = options;
    const sentences = [];

    for (sentenceCount; sentenceCount > 0; sentenceCount -= 1) {
      sentences.push(this.pure.lorem.sentence());
    }

    return sentences.join(separator);
  }

  slug(wordCount) {
    const words = this.pure.lorem.words(wordCount);

    return this.pure.helpers.slugify(words);
  }

  paragraph(sentenceCount = 3) {
    return this.pure.lorem.sentences({ sentenceCount });
  }

  paragraphs(options = {}) {
    let { paragraphCount = 3 } = options;
    const { separator = '\n \r' } = options;
    const paragraphs = [];

    for (paragraphCount; paragraphCount > 0; paragraphCount -= 1) {
      paragraphs.push(this.pure.lorem.paragraph());
    }

    return paragraphs.join(separator);
  }

  text() {
    const loremMethods = [
      'lorem.word',
      'lorem.words',
      'lorem.sentence',
      'lorem.sentences',
      'lorem.paragraph',
      'lorem.paragraphs',
      'lorem.lines'
    ];
    const randomLoremMethod = this.pure.random.arrayElement(loremMethods);

    return this.pure.fake.parse(`{{${randomLoremMethod}}}`);
  }

  lines(lineCount) {
    const def = lineCount || this.pure.random.number({ min: 1, max: 5 });

    return this.pure.lorem.sentences({ sentenceCount: def, separator: '\n' });
  }
}
