
/**
 *
 * @namespace pure.markdown
 */
function Markdown(pure) {
    const self = this;
    // const Helpers = pure.helpers; unused

    /**
     * header
     *
     * @method pure.markdown.header
     * @param {number} num number of '#', defaults to 1
     */
    self.header = (num) => {
        let def = num;
        if (typeof def === 'undefined') { def = 1; }
        const head = new Array(def + 1).join('#');
        return [head, pure.lorem.word()].join(' ');
    };

    /**
     * emphasis
     *
     * @method pure.markdown.emphasis
     * @param {string} type emphasis
     */
    self.emphasis = (type) => {
        let def = type;
        const types = [
            '_',
            '~',
            '*',
            '**',
        ];
        const words = pure.lorem.words(3).split(' ');
        const position = pure.random.number(words.length - 1);
        if (typeof def === 'undefined') { def = types[pure.random.number(types.length - 1)]; }
        words[position] = def + words[position] + def;
        return words.join(' ');
    };

    /**
     * table
     *
     * @method pure.markdown.table
     * @param {number} num tabl rows
     */
    self.table = (num) => {
        let def = num;
        if (typeof def === 'undefined') { def = 3; }
        const table = [
            '| head1 | head2 | head3 |',
            '|:-----:|:-----:|:-----:|',
        ];
        for (let i = 0; def > i; i += 1) {
            const line = ['|', pure.lorem.words(3).split(' ').join('|'), '|'].join('');
            table.push(line);
        }
        return table.join('\n');
    };

    /**
     * orderedList
     *
     * @method pure.markdown.orderdList
     * @param {number} num of list
     */
    self.orderedList = (num) => {
        let def = num;
        if (typeof def === 'undefined') { def = 3; }
        const words = pure.lorem.words(def).split(' ');
        const list = [];
        words.forEach((word, index) => {
            list.push([index + 1, '. ', word].join(''));
        });
        return list.join('\n');
    };

    /**
     * unorderedList
     *
     * @method pure.markdown.unorderdList
     * @param {number} num of list
     */
    self.unorderedList = (num) => {
        let def = num;
        if (typeof def === 'undefined') { def = 3; }
        const words = pure.lorem.words(def).split(' ');
        const list = [];
        words.forEach((word) => {
            list.push(`* ${word}`);
        });
        return list.join('\n');
    };

    /**
     * inlineCode
     *
     * @method pure.markdown.inlineCode
     */
    self.inlineCode = () => ['`', pure.lorem.word(), '`'].join('');

    /**
     * blockCode
     *
     * @method pure.markdown.blockCode
     */
    self.blockCode = () => ['```javascript\n', pure.lorem.word(), '\n```'].join('');

    return self;
}

module.exports = Markdown;
