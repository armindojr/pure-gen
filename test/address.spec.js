import sinon from 'sinon';
import pure from '../src/index.js';

describe('address.js', () => {
  describe('city()', () => {
    it('returns random city based on locale', () => {
      const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
        city: {
          default: ['test']
        }
      }));

      const city = pure.address.city();

      expect(city).toBeDefined();
      expect(typeof city).toBe('string');

      stub.restore();
    });

    it('returns random city when filtering by state', () => {
      const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
        city: {
          Foo: ['random'],
          Bar: ['test']
        }
      }));

      const city = pure.address.city('bar');

      expect(city).toBeDefined();
      expect(typeof city).toBe('string');
      expect(city).toEqual('test');

      stub.restore();
    });

    it('returns random city passing index as parameter', () => {
      sinon.stub(pure.address, 'state').returns('Bar');
      const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
        city: ['foo']
      }));

      const city = pure.address.city(0);

      expect(city).toBeDefined();
      expect(typeof city).toBe('string');
      expect(city).toEqual('foo');

      pure.address.state.restore();
      stub.restore();
    });

    it('returns random city with invalid string', () => {
      sinon.stub(pure.random, 'objectElement').returns('Bar');
      const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
        city: {
          Foo: ['random'],
          Bar: ['test']
        }
      }));

      const city = pure.address.city('');

      expect(city).toBeDefined();
      expect(typeof city).toBe('string');
      expect(city).toEqual('test');

      pure.random.objectElement.restore();
      stub.restore();
    });

    it('returns random city when localized data is mustache string', () => {
      const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
        city: ['{{name.lastName}} {{name.firstName}}']
      }));

      const city = pure.address.city();

      expect(city).toBeDefined();
      expect(typeof city).toBe('string');
      expect(city.split(' ').length).toEqual(2);

      stub.restore();
    });
  });

  describe('cityPrefix()', () => {
    it('return a random city prefix', () => {
      const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
        cityPrefix: ['foo']
      }));

      const prefix = pure.address.cityPrefix();

      expect(prefix).toBeDefined();
      expect(typeof prefix).toBe('string');
      expect(prefix).toEqual('foo');

      stub.restore();
    });
  });

  describe('citySuffix()', () => {
    it('return a random city suffix', () => {
      const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
        citySuffix: ['foo']
      }));

      const suffix = pure.address.citySuffix();

      expect(suffix).toBeDefined();
      expect(typeof suffix).toBe('string');
      expect(suffix).toEqual('foo');

      stub.restore();
    });
  });

  describe('cityName()', () => {
    it('returns random cityName', () => {
      sinon.spy(pure.address, 'cityName');

      const cityName = pure.address.cityName();

      expect(cityName).toBeDefined();
      expect(pure.address.cityName.called).toBe(true);

      pure.address.cityName.restore();
    });
  });

  describe('streetName()', () => {
    it('occasionally returns last name + suffix', () => {
      sinon.spy(pure.name, 'firstName');
      sinon.spy(pure.name, 'lastName');
      sinon.spy(pure.address, 'streetSuffix');
      sinon.stub(pure.random, 'number').returns(0);

      const streetName = pure.address.streetName();

      expect(streetName).toBeDefined();
      expect(!pure.name.firstName.called).toBe(true);
      expect(pure.name.lastName.calledOnce).toBe(true);
      expect(pure.address.streetSuffix.calledOnce).toBe(true);

      pure.random.number.restore();
      pure.name.firstName.restore();
      pure.name.lastName.restore();
      pure.address.streetSuffix.restore();
    });

    it('occasionally returns first name + suffix', () => {
      sinon.spy(pure.name, 'firstName');
      sinon.spy(pure.name, 'lastName');
      sinon.spy(pure.address, 'streetSuffix');
      sinon.stub(pure.random, 'number').returns(1);

      const streetName = pure.address.streetName();

      expect(streetName).toBeDefined();
      expect(pure.name.firstName.calledOnce).toBe(true);
      expect(!pure.name.lastName.called).toBe(true);
      expect(pure.address.streetSuffix.calledOnce).toBe(true);

      pure.random.number.restore();
      pure.name.firstName.restore();
      pure.name.lastName.restore();
      pure.address.streetSuffix.restore();
    });

    it('returns street suffix because of error', () => {
      sinon.spy(pure.address, 'streetSuffix');
      sinon.stub(pure.random, 'number').returns(2);

      const streetName = pure.address.streetName();

      expect(streetName).toBeDefined();
      expect(pure.address.streetSuffix.called).toBe(true);

      pure.address.streetSuffix.restore();
      pure.random.number.restore();
    });

    it('trims trailing whitespace from the name', () => {
      sinon.stub(pure.address, 'streetSuffix').returns('');

      const streetName = pure.address.streetName();

      expect(!streetName.match(/ $/)).toBe(true);
    });
  });

  describe('streetAddress()', () => {
    beforeEach(() => {
      sinon.spy(pure.address, 'streetName');
      sinon.spy(pure.address, 'secondaryAddress');
    });

    afterEach(() => {
      pure.address.streetName.restore();
      pure.address.secondaryAddress.restore();
    });

    it('occasionally returns a 5-digit street number', () => {
      sinon.stub(pure.random, 'number').returns(0);

      const address = pure.address.streetAddress();
      const parts = address.split(' ');

      expect(parts[0].length).toEqual(5);
      expect(pure.address.streetName.called).toBe(true);

      pure.random.number.restore();
    });

    it('occasionally returns a 4-digit street number', () => {
      sinon.stub(pure.random, 'number').returns(1);

      const address = pure.address.streetAddress();
      const parts = address.split(' ');

      expect(parts[0].length).toEqual(4);
      expect(pure.address.streetName.called).toBe(true);

      pure.random.number.restore();
    });

    it('occasionally returns a 3-digit street number', () => {
      sinon.stub(pure.random, 'number').returns(2);

      const address = pure.address.streetAddress();
      const parts = address.split(' ');

      expect(parts[0].length).toEqual(3);
      expect(pure.address.streetName.called).toBe(true);
      expect(!pure.address.secondaryAddress.called).toBe(true);

      pure.random.number.restore();
    });

    it('returns 2-digit street number it random.number is greater than 2', () => {
      sinon.stub(pure.random, 'number').returns(3);

      const address = pure.address.streetAddress();
      const parts = address.split(' ');

      expect(parts[0].length).toEqual(2);
      expect(pure.address.streetName.called).toBe(true);
      expect(!pure.address.secondaryAddress.called).toBe(true);

      pure.random.number.restore();
    });

    describe('when useFulladdress is true', () => {
      it('adds a secondary address to the result', () => {
        const address = pure.address.streetAddress(true);
        const parts = address.split(' ');

        expect(pure.address.secondaryAddress.called).toBe(true);
        expect(parts.length).toBeGreaterThan(3);
      });
    });
  });

  describe('streetPrefix()', () => {
    it('return random street prefix', () => {
      const prefix = pure.address.streetPrefix();

      expect(prefix).toBeDefined();
    });
  });

  describe('secondaryAddress()', () => {
    it('randomly chooses an Apt or Suite number', () => {
      sinon.spy(pure.random, 'arrayElement');

      const address = pure.address.secondaryAddress();
      const expectedArray = ['Apt. ###', 'Suite ###'];

      expect(address).toBeDefined();
      expect(pure.random.arrayElement.calledWith(expectedArray)).toBe(true);

      pure.random.arrayElement.restore();
    });
  });

  describe('county()', () => {
    it('returns random county', () => {
      sinon.spy(pure.address, 'county');

      const county = pure.address.county();

      expect(county).toBeDefined();
      expect(pure.address.county.called).toBe(true);

      pure.address.county.restore();
    });
  });

  describe('country()', () => {
    it('returns random country', () => {
      sinon.spy(pure.address, 'country');

      const country = pure.address.country();

      expect(country).toBeDefined();
      expect(pure.address.country.called).toBe(true);

      pure.address.country.restore();
    });
  });

  describe('defaultCountry()', () => {
    it('returns random defaultCountry', () => {
      sinon.spy(pure.address, 'defaultCountry');

      const defaultCountry = pure.address.defaultCountry();

      expect(defaultCountry).toBeDefined();
      expect(pure.address.defaultCountry.called).toBe(true);

      pure.address.defaultCountry.restore();
    });
  });

  describe('countryCode()', () => {
    it('returns random countryCode', () => {
      sinon.spy(pure.address, 'countryCode');

      const countryCode = pure.address.countryCode();

      expect(countryCode).toBeDefined();
      expect(pure.address.countryCode.called).toBe(true);

      pure.address.countryCode.restore();
    });

    it('returns random alpha-3 countryCode', () => {
      sinon.spy(pure.address, 'countryCode');

      const countryCode = pure.address.countryCode('alpha-3');

      expect(countryCode).toBeDefined();
      expect(pure.address.countryCode.called).toBe(true);
      expect(countryCode.length).toBe(3);

      pure.address.countryCode.restore();
    });
  });

  describe('state()', () => {
    it('returns random state', () => {
      sinon.spy(pure.address, 'state');

      const state = pure.address.state();

      expect(state).toBeDefined();
      expect(pure.address.state.called).toBe(true);

      pure.address.state.restore();
    });

    it('returns abbreviation when useAbbr is true', () => {
      const state = pure.address.state(true);

      expect(typeof state).toBe('string');
      expect(state.length <= 2).toBe(true);
    });
  });

  describe('stateAbbr()', () => {
    it('return random street prefix', () => {
      const abbr = pure.address.stateAbbr();

      expect(abbr).toBeDefined();
    });
  });

  describe('zipCode()', () => {
    it('returns random zipCode', () => {
      sinon.spy(pure.address, 'zipCode');

      const zipCode = pure.address.zipCode();

      expect(zipCode).toBeDefined();
      expect(pure.address.zipCode.called).toBe(true);

      pure.address.zipCode.restore();
    });

    it('returns zipCode with user specified format', () => {
      let zipCode = pure.address.zipCode('?#? #?#');

      expect(/^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/.test(zipCode)).toBe(true);
      // try another format
      zipCode = pure.address.zipCode('###-###');

      expect(/^\d{3}-\d{3}$/.test(zipCode)).toBe(true);
    });

    it('returns zipCode with proper locale format', () => {
      const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
        postcode: ['A#? #?#']
      }));

      const zipCode = pure.address.zipCode();

      expect(/^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/.test(zipCode)).toBe(true);
      stub.restore();
    });

    it('returns random zipCode with specific postcode', () => {
      sinon.spy(pure.address, 'zipCode');

      const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
        postcode: '#####'
      }));
      const zipCode = pure.address.zipCode();

      expect(zipCode).toBeDefined();
      expect(pure.address.zipCode.called).toBe(true);

      pure.address.zipCode.restore();
      stub.restore();
    });
  });

  describe('zipCodeByState()', () => {
    it('returns zipCode valid for specified State', () => {
      const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
        postcodeByState: {
          IL: { min: 60001, max: 62999 },
          GA: { min: 30001, max: 31999 },
          WA: { min: 98001, max: 99403 }
        }
      }));

      const states = ['IL', 'GA', 'WA'];
      const zipCode1 = pure.address.zipCodeByState(states[0]);
      const zipCode2 = pure.address.zipCodeByState(states[1]);
      const zipCode3 = pure.address.zipCodeByState(states[2]);

      expect(zipCode1).toBeGreaterThanOrEqual(60001);
      expect(zipCode1).toBeLessThanOrEqual(62999);
      expect(zipCode2).toBeGreaterThanOrEqual(30001);
      expect(zipCode2).toBeLessThanOrEqual(31999);
      expect(zipCode3).toBeGreaterThanOrEqual(98001);
      expect(zipCode3).toBeLessThanOrEqual(99403);

      stub.restore();
    });

    it('returns undefined if state is invalid', () => {
      sinon.spy(pure.address, 'zipCode');

      const zipCode = pure.address.zipCodeByState('XX');

      expect(typeof zipCode).toBe('string');
      expect(pure.address.zipCode.called).toBe(true);

      pure.address.zipCode.restore();
    });

    it('returns undefined if state is valid but locale is invalid', () => {
      const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
        postcodeByState: {}
      }));
      sinon.spy(pure.address, 'zipCode');

      const zipCode = pure.address.zipCodeByState('IL');

      expect(typeof zipCode).toBe('string');
      expect(pure.address.zipCode.called).toBe(true);

      pure.address.zipCode.restore();
      stub.restore();
    });
  });

  describe('latitude()', () => {
    it('returns random latitude', () => {
      sinon.spy(pure.random, 'number');

      const latitude = pure.address.latitude();
      const latitudeFloat = parseFloat(latitude);

      expect(typeof latitude).toBe('string');
      expect(latitudeFloat).toBeGreaterThanOrEqual(-90.0);
      expect(latitudeFloat).toBeLessThanOrEqual(90.0);
      expect(pure.random.number.called).toBe(true);

      pure.random.number.restore();
    });

    it('returns latitude with min and max and default precision', () => {
      sinon.spy(pure.random, 'number');

      const latitude = pure.address.latitude({ min: -5, max: 5, precision: 4 });
      const latitudeFloat = parseFloat(latitude);

      expect(typeof latitude).toBe('string');
      expect(latitude.split('.')[1].length).toEqual(4);
      expect(latitudeFloat).toBeGreaterThanOrEqual(-5);
      expect(latitudeFloat).toBeLessThanOrEqual(5);
      expect(pure.random.number.called).toBe(true);

      pure.random.number.restore();
    });

    it('returns random latitude with custom precision', () => {
      sinon.spy(pure.random, 'number');

      const latitude = pure.address.latitude({ precision: 7 });
      const latitudeFloat = parseFloat(latitude);

      expect(typeof latitude).toBe('string');
      expect(latitude.split('.')[1].length).toEqual(7);
      expect(latitudeFloat).toBeGreaterThanOrEqual(-180);
      expect(latitudeFloat).toBeLessThanOrEqual(180);
      expect(pure.random.number.called).toBe(true);

      pure.random.number.restore();
    });
  });

  describe('longitude()', () => {
    it('returns random longitude', () => {
      sinon.spy(pure.random, 'number');

      const longitude = pure.address.longitude();
      const longitudeFloat = parseFloat(longitude);

      expect(typeof longitude).toBe('string');
      expect(longitudeFloat).toBeGreaterThanOrEqual(-180.0);
      expect(longitudeFloat).toBeLessThanOrEqual(180.0);
      expect(pure.random.number.called).toBe(true);

      pure.random.number.restore();
    });

    it('returns random longitude with min and max and default precision', () => {
      sinon.spy(pure.random, 'number');

      const longitude = pure.address.longitude({ max: 100, min: -30 });
      const longitudeFloat = parseFloat(longitude);

      expect(typeof longitude).toBe('string');
      expect(longitude.split('.')[1].length).toEqual(4);
      expect(longitudeFloat).toBeGreaterThanOrEqual(-30);
      expect(longitudeFloat).toBeLessThanOrEqual(100);
      expect(pure.random.number.called).toBe(true);

      pure.random.number.restore();
    });

    it('returns random longitude with custom precision', () => {
      sinon.spy(pure.random, 'number');

      const longitude = pure.address.longitude({ precision: 7 });
      const longitudeFloat = parseFloat(longitude);

      expect(typeof longitude).toBe('string');
      expect(longitude.split('.')[1].length).toEqual(7);
      expect(longitudeFloat).toBeGreaterThanOrEqual(-180);
      expect(longitudeFloat).toBeLessThanOrEqual(180);
      expect(pure.random.number.called).toBe(true);

      pure.random.number.restore();
    });
  });

  describe('direction()', () => {
    it('returns random direction', () => {
      const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
        direction: {
          cardinal: ['North']
        }
      }));

      const direction = pure.address.direction();

      expect(direction).toEqual('North');

      stub.restore();
    });

    it('returns abbreviation when useAbbr is false', () => {
      const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
        direction: {
          cardinal: ['North']
        }
      }));

      const direction = pure.address.direction(false);

      expect(direction).toEqual('North');

      stub.restore();
    });

    it('returns abbreviation when useAbbr is true', () => {
      const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
        directionAbbr: {
          cardinal: ['N']
        }
      }));

      const direction = pure.address.direction(true);

      expect(direction).toEqual('N');

      stub.restore();
    });
  });

  describe('ordinalDirection()', () => {
    it('returns random ordinal direction', () => {
      const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
        direction: {
          ordinal: ['Northeast']
        }
      }));

      const ordinalDirection = pure.address.ordinalDirection();

      expect(ordinalDirection).toEqual('Northeast');

      stub.restore();
    });

    it('returns abbreviation when useAbbr is true stubbed', () => {
      const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
        directionAbbr: {
          ordinal: ['SE']
        }
      }));

      const ordinalDirection = pure.address.ordinalDirection(true);

      expect(ordinalDirection).toEqual('SE');

      stub.restore();
    });

    it('returns abbreviation when useAbbr is true', () => {
      const ordinalDirection = pure.address.ordinalDirection(true);

      expect(typeof ordinalDirection).toBe('string');
      expect(ordinalDirection.length).toBeLessThanOrEqual(2);
    });

    it('returns abbreviation when useAbbr is false', () => {
      const ordinalDirection = pure.address.ordinalDirection(false);

      expect(typeof ordinalDirection).toBe('string');
    });
  });

  describe('cardinalDirection()', () => {
    it('returns random cardinal direction', () => {
      const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
        direction: {
          cardinal: ['North']
        }
      }));

      const cardinalDirection = pure.address.cardinalDirection();

      expect(cardinalDirection).toEqual('North');

      stub.restore();
    });

    it('returns abbreviation when useAbbr is true stubbed', () => {
      const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
        directionAbbr: {
          cardinal: ['N']
        }
      }));

      const cardinalDirection = pure.address.cardinalDirection(true);

      expect(cardinalDirection).toEqual('N');

      stub.restore();
    });
  });

  describe('nearbyGPSCoordinate()', () => {
    it('returns random gps coordinate within a distance of another one', () => {
      const latFloat1 = parseFloat(pure.address.latitude());
      const lonFloat1 = parseFloat(pure.address.longitude());
      const coord = [latFloat1, lonFloat1];
      const coordinate = pure.address.nearbyGPSCoordinate({ coordinate: coord, isMetric: true });

      expect(coordinate.length).toEqual(2);
      expect(typeof coordinate[0]).toBe('string');
      expect(typeof coordinate[1]).toBe('string');
    });

    it('returns random gps coordinate when coordinate is undefined', () => {
      const coordinate = pure.address.nearbyGPSCoordinate({ isMetric: true });

      expect(coordinate.length).toEqual(2);
      expect(typeof coordinate[0]).toBe('string');
      expect(typeof coordinate[1]).toBe('string');
    });

    it('test coordinateWithOffset when isMetric is true', () => {
      const latFloat1 = parseFloat(pure.address.latitude());
      const lonFloat1 = parseFloat(pure.address.longitude());
      const coord = [latFloat1, lonFloat1];
      const coordinate = pure.address.nearbyGPSCoordinate({ coordinate: coord, isMetric: true });

      expect(coordinate.length).toEqual(2);
      expect(typeof coordinate[0]).toBe('string');
      expect(typeof coordinate[1]).toBe('string');
    });

    it('test coordinateWithOffset when isMetric is false', () => {
      const latFloat1 = parseFloat(pure.address.latitude());
      const lonFloat1 = parseFloat(pure.address.longitude());
      const coord = [latFloat1, lonFloat1];
      const coordinate = pure.address.nearbyGPSCoordinate({ coordinate: coord, isMetric: false });

      expect(coordinate.length).toEqual(2);
      expect(typeof coordinate[0]).toBe('string');
      expect(typeof coordinate[1]).toBe('string');
    });

    it('test coordinateWithOffset when lon2 is less than -3.14...', () => {
      sinon.stub(Math, 'atan2').returns(-0.8);

      pure.seed(5);
      const latFloat1 = parseFloat(pure.address.latitude());
      const lonFloat1 = parseFloat(pure.address.longitude());
      const coord = [latFloat1, lonFloat1];
      const seed = pure.getSeed();
      const coordinate = pure.address.nearbyGPSCoordinate({ coordinate: coord, isMetric: true });

      expect(coordinate.length).toEqual(2);
      expect(typeof coordinate[0]).toBe('string');
      expect(typeof coordinate[1]).toBe('string');
      expect(seed).toEqual(5);

      Math.atan2.restore();
      pure.seed();
    });

    it('test coordinateWithOffset when lon2 is greater than 3.14...', () => {
      sinon.stub(Math, 'atan2').returns(0.5);

      pure.seed(1);
      const latFloat1 = parseFloat(pure.address.latitude());
      const lonFloat1 = parseFloat(pure.address.longitude());
      const coord = [latFloat1, lonFloat1];
      const coordinate = pure.address.nearbyGPSCoordinate({ coordinate: coord, isMetric: true });

      expect(coordinate.length).toEqual(2);
      expect(typeof coordinate[0]).toBe('string');
      expect(typeof coordinate[1]).toBe('string');

      Math.atan2.restore();
      pure.seed();
    });

    it('returns correctly when no argument passed', () => {
      const coordinate = pure.address.nearbyGPSCoordinate();

      expect(coordinate.length).toEqual(2);
      expect(typeof coordinate[0]).toBe('string');
      expect(typeof coordinate[1]).toBe('string');
    });

    it('returns correctly when lon is greather than 180', () => {
      sinon.stub(Math, 'atan2').returns(2);

      const coordinate = pure.address.nearbyGPSCoordinate({ coordinate: [90, 200] });

      expect(coordinate.length).toEqual(2);
      expect(typeof coordinate[0]).toBe('string');
      expect(typeof coordinate[1]).toBe('string');
      expect(coordinate[1]).toEqual('-45.4084');

      Math.atan2.restore();
    });

    it('returns correctly when lon is less than -180', () => {
      sinon.stub(Math, 'atan2').returns(-2);

      const coordinate = pure.address.nearbyGPSCoordinate({ coordinate: [90, -185] });

      expect(coordinate.length).toEqual(2);
      expect(typeof coordinate[0]).toBe('string');
      expect(typeof coordinate[1]).toBe('string');
      expect(coordinate[1]).toEqual('60.4084');

      Math.atan2.restore();
    });
  });

  describe('timeZone()', () => {
    it('returns random timeZone', () => {
      sinon.spy(pure.address, 'timeZone');

      const timeZone = pure.address.timeZone();

      expect(timeZone).toBeDefined();
      expect(pure.address.timeZone.called).toBe(true);

      pure.address.timeZone.restore();
    });
  });
});
