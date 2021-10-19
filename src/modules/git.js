class Git {
    constructor(pure) {
        this.branch = () => {
            const noun = pure.hacker.noun().replace(' ', '-');
            const verb = pure.hacker.verb().replace(' ', '-');
            return `${noun}-${verb}`;
        };

        this.commitEntry = (options = {}) => {
            let entry = 'commit {{git.commitSha}}\r\n';

            if (options.merge) {
                entry += 'Merge: {{git.shortSha}} {{git.shortSha}}\r\n';
            }

            entry += 'Author: {{name.firstName}} {{name.lastName}} <{{internet.email}}>\r\n';
            entry += `Date: ${pure.date.recent().toString()}\r\n`;
            entry += '\r\n\xa0\xa0\xa0\xa0{{git.commitMessage}}\r\n';

            return pure.fake(entry);
        };

        this.commitMessage = () => {
            const noun = pure.hacker.noun().replace(' ', '-');
            const verb = pure.hacker.verb().replace(' ', '-');
            const adjective = pure.hacker.adjective().replace(' ', '-');
            return `${verb} ${adjective} ${noun}`;
        };

        this.commitSha = () => {
            const template = pure.helpers.repeatString({ string: '#', num: 40 });
            const commit = pure.helpers.replaceSymbolWithHex({ string: template });

            return commit;
        };

        this.shortSha = () => {
            const template = pure.helpers.repeatString({ string: '#', num: 7 });
            const shortSha = pure.helpers.replaceSymbolWithHex({ string: template });

            return shortSha;
        };
    }
}

module.exports = Git;
