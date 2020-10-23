const { assert } = require('chai');
const sinon = require('sinon');
const pure = require('../index');

describe('airport.js', () => {
    describe('name()', () => {
        it('returns a random international airport', () => {
            const airport = pure.airport.name();

            assert.ok(airport);
        });

        it('returns exact international airport stubbed', () => {
            sinon.stub(pure.airport, 'name').returns('Los Angeles International Airport');
            const airport = pure.airport.name();

            assert.equal(airport, 'Los Angeles International Airport');
            pure.airport.name.restore();
        });
    });

    describe('iataCode()', () => {
        it('returns random IATA code', () => {
            const iataCode = pure.airport.iataCode();
            assert.ok(iataCode.match(/^[A-Z]{3}$/));
        });
    });

    describe('icaoCode()', () => {
        it('returns random ICAO code', () => {
            const icaoCode = pure.airport.icaoCode();
            assert.ok(icaoCode.match(/^[A-Z]{2}$/));
        });
    });
});
