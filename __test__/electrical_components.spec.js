const { assert } = require('chai');
const sinon = require('sinon');
const pure = require('../index');

describe('electrical_components.js', () => {
    describe('active()', () => {
        it('returns active components name', () => {
            sinon.stub(pure.electricalComponents, 'active').returns('Diode');
            const active = pure.electricalComponents.active();

            assert.equal(active, 'Diode');
            pure.electricalComponents.active.restore();
        });
    });
    describe('passive()', () => {
        it('returns passive components name', () => {
            sinon.stub(pure.electricalComponents, 'passive').returns('Varistor');
            const passive = pure.electricalComponents.passive();

            assert.equal(passive, 'Varistor');
            pure.electricalComponents.passive.restore();
        });
    });
    describe('electromechanical()', () => {
        it('returns electromechanical components name', () => {
            sinon.stub(pure.electricalComponents, 'electromechanical').returns('crystal');
            const electromechanical = pure.electricalComponents.electromechanical();

            assert.equal(electromechanical, 'crystal');
            pure.electricalComponents.electromechanical.restore();
        });
    });
});
