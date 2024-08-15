export class Unique {
  constructor(pure) {
    this.pure = pure;

    /**
     * global results store
     * currently uniqueness is global to entire pure instance
     * this means that pure should currently *never* return
     * duplicate values across all API methods when using `pure.unique`
     * it's possible in the future that some users may want to scope
     * found per function call instead of pure instance
     */
    this.globalFound = {};

    /**
     * scoped results store
     */
    this.scopedFound = {};

    /**
     * global exclude list of results
     * defaults to nothing excluded
     */
    this.exclude = [];

    this.startTime = 0;

    this.currentIterations = 0;

    /**
     * uniqueness compare function
     * default behavior is to check value as key against object hash
     */
    this.defaultCompare = (obj, key) => {
      if (typeof obj[key] === 'undefined') {
        return -1;
      }

      return 0;
    };

    this.errorMessage = (now, code) => {
      throw new Error(`
            Started time: ${now}
            
            ${code} for uniqueness check.
            
            May not be able to generate any more unique values with current settings.
            Try adjusting maxTime or maxRetries parameters for pure.unique()`);
    };

    this.setStartTime = () => {
      if (this.startTime === 0) {
        this.startTime = new Date().getTime();
      }
    };

    this.setCurrentIterations = () => {
      if (!this.currentIterations > 0) {
        this.currentIterations = 0;
      }
    };
  }

  exec(method, args, opts = {}) {
    const options = opts;
    const now = new Date().getTime();

    this.setStartTime();
    this.setCurrentIterations();

    if (typeof options.maxTime !== 'number') {
      options.maxTime = 50;
    }
    if (typeof options.maxRetries !== 'number') {
      options.maxRetries = 500;
    }
    if (typeof options.scope !== 'string') {
      options.scope = undefined;
    }

    options.exclude = options.exclude || this.exclude;
    options.compare = options.compare || this.defaultCompare;

    let found = {};

    // scope definition
    if (options.scope) {
      if (!this.scopedFound[options.scope]) {
        this.scopedFound[options.scope] = {};
      }
      found = this.scopedFound[options.scope];
    } else {
      found = this.globalFound;
    }

    // support single exclude argument as string
    if (typeof options.exclude === 'string') {
      options.exclude = [options.exclude];
    }

    if (now - this.startTime >= options.maxTime) {
      return this.errorMessage(now, `Exceeded maxTime: ${options.maxTime}`);
    }

    if (this.currentIterations >= options.maxRetries) {
      return this.errorMessage(now, `Exceeded maxRetries: ${options.maxRetries}`);
    }

    // execute the provided method to find a potential satifised value
    const result = method.apply({ pure: this.pure }, args);

    // if the result has not been previously found, add it to the found array and return the value as it's unique
    if (options.compare(found, result) === -1 && options.exclude.indexOf(result) === -1) {
      found[result] = result;
      this.exclude = [];
      this.startTime = 0;
      this.currentIterations = 0;

      return result;
    }

    this.currentIterations += 1;

    return this.exec(method, args, options);
  }

  clear(scope) {
    if (scope) {
      if (this.scopedFound[scope]) {
        this.scopedFound[scope] = undefined;
      }
    } else {
      this.globalFound = {};
    }
  }
}
