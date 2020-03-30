
/**
 *
 * @namespace pure.lorem
 */
var Lorem = function (pure) {
  var self = this;
  var Helpers = pure.helpers;

  /**
   * generates a word of a specified length
   *
   * @method pure.lorem.word
   * @param {number} length length of the word that should be returned. Defaults to a random length
   */
  self.word = function (length) {
    var hasRightLength = function (word, l=length) { return word.length === l; };
    var properLengthWords = typeof length == 'undefined'
      ? pure.definitions.lorem.words
      : pure.definitions.lorem.words.filter(hasRightLength);

    var count = length;
    while (properLengthWords.length === 0 && count !== 0) {
      properLengthWords = pure.definitions.lorem.words.filter(word => word.length === count);
      count -= 1;
    }
      
    return pure.random.arrayElement(properLengthWords);
  };

  /**
   * generates a space separated list of words
   *
   * @method pure.lorem.words
   * @param {number} num number of words, defaults to 3
   */
  self.words = function (num) {
      if (typeof num == 'undefined') { num = 3; }
      var words = [];
      for (var i = 0; i < num; i++) {
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
  self.sentence = function (wordCount, range) {
      if (typeof wordCount == 'undefined') { wordCount = pure.random.number({ min: 3, max: 10 }); }
      // if (typeof range == 'undefined') { range = 7; }

      // strange issue with the node_min_test failing for captialize, please fix and add pure.lorem.back
      // return  pure.lorem.words(wordCount + Helpers.randomNumber(range)).join(' ').capitalize();

      var sentences = pure.definitions.lorem.sentences;
      var sentence;
      if (sentences instanceof Object && wordCount in sentences) {
        sentence = pure.random.arrayElement(sentences[wordCount]);
        if (sentence) {
          return sentence;
        }
      }
      sentence = pure.lorem.words(wordCount);
      return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
  };

  /**
   * slug
   *
   * @method pure.lorem.slug
   * @param {number} wordCount number of words, defaults to 3
   */
  self.slug = function (wordCount) {
      var words = pure.lorem.words(wordCount);
      return Helpers.slugify(words);
  };

  /**
   * sentences
   *
   * @method pure.lorem.sentences
   * @param {number} sentenceCount defautls to a random number between 2 and 6
   * @param {string} separator defaults to `' '`
   */
  self.sentences = function (sentenceCount, separator) {
      if (typeof sentenceCount === 'undefined') { sentenceCount = pure.random.number({ min: 2, max: 6 });}
      if (typeof separator == 'undefined') { separator = " "; }
      var sentences = [];
      for (sentenceCount; sentenceCount > 0; sentenceCount--) {
        sentences.push(pure.lorem.sentence());
      }
      return sentences.join(separator);
  };

  /**
   * paragraph
   *
   * @method pure.lorem.paragraph
   * @param {number} sentenceCount defaults to 3
   */
  self.paragraph = function (sentenceCount) {
      if (typeof sentenceCount == 'undefined') { sentenceCount = 3; }
      return pure.lorem.sentences(sentenceCount + pure.random.number(3));
  };

  /**
   * paragraphs
   *
   * @method pure.lorem.paragraphs
   * @param {number} paragraphCount defaults to 3
   * @param {string} separator defaults to `'\n \r'`
   */
  self.paragraphs = function (paragraphCount, separator) {
    if (typeof separator === "undefined") {
      separator = "\n \r";
    }
    if (typeof paragraphCount == 'undefined') { paragraphCount = 3; }
    var paragraphs = [];
    for (paragraphCount; paragraphCount > 0; paragraphCount--) {
        paragraphs.push(pure.lorem.paragraph());
    }
    return paragraphs.join(separator);
  }

  /**
   * returns random text based on a random lorem method
   *
   * @method pure.lorem.text
   * @param {number} times
   */
  self.text = function loremText (times) {
    var loremMethods = ['lorem.word', 'lorem.words', 'lorem.sentence', 'lorem.sentences', 'lorem.paragraph', 'lorem.paragraphs', 'lorem.lines'];
    var randomLoremMethod = pure.random.arrayElement(loremMethods);
    return pure.fake('{{' + randomLoremMethod + '}}');
  };

  /**
   * returns lines of lorem separated by `'\n'`
   *
   * @method pure.lorem.lines
   * @param {number} lineCount defaults to a random number between 1 and 5
   */
  self.lines = function lines (lineCount) {
    if (typeof lineCount === 'undefined') { lineCount = pure.random.number({ min: 1, max: 5 });}
    return pure.lorem.sentences(lineCount, '\n')
  };

  return self;
};


module["exports"] = Lorem;
