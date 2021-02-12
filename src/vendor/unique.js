/**
 * global results store
 * currently uniqueness is global to entire pure instance
 * this means that pure should currently *never* return duplicate values across all API methods when using `pure.unique`
 * it's possible in the future that some users may want to scope found per function call instead of pure instance
 */
let globalFound = {};

/**
 * scoped results store
 */
const scopedFound = {};

/**
 * global exclude list of results
 * defaults to nothing excluded
 */
const exclude = [];

/**
 * uniqueness compare function
 * default behavior is to check value as key against object hash
 */
const defaultCompare = (obj, key) => {
    if (typeof obj[key] === 'undefined') {
        return -1;
    }
    return 0;
};

function errorMessage(now, code) {
    throw new Error(`
    Started time: ${now}
    
    ${code} for uniqueness check.
    
    May not be able to generate any more unique values with current settings.
    Try adjusting maxTime or maxRetries parameters for pure.unique()`);
}

function clear(scope) {
    if (scope) {
        if (scopedFound[scope]) {
            scopedFound[scope] = undefined;
        }
    } else {
        globalFound = {};
    }
}

function exec(method, args, opts) {
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

    if (now - startTime >= opts.maxTime) {
        return errorMessage(now, `Exceeded maxTime:${opts.maxTime}`);
    }

    if (opts.currentIterations >= opts.maxRetries) {
        return errorMessage(now, `Exceeded maxRetries:${opts.maxRetries}`);
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

    return exec(method, args, opts);
}

module.exports = {
    errorMessage,
    clear,
    exec,
};
