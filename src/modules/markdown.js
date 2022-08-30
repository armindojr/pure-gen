export default class Markdown {
    constructor(pure) {
        this.pure = pure;
    }

    header(num = 1) {
        const head = this.pure.helpers.repeatString({ string: '#', num });

        return `${head} ${this.pure.lorem.word()}`;
    }

    emphasis(type) {
        const types = ['_', '~', '*', '**'];
        const def = type || types[this.pure.random.number(types.length - 1)];
        const words = this.pure.lorem.words(3).split(' ');
        const position = this.pure.random.number(words.length - 1);
        words[position] = def + words[position] + def;

        return words.join(' ');
    }

    table(num = 3) {
        const table = [
            '| head1 | head2 | head3 |',
            '|:-----:|:-----:|:-----:|',
        ];

        for (let i = 0; num > i; i += 1) {
            const line = ['|', this.pure.lorem.words(3).split(' ').join('|'), '|'].join('');
            table.push(line);
        }

        return table.join('\n');
    }

    orderedList(num = 3) {
        const words = this.pure.lorem.words(num).split(' ');
        const list = [];

        words.forEach((word, index) => {
            list.push(`${index + 1}. ${word}`);
        });

        return list.join('\n');
    }

    unorderedList(num = 3) {
        const words = this.pure.lorem.words(num).split(' ');
        const list = [];

        words.forEach((word) => {
            list.push(`* ${word}`);
        });

        return list.join('\n');
    }

    inlineCode() {
        return `\` ${this.pure.lorem.word()} \``;
    }

    blockCode() {
        return `\`\`\`javascript\n ${this.pure.lorem.word()} \n\`\`\``;
    }
}
