const { assert } = require('chai');
const pure = require('../index');

describe('date.js', () => {
    describe('past()', () => {
        it('returns a date N years into the past', () => {
            const date = pure.date.past(75);
            assert.ok(date < new Date());
        });

        it('returns a past date when N = 0', () => {
            const refDate = new Date();
            const date = pure.date.past(0, refDate.toJSON());

            assert.ok(date < refDate); // date should be before the date given
        });

        it('returns a date N years before the date given', () => {
            // set the date beyond the usual calculation (to make sure this is working correctly)
            const refDate = new Date(2120, 11, 9, 10, 0, 0, 0);

            const date = pure.date.past(75, refDate.toJSON());

            // date should be before date given but after the current time
            assert.ok(date < refDate && date > new Date());
        });
    });

    describe('future()', () => {
        it('returns a date N years into the future', () => {
            const date = pure.date.future(75);

            assert.ok(date > new Date());
        });

        it('returns a future date when N = 0', () => {
            const refDate = new Date();
            const date = pure.date.future(0, refDate.toJSON());

            assert.ok(date > refDate); // date should be after the date given
        });

        it('returns a date N years after the date given', () => {
            // set the date beyond the usual calculation (to make sure this is working correctly)
            const refDate = new Date(1880, 11, 9, 10, 0, 0, 0);

            const date = pure.date.future(75, refDate.toJSON());

            // date should be after the date given, but before the current time
            assert.ok(date > refDate && date < new Date());
        });
    });

    describe('recent()', () => {
        it('returns a date N days from the recent past', () => {
            const date = pure.date.recent(30);

            assert.ok(date <= new Date());
        });

        it('returns a date N days from the recent past, starting from refDate', () => {
            const days = 30;
            // set the date beyond the usual calculation (to make sure this is working correctly)
            const refDate = new Date(2120, 11, 9, 10, 0, 0, 0);

            const date = pure.date.recent(days, refDate);

            const lowerBound = new Date(refDate.getTime() - (days * 24 * 60 * 60 * 1000));

            assert.ok(lowerBound <= date, '`recent()` date should not be further back than `n` days ago');
            assert.ok(date <= refDate, '`recent()` date should not be ahead of the starting date reference');
        });
    });

    describe('soon()', () => {
        it('returns a date N days into the future', () => {
            const date = pure.date.soon(30);

            assert.ok(date >= new Date());
        });

        it('returns a date N days from the recent future, starting from refDate', () => {
            const days = 30;
            // set the date beyond the usual calculation (to make sure this is working correctly)
            const refDate = new Date(1880, 11, 9, 10, 0, 0, 0);

            const date = pure.date.soon(days, refDate);

            const upperBound = new Date(refDate.getTime() + (days * 24 * 60 * 60 * 1000));

            assert.ok(date <= upperBound, '`soon()` date should not be further ahead than `n` days ago');
            assert.ok(refDate <= date, '`soon()` date should not be behind the starting date reference');
        });
    });

    describe('between()', () => {
        it('returns a random date between the dates given', () => {
            const from = new Date(1990, 5, 7, 9, 11, 0, 0);
            const to = new Date(2000, 6, 8, 10, 12, 0, 0);

            const date = pure.date.between(from, to);

            assert.ok(date > from && date < to);
        });
    });

    describe('arrayBetween()', () => {
        it('returns an array of 3 dates ( by default ) of sorted randoms dates between the dates given', () => {
            const from = new Date(1990, 5, 7, 9, 11, 0, 0);
            const to = new Date(2000, 6, 8, 10, 12, 0, 0);

            const dates = pure.date.arrayBetween(from, to);

            assert.ok(dates[0] > from && dates[0] < to);
            assert.ok(dates[1] > dates[0] && dates[2] > dates[1]);
        });
    });

    describe('month()', () => {
        it('returns random value from date.month.wide array by default', () => {
            const month = pure.date.month();
            assert.ok(pure.definitions.date.month.wide.indexOf(month) !== -1);
        });

        it('returns random value from date.month.wide_context array for context option', () => {
            const month = pure.date.month({ context: true });
            assert.ok(pure.definitions.date.month.wide_context.indexOf(month) !== -1);
        });

        it('returns random value from date.month.abbr array for abbr option', () => {
            const month = pure.date.month({ abbr: true });
            assert.ok(pure.definitions.date.month.abbr.indexOf(month) !== -1);
        });

        it('returns random value from date.month.abbr_context array for abbr and context option', () => {
            const month = pure.date.month({ abbr: true, context: true });
            assert.ok(pure.definitions.date.month.abbr_context.indexOf(month) !== -1);
        });

        it('returns random value from date.month.wide array for context '
        + 'option when date.month.wide_context array is missing', () => {
            const backupWideContext = pure.definitions.date.month.wide_context;
            pure.definitions.date.month.wide_context = undefined;

            const month = pure.date.month({ context: true });
            assert.ok(pure.definitions.date.month.wide.indexOf(month) !== -1);

            pure.definitions.date.month.wide_context = backupWideContext;
        });

        it('returns random value from date.month.abbr array for abbr and context '
        + 'option when date.month.abbr_context array is missing', () => {
            const backupAbbrContext = pure.definitions.date.month.abbr_context;
            pure.definitions.date.month.abbr_context = undefined;

            const month = pure.date.month({ abbr: true, context: true });
            assert.ok(pure.definitions.date.month.abbr.indexOf(month) !== -1);

            pure.definitions.date.month.abbr_context = backupAbbrContext;
        });
    });

    describe('weekday()', () => {
        it('returns random value from date.weekday.wide array by default', () => {
            const weekday = pure.date.weekday();
            assert.ok(pure.definitions.date.weekday.wide.indexOf(weekday) !== -1);
        });

        it('returns random value from date.weekday.wide_context array for context option', () => {
            const weekday = pure.date.weekday({ context: true });
            assert.ok(pure.definitions.date.weekday.wide_context.indexOf(weekday) !== -1);
        });

        it('returns random value from date.weekday.abbr array for abbr option', () => {
            const weekday = pure.date.weekday({ abbr: true });
            assert.ok(pure.definitions.date.weekday.abbr.indexOf(weekday) !== -1);
        });

        it('returns random value from date.weekday.abbr_context array for abbr and context option', () => {
            const weekday = pure.date.weekday({ abbr: true, context: true });
            assert.ok(pure.definitions.date.weekday.abbr_context.indexOf(weekday) !== -1);
        });

        it('returns random value from date.weekday.wide array for context option when '
        + 'date.weekday.wide_context array is missing', () => {
            const backupWideContext = pure.definitions.date.weekday.wide_context;
            pure.definitions.date.weekday.wide_context = undefined;

            const weekday = pure.date.weekday({ context: true });
            assert.ok(pure.definitions.date.weekday.wide.indexOf(weekday) !== -1);

            pure.definitions.date.weekday.wide_context = backupWideContext;
        });

        it('returns random value from date.weekday.abbr array for abbr and context '
        + 'option when date.weekday.abbr_context array is missing', () => {
            const backupAbbrContext = pure.definitions.date.weekday.abbr_context;
            pure.definitions.date.weekday.abbr_context = undefined;

            const weekday = pure.date.weekday({ abbr: true, context: true });
            assert.ok(pure.definitions.date.weekday.abbr.indexOf(weekday) !== -1);

            pure.definitions.date.weekday.abbr_context = backupAbbrContext;
        });
    });
});
