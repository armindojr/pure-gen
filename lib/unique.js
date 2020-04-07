const uniqueExec = require('../vendor/unique');

function Unique() {
    // initialize unique module class variables

    // maximum time unique.exec will attempt to run before aborting
    const maxTime = 10;

    // maximum retries unique.exec will recurse before abortings ( max loop depth )
    const maxRetries = 10;

    // TODO: Document functionality
    this.unique = function unique(method, args, opts) {
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
