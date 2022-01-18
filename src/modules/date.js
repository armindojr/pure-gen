class pureDate {
    constructor(pure) {
        this.past = (options) => {
            const def = options || {};
            const { years = 1, refDate } = def;
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

        this.future = (options) => {
            const def = options || {};
            const { years = 1, refDate } = def;
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

        // TODO: Review why is returning string and not date object
        this.between = (options) => {
            const def = options || {};
            const { from = this.past({ years: 5 }), to = new Date() } = def;

            const fromMilli = Date.parse(from);
            const dateOffset = pure.random.number(Date.parse(to) - fromMilli);

            return new Date(fromMilli + dateOffset).toISOString();
        };

        this.arrayBetween = (options) => {
            const def = options || {};
            const { from, to, num = 3 } = def;
            const results = [];

            for (let index = 0; index < num; index += 1) {
                const newDate = pure.unique.exec(this.between, [{ from, to }]);
                results.push(newDate);
            }

            results.sort((a, b) => new Date(a) - new Date(b));

            return results;
        };

        this.recent = (options) => {
            const def = options || {};
            const { days = 1, refDate } = def;
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

        this.soon = (options) => {
            const def = options || {};
            const { days = 1, refDate } = def;
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

        // TODO: Review context parameter and write on docs
        this.month = (options) => {
            const def = options || {};
            let type = 'wide';

            if (def.abbr) {
                type = 'abbr';
            }

            if (def.context && typeof pure.registeredModules.date.month[`${type}_context`] !== 'undefined') {
                type += '_context';
            }

            const source = pure.registeredModules.date.month[type];

            return pure.random.arrayElement(source);
        };

        // TODO: Review context parameter and write on docs
        this.weekday = (options) => {
            const def = options || {};
            let type = 'wide';

            if (def.abbr) {
                type = 'abbr';
            }

            if (def.context && typeof pure.registeredModules.date.weekday[`${type}_context`] !== 'undefined') {
                type += '_context';
            }

            const source = pure.registeredModules.date.weekday[type];

            return pure.random.arrayElement(source);
        };

        this.birthDay = (options) => {
            const def = options || {};
            let { minAge = 18, maxAge = 60 } = def;

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
