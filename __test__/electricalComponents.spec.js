import sinon from 'sinon';
import pure from '../index.js';

describe('electricalComponents.js', () => {
    describe('active()', () => {
        it('returns active components name', () => {
            const active = pure.electricalComponents.active();

            expect(active).toBeDefined();
        });

        it('returns exact active components name stubbed', () => {
            const stub = sinon.stub(pure.registeredModules, 'electricalComponents').get(() => ({
                active: [ 'Diode' ],
            }));

            const active = pure.electricalComponents.active();

            expect(active).toEqual('Diode');

            stub.restore();
        });
    });

    describe('passive()', () => {
        it('returns passive components name', () => {
            const passive = pure.electricalComponents.passive();

            expect(passive).toBeDefined();
        });

        it('returns exact passive components name stubbed', () => {
            const stub = sinon.stub(pure.registeredModules, 'electricalComponents').get(() => ({
                passive: [ 'Varistor' ],
            }));

            const passive = pure.electricalComponents.passive();

            expect(passive).toEqual('Varistor');

            stub.restore();
        });
    });

    describe('electromechanical()', () => {
        it('returns electromechanical components name', () => {
            const electromechanical = pure.electricalComponents.electromechanical();

            expect(electromechanical).toBeDefined();
        });

        it('returns exact electromechanical components name stubbed', () => {
            const stub = sinon.stub(pure.registeredModules, 'electricalComponents').get(() => ({
                electromechanical: [ 'crystal' ],
            }));

            const electromechanical = pure.electricalComponents.electromechanical();

            expect(electromechanical).toEqual('crystal');

            stub.restore();
        });
    });
});
