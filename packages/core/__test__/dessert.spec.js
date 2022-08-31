import sinon from 'sinon';
import pure from '../index.js';

describe('dessert.js', () => {
    describe('flavor()', () => {
        it('returns a dessert flavor', () => {
            const flavor = pure.dessert.flavor();

            expect(flavor).toBeDefined();
        });

        it('returns exact dessert flavor stubbed', () => {
            const stub = sinon.stub(pure.registeredModules, 'dessert').get(() => ({
                flavor: [ 'Cake' ],
            }));

            const flavor = pure.dessert.flavor();

            expect(flavor).toEqual('Cake');

            stub.restore();
        });
    });

    describe('topping()', () => {
        it('returns a dessert topping', () => {
            const topping = pure.dessert.topping();

            expect(topping).toBeDefined();
        });

        it('returns exact dessert topping stubbed', () => {
            const stub = sinon.stub(pure.registeredModules, 'dessert').get(() => ({
                topping: [ 'Gummy Bears' ],
            }));

            const topping = pure.dessert.topping();

            expect(topping).toEqual('Gummy Bears');

            stub.restore();
        });
    });

    describe('variety()', () => {
        it('returns a dessert variety', () => {
            const variety = pure.dessert.variety();

            expect(variety).toBeDefined();
        });

        it('returns exact dessert variety stubbed', () => {
            const stub = sinon.stub(pure.registeredModules, 'dessert').get(() => ({
                variety: [ 'Vanilla' ],
            }));

            const variety = pure.dessert.variety();

            expect(variety).toEqual('Vanilla');

            stub.restore();
        });
    });
});
