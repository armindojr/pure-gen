/**
 *
 * @namespace pure.date
 */
class pureDate {
    constructor(pure) {
        /**
         * past
         *
         * @description Generate random past date from today or parameters
         * @param {object} [options= {}] Options to be passed
         * @param {Number} [options.years= 1] How many years the date possible be before refDate
         * @param {date} [options.refDate= Today] Reference to generate past this time
         * @method pure.date.past
         * @example
         * console.log(pure.date.past());
         * //outputs: "2020-01-20T10:01:25.062Z"
         */
        this.past = (options = {}) => {
            const { years = 1, refDate } = options;
            let date = new Date();

            if (typeof refDate !== 'undefined') {
                date = new Date(Date.parse(refDate));
            }

            const range = {
                min: 1000,
                max: years * 365 * 24 * 3600 * 1000,
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
         * @param {object} [options= {}] Options to be passed
         * @param {Number} [options.years= 1] How many years the date possible be after refDate
         * @param {date} [options.refDate= Today] Reference to generate future this time
         * @method pure.date.future
         * @example
         * console.log(pure.date.future());
         * //outputs: "2021-02-13T02:06:21.464Z"
         */
        this.future = (options = {}) => {
            const { years = 1, refDate } = options;
            let date = new Date();

            if (typeof refDate !== 'undefined') {
                date = new Date(Date.parse(refDate));
            }

            const range = {
                min: 1000,
                max: years * 365 * 24 * 3600 * 1000,
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
         * @param {object} [options= {}] Options to be passed
         * @param {date} [options.from= 5 years from today] Reference date to use
         * @param {date} [options.to= Today] Reference date to use
         * @method pure.date.between
         * @example
         * console.log(pure.date.between({ from: '2015-10-18T06:40:58.676Z', to: '2021-02-13T02:06:21.464Z' }));
         * //outputs: "2016-03-17T11:42:53.411Z"
         */
        this.between = (options = {}) => {
            const { from = this.past({ years: 5 }), to = new Date() } = options;

            const fromMilli = Date.parse(from);
            const dateOffset = pure.random.number(Date.parse(to) - fromMilli);

            return new Date(fromMilli + dateOffset).toISOString();
        };

        /**
         * arrayBetween
         *
         * @description Generate array with random dates between two reference dates
         * @param {object} [options= {}] Options to be passed
         * @param {date} [options.from= 5 years from today] Reference date to use
         * @param {date} [options.to= Today] Reference date to use
         * @param {num} [options.num= 3] Number of samples to return in array
         * @method pure.date.arrayBetween
         * @example
         * console.log(pure.date.arrayBetween({ from: '2015-10-18T06:40:58.676Z', to: '2021-02-13T02:06:21.464Z' }));
         * //outputs: "[2017-02-15T11:32:19.373Z,2018-06-16T16:23:39.697Z,2019-10-15T21:14:59.697Z]"
         */
        this.arrayBetween = (options = {}) => {
            const { from, to, num = 3 } = options;
            const results = [];

            for (let index = 0; index < num; index += 1) {
                const newDate = pure.unique.exec(this.between, [{ from, to }]);
                results.push(newDate);
            }

            results.sort((a, b) => new Date(a) - new Date(b));

            return results;
        };

        /**
         * recent
         *
         * @description Generate random recent date from today or parameters
         * @param {object} [options= {}] Options to be passed
         * @param {Number} [options.days= 1] Reference to generate past date
         * @param {date} [options.refDate= Today] Reference date to use
         * @method pure.date.recent
         * @example
         * console.log(pure.date.recent());
         * //outputs: "2020-04-05T20:16:55.855Z"
         */
        this.recent = (options = {}) => {
            const { days = 1, refDate } = options;
            let date = new Date();

            if (typeof refDate !== 'undefined') {
                date = new Date(Date.parse(refDate));
            }

            const range = {
                min: 1000,
                max: days * 24 * 3600 * 1000,
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
         * @param {object} [options= {}] Options to be passed
         * @param {Number} [options.days= 1] Reference to generate future date
         * @param {date} [options.refDate= Today] Reference date to use
         * @method pure.date.soon
         * @example
         * console.log(pure.date.soon());
         * //outputs: "2020-04-06T08:10:13.362Z"
         */
        this.soon = (options = {}) => {
            const { days = 1, refDate } = options;
            let date = new Date();

            if (typeof refDate !== 'undefined') {
                date = new Date(Date.parse(refDate));
            }

            const range = {
                min: 1000,
                max: days * 24 * 3600 * 1000,
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
         * @param {object} [options= {}] Options to be passed
         * @param {boolean} [options.abbr= false] Abbreviated return
         * @param {boolean} [options.context= false]
         * @method pure.date.month
         * @example
         * console.log(pure.date.month());
         * //outputs: "June"
         */
        this.month = (options = {}) => {
            let type = 'wide';

            if (options.abbr) {
                type = 'abbr';
            }

            if (options.context && typeof pure.registeredModules.date.month[`${type}_context`] !== 'undefined') {
                type += '_context';
            }

            const source = pure.registeredModules.date.month[type];

            return pure.random.arrayElement(source);
        };

        /**
         * weekday
         *
         * @description Generate random weekday
         * @param {object} [options= {}] Options to be passed
         * @param {boolean} [options.abbr= false] Abbreviated return
         * @param {boolean} [options.context= false]
         * @method pure.date.weekday
         * @example
         * console.log(pure.date.weekday());
         * //outputs: "Wednesday"
         */
        this.weekday = (options = {}) => {
            let type = 'wide';

            if (options.abbr) {
                type = 'abbr';
            }

            if (options.context && typeof pure.registeredModules.date.weekday[`${type}_context`] !== 'undefined') {
                type += '_context';
            }

            const source = pure.registeredModules.date.weekday[type];

            return pure.random.arrayElement(source);
        };

        /**
         * birthDay
         *
         * @description Generate random birthDay
         * @param {object} [options= {}] Options to be passed
         * @param {Number} [options.minAge= 18] Minimum age to generate date
         * @param {Number} [options.maxAge= 60] Maximum age to generate date
         * @method pure.date.birthDay
         * @example
         * console.log(pure.date.birthDay());
         * //outputs: "1992-04-25T14:44:34.415Z"
         */
        this.birthDay = (options = {}) => {
            let { minAge = 18, maxAge = 60 } = options;

            if (minAge > maxAge) {
                minAge = maxAge;
                maxAge = minAge;
            }

            const actualYear = (new Date()).getFullYear();

            const minYear = actualYear - minAge;
            const maxYear = actualYear - maxAge;

            const minDateParsed = new Date(`${minYear}-12-31`);
            const maxDateParsed = new Date(`${maxYear}-01-01`);

            return this.between({ from: minDateParsed, to: maxDateParsed });
        };
    }
}

module.exports = pureDate;
