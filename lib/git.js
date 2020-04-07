/**
 * @namespace pure.git
 */

function Git(pure) {
    const self = this;

    const hexChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

    /**
     * branch
     * 
     * @description Return random branch name
     * @method pure.git.branch
     * @example
     * console.log(pure.git.branch());
     * //outputs: "alarm-synthesize"
     */
    self.branch = () => {
        const noun = pure.hacker.noun().replace(' ', '-');
        const verb = pure.hacker.verb().replace(' ', '-');
        return `${noun}-${verb}`;
    };

    /**
     * commitEntry
     * 
     * @description Return random commit entry like message
     * @param {object} options
     * @param {boolean} [options.merge=false] Define whether the merge string is displayed or not
     * @method pure.git.commitEntry
     * @example
     * console.log(pure.git.commitEntry());
     * //outputs:
     * // commit a21acf110f436e274af4997a198b38412bb8901a
     * // Author: Buddy Morissette <Horacio.Nolan@hotmail.com>
     * // Date: Sun Apr 05 2020 13:18:05 GMT-0300 (GMT-03:00)
     * // 
     * //     connect redundant pixel
     * //
     */
    self.commitEntry = (options) => {
        const opt = options || {};

        let entry = 'commit {{git.commitSha}}\r\n';

        if (opt.merge) {
            entry += 'Merge: {{git.shortSha}} {{git.shortSha}}\r\n';
        }

        entry += 'Author: {{name.firstName}} {{name.lastName}} <{{internet.email}}>\r\n';
        entry += `Date: ${pure.date.recent().toString()}\r\n`;
        entry += '\r\n\xa0\xa0\xa0\xa0{{git.commitMessage}}\r\n';

        return pure.fake(entry);
    };

    /**
     * commitMessage
     * 
     * @description Return random commit message
     * @method pure.git.commitMessage
     * @example
     * console.log(pure.git.commitMessage());
     * //outputs: "compress 1080p bus"
     */
    self.commitMessage = () => {
        const format = '{{hacker.verb}} {{hacker.adjective}} {{hacker.noun}}';
        return pure.fake(format);
    };

    /**
     * commitSha
     * 
     * @description Return random commit sha
     * @method pure.git.commitSha
     * @example
     * console.log(pure.git.commitSha());
     * //outputs: "4cadd50bcdde037b924e6614b1d62813ff459fe5"
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
     * @description Return random short sha
     * @method pure.git.shortSha
     * @example
     * console.log(pure.git.shortSha());
     * //outputs: "f1f9853"
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
