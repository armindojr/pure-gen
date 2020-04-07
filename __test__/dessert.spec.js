const { assert } = require('chai');
const sinon = require('sinon');
const pure = require('../index');

describe('dessert.js', () => {
    describe('flavor()', () => {
        it('returns a dessert flavor', () => {
            sinon.stub(pure.dessert, 'flavor').returns('Cake');
            const flavor = pure.dessert.flavor();

            assert.equal(flavor, 'Cake');
            pure.dessert.flavor.restore();
        });
    });
    describe('topping()', () => {
        it('returns a dessert topping', () => {
            sinon.stub(pure.dessert, 'topping').returns('Gummy Bears');
            const topping = pure.dessert.topping();

            assert.equal(topping, 'Gummy Bears');
            pure.dessert.topping.restore();
        });
    });
    describe('variety()', () => {
        it('returns a dessert variety', () => {
            sinon.stub(pure.dessert, 'variety').returns('Vanilla');
            const variety = pure.dessert.variety();

            assert.equal(variety, 'Vanilla');
            pure.dessert.variety.restore();
        });
    });
});
