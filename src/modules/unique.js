const uniqueExec = require('../../vendor/unique');

/**
 *
 * @namespace pure.unique
 */
function Unique() {
    // initialize unique module class variables

    // maximum time unique.exec will attempt to run before aborting
    const maxTime = 10;

    // maximum retries unique.exec will recurse before abortings ( max loop depth )
    const maxRetries = 10;

    /**
     * unique
     *
     * @description Generate unique entries passing specific method, normally used inside loops
     * @param {Function} method Method that will be executed to generate data
     * @param {Array} args Arguments that will be passed to method
     * @param {Object} [opts= empty] Options to be passed to unique function
     * @param {Number} [opts.maxTime= 3]
     * @param {Number} [opts.maxRetries= 50]
     * @param {Array} [opts.exclude= empty] Global exclude list of results
     * @param {Function} [opts.compare] Uniqueness compare function, default behavior is to check
     *  value as key against object hash
     * @method pure.unique
     * @example
     * let arr = [];
     *
     * for (let index = 0; index < 5; index++) {
     *     arr.push(pure.unique(pure.internet.email))
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
    this.unique = (method, args, opts) => {
        const options = opts || {};
        options.startTime = new Date().getTime();
        if (typeof options.maxTime !== 'number') {
            options.maxTime = maxTime;
        }
        if (typeof options.maxRetries !== 'number') {
            options.maxRetries = maxRetries;
        }
        options.currentIterations = 0;
        return uniqueExec.exec(method, args, options);
    };
}

module.exports = Unique;
