/**
 *
 * @namespace pure.date
 */
function pureDate(pure) {
    const self = this;
    /**
   * past
   *
   * @method pure.date.past
   * @param {number} years
   * @param {date} refDate
   */
    self.past = (years, refDate) => {
        let date = new Date();
        if (typeof refDate !== 'undefined') {
            date = new Date(Date.parse(refDate));
        }

        const range = {
            min: 1000,
            max: (years || 1) * 365 * 24 * 3600 * 1000,
        };

        let past = date.getTime();
        past -= pure.random.number(range); // some time from now to N years ago, in milliseconds
        date.setTime(past);

        return date;
    };

    /**
   * future
   *
   * @method pure.date.future
   * @param {number} years
   * @param {date} refDate
   */
    self.future = (years, refDate) => {
        let date = new Date();
        if (typeof refDate !== 'undefined') {
            date = new Date(Date.parse(refDate));
        }

        const range = {
            min: 1000,
            max: (years || 1) * 365 * 24 * 3600 * 1000,
        };

        let future = date.getTime();
        future += pure.random.number(range); // some time from now to N years later, in milliseconds
        date.setTime(future);

        return date;
    };

    /**
   * between
   *
   * @method pure.date.between
   * @param {date} from
   * @param {date} to
   */
    self.between = (from, to) => {
        const fromMilli = Date.parse(from);
        const dateOffset = pure.random.number(Date.parse(to) - fromMilli);

        const newDate = new Date(fromMilli + dateOffset);

        return newDate;
    };

    /**
   * arrayBetween
   *
   * @method pure.date.arrayBetween
   * @param {date} from
   * @param {date} to
   * @param {num} num number of samples to return in array
   */
    self.arrayBetween = (from, to, num) => {
        let def = num;
        if (typeof def === 'undefined') {
            def = 3;
        }
        const newDates = [];
        let fromMilli = Date.parse(from);
        const dateOffset = (Date.parse(to) - fromMilli) / (def + 1);
        let lastDate = from;
        for (let i = 0; i < def; i += 1) {
            fromMilli = Date.parse(lastDate);
            lastDate = new Date(fromMilli + dateOffset);
            newDates.push(lastDate);
        }
        return newDates;
    };

    /**
   * recent
   *
   * @method pure.date.recent
   * @param {number} days
   * @param {date} refDate
   */
    self.recent = (days, refDate) => {
        let date = new Date();
        if (typeof refDate !== 'undefined') {
            date = new Date(Date.parse(refDate));
        }

        const range = {
            min: 1000,
            max: (days || 1) * 24 * 3600 * 1000,
        };

        let future = date.getTime();
        future -= pure.random.number(range); // some time from now to N days ago, in milliseconds
        date.setTime(future);

        return date;
    };

    /**
   * soon
   *
   * @method pure.date.soon
   * @param {number} days
   * @param {date} refDate
   */
    self.soon = (days, refDate) => {
        let date = new Date();
        if (typeof refDate !== 'undefined') {
            date = new Date(Date.parse(refDate));
        }

        const range = {
            min: 1000,
            max: (days || 1) * 24 * 3600 * 1000,
        };

        let future = date.getTime();
        future += pure.random.number(range); // some time from now to N days later, in milliseconds
        date.setTime(future);

        return date;
    };

    /**
   * month
   *
   * @method pure.date.month
   * @param {object} options
   */
    self.month = (options) => {
        const opt = options || {};

        let type = 'wide';
        if (opt.abbr) {
            type = 'abbr';
        }
        if (opt.context && typeof pure.definitions.date.month[`${type}_context`] !== 'undefined') {
            type += '_context';
        }

        const source = pure.definitions.date.month[type];

        return pure.random.arrayElement(source);
    };

    /**
   * weekday
   *
   * @param {object} options
   * @method pure.date.weekday
   */
    self.weekday = (options) => {
        const opt = options || {};

        let type = 'wide';
        if (opt.abbr) {
            type = 'abbr';
        }
        if (opt.context && typeof pure.definitions.date.weekday[`${type}_context`] !== 'undefined') {
            type += '_context';
        }

        const source = pure.definitions.date.weekday[type];

        return pure.random.arrayElement(source);
    };

    return self;
}

module.exports = pureDate;
