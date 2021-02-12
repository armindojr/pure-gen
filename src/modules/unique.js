const unique = require('../vendor/unique');

/**
 *
 * @namespace pure.unique
 */
class Unique {
    constructor() {
        /**
         * exec
         *
         * @description Generate unique entries passing specific method, normally used inside loops
         * @param {Function} method Method that will be executed to generate data
         * @param {Array} args Arguments that will be passed to method
         * @param {Object} [opts= empty] Options to be passed to unique function
         * @param {Number} [opts.maxTime= 3] Maximum time unique.exec will attempt to run before aborting
         * @param {Number} [opts.maxRetries= 50] Maximum retries unique.exec will recurse before abortings
         * ( max loop depth )
         * @param {Array} [opts.exclude= empty] Global exclude list of results
         * @param {Function} [opts.compare] Uniqueness compare function, default behavior is to check
         *  value as key against object hash
         * @param {String} [opts.scope = null] Define what scope unique will be added, if nothing
         * is passed then it will consider global scope
         * @method pure.unique.exec
         * @example
         * let arr = [];
         *
         * for (let index = 0; index < 5; index++) {
         *     arr.push(pure.unique.exec(pure.internet.email))
         * }
         *
         * console.log(arr);
         * //outputs: [
         * // 'wilhelm38@yahoo.com',
         * // 'bruce.prosacco@gmail.com',
         * // 'amari.lindgren@gmail.com',
         * // 'maxine21@yahoo.com',
         * // 'austen9@yahoo.com'
         * //]
         *
         */
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

        /**
         * clear
         *
         * @description Clear previously generated entries to use inside another scope
         * @param {String} [scope= null] Define what scope unique will cleared, if nothing
         * is passed then it will consider global scope
         * @method pure.unique.clear
         * @example
         * let result = pure.unique.exec(pure.internet.protocol, [], {
         *      exclude: ['https'],
         * });
         *
         * console.log(result);
         * //outputs: http;
         *
         * pure.unique.clear();
         *
         * let result2 = pure.unique.exec(pure.internet.protocol, [], {
         *      exclude: ['https'],
         * });
         *
         * console.log(result2);
         * //outputs: http;
         *
         */
        this.clear = (scope) => {
            if (typeof scope !== 'string') {
                return unique.clear(null);
            }

            return unique.clear(scope);
        };
    }
}

module.exports = Unique;
