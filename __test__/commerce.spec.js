const { assert, expect } = require('chai');
const sinon = require('sinon');
const pure = require('../index');

describe('commerce.js', () => {
    describe('color()', () => {
        it('returns random value from commerce.color array', () => {
            const color = pure.commerce.color();
            assert.ok(pure.registeredModules.commerce.color.indexOf(color) !== -1);
        });
    });

    describe('department(max, fixedValue)', () => {
        it('should use the default amounts when not passing arguments', () => {
            const department = pure.commerce.department();
            assert.ok(department.split(' ').length === 1);
        });
    });

    describe('productName()', () => {
        it('returns name comprising of an adjective, material and product', () => {
            sinon.spy(pure.random, 'arrayElement');
            sinon.spy(pure.commerce, 'productAdjective');
            sinon.spy(pure.commerce, 'productMaterial');
            sinon.spy(pure.commerce, 'product');
            const name = pure.commerce.productName();

            assert.ok(name.split(' ').length >= 3);
            assert.ok(pure.random.arrayElement.calledThrice);
            assert.ok(pure.commerce.productAdjective.calledOnce);
            assert.ok(pure.commerce.productMaterial.calledOnce);
            assert.ok(pure.commerce.product.calledOnce);

            pure.random.arrayElement.restore();
            pure.commerce.productAdjective.restore();
            pure.commerce.productMaterial.restore();
            pure.commerce.product.restore();
        });
    });

    describe('price(min, max, dec, symbol)', () => {
        it('should use the default amounts when not passing arguments', () => {
            const price = pure.commerce.price();

            assert.ok(price);
            assert.equal((price > 0), true, 'the amount should be greater than 0');
            assert.equal((price < 1001), true, 'the amount should be less than 1000');
        });

        it('should use the default decimal location when not passing arguments', () => {
            const price = pure.commerce.price();

            const decimal = '.';
            const expected = price.length - 3;
            const actual = price.indexOf(decimal);

            assert.equal(actual, expected,
                `The expected location of the decimal is ${expected} but it was ${actual} amount ${price}`);
        });

        it('should not include a currency symbol by default', () => {
            const amount = pure.commerce.price();

            const regexp = new RegExp(/[0-9.]/);

            const expected = true;
            const actual = regexp.test(amount);

            assert.equal(actual, expected, 'The expected match should not include a currency symbol');
        });

        it('it should handle negative amounts, but return 0', () => {
            const amount = pure.commerce.price({ min: -200, max: -1 });

            assert.ok(amount);
            assert.equal(amount, 0.00, 'the amount should equal 0');
        });

        it('it should handle argument dec', () => {
            const price = pure.commerce.price({ min: 100, max: 100, dec: 1 });

            assert.ok(price);
            assert.strictEqual(price, '100.0', 'the price should be equal 100.0');
        });

        it('it should handle argument dec = 0', () => {
            const price = pure.commerce.price({ min: 100, max: 100, dec: 0 });

            assert.ok(price);
            assert.strictEqual(price, '100', 'the price should be equal 100');
        });

        it("should not contain comma's by default", () => {
            const amount = pure.commerce.price({ min: 1000 });
            const amountWithCommas = pure.commerce.price({ min: 1000, comma: true });

            const testRegExp = new RegExp(/,/);

            assert.equal(false, testRegExp.test(amount), 'The amount should not contain commas.');

            assert.equal(true, testRegExp.test(amountWithCommas), 'The amount should contain commas.');
        });
    });

    describe('productDescription()', () => {
        it('returns a random product description', () => {
            sinon.spy(pure.commerce, 'productDescription');
            const description = pure.commerce.productDescription();

            assert.ok(typeof description === 'string');
            assert.ok(pure.commerce.productDescription.calledOnce);

            pure.commerce.productDescription.restore();
        });
    });

    describe('categories()', () => {
        it('returns array of categories', () => {
            const categories = pure.commerce.categories();

            expect(categories.length).greaterThan(0);
        });
        it('returns specified lenght array of categories', () => {
            const categories = pure.commerce.categories(5);

            assert.equal(categories.length, 5);
        });
        it('returns all categories when parameter passed in is greater then lenght of categories', () => {
            const categories = pure.commerce.categories(100);
            const all = pure.registeredModules.commerce.department.length;

            assert.equal(categories.length, all);
        });
    });
});
