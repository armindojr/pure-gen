export default class Git {
    constructor(pure) {
        this.pure = pure;
    }

    branch() {
        const noun = this.pure.hacker.noun().replace(' ', '-');
        const verb = this.pure.hacker.verb().replace(' ', '-');

        return `${noun}-${verb}`;
    }

    commitEntry(options = {}) {
        let entry = 'commit {{git.commitSha}}\r\n';

        if (options.merge) {
            entry += 'Merge: {{git.shortSha}} {{git.shortSha}}\r\n';
        }

        entry += 'Author: {{name.firstName}} {{name.lastName}} <{{internet.email}}>\r\n';
        entry += `Date: ${this.pure.date.recent().toString()}\r\n`;
        entry += '\r\n\xa0\xa0\xa0\xa0{{git.commitMessage}}\r\n';

        return this.pure.fake.parse(entry);
    }

    commitMessage() {
        const noun = this.pure.hacker.noun().replace(' ', '-');
        const verb = this.pure.hacker.verb().replace(' ', '-');
        const adjective = this.pure.hacker.adjective().replace(' ', '-');

        return `${verb} ${adjective} ${noun}`;
    }

    commitSha() {
        const template = this.pure.helpers.repeatString({ string: '#', num: 40 });
        const commit = this.pure.helpers.replaceSymbolWithHex({ string: template });

        return commit;
    }

    shortSha() {
        const template = this.pure.helpers.repeatString({ string: '#', num: 7 });
        const shortSha = this.pure.helpers.replaceSymbolWithHex({ string: template });

        return shortSha;
    }
}
