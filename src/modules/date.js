export default class pureDate {
  constructor(pure) {
    this.pure = pure;
  }

  past(options) {
    const def = options || {};
    const { years = 1, refDate } = def;
    let date = new Date();

    if (typeof refDate !== 'undefined') {
      date = new Date(Date.parse(refDate));
    }

    const range = {
      min: 1000,
      max: years * 365 * 24 * 3600 * 1000
    };

    let past = date.getTime();
    // some time from now to N years ago, in milliseconds
    past -= this.pure.random.number(range);
    date.setTime(past);

    return date;
  }

  future(options) {
    const def = options || {};
    const { years = 1, refDate } = def;
    let date = new Date();

    if (typeof refDate !== 'undefined') {
      date = new Date(Date.parse(refDate));
    }

    const range = {
      min: 1000,
      max: years * 365 * 24 * 3600 * 1000
    };

    let future = date.getTime();
    // some time from now to N years later, in milliseconds
    future += this.pure.random.number(range);
    date.setTime(future);

    return date;
  }

  between(options) {
    const def = options || {};
    const { from = this.pure.date.past({ years: 5 }), to = new Date() } = def;
    const fromMilli = Date.parse(from);
    const dateOffset = this.pure.random.number(Date.parse(to) - fromMilli);

    return new Date(fromMilli + dateOffset);
  }

  arrayBetween(options) {
    const def = options || {};
    const { from, to, num = 3 } = def;
    const results = [];

    for (let index = 0; index < num; index += 1) {
      const newDate = this.pure.unique.exec(this.pure.date.between, [{ from, to }]);
      results.push(newDate);
    }

    results.sort((a, b) => new Date(a) - new Date(b));

    return results;
  }

  recent(options) {
    const def = options || {};
    const { days = 1, refDate } = def;
    let date = new Date();

    if (typeof refDate !== 'undefined') {
      date = new Date(Date.parse(refDate));
    }

    const range = {
      min: 1000,
      max: days * 24 * 3600 * 1000
    };

    let future = date.getTime();
    // some time from now to N days ago, in milliseconds
    future -= this.pure.random.number(range);
    date.setTime(future);

    return date;
  }

  soon(options) {
    const def = options || {};
    const { days = 1, refDate } = def;
    let date = new Date();

    if (typeof refDate !== 'undefined') {
      date = new Date(Date.parse(refDate));
    }

    const range = {
      min: 1000,
      max: days * 24 * 3600 * 1000
    };

    let future = date.getTime();
    // some time from now to N days later, in milliseconds
    future += this.pure.random.number(range);
    date.setTime(future);

    return date;
  }

  // TODO: Review context parameter and write on docs
  month(options) {
    const def = options || {};
    let type = 'wide';

    if (def.abbr) {
      type = 'abbr';
    }

    if (def.context && typeof this.pure.registeredModules.date.month[`${type}Context`] !== 'undefined') {
      type += 'Context';
    }

    const source = this.pure.registeredModules.date.month[type];

    return this.pure.random.arrayElement(source);
  }

  // TODO: Review context parameter and write on docs
  weekday(options) {
    const def = options || {};
    let type = 'wide';

    if (def.abbr) {
      type = 'abbr';
    }

    if (def.context && typeof this.pure.registeredModules.date.weekday[`${type}Context`] !== 'undefined') {
      type += 'Context';
    }

    const source = this.pure.registeredModules.date.weekday[type];

    return this.pure.random.arrayElement(source);
  }

  birthDay(options) {
    const def = options || {};
    let { minAge = 18, maxAge = 60 } = def;

    if (minAge > maxAge) {
      minAge = maxAge;
      maxAge = minAge;
    }

    const actualYear = new Date().getFullYear();
    const minYear = actualYear - minAge;
    const maxYear = actualYear - maxAge;
    const minDateParsed = new Date(`${minYear}-12-31`);
    const maxDateParsed = new Date(`${maxYear}-01-01`);

    return this.pure.date.between({ from: minDateParsed, to: maxDateParsed });
  }
}
