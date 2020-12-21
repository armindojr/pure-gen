const { assert } = require('chai');
const sinon = require('sinon');
const pure = require('../index');

describe('fake.js', () => {
    describe('fake()', () => {
        it('replaces a token with a random value for a method with no parameters', () => {
            const name = pure.fake('{{phone.phoneNumber}}');
            assert.ok(name.match(/\d/));
        });

        it('replaces multiple tokens with random values for methods with no parameters', () => {
            const name = pure.fake('{{random.arrayElement}}{{random.arrayElement}}{{random.arrayElement}}');
            assert.ok(name.match(/[abc]{3}/));
        });

        it('replaces a token with a random value for a methods with a simple parameter', () => {
            const random = pure.fake('{{helpers.slugify("Will This Work")}}');
            assert.ok(random === 'Will-This-Work');
        });

        it('replaces a token with a random value for a method with an array parameter', () => {
            const arr = ['one', 'two', 'three'];
            const random = pure.fake('{{random.arrayElement(["one", "two", "three"])}}');
            assert.ok(arr.indexOf(random) > -1);
        });

        it('allows the user to pass multiple parameters to a function', () => {
            sinon.spy(pure.date, 'between');

            const from = new Date('2015-01-01').toISOString();
            const to = new Date('2015-01-05').toISOString();
            const result = pure.fake('{{date.between({ "from": "2015-01-01", "to": "2015-01-05" })}}');

            assert.ok(pure.date.between.calledOnce);
            assert.ok(from <= result);
            assert.ok(result <= to);

            pure.date.between.restore();
        });

        it('does not allow undefined parameters', () => {
            assert.throws(() => {
                pure.fake();
            }, Error);
        });

        it('does not allow params as JSON unformatted', () => {
            assert.throws(() => {
                pure.fake('{{date.between({ from: "2015-01-01", to: "2015-01-05" })}}');
            }, Error);
        });

        it('does not allow invalid module name', () => {
            assert.throws(() => {
                pure.fake('{{foo.bar}}');
            }, Error);
        });

        it('does not allow invalid method name', () => {
            assert.throws(() => {
                pure.fake('{{address.foo}}');
            }, Error);
        });
    });
});
