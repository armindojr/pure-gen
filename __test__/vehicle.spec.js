const { assert } = require('chai');
const sinon = require('sinon');
const pure = require('../index');

describe('vehicle.js', () => {
    describe('vehicle()', () => {
        it('returns a random vehicle', () => {
            sinon.stub(pure.vehicle, 'vehicle').returns('Ford Explorer');
            const vehicle = pure.vehicle.vehicle();

            assert.equal(vehicle, 'Ford Explorer');
            pure.vehicle.vehicle.restore();
        });
    });

    describe('manufacturer()', () => {
        it('returns random manufacturer', () => {
            sinon.stub(pure.vehicle, 'manufacturer').returns('Porsche');
            const manufacturer = pure.vehicle.manufacturer();

            assert.equal(manufacturer, 'Porsche');
            pure.vehicle.manufacturer.restore();
        });
    });

    describe('type()', () => {
        it('returns random vehicle type', () => {
            sinon.stub(pure.vehicle, 'type').returns('Minivan');
            const type = pure.vehicle.type();

            assert.equal(type, 'Minivan');
            pure.vehicle.type.restore();
        });
    });

    describe('fuel()', () => {
        it('returns a fuel type', () => {
            sinon.stub(pure.vehicle, 'fuel').returns('Hybrid');
            const fuel = pure.vehicle.fuel();

            assert.equal(fuel, 'Hybrid');
            pure.vehicle.fuel.restore();
        });
    });

    describe('vin()', () => {
        it('returns valid vin number', () => {
            const vin = pure.vehicle.vin();
            assert.ok(vin.match(/^[A-Z0-9]{10}[A-Z]{1}[A-Z0-9]{1}\d{5}$/));
        });
    });

    describe('color()', () => {
        it('returns a random color', () => {
            sinon.stub(pure.vehicle, 'color').returns('black');
            const color = pure.vehicle.color();

            assert.equal(color, 'black');
            pure.vehicle.color.restore();
        });
    });
});
