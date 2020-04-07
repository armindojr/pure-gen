/**
 *
 * @namespace pure.date
 */
function pureDate(pure) {
    const self = this;
    /**
     * past
     * 
     * @description Generate random past date from today or parameters
     * @param {number} [years= 1] How many years the date possible be before refDate
     * @param {date} [refDate= Today] Reference to generate past this time
     * @method pure.date.past
     * @example
     * console.log(pure.date.past());
     * //outputs: "2020-01-20T10:01:25.062Z"
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
        // some time from now to N years ago, in milliseconds
        past -= pure.random.number(range);
        date.setTime(past);

        return date;
    };

    /**
     * future
     * 
     * @description Generate random future date from today or parameters
     * @param {number} [years= 1] How many years the date possible be after refDate 
     * @param {date} [refDate= Today] Reference to generate future this time 
     * @method pure.date.future
     * @example
     * console.log(pure.date.future());
     * //outputs: "2021-02-13T02:06:21.464Z"
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
        // some time from now to N years later, in milliseconds
        future += pure.random.number(range);
        date.setTime(future);

        return date;
    };

    /**
     * between
     * 
     * @description Generate random date between two reference dates
     * @param {date} from 
     * @param {date} to 
     * @method pure.date.between
     * @example
     * console.log(pure.date.between('2015-10-18T06:40:58.676Z', '2021-02-13T02:06:21.464Z'));
     * //outputs: "2016-03-17T11:42:53.411Z"
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
     * @description Generate array with random dates between two reference dates
     * @param {date} from 
     * @param {date} to 
     * @param {num} [num= 3] Number of samples to return in array
     * @method pure.date.arrayBetween
     * @example
     * console.log(pure.date.arrayBetween('2015-10-18T06:40:58.676Z', '2021-02-13T02:06:21.464Z'));
     * //outputs: "[2017-02-15T11:32:19.373Z,2018-06-16T16:23:39.697Z,2019-10-15T21:14:59.697Z]"
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
     * @description Generate random recent date from today or parameters
     * @param {number} [days= 1] Reference to generate past date
     * @param {date} [refDate= Today] Reference date to use
     * @method pure.date.recent
     * @example
     * console.log(pure.date.recent());
     * //outputs: "2020-04-05T20:16:55.855Z"
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
        // some time from now to N days ago, in milliseconds
        future -= pure.random.number(range);
        date.setTime(future);

        return date;
    };

    /**
     * soon
     * 
     * @description Generate random recent date from today or parameters
     * @param {number} [days= 1] Reference to generate future date
     * @param {date} [refDate= Today] Reference date to use
     * @method pure.date.soon
     * @example
     * console.log(pure.date.soon());
     * //outputs: "2020-04-06T08:10:13.362Z"
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
        // some time from now to N days later, in milliseconds
        future += pure.random.number(range);
        date.setTime(future);

        return date;
    };

    /**
     * month
     * 
     * @description Generate random month
     * @param {object} [options]
     * @param {boolean} [options.abbr= false] Abbreviated return
     * @param {boolean} [options.context= false] 
     * @method pure.date.month
     * @example
     * console.log(pure.date.month());
     * //outputs: "June"
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
     * @description Generate random weekday
     * @param {object} [options] 
     * @param {boolean} [options.abbr= false] Abbreviated return
     * @param {boolean} [options.context= false] 
     * @method pure.date.weekday
     * @example
     * console.log(pure.date.weekday());
     * //outputs: "Wednesday"
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
