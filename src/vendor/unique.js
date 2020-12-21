// the `unique` module
const unique = {};

// global results store
// currently uniqueness is global to entire pure instance
// this means that pure should currently *never* return duplicate values across all API methods when using `pure.unique`
// it's possible in the future that some users may want to scope found per function call instead of pure instance
let globalFound = {};

// scoped results store
const scopedFound = {};

// global exclude list of results
// defaults to nothing excluded
const exclude = [];

// current iteration or retries of unique.exec ( current loop depth )
const currentIterations = 0;

// uniqueness compare function
// default behavior is to check value as key against object hash
const defaultCompare = (obj, key) => {
    if (typeof obj[key] === 'undefined') {
        return -1;
    }
    return 0;
};

// common error handler for messages
unique.errorMessage = (now, code, opts) => {
    const err = `${code} for uniqueness check \n\nMay not be able to generate any more unique values with current settings. \nTry adjusting maxTime or maxRetries parameters for pure.unique()`;
    throw new Error(err);
};

// clear found values, scoped ones or global
unique.clear = (scope) => {
    if (scope) {
        if (scopedFound[scope]) {
            scopedFound[scope] = undefined;
        }
    } else {
        globalFound = {};
    }
};

unique.exec = (method, args, opts) => {
    const now = new Date().getTime();

    opts = opts || {};
    opts.maxTime = opts.maxTime || 3;
    opts.maxRetries = opts.maxRetries || 50;
    opts.exclude = opts.exclude || exclude;
    opts.compare = opts.compare || defaultCompare;

    let found;
    if (opts.scope) {
        if (!scopedFound[opts.scope]) {
            scopedFound[opts.scope] = {};
        }
        found = scopedFound[opts.scope];
    } else {
        found = globalFound;
    }

    if (typeof opts.currentIterations !== 'number') {
        opts.currentIterations = 0;
    }

    if (typeof opts.startTime === 'undefined') {
        opts.startTime = new Date().getTime();
    }

    const { startTime } = opts;

    // support single exclude argument as string
    if (typeof opts.exclude === 'string') {
        opts.exclude = [opts.exclude];
    }

    if (opts.currentIterations > 0) {
        // log iterations ?
    }

    if (now - startTime >= opts.maxTime) {
        return unique.errorMessage(now, `Exceeded maxTime:${opts.maxTime}`, opts);
    }

    if (opts.currentIterations >= opts.maxRetries) {
        return unique.errorMessage(now, `Exceeded maxRetries:${opts.maxRetries}`, opts);
    }

    // execute the provided method to find a potential satifised value
    const result = method.apply(this, args);

    // if the result has not been previously found, add it to the found array and return the value as it's unique
    if (opts.compare(found, result) === -1 && opts.exclude.indexOf(result) === -1) {
        found[result] = result;
        opts.currentIterations = 0;
        return result;
    }
    opts.currentIterations += 1;
    return unique.exec(method, args, opts);
};

module.exports = unique;
