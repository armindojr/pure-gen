const sinon = require('sinon');
const pure = require('../index');

describe('fake.js', () => {
    describe('fake()', () => {
        it('replaces a token with a random value for a method with no parameters', () => {
            const name = pure.fake('{{phone.phoneNumber}}');

            expect(/\d/.test(name)).toEqual(true);
        });

        it('replaces multiple tokens with random values for methods with no parameters', () => {
            const name = pure.fake('{{random.arrayElement}}{{random.arrayElement}}{{random.arrayElement}}');

            expect(/[abc]{3}/.test(name)).toEqual(true);
        });

        it('replaces a token with a random value for a methods with a simple parameter', () => {
            const random = pure.fake('{{helpers.slugify("Will This Work")}}');

            expect(random).toEqual('Will-This-Work');
        });

        it('replaces a token with a random value for a method with an array parameter', () => {
            const arr = ['one', 'two', 'three'];
            const random = pure.fake('{{random.arrayElement(["one", "two", "three"])}}');

            expect(arr.indexOf(random)).toBeGreaterThanOrEqual(0);
        });

        it('allows the user to pass single parameter that isn\'t JSON', () => {
            const result = pure.fake('{{helpers.replaceSymbols(\'{\')}}');

            expect(/{/g.test(result)).toEqual(true);
        });

        it('allows the user to pass multiple parameters to a function', () => {
            sinon.spy(pure.date, 'between');

            const from = new Date('2015-01-01').getTime();
            const to = new Date('2015-01-05').getTime();
            const result = pure.fake('{{date.between({ "from": "2015-01-01", "to": "2015-01-05" })}}');

            expect(pure.date.between.calledOnce).toEqual(true);
            expect(from).toBeLessThanOrEqual(new Date(`${result}`).getTime());
            expect(to).toBeGreaterThanOrEqual(new Date(`${result}`).getTime());

            pure.date.between.restore();
        });

        it('does not allow undefined parameters', () => {
            expect(() => {
                pure.fake();
            }).toThrow();
        });

        it('does not allow empty parameters', () => {
            expect(() => {
                pure.fake('');
            }).toThrow();
        });

        it('does not allow params as JSON unformatted', () => {
            expect(() => {
                pure.fake('{{date.between({ from: "2015-01-01", to: "2015-01-05" })}}');
            }).toThrow();
        });

        it('does not allow invalid module name', () => {
            expect(() => {
                pure.fake('{{foo.bar}}');
            }).toThrow();
        });

        it('does not allow invalid method name', () => {
            expect(() => {
                pure.fake('{{address.foo}}');
            }).toThrow();
        });
    });
});
