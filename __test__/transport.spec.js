const { assert } = require('chai');
const sinon = require('sinon');
const pure = require('../index');

describe('transport.js', () => {
    describe('vehicleName()', () => {
        it('returns a random vehicle', () => {
            const vehicle = pure.transport.vehicleName();

            assert.ok(vehicle);
        });

        it('returns exact vehicle stubbed', () => {
            sinon.stub(pure.transport, 'vehicleName').returns('Ford Explorer');
            const vehicle = pure.transport.vehicleName();

            assert.equal(vehicle, 'Ford Explorer');
            pure.transport.vehicleName.restore();
        });
    });

    describe('vehicleManufacturer()', () => {
        it('returns random manufacturer', () => {
            const manufacturer = pure.transport.vehicleManufacturer();

            assert.ok(manufacturer);
        });

        it('returns exact manufacturer stubbed', () => {
            sinon.stub(pure.transport, 'vehicleManufacturer').returns('Porsche');
            const manufacturer = pure.transport.vehicleManufacturer();

            assert.equal(manufacturer, 'Porsche');
            pure.transport.vehicleManufacturer.restore();
        });
    });

    describe('vehicleType()', () => {
        it('returns random vehicle type', () => {
            const type = pure.transport.vehicleType();

            assert.ok(type);
        });

        it('returns exact vehicle type stubbed', () => {
            sinon.stub(pure.transport, 'vehicleType').returns('Minivan');
            const type = pure.transport.vehicleType();

            assert.equal(type, 'Minivan');
            pure.transport.vehicleType.restore();
        });
    });

    describe('vehicleFuel()', () => {
        it('returns a fuel type', () => {
            const fuel = pure.transport.vehicleFuel();

            assert.ok(fuel);
        });

        it('returns exact fuel type stubbed', () => {
            sinon.stub(pure.transport, 'vehicleFuel').returns('Hybrid');
            const fuel = pure.transport.vehicleFuel();

            assert.equal(fuel, 'Hybrid');
            pure.transport.vehicleFuel.restore();
        });
    });

    describe('vehicleVin()', () => {
        it('returns valid vin number', () => {
            const vin = pure.transport.vehicleVin();
            assert.ok(vin.match(/^[A-Z0-9]{10}[A-Z]{1}[A-Z0-9]{1}\d{5}$/));
        });
    });

    describe('vehicleColor()', () => {
        it('returns a random color', () => {
            const color = pure.transport.vehicleColor();

            assert.ok(color);
        });

        it('returns exact color stubbed', () => {
            sinon.stub(pure.transport, 'vehicleColor').returns('black');
            const color = pure.transport.vehicleColor();

            assert.equal(color, 'black');
            pure.transport.vehicleColor.restore();
        });
    });

    describe('airportName()', () => {
        it('returns a random international airport', () => {
            const airport = pure.transport.airportName();

            assert.ok(airport);
        });

        it('returns exact international airport stubbed', () => {
            sinon.stub(pure.transport, 'airportName').returns('Los Angeles International Airport');
            const airport = pure.transport.airportName();

            assert.equal(airport, 'Los Angeles International Airport');
            pure.transport.airportName.restore();
        });
    });

    describe('airportIata()', () => {
        it('returns random IATA code', () => {
            const iataCode = pure.transport.airportIata();
            assert.ok(iataCode.match(/^[A-Z]{3}$/));
        });
    });

    describe('airportIcao()', () => {
        it('returns random ICAO code', () => {
            const icaoCode = pure.transport.airportIcao();
            assert.ok(icaoCode.match(/^[A-Z]{2}$/));
        });
    });
});
