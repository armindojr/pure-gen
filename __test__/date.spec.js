const sinon = require('sinon');
const pure = require('../index');

describe('date.js', () => {
    describe('past()', () => {
        it('returns a date N years into the past', () => {
            const date = pure.date.past({ years: 75 });

            expect(new Date(`${date}`).getTime()).toBeLessThan(new Date().getTime());
        });

        it('returns a past date when N = 0', () => {
            const refDate = new Date();
            const date = pure.date.past({ years: 0, refDate });

            // date should be before the date given
            expect(new Date(`${date}`).getTime()).toBeLessThan(refDate.getTime());
        });

        it('returns a date N years before the date given', () => {
            const refDate = new Date('2120-12-09T13:00:00.000Z');
            const date = pure.date.past({ years: 75, refDate });

            expect(new Date(`${date}`).getTime()).toBeLessThan(refDate.getTime());
            expect(new Date(`${date}`).getTime()).toBeGreaterThan(new Date().getTime());
        });

        it('returns a date when no parameter is passed', () => {
            const date = pure.date.past();

            expect(date).toBeDefined();
            expect(typeof date).toBe('object');
        });
    });

    describe('future()', () => {
        it('returns a date N years into the future', () => {
            const date = pure.date.future({ years: 75 });

            expect(new Date(`${date}`).getTime()).toBeGreaterThan(new Date().getTime());
        });

        it('returns a future date when N = 0', () => {
            const refDate = new Date();
            const date = pure.date.future({ years: 0, refDate });

            expect(new Date(`${date}`).getTime()).toBeLessThan(refDate.getTime());
        });

        it('returns a date N years after the date given', () => {
            const refDate = new Date('1880-12-09T13:06:28.000Z');
            const date = pure.date.future({ years: 75, refDate });

            expect(new Date(`${date}`).getTime()).toBeGreaterThan(refDate.getTime());
            expect(new Date(`${date}`).getTime()).toBeLessThan(new Date().getTime());
        });

        it('returns a date when no parameter is passed', () => {
            const date = pure.date.future();

            expect(date).toBeDefined();
            expect(typeof date).toBe('object');
        });
    });

    describe('recent()', () => {
        it('returns a date N days from the recent past', () => {
            const date = pure.date.recent({ days: 30 });

            expect(new Date(`${date}`).getTime()).toBeLessThanOrEqual(new Date().getTime());
        });

        it('returns a date N days from the recent past, starting from refDate', () => {
            const days = 30;
            const refDate = new Date(2120, 11, 9, 10, 0, 0, 0);
            const date = pure.date.recent({ days, refDate });
            const lowerBound = new Date(refDate.getTime() - (days * 24 * 60 * 60 * 1000));

            expect(lowerBound.getTime()).toBeLessThanOrEqual(date.getTime());
            expect(new Date(`${date}`).getTime()).toBeLessThanOrEqual(refDate.getTime());
        });

        it('returns a date when no parameter is passed', () => {
            const date = pure.date.recent();

            expect(date).toBeDefined();
            expect(typeof date).toBe('object');
        });
    });

    describe('soon()', () => {
        it('returns a date N days into the future', () => {
            const date = pure.date.soon({ days: 30 });

            expect(date.getTime()).toBeGreaterThanOrEqual(new Date().getTime());
        });

        it('returns a date N days from the recent future, starting from refDate', () => {
            const days = 30;
            const refDate = new Date(1880, 11, 9, 10, 0, 0, 0);
            const date = pure.date.soon({ days, refDate });
            const upperBound = new Date(refDate.getTime() + (days * 24 * 60 * 60 * 1000));

            expect(date.getTime()).toBeLessThanOrEqual(upperBound.getTime());
            expect(refDate.getTime()).toBeLessThanOrEqual(new Date(`${date}`).getTime());
        });

        it('returns a date when no parameter is passed', () => {
            const date = pure.date.soon();

            expect(date).toBeDefined();
            expect(typeof date).toBe('object');
        });
    });

    describe('between()', () => {
        it('returns a random date between the dates given', () => {
            const from = new Date('1990-06-07T12:11:00.000Z');
            const to = new Date('2000-07-08T13:12:00.000Z');

            const date = pure.date.between({ from, to });

            expect(new Date(`${date}`).getTime()).toBeGreaterThan(from.getTime());
            expect(new Date(`${date}`).getTime()).toBeLessThan(to.getTime());
        });

        it('returns a date when no parameter is passed', () => {
            const date = pure.date.between();

            expect(date).toBeDefined();
            expect(typeof date).toBe('string');
        });
    });

    describe('arrayBetween()', () => {
        it('returns an array of 3 dates ( by default ) of sorted randoms dates between the dates given', () => {
            const from = new Date('1990-06-07T12:11:00.000Z');
            const to = new Date('2000-07-08T13:12:00.000Z');

            const dates = pure.date.arrayBetween({ from, to });

            expect(new Date(`${dates[0]}`).getTime()).toBeGreaterThan(from.getTime());
            expect(new Date(`${dates[0]}`).getTime()).toBeLessThan(to.getTime());
            expect(new Date(`${dates[1]}`).getTime()).toBeGreaterThan(new Date(`${dates[0]}`).getTime());
            expect(new Date(`${dates[2]}`).getTime()).toBeGreaterThan(new Date(`${dates[1]}`).getTime());
        });

        it('returns a date when no parameter is passed', () => {
            const date = pure.date.arrayBetween();

            expect(date).toBeDefined();
            expect(typeof date).toBe('object');
        });
    });

    describe('month()', () => {
        it('returns random value from date.month.wide array by default', () => {
            const month = pure.date.month();

            expect(pure.registeredModules.date.month.wide.indexOf(month)).toBeGreaterThanOrEqual(0);
        });

        it('returns random value from date.month.wide_context array for context option', () => {
            const month = pure.date.month({ context: true });

            expect(pure.registeredModules.date.month.wide_context.indexOf(month)).toBeGreaterThanOrEqual(0);
        });

        it('returns random value from date.month.abbr array for abbr option', () => {
            const month = pure.date.month({ abbr: true });

            expect(pure.registeredModules.date.month.abbr.indexOf(month)).toBeGreaterThanOrEqual(0);
        });

        it('returns random value from date.month.abbr_context array for abbr and context option', () => {
            const month = pure.date.month({ abbr: true, context: true });

            expect(pure.registeredModules.date.month.abbr_context.indexOf(month)).toBeGreaterThanOrEqual(0);
        });

        it('returns random value when wide_context array is missing', () => {
            const stub = sinon.stub(pure.registeredModules, 'date').get(() => ({
                month: {
                    wide: [
                        'January',
                    ],
                    wide_context: undefined,
                },
            }));

            const month = pure.date.month({ context: true });

            expect(pure.registeredModules.date.month.wide.indexOf(month)).toBeGreaterThanOrEqual(0);

            stub.restore();
        });

        it('returns random value when abbr_context array is missing', () => {
            const stub = sinon.stub(pure.registeredModules, 'date').get(() => ({
                month: {
                    abbr: [
                        'Jan',
                    ],
                    abbr_context: undefined,
                },
            }));

            const month = pure.date.month({ abbr: true, context: true });

            expect(pure.registeredModules.date.month.abbr.indexOf(month)).toBeGreaterThanOrEqual(0);

            stub.restore();
        });
    });

    describe('weekday()', () => {
        it('returns random value from date.weekday.wide array by default', () => {
            const weekday = pure.date.weekday();

            expect(pure.registeredModules.date.weekday.wide.indexOf(weekday)).toBeGreaterThanOrEqual(0);
        });

        it('returns random value from date.weekday.wide_context array for context option', () => {
            const weekday = pure.date.weekday({ context: true });

            expect(pure.registeredModules.date.weekday.wide_context.indexOf(weekday)).toBeGreaterThanOrEqual(0);
        });

        it('returns random value from date.weekday.abbr array for abbr option', () => {
            const weekday = pure.date.weekday({ abbr: true });

            expect(pure.registeredModules.date.weekday.abbr.indexOf(weekday)).toBeGreaterThanOrEqual(0);
        });

        it('returns random value from date.weekday.abbr_context array for abbr and context option', () => {
            const weekday = pure.date.weekday({ abbr: true, context: true });

            expect(pure.registeredModules.date.weekday.abbr_context.indexOf(weekday) !== -1);
        });

        it('returns random value when wide_context array is missing', () => {
            const stub = sinon.stub(pure.registeredModules, 'date').get(() => ({
                weekday: {
                    wide_context: undefined,
                    wide: [
                        'January',
                    ],
                },
            }));

            const weekday = pure.date.weekday({ context: true });
            expect(pure.registeredModules.date.weekday.wide.indexOf(weekday)).toBeGreaterThanOrEqual(0);

            stub.restore();
        });

        it('returns random value when abbr_context array is missing', () => {
            const stub = sinon.stub(pure.registeredModules, 'date').get(() => ({
                weekday: {
                    abbr_context: undefined,
                    abbr: [
                        'Jan',
                    ],
                },
            }));

            const weekday = pure.date.weekday({ abbr: true, context: true });
            expect(pure.registeredModules.date.weekday.abbr.indexOf(weekday)).toBeGreaterThanOrEqual(0);

            stub.restore();
        });
    });

    describe('birthDay()', () => {
        it('return generated birthday', () => {
            const date = pure.date.birthDay();

            expect(new Date(`${date}`).getTime()).toBeLessThan(new Date().getTime());
        });

        it('return generated birthday given min and max age', () => {
            const date = pure.date.birthDay({ minAge: 10, maxAge: 12 });
            const actual = new Date().getFullYear();
            const generated = new Date(date).getFullYear();

            expect((actual - generated)).toBeGreaterThanOrEqual(10);
            expect((actual - generated)).toBeLessThanOrEqual(12);
        });

        it('return generated birthday given min and max age inverted', () => {
            const date = pure.date.birthDay({ minAge: 12, maxAge: 10 });
            const actual = (new Date()).getFullYear();
            const generated = (new Date(date)).getFullYear();

            expect((actual - generated)).toBeGreaterThanOrEqual(10);
            expect((actual - generated)).toBeLessThanOrEqual(12);
        });
    });
});
