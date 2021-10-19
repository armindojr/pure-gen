class Markdown {
    constructor(pure) {
        this.header = (num = 1) => {
            const head = pure.helpers.repeatString({ string: '#', num });
            return `${head} ${pure.lorem.word()}`;
        };

        this.emphasis = (type) => {
            const types = ['_', '~', '*', '**'];
            const def = type || types[pure.random.number(types.length - 1)];
            const words = pure.lorem.words(3).split(' ');
            const position = pure.random.number(words.length - 1);

            words[position] = def + words[position] + def;

            return words.join(' ');
        };

        this.table = (num = 3) => {
            const table = [
                '| head1 | head2 | head3 |',
                '|:-----:|:-----:|:-----:|',
            ];

            for (let i = 0; num > i; i += 1) {
                const line = ['|', pure.lorem.words(3).split(' ').join('|'), '|'].join('');
                table.push(line);
            }

            return table.join('\n');
        };

        this.orderedList = (num = 3) => {
            const words = pure.lorem.words(num).split(' ');
            const list = [];

            words.forEach((word, index) => {
                list.push(`${index + 1}. ${word}`);
            });

            return list.join('\n');
        };

        this.unorderedList = (num = 3) => {
            const words = pure.lorem.words(num).split(' ');
            const list = [];

            words.forEach((word) => {
                list.push(`* ${word}`);
            });

            return list.join('\n');
        };

        this.inlineCode = () => `\` ${pure.lorem.word()} \``;

        this.blockCode = () => `\`\`\`javascript\n ${pure.lorem.word()} \n\`\`\``;
    }
}

module.exports = Markdown;
