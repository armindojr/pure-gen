import sinon from 'sinon';
import pure from '../index.js';

describe('commerce.js', () => {
    describe('color()', () => {
        it('returns random value from commerce.color array', () => {
            const color = pure.commerce.color();

            expect(pure.registeredModules.commerce.color.indexOf(color)).toBeGreaterThanOrEqual(0);
        });
    });

    describe('department()', () => {
        it('should use the default amounts when not passing arguments', () => {
            const department = pure.commerce.department();

            expect(department.split(' ').length).toEqual(1);
        });
    });

    describe('productName()', () => {
        it('returns name comprising of an adjective, material and product', () => {
            sinon.spy(pure.random, 'arrayElement');
            sinon.spy(pure.commerce, 'productAdjective');
            sinon.spy(pure.commerce, 'productMaterial');
            sinon.spy(pure.commerce, 'product');

            const name = pure.commerce.productName();

            expect(name.split(' ').length).toBeGreaterThanOrEqual(3);
            expect(pure.random.arrayElement.calledThrice).toBe(true);
            expect(pure.commerce.productAdjective.calledOnce).toBe(true);
            expect(pure.commerce.productMaterial.calledOnce).toBe(true);
            expect(pure.commerce.product.calledOnce).toBe(true);

            pure.random.arrayElement.restore();
            pure.commerce.productAdjective.restore();
            pure.commerce.productMaterial.restore();
            pure.commerce.product.restore();
        });
    });

    describe('price()', () => {
        it('should use the default amounts when not passing arguments', () => {
            const price = parseInt(pure.commerce.price(), 10);

            expect(price).toBeDefined();
            expect(price).toBeGreaterThanOrEqual(0);
            expect(price).toBeLessThanOrEqual(1001);
        });

        it('should use the default decimal location when not passing arguments', () => {
            const price = pure.commerce.price();

            const expected = price.length - 3;
            const actual = price.indexOf('.');

            expect(actual).toEqual(expected);
        });

        it('should not include a currency symbol by default', () => {
            const amount = pure.commerce.price();

            const actual = /[0-9.]/.test(amount);

            expect(actual).toEqual(true);
        });

        it('it should handle negative amounts, but return 0', () => {
            const amount = pure.commerce.price({ min: -200, max: -1 });

            expect(amount).toBeDefined();
            expect(amount).toEqual('0');
        });

        it('it should handle argument dec', () => {
            const price = pure.commerce.price({ min: 100, max: 100, dec: 1 });

            expect(price).toBeDefined();
            expect(price).toEqual('100.0');
        });

        it('it should handle argument dec = 0', () => {
            const price = pure.commerce.price({ min: 100, max: 100, dec: 0 });

            expect(price).toBeDefined();
            expect(price).toEqual('100');
        });

        it('should not contain comma\'s by default', () => {
            const amount = pure.commerce.price({ min: 1000 });
            const amountWithCommas = pure.commerce.price({ min: 1000, comma: true });

            expect(/,/.test(amount)).toEqual(false);
            expect(/,/.test(amountWithCommas)).toEqual(true);
        });
    });

    describe('productDescription()', () => {
        it('returns a random product description', () => {
            sinon.spy(pure.commerce, 'productDescription');

            const description = pure.commerce.productDescription();

            expect(typeof description).toBe('string');
            expect(pure.commerce.productDescription.calledOnce).toEqual(true);

            pure.commerce.productDescription.restore();
        });
    });

    describe('categories()', () => {
        it('returns array of categories', () => {
            const categories = pure.commerce.categories();

            expect(categories.length).toBeGreaterThanOrEqual(0);
        });

        it('returns specified lenght array of categories', () => {
            const categories = pure.commerce.categories(5);

            expect(categories.length).toEqual(5);
        });

        it('returns all categories when parameter passed in is greater then lenght of categories', () => {
            const categories = pure.commerce.categories(100);
            const all = pure.registeredModules.commerce.department.length;

            expect(categories.length).toEqual(all);
        });
    });
});
