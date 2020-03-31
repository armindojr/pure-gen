/**
 * @namespace pure.git
 */

function Git(pure) {
    const self = this;
    const f = pure.fake;

    const hexChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

    /**
   * branch
   *
   * @method pure.git.branch
   */
    self.branch = () => {
        const noun = pure.hacker.noun().replace(' ', '-');
        const verb = pure.hacker.verb().replace(' ', '-');
        return `${noun}-${verb}`;
    };

    /**
   * commitEntry
   *
   * @method pure.git.commitEntry
   * @param {object} options
   */
    self.commitEntry = (options) => {
        const opt = options || {};

        let entry = 'commit {{git.commitSha}}\r\n';

        if (opt.merge || (pure.random.number({ min: 0, max: 4 }) === 0)) {
            entry += 'Merge: {{git.shortSha}} {{git.shortSha}}\r\n';
        }

        entry += 'Author: {{name.firstName}} {{name.lastName}} <{{internet.email}}>\r\n';
        entry += `Date: ${pure.date.recent().toString()}\r\n`;
        entry += '\r\n\xa0\xa0\xa0\xa0{{git.commitMessage}}\r\n';

        return f(entry);
    };

    /**
   * commitMessage
   *
   * @method pure.git.commitMessage
   */
    self.commitMessage = () => {
        const format = '{{hacker.verb}} {{hacker.adjective}} {{hacker.noun}}';
        return f(format);
    };

    /**
   * commitSha
   *
   * @method pure.git.commitSha
   */
    self.commitSha = () => {
        let commit = '';

        for (let i = 0; i < 40; i += 1) {
            commit += pure.random.arrayElement(hexChars);
        }

        return commit;
    };

    /**
   * shortSha
   *
   * @method pure.git.shortSha
   */
    self.shortSha = () => {
        let shortSha = '';

        for (let i = 0; i < 7; i += 1) {
            shortSha += pure.random.arrayElement(hexChars);
        }

        return shortSha;
    };

    return self;
}

module.exports = Git;
