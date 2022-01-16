const { assert, expect } = require('chai');
const sinon = require('sinon');
const pure = require('../index');

describe('address.js', () => {
    describe('city()', () => {
        it('returns random city based on locale', () => {
            const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
                city: {
                    default: ['test'],
                },
            }));

            const city = pure.address.city();

            assert.ok(city);
            assert.isString(city);

            stub.restore();
        });

        it('returns random city when filtering by state', () => {
            const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
                city: {
                    Foo: ['random'],
                    Bar: ['test'],
                },
            }));

            const city = pure.address.city('bar');

            assert.ok(city);
            assert.isString(city);
            expect(city).to.equal('test');

            stub.restore();
        });

        it('returns random city passing index as parameter', () => {
            sinon.stub(pure.address, 'state').returns('Bar');
            const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
                city: [
                    'foo',
                ],
            }));

            const city = pure.address.city(0);

            assert.ok(city);
            assert.isString(city);
            expect(city).to.equal('foo');

            pure.address.state.restore();
            stub.restore();
        });

        it('returns random city with invalid string', () => {
            sinon.stub(pure.random, 'objectElement').returns('Bar');
            const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
                city: {
                    Foo: ['random'],
                    Bar: ['test'],
                },
            }));

            const city = pure.address.city('');

            assert.ok(city);
            assert.isString(city);
            expect(city).to.equal('test');

            pure.random.objectElement.restore();
            stub.restore();
        });

        it('returns random city when localized data is mustache string', () => {
            const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
                city: [
                    '{{name.lastName}} {{name.firstName}}',
                ],
            }));

            const city = pure.address.city();

            assert.ok(city);
            assert.isString(city);
            expect(city.split(' ').length).to.equal(2);

            stub.restore();
        });
    });

    describe('cityPrefix()', () => {
        it('return a random city prefix', () => {
            const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
                city_prefix: ['foo'],
            }));

            const prefix = pure.address.cityPrefix();

            assert.ok(prefix);
            assert.isString(prefix);
            expect(prefix).to.equal('foo');

            stub.restore();
        });
    });

    describe('citySuffix()', () => {
        it('return a random city suffix', () => {
            const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
                city_suffix: ['foo'],
            }));

            const suffix = pure.address.citySuffix();

            assert.ok(suffix);
            assert.isString(suffix);
            expect(suffix).to.equal('foo');

            stub.restore();
        });
    });

    describe('cityName()', () => {
        it('returns random cityName', () => {
            sinon.spy(pure.address, 'cityName');
            const cityName = pure.address.cityName();
            assert.ok(cityName);
            assert.ok(pure.address.cityName.called);
            pure.address.cityName.restore();
        });
    });

    describe('streetName()', () => {
        beforeEach(() => {
            sinon.spy(pure.name, 'firstName');
            sinon.spy(pure.name, 'lastName');
            sinon.spy(pure.address, 'streetSuffix');
        });

        afterEach(() => {
            pure.name.firstName.restore();
            pure.name.lastName.restore();
            pure.address.streetSuffix.restore();
        });

        it('occasionally returns last name + suffix', () => {
            sinon.stub(pure.random, 'number').returns(0);

            const streetName = pure.address.streetName();
            assert.ok(streetName);
            assert.ok(!pure.name.firstName.called);
            assert.ok(pure.name.lastName.calledOnce);
            assert.ok(pure.address.streetSuffix.calledOnce);

            pure.random.number.restore();
        });

        it('occasionally returns first name + suffix', () => {
            sinon.stub(pure.random, 'number').returns(1);

            const streetName = pure.address.streetName();
            assert.ok(streetName);

            assert.ok(pure.name.firstName.calledOnce);
            assert.ok(!pure.name.lastName.called);
            assert.ok(pure.address.streetSuffix.calledOnce);

            pure.random.number.restore();
        });

        it('trims trailing whitespace from the name', () => {
            pure.address.streetSuffix.restore();

            sinon.stub(pure.address, 'streetSuffix').returns('');
            const streetName = pure.address.streetName();
            assert.ok(!streetName.match(/ $/));
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

            assert.equal(parts[0].length, 5);
            assert.ok(pure.address.streetName.called);

            pure.random.number.restore();
        });

        it('occasionally returns a 4-digit street number', () => {
            sinon.stub(pure.random, 'number').returns(1);
            const address = pure.address.streetAddress();
            const parts = address.split(' ');

            assert.equal(parts[0].length, 4);
            assert.ok(pure.address.streetName.called);

            pure.random.number.restore();
        });

        it('occasionally returns a 3-digit street number', () => {
            sinon.stub(pure.random, 'number').returns(2);
            const address = pure.address.streetAddress();
            const parts = address.split(' ');

            assert.equal(parts[0].length, 3);
            assert.ok(pure.address.streetName.called);
            assert.ok(!pure.address.secondaryAddress.called);

            pure.random.number.restore();
        });

        it('returns 2-digit street number it random.number is greater than 2', () => {
            sinon.stub(pure.random, 'number').returns(3);
            const address = pure.address.streetAddress();
            const parts = address.split(' ');

            assert.equal(parts[0].length, 2);
            assert.ok(pure.address.streetName.called);
            assert.ok(!pure.address.secondaryAddress.called);

            pure.random.number.restore();
        });

        describe('when useFulladdress is true', () => {
            it('adds a secondary address to the result', () => {
                const address = pure.address.streetAddress(true);
                const parts = address.split(' ');

                assert.ok(pure.address.secondaryAddress.called);
                expect(parts.length).to.be.above(3);
            });
        });
    });

    describe('streetPrefix()', () => {
        it('return random street prefix', () => {
            const prefix = pure.address.streetPrefix();

            assert.ok(prefix);
        });
    });

    describe('secondaryAddress()', () => {
        it('randomly chooses an Apt or Suite number', () => {
            sinon.spy(pure.random, 'arrayElement');

            const address = pure.address.secondaryAddress();

            const expectedArray = [
                'Apt. ###',
                'Suite ###',
            ];

            assert.ok(address);
            assert.ok(pure.random.arrayElement.calledWith(expectedArray));
            pure.random.arrayElement.restore();
        });
    });

    describe('county()', () => {
        it('returns random county', () => {
            sinon.spy(pure.address, 'county');
            const county = pure.address.county();
            assert.ok(county);
            assert.ok(pure.address.county.called);
            pure.address.county.restore();
        });
    });

    describe('country()', () => {
        it('returns random country', () => {
            sinon.spy(pure.address, 'country');
            const country = pure.address.country();
            assert.ok(country);
            assert.ok(pure.address.country.called);
            pure.address.country.restore();
        });
    });

    describe('defaultCountry()', () => {
        it('returns random defaultCountry', () => {
            sinon.spy(pure.address, 'defaultCountry');
            const defaultCountry = pure.address.defaultCountry();
            assert.ok(defaultCountry);
            assert.ok(pure.address.defaultCountry.called);
            pure.address.defaultCountry.restore();
        });
    });

    describe('countryCode()', () => {
        it('returns random countryCode', () => {
            sinon.spy(pure.address, 'countryCode');
            const countryCode = pure.address.countryCode();
            assert.ok(countryCode);
            assert.ok(pure.address.countryCode.called);
            pure.address.countryCode.restore();
        });

        it('returns random alpha-3 countryCode', () => {
            sinon.spy(pure.address, 'countryCode');
            const countryCode = pure.address.countryCode('alpha-3');
            assert.ok(countryCode);
            assert.ok(pure.address.countryCode.called);
            assert.equal(countryCode.length, 3);
            pure.address.countryCode.restore();
        });
    });

    describe('state()', () => {
        it('returns random state', () => {
            sinon.spy(pure.address, 'state');
            const state = pure.address.state();
            assert.ok(state);
            assert.ok(pure.address.state.called);
            pure.address.state.restore();
        });

        it('returns abbreviation when useAbbr is true', () => {
            const state = pure.address.state(true);
            assert.equal(typeof state, 'string');
            assert.equal(state.length <= 2, true);
        });
    });

    describe('stateAbbr()', () => {
        it('return random street prefix', () => {
            const abbr = pure.address.stateAbbr();

            assert.ok(abbr);
        });
    });

    describe('zipCode()', () => {
        it('returns random zipCode', () => {
            sinon.spy(pure.address, 'zipCode');
            const zipCode = pure.address.zipCode();
            assert.ok(zipCode);
            assert.ok(pure.address.zipCode.called);
            pure.address.zipCode.restore();
        });

        it('returns random zipCode - user specified format', () => {
            let zipCode = pure.address.zipCode('?#? #?#');
            assert.ok(zipCode.match(/^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/));
            // try another format
            zipCode = pure.address.zipCode('###-###');
            assert.ok(zipCode.match(/^\d{3}-\d{3}$/));
        });

        it('returns zipCode with proper locale format', () => {
            // we'll use the en_CA locale..
            pure.setLocale('en_CA');
            const zipCode = pure.address.zipCode();
            assert.ok(zipCode.match(/^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/));
        });

        it('returns random zipCode', () => {
            sinon.spy(pure.address, 'zipCode');
            const stub = sinon.stub(pure.registeredModules, 'address').get(() => ({
                postcode: '#####',
            }));
            const zipCode = pure.address.zipCode();

            assert.ok(zipCode);
            assert.ok(pure.address.zipCode.called);
            pure.address.zipCode.restore();
            stub.restore();
        });
    });

    describe('zipCodeByState()', () => {
        it('returns zipCode valid for specified State', () => {
            pure.setLocale('en_US');
            const states = ['IL', 'GA', 'WA'];

            const zipCode1 = pure.address.zipCodeByState(states[0]);
            assert.ok(zipCode1 >= 60001);
            assert.ok(zipCode1 <= 62999);
            const zipCode2 = pure.address.zipCodeByState(states[1]);
            assert.ok(zipCode2 >= 30001);
            assert.ok(zipCode2 <= 31999);
            const zipCode3 = pure.address.zipCodeByState(states[2]);
            assert.ok(zipCode3 >= 98001);
            assert.ok(zipCode3 <= 99403);
        });

        it('returns undefined if state is invalid', () => {
            const state = 'XX';
            sinon.spy(pure.address, 'zipCode');
            const zipCode = pure.address.zipCodeByState(state);
            assert.ok(typeof zipCode === 'string');
            assert.ok(pure.address.zipCode.called);
            pure.address.zipCode.restore();
        });

        it('returns undefined if state is valid but localeis invalid', () => {
            pure.setLocale('zh_CN');
            const state = 'IL';
            sinon.spy(pure.address, 'zipCode');
            const zipCode = pure.address.zipCodeByState(state);
            assert.ok(pure.address.zipCode.called);
            assert.ok(typeof zipCode === 'string');
            pure.address.zipCode.restore();
            pure.setLocale('en');
        });
    });

    describe('latitude()', () => {
        it('returns random latitude', () => {
            sinon.spy(pure.random, 'number');
            const latitude = pure.address.latitude();
            assert.ok(typeof latitude === 'string');
            const latitudeFloat = parseFloat(latitude);
            assert.ok(latitudeFloat >= -90.0);
            assert.ok(latitudeFloat <= 90.0);
            assert.ok(pure.random.number.called);
            pure.random.number.restore();
        });

        it('returns latitude with min and max and default precision', () => {
            sinon.spy(pure.random, 'number');
            const latitude = pure.address.latitude({ min: -5, max: 5 });
            assert.ok(typeof latitude === 'string');
            assert.equal(latitude.split('.')[1].length, 4);
            const latitudeFloat = parseFloat(latitude);
            assert.ok(latitudeFloat >= -5);
            assert.ok(latitudeFloat <= 5);
            assert.ok(pure.random.number.called);
            pure.random.number.restore();
        });

        it('returns random latitude with custom precision', () => {
            sinon.spy(pure.random, 'number');
            const latitude = pure.address.latitude({ precision: 7 });
            assert.ok(typeof latitude === 'string');
            assert.equal(latitude.split('.')[1].length, 7);
            const latitudeFloat = parseFloat(latitude);
            assert.ok(latitudeFloat >= -180);
            assert.ok(latitudeFloat <= 180);
            assert.ok(pure.random.number.called);
            pure.random.number.restore();
        });
    });

    describe('longitude()', () => {
        it('returns random longitude', () => {
            sinon.spy(pure.random, 'number');
            const longitude = pure.address.longitude();
            assert.ok(typeof longitude === 'string');
            const longitudeFloat = parseFloat(longitude);
            assert.ok(longitudeFloat >= -180.0);
            assert.ok(longitudeFloat <= 180.0);
            assert.ok(pure.random.number.called);
            pure.random.number.restore();
        });

        it('returns random longitude with min and max and default precision', () => {
            sinon.spy(pure.random, 'number');
            const longitude = pure.address.longitude({ max: 100, min: -30 });
            assert.ok(typeof longitude === 'string');
            assert.equal(longitude.split('.')[1].length, 4);
            const longitudeFloat = parseFloat(longitude);
            assert.ok(longitudeFloat >= -30);
            assert.ok(longitudeFloat <= 100);
            assert.ok(pure.random.number.called);
            pure.random.number.restore();
        });

        it('returns random longitude with custom precision', () => {
            sinon.spy(pure.random, 'number');
            const longitude = pure.address.longitude({ precision: 7 });
            assert.ok(typeof longitude === 'string');
            assert.equal(longitude.split('.')[1].length, 7);
            const longitudeFloat = parseFloat(longitude);
            assert.ok(longitudeFloat >= -180);
            assert.ok(longitudeFloat <= 180);
            assert.ok(pure.random.number.called);
            pure.random.number.restore();
        });
    });

    describe('direction()', () => {
        it('returns random direction', () => {
            sinon.stub(pure.address, 'direction').returns('North');
            const direction = pure.address.direction();

            assert.equal(direction, 'North');
            pure.address.direction.restore();
        });

        it('returns abbreviation when useAbbr is false', () => {
            const direction = pure.address.direction(false);

            assert.equal(typeof direction, 'string');
        });

        it('returns abbreviation when useAbbr is false stubbed', () => {
            sinon.stub(pure.address, 'direction').returns('N');
            const direction = pure.address.direction(false);
            assert.equal(direction, 'N');
            pure.address.direction.restore();
        });

        it('returns abbreviation when useAbbr is true', () => {
            const direction = pure.address.direction(true);
            assert.equal(typeof direction, 'string');
            assert.equal(direction.length <= 2, true);
        });

        it('returns abbreviation when useAbbr is true stubbed', () => {
            sinon.stub(pure.address, 'direction').returns('N');
            const direction = pure.address.direction(true);
            assert.equal(direction, 'N');
            pure.address.direction.restore();
        });
    });

    describe('ordinalDirection()', () => {
        it('returns random ordinal direction', () => {
            sinon.stub(pure.address, 'ordinalDirection').returns('West');
            const ordinalDirection = pure.address.ordinalDirection();

            assert.equal(ordinalDirection, 'West');
            pure.address.ordinalDirection.restore();
        });

        it('returns abbreviation when useAbbr is true stubbed', () => {
            sinon.stub(pure.address, 'ordinalDirection').returns('W');
            const ordinalDirection = pure.address.ordinalDirection(true);

            assert.equal(ordinalDirection, 'W');
            pure.address.ordinalDirection.restore();
        });

        it('returns abbreviation when useAbbr is true', () => {
            const ordinalDirection = pure.address.ordinalDirection(true);
            assert.equal(typeof ordinalDirection, 'string');
            assert.equal(ordinalDirection.length <= 2, true);
        });

        it('returns abbreviation when useAbbr is true', () => {
            const ordinalDirection = pure.address.ordinalDirection(false);

            assert.equal(typeof ordinalDirection, 'string');
        });
    });

    describe('cardinalDirection()', () => {
        it('returns random cardinal direction', () => {
            sinon.stub(pure.address, 'cardinalDirection').returns('Northwest');
            const cardinalDirection = pure.address.cardinalDirection();

            assert.equal(cardinalDirection, 'Northwest');
            pure.address.cardinalDirection.restore();
        });

        it('returns abbreviation when useAbbr is true stubbed', () => {
            sinon.stub(pure.address, 'cardinalDirection').returns('NW');
            const cardinalDirection = pure.address.cardinalDirection(true);

            assert.equal(cardinalDirection, 'NW');
            pure.address.cardinalDirection.restore();
        });

        it('returns abbreviation when useAbbr is true', () => {
            const cardinalDirection = pure.address.cardinalDirection(true);
            assert.equal(typeof cardinalDirection, 'string');
            assert.equal(cardinalDirection.length <= 2, true);
        });

        it('returns abbreviation when useAbbr is false', () => {
            const cardinalDirection = pure.address.cardinalDirection(false);

            assert.equal(typeof cardinalDirection, 'string');
        });
    });

    describe('nearbyGPSCoordinate()', () => {
        it('returns random gps coordinate within a distance of another one', () => {
            const latFloat1 = parseFloat(pure.address.latitude());
            const lonFloat1 = parseFloat(pure.address.longitude());
            const coord = [latFloat1, lonFloat1];
            const isMetric = (Math.round(Math.random()) === 1);

            // test once with undefined radius
            const coordinate = pure.address.nearbyGPSCoordinate({ coordinate: coord, isMetric });
            assert.ok(coordinate.length === 2);
            assert.ok(typeof coordinate[0] === 'string');
            assert.ok(typeof coordinate[1] === 'string');
        });

        it('returns random gps coordinate when coordinate is undefined', () => {
            // test once with undefined radius
            const coordinate = pure.address.nearbyGPSCoordinate({ isMetric: true });
            assert.ok(coordinate.length === 2);
            assert.ok(typeof coordinate[0] === 'string');
            assert.ok(typeof coordinate[1] === 'string');
        });

        it('test coordinateWithOffset when isMetric is true', () => {
            const latFloat1 = parseFloat(pure.address.latitude());
            const lonFloat1 = parseFloat(pure.address.longitude());
            const coord = [latFloat1, lonFloat1];

            // test once with undefined radius
            const coordinate = pure.address.nearbyGPSCoordinate({ coordinate: coord, isMetric: true });
            assert.ok(coordinate.length === 2);
            assert.ok(typeof coordinate[0] === 'string');
            assert.ok(typeof coordinate[1] === 'string');
        });

        it('test coordinateWithOffset when isMetric is false', () => {
            const latFloat1 = parseFloat(pure.address.latitude());
            const lonFloat1 = parseFloat(pure.address.longitude());
            const coord = [latFloat1, lonFloat1];

            // test once with undefined radius
            const coordinate = pure.address.nearbyGPSCoordinate({ coordinate: coord, isMetric: false });
            assert.ok(coordinate.length === 2);
            assert.ok(typeof coordinate[0] === 'string');
            assert.ok(typeof coordinate[1] === 'string');
        });

        it('test coordinateWithOffset when lon2 is lesser than -3.14...', () => {
            sinon.stub(Math, 'atan2').returns(-0.80);
            pure.seed(5);
            const latFloat1 = parseFloat(pure.address.latitude());
            const lonFloat1 = parseFloat(pure.address.longitude());
            const coord = [latFloat1, lonFloat1];
            const seed = pure.getSeed();

            const coordinate = pure.address.nearbyGPSCoordinate({ coordinate: coord, isMetric: true });
            assert.ok(coordinate.length === 2);
            assert.ok(typeof coordinate[0] === 'string');
            assert.ok(typeof coordinate[1] === 'string');
            assert.equal(seed, 5);
            Math.atan2.restore();
            pure.seed();
        });

        it('test coordinateWithOffset when lon2 is greater than 3.14...', () => {
            sinon.stub(Math, 'atan2').returns(0.50);
            pure.seed(1);
            const latFloat1 = parseFloat(pure.address.latitude());
            const lonFloat1 = parseFloat(pure.address.longitude());
            const coord = [latFloat1, lonFloat1];

            const coordinate = pure.address.nearbyGPSCoordinate({ coordinate: coord, isMetric: true });
            assert.ok(coordinate.length === 2);
            assert.ok(typeof coordinate[0] === 'string');
            assert.ok(typeof coordinate[1] === 'string');
            Math.atan2.restore();
            pure.seed();
        });

        it('returns correctly when no argument passed', () => {
            const coordinate = pure.address.nearbyGPSCoordinate();

            assert.ok(coordinate.length === 2);
            assert.ok(typeof coordinate[0] === 'string');
            assert.ok(typeof coordinate[1] === 'string');
        });

        it('returns correctly when lon is greather than 180', () => {
            sinon.stub(Math, 'atan2').returns(2);
            const coordinate = pure.address.nearbyGPSCoordinate({ coordinate: [90, 200] });

            assert.ok(coordinate.length === 2);
            assert.ok(coordinate[1] === '-45.4084');
            assert.ok(typeof coordinate[0] === 'string');
            assert.ok(typeof coordinate[1] === 'string');

            Math.atan2.restore();
        });

        it('returns correctly when lon is less than -180', () => {
            sinon.stub(Math, 'atan2').returns(-2);
            const coordinate = pure.address.nearbyGPSCoordinate({ coordinate: [90, -185] });

            assert.ok(coordinate.length === 2);
            assert.ok(coordinate[1] === '60.4084');
            assert.ok(typeof coordinate[0] === 'string');
            assert.ok(typeof coordinate[1] === 'string');

            Math.atan2.restore();
        });
    });

    describe('timeZone()', () => {
        it('returns random timeZone', () => {
            sinon.spy(pure.address, 'timeZone');
            const timeZone = pure.address.timeZone();
            assert.ok(timeZone);
            assert.ok(pure.address.timeZone.called);
            pure.address.timeZone.restore();
        });
    });
});
