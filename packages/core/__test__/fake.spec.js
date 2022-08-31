import sinon from 'sinon';
import pure from '../index.js';

describe('fake.js', () => {
    describe('fake()', () => {
        it('replaces a token with a random value for a method with no parameters', () => {
            const name = pure.fake.parse('{{phone.phoneNumber}}');

            expect(/\d/.test(name)).toEqual(true);
        });

        it('replaces multiple tokens with random values for methods with no parameters', () => {
            const name = pure.fake.parse('{{random.arrayElement}}{{random.arrayElement}}{{random.arrayElement}}');

            expect(/[abc]{3}/.test(name)).toEqual(true);
        });

        it('replaces a token with a random value for a methods with a simple parameter', () => {
            const random = pure.fake.parse('{{helpers.slugify("Will This Work")}}');

            expect(random).toEqual('Will-This-Work');
        });

        it('replaces a token with a random value for a method with an array parameter', () => {
            const arr = ['one', 'two', 'three'];
            const random = pure.fake.parse('{{random.arrayElement(["one", "two", "three"])}}');

            expect(arr.indexOf(random)).toBeGreaterThanOrEqual(0);
        });

        it('allows the user to pass single parameter that isn\'t JSON', () => {
            const result = pure.fake.parse('{{helpers.replaceSymbols(\'{\')}}');

            expect(/{/g.test(result)).toEqual(true);
        });

        it('allows the user to pass multiple parameters to a function', () => {
            sinon.spy(pure.date, 'between');

            const from = new Date('2015-01-01').getTime();
            const to = new Date('2015-01-05').getTime();
            const result = pure.fake.parse('{{date.between({ "from": "2015-01-01", "to": "2015-01-05" })}}');

            expect(pure.date.between.calledOnce).toEqual(true);
            expect(from).toBeLessThanOrEqual(new Date(`${result}`).getTime());
            expect(to).toBeGreaterThanOrEqual(new Date(`${result}`).getTime());

            pure.date.between.restore();
        });

        it('does not allow undefined parameters', () => {
            expect(() => {
                pure.fake.parse();
            }).toThrow(/^string parameter is required!$/);
        });

        it('does not allow empty parameters', () => {
            expect(() => {
                pure.fake.parse('');
            }).toThrow(/^string parameter is required!$/);
        });

        it('does not allow params as JSON unformatted', () => {
            expect(() => {
                pure.fake.parse('{{date.between({ from: "2015-01-01", to: "2015-01-05" })}}');
            }).toThrow(/^Params provided doesn't match JSON standard type$/);
        });

        it('does not allow invalid module name', () => {
            expect(() => {
                pure.fake.parse('{{foo.bar}}');
            }).toThrow(/doesn't exist inside pure scope$/);
        });

        it('does not allow invalid method name', () => {
            expect(() => {
                pure.fake.parse('{{address.foo}}');
            }).toThrow(/doesn't exist inside pure scope$/);
        });
    });
});
