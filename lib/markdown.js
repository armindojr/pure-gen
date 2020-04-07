
/**
 *
 * @namespace pure.markdown
 */
function Markdown(pure) {
    const self = this;

    /**
     * header
     *
     * @description Generate random markdown header
     * @param {number} [num= 1] Number of heading tags '#'
     * @method pure.markdown.header
     * @example
     * console.log(pure.markdown.header());
     * //outputs: "# quia"
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
     * @description Generate random markdown emphasis
     * @param {string} [type= random] Emphasis to use ['_','~','*','**']
     * @method pure.markdown.emphasis
     * @example
     * console.log(pure.markdown.emphasis());
     * //outputs: "modi *hic* tenetur"
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
     * @description Generate random markdown table
     * @param {number} [num= 3] Table rows
     * @method pure.markdown.table
     * @example
     * console.log(pure.markdown.table());
     * //outputs: "| head1 | head2 | head3 |"
     * // "|:-----:|:-----:|:-----:|"
     * // "|officiis|autem|excepturi|"
     * // "|necessitatibus|quia|natus|"
     * // "|omnis|corporis|repudiandae|"
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
     * @description Generate random markdown ordered list
     * @param {number} [num= 3] Number of itens in list
     * @method pure.markdown.orderedList
     * @example
     * console.log(pure.markdown.orderedList());
     * //outputs: "1. dolor"
     * // "2. iste"
     * // "3. provident"
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
     * @description Generate random markdown unordered list
     * @param {number} [num= 3] Number of itens in list
     * @method pure.markdown.unorderedList
     * @example
     * console.log(pure.markdown.unorderedList());
     * //outputs: "* eveniet"
     * // "* nemo"
     * // "* iusto"
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
     * @description Generate random markdown inline code
     * @method pure.markdown.inlineCode
     * @example
     * console.log(pure.markdown.inlineCode());
     * //outputs: "`officia`"
     */
    self.inlineCode = () => ['`', pure.lorem.word(), '`'].join('');

    /**
     * blockCode
     *
     * @description Generate random markdown block code
     * @method pure.markdown.blockCode
     * @example
     * console.log(pure.markdown.blockCode());
     * //outputs: "```javascript"
     * // "quod"
     * // "```"
     */
    self.blockCode = () => ['```javascript\n', pure.lorem.word(), '\n```'].join('');

    return self;
}

module.exports = Markdown;
