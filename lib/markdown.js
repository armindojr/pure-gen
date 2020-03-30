
/**
 *
 * @namespace pure.markdown
 */
var Markdown = function (pure) {
    var self = this;
    var Helpers = pure.helpers;
  
    /**
     * header
     *
     * @method pure.markdown.header
     * @param {number} num number of '#', defaults to 1
     */
    self.header = function (num) {
      if (typeof num == 'undefined') { num = 1; }
      var head = new Array(num + 1).join("#")
      return [head, pure.lorem.word()].join(' ')
    }
  
    /**
     * emphasis
     *
     * @method pure.markdown.emphasis
     * @param {string} type emphasis
     */
    self.emphasis = function (type) {
      var types = [
        '_',
        '~',
        '*',
        '**'
      ];
      var words = pure.lorem.words(3).split(' ')
      var position = pure.random.number(words.length - 1);
      if (typeof type == 'undefined') { type = types[pure.random.number(types.length - 1)] }
      words[position] = type + words[position] + type;
      return words.join(' ')
    }
  
    /**
     * table
     *
     * @method pure.markdown.table
     * @param {number} num tabl rows
     */
    self.table = function (num) {
      if (typeof num == 'undefined') { num = 3 }
      var table = [
        "| head1 | head2 | head3 |",
        "|:-----:|:-----:|:-----:|"
      ];
      for (var i=0; num > i; i++) {
        var line = ["|", pure.lorem.words(3).split(' ').join("|"), "|"].join("");
        table.push(line);
      }
      return table.join("\n");
    }
  
    /**
     * orderedList
     *
     * @method pure.markdown.orderdList
     * @param {number} num of list
     */
    self.orderedList = function (num) {
      if (typeof num == 'undefined') { num = 3 }
      var words = pure.lorem.words(num).split(' ');
      var list = [];
      words.forEach(function (word, index) {
        list.push([index+1, ". ", word].join(''))
      })
      return list.join('\n')
    }
  
    /**
     * unorderedList
     *
     * @method pure.markdown.unorderdList
     * @param {number} num of list
     */
    self.unorderedList = function (num) {
      if (typeof num == 'undefined') { num = 3 }
      var words = pure.lorem.words(num).split(' ');
      var list = [];
      words.forEach(function (word, index) {
        list.push(`* ${word}`)
      })
      return list.join('\n')
    }
  
    /**
     * inlineCode
     *
     * @method pure.markdown.inlineCode
     */
    self.inlineCode = function () {
      return ['`', pure.lorem.word(), '`'].join('')
    }
  
    /**
     * blockCode
     *
     * @method pure.markdown.blockCode
     */
    self.blockCode = function () {
      return ['```javascript\n', pure.lorem.word(), '\n```'].join('')
    }
  
    return self;
  }
  
  module["exports"] = Markdown;