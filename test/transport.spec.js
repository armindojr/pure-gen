import sinon from 'sinon';
import pure from '../src/index.js';

describe('transport.js', () => {
  describe('vehicleName()', () => {
    it('returns a random vehicle', () => {
      const vehicle = pure.transport.vehicleName();

      expect(vehicle).toBeDefined();
    });

    it('returns exact vehicle stubbed', () => {
      const stub = sinon.stub(pure.registeredModules, 'transport').get(() => ({
        vehicleManufacturer: ['Ford'],
        vehicleModel: ['Explorer']
      }));

      const vehicle = pure.transport.vehicleName();

      expect(vehicle).toEqual('Ford Explorer');

      stub.restore();
    });
  });

  describe('vehicleManufacturer()', () => {
    it('returns random manufacturer', () => {
      const manufacturer = pure.transport.vehicleManufacturer();

      expect(manufacturer).toBeDefined();
    });

    it('returns exact manufacturer stubbed', () => {
      const stub = sinon.stub(pure.registeredModules, 'transport').get(() => ({
        vehicleManufacturer: ['Porsche']
      }));

      const manufacturer = pure.transport.vehicleManufacturer();

      expect(manufacturer).toEqual('Porsche');

      stub.restore();
    });
  });

  describe('vehicleType()', () => {
    it('returns random vehicle type', () => {
      const type = pure.transport.vehicleType();

      expect(type).toBeDefined();
    });

    it('returns exact vehicle type stubbed', () => {
      const stub = sinon.stub(pure.registeredModules, 'transport').get(() => ({
        vehicleType: ['Minivan']
      }));

      const type = pure.transport.vehicleType();

      expect(type).toEqual('Minivan');

      stub.restore();
    });
  });

  describe('vehicleFuel()', () => {
    it('returns a fuel type', () => {
      const fuel = pure.transport.vehicleFuel();

      expect(fuel).toBeDefined();
    });

    it('returns exact fuel type stubbed', () => {
      const stub = sinon.stub(pure.registeredModules, 'transport').get(() => ({
        vehicleFuel: ['Hybrid']
      }));

      const fuel = pure.transport.vehicleFuel();

      expect(fuel).toEqual('Hybrid');

      stub.restore();
    });
  });

  describe('vehicleVin()', () => {
    it('returns valid vin number', () => {
      const vin = pure.transport.vehicleVin();

      expect(/^[A-Z0-9]{10}[A-Z]{1}[A-Z0-9]{1}\d{5}$/.test(vin)).toEqual(true);
    });
  });

  describe('vehicleColor()', () => {
    it('returns a random color', () => {
      const color = pure.transport.vehicleColor();

      expect(color).toBeDefined();
    });

    it('returns exact color stubbed', () => {
      sinon.stub(pure.commerce, 'color').returns('black');

      const color = pure.transport.vehicleColor();

      expect(color).toEqual('black');

      pure.commerce.color.restore();
    });
  });

  describe('vehicleRM()', () => {
    it('returns a stubbed vrm', () => {
      sinon.stub(pure.random, 'alpha').onFirstCall().returns('MF').onSecondCall().returns('EEW');
      sinon.stub(pure.random, 'number').onFirstCall().returns(5).onSecondCall().returns(9);

      const vrm = pure.transport.vehicleRM();

      expect(vrm).toEqual('MF59EEW');

      pure.random.alpha.restore();
      pure.random.number.restore();
    });

    it('returns a random vrm', () => {
      const vrm = pure.transport.vehicleRM();
      const reg = /[A-Z]{2}[0-9]{2}[A-Z]{3}/g;

      expect(reg.test(vrm)).toEqual(true);
    });
  });

  describe('airportName()', () => {
    it('returns a random international airport', () => {
      const airport = pure.transport.airportName();

      expect(airport).toBeDefined();
    });

    it('returns exact international airport stubbed', () => {
      const stub = sinon.stub(pure.registeredModules, 'transport').get(() => ({
        airportName: ['Los Angeles International Airport']
      }));

      const airport = pure.transport.airportName();

      expect(airport).toEqual('Los Angeles International Airport');

      stub.restore();
    });
  });

  describe('airportIata()', () => {
    it('returns random IATA code', () => {
      const iataCode = pure.transport.airportIata();

      expect(/^[A-Z]{3}$/.test(iataCode)).toEqual(true);
    });
  });

  describe('airportIcao()', () => {
    it('returns random ICAO code', () => {
      const icaoCode = pure.transport.airportIcao();

      expect(/^[A-Z]{2}$/.test(icaoCode)).toEqual(true);
    });
  });
});
