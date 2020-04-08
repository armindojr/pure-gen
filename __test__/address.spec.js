const { assert, expect } = require('chai');
const sinon = require('sinon');
const pure = require('../index');

describe('address.js', () => {
    describe('city()', () => {
        beforeEach(() => {
            sinon.spy(pure.address, 'cityPrefix');
            sinon.spy(pure.name, 'firstName');
            sinon.spy(pure.name, 'lastName');
            sinon.spy(pure.address, 'citySuffix');
        });

        afterEach(() => {
            pure.random.number.restore();
            pure.address.cityPrefix.restore();
            pure.name.firstName.restore();
            pure.name.lastName.restore();
            pure.address.citySuffix.restore();
        });

        it('occasionally returns prefix + first name + suffix', () => {
            sinon.stub(pure.random, 'number').returns(0);

            const city = pure.address.city();
            assert.ok(city);

            assert.ok(pure.address.cityPrefix.calledOnce);
            assert.ok(pure.name.firstName.calledOnce);
            assert.ok(pure.address.citySuffix.calledOnce);
        });

        it('occasionally returns prefix + first name', () => {
            sinon.stub(pure.random, 'number').returns(1);

            const city = pure.address.city();
            assert.ok(city);

            assert.ok(pure.address.cityPrefix.calledOnce);
            assert.ok(pure.name.firstName.calledOnce);
        });

        it('occasionally returns first name + suffix', () => {
            sinon.stub(pure.random, 'number').returns(2);

            const city = pure.address.city();
            assert.ok(city);

            assert.ok(pure.address.citySuffix.calledOnce);
        });

        it('occasionally returns last name + suffix', () => {
            sinon.stub(pure.random, 'number').returns(3);

            const city = pure.address.city();
            assert.ok(city);

            assert.ok(!pure.address.cityPrefix.called);
            assert.ok(!pure.name.firstName.called);
            assert.ok(pure.name.lastName.calledOnce);
            assert.ok(pure.address.citySuffix.calledOnce);
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
            pure.locale = 'en_CA';
            const zipCode = pure.address.zipCode();
            assert.ok(zipCode.match(/^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/));
        });

        it('returns random zipCode', () => {
            sinon.spy(pure.address, 'zipCode');
            var stub = sinon.stub(pure.definitions, 'address').get(function getterFn() {
                return {
                    postcode: '#####'
                };
            })
            const zipCode = pure.address.zipCode();

            assert.ok(zipCode);
            assert.ok(pure.address.zipCode.called);
            pure.address.zipCode.restore();
            stub.restore()
        });
    });

    describe('zipCodeByState()', () => {
        it('returns zipCode valid for specified State', () => {
            pure.locale = 'en_US';
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
            pure.locale = 'zh_CN';
            const state = 'IL';
            sinon.spy(pure.address, 'zipCode');
            const zipCode = pure.address.zipCodeByState(state);
            assert.ok(pure.address.zipCode.called);
            assert.ok(typeof zipCode === 'string');
            pure.address.zipCode.restore();
            pure.locale = 'en';
        });
    });

    describe('latitude()', () => {
        it('returns random latitude', () => {
            for (let i = 0; i < 100; i += 1) {
                sinon.spy(pure.random, 'number');
                const latitude = pure.address.latitude();
                assert.ok(typeof latitude === 'string');
                const latitudeFloat = parseFloat(latitude);
                assert.ok(latitudeFloat >= -90.0);
                assert.ok(latitudeFloat <= 90.0);
                assert.ok(pure.random.number.called);
                pure.random.number.restore();
            }
        });

        it('returns latitude with min and max and default precision', () => {
            for (let i = 0; i < 100; i += 1) {
                sinon.spy(pure.random, 'number');
                const latitude = pure.address.latitude(-5, 5);
                assert.ok(typeof latitude === 'string');
                assert.equal(latitude.split('.')[1].length, 4);
                const latitudeFloat = parseFloat(latitude);
                assert.ok(latitudeFloat >= -5);
                assert.ok(latitudeFloat <= 5);
                assert.ok(pure.random.number.called);
                pure.random.number.restore();
            }
        });

        it('returns random latitude with custom precision', () => {
            for (let i = 0; i < 100; i += 1) {
                sinon.spy(pure.random, 'number');
                const latitude = pure.address.latitude(undefined, undefined, 7);
                assert.ok(typeof latitude === 'string');
                assert.equal(latitude.split('.')[1].length, 7);
                const latitudeFloat = parseFloat(latitude);
                assert.ok(latitudeFloat >= -180);
                assert.ok(latitudeFloat <= 180);
                assert.ok(pure.random.number.called);
                pure.random.number.restore();
            }
        });
    });

    describe('longitude()', () => {
        it('returns random longitude', () => {
            for (let i = 0; i < 100; i += 1) {
                sinon.spy(pure.random, 'number');
                const longitude = pure.address.longitude();
                assert.ok(typeof longitude === 'string');
                const longitudeFloat = parseFloat(longitude);
                assert.ok(longitudeFloat >= -180.0);
                assert.ok(longitudeFloat <= 180.0);
                assert.ok(pure.random.number.called);
                pure.random.number.restore();
            }
        });

        it('returns random longitude with min and max and default precision', () => {
            for (let i = 0; i < 100; i += 1) {
                sinon.spy(pure.random, 'number');
                const longitude = pure.address.longitude(100, -30);
                assert.ok(typeof longitude === 'string');
                assert.equal(longitude.split('.')[1].length, 4);
                const longitudeFloat = parseFloat(longitude);
                assert.ok(longitudeFloat >= -30);
                assert.ok(longitudeFloat <= 100);
                assert.ok(pure.random.number.called);
                pure.random.number.restore();
            }
        });

        it('returns random longitude with custom precision', () => {
            for (let i = 0; i < 100; i += 1) {
                sinon.spy(pure.random, 'number');
                const longitude = pure.address.longitude(undefined, undefined, 7);
                assert.ok(typeof longitude === 'string');
                assert.equal(longitude.split('.')[1].length, 7);
                const longitudeFloat = parseFloat(longitude);
                assert.ok(longitudeFloat >= -180);
                assert.ok(longitudeFloat <= 180);
                assert.ok(pure.random.number.called);
                pure.random.number.restore();
            }
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

        it('returns abbreviation when useAbbr is true', () => {
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

        it('returns abbreviation when useAbbr is true', () => {
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
    });

    describe('cardinalDirection()', () => {
        it('returns random cardinal direction', () => {
            sinon.stub(pure.address, 'cardinalDirection').returns('Northwest');
            const cardinalDirection = pure.address.cardinalDirection();

            assert.equal(cardinalDirection, 'Northwest');
            pure.address.cardinalDirection.restore();
        });

        it('returns abbreviation when useAbbr is true', () => {
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
    });

    describe('nearbyGPSCoordinate()', () => {
        it('returns random gps coordinate within a distance of another one', () => {
            const latFloat1 = parseFloat(pure.address.latitude());
            const lonFloat1 = parseFloat(pure.address.longitude());
            const isMetric = (Math.round(Math.random()) === 1);

            // test once with undefined radius
            const coordinate = pure.address.nearbyGPSCoordinate([latFloat1, lonFloat1], undefined, isMetric);
            assert.ok(coordinate.length === 2);
            assert.ok(typeof coordinate[0] === 'string');
            assert.ok(typeof coordinate[1] === 'string');
        });
        it('test coordinateWithOffset when isMetric is true', () => {
            const latFloat1 = parseFloat(pure.address.latitude());
            const lonFloat1 = parseFloat(pure.address.longitude());

            // test once with undefined radius
            const coordinate = pure.address.nearbyGPSCoordinate([latFloat1, lonFloat1], undefined, true);
            assert.ok(coordinate.length === 2);
            assert.ok(typeof coordinate[0] === 'string');
            assert.ok(typeof coordinate[1] === 'string');
        });
        it('test coordinateWithOffset when isMetric is false', () => {
            const latFloat1 = parseFloat(pure.address.latitude());
            const lonFloat1 = parseFloat(pure.address.longitude());

            // test once with undefined radius
            const coordinate = pure.address.nearbyGPSCoordinate([latFloat1, lonFloat1], undefined, false);
            assert.ok(coordinate.length === 2);
            assert.ok(typeof coordinate[0] === 'string');
            assert.ok(typeof coordinate[1] === 'string');
        });
        it('test coordinateWithOffset when lon2 is lesser than -3.14...', () => {
            sinon.stub(Math, 'atan2').returns(-0.80);
            pure.seed(5);
            const latFloat1 = parseFloat(pure.address.latitude());
            const lonFloat1 = parseFloat(pure.address.longitude());

            const coordinate = pure.address.nearbyGPSCoordinate([latFloat1, lonFloat1], undefined, true);
            assert.ok(coordinate.length === 2);
            assert.ok(typeof coordinate[0] === 'string');
            assert.ok(typeof coordinate[1] === 'string');
            Math.atan2.restore();
            pure.seed();
        });
        it('test coordinateWithOffset when lon2 is greater than 3.14...', () => {
            sinon.stub(Math, 'atan2').returns(0.50);
            pure.seed(1);
            const latFloat1 = parseFloat(pure.address.latitude());
            const lonFloat1 = parseFloat(pure.address.longitude());

            const coordinate = pure.address.nearbyGPSCoordinate([latFloat1, lonFloat1], undefined, true);
            assert.ok(coordinate.length === 2);
            assert.ok(typeof coordinate[0] === 'string');
            assert.ok(typeof coordinate[1] === 'string');
            Math.atan2.restore();
            pure.seed();
        });
    });
});
