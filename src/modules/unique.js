const unique = require('../vendor/unique');

class Unique {
    constructor() {
        this.exec = (method, args, opts = {}) => {
            const options = opts;
            options.startTime = new Date().getTime();

            if (typeof options.maxTime !== 'number') {
                options.maxTime = 3;
            }
            if (typeof options.maxRetries !== 'number') {
                options.maxRetries = 50;
            }
            if (typeof options.scope !== 'string') {
                options.scope = null;
            }

            options.currentIterations = 0;

            return unique.exec(method, args, options);
        };

        this.clear = (scope) => {
            if (typeof scope !== 'string') {
                return unique.clear(null);
            }

            return unique.clear(scope);
        };
    }
}

module.exports = Unique;
