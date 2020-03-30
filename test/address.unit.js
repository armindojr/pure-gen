if (typeof module !== 'undefined') {
    var assert = require('assert');
    var sinon = require('sinon');
    var pure = require('../index');
}

describe("address.js", function () {
    describe("city()", function () {
        beforeEach(function () {
            sinon.spy(pure.address, 'cityPrefix');
            sinon.spy(pure.name, 'firstName');
            sinon.spy(pure.name, 'lastName');
            sinon.spy(pure.address, 'citySuffix');
        });

        afterEach(function () {
            pure.random.number.restore();
            pure.address.cityPrefix.restore();
            pure.name.firstName.restore();
            pure.name.lastName.restore();
            pure.address.citySuffix.restore();
        });

        it("occasionally returns prefix + first name + suffix", function () {
            sinon.stub(pure.random, 'number').returns(0);

            var city = pure.address.city();
            assert.ok(city);

            assert.ok(pure.address.cityPrefix.calledOnce);
            assert.ok(pure.name.firstName.calledOnce);
            assert.ok(pure.address.citySuffix.calledOnce);
        });

        it("occasionally returns prefix + first name", function () {
            sinon.stub(pure.random, 'number').returns(1);

            var city = pure.address.city();
            assert.ok(city);

            assert.ok(pure.address.cityPrefix.calledOnce);
            assert.ok(pure.name.firstName.calledOnce);
        });

        it("occasionally returns first name + suffix", function () {
            sinon.stub(pure.random, 'number').returns(2);

            var city = pure.address.city();
            assert.ok(city);

            assert.ok(pure.address.citySuffix.calledOnce);
        });

        it("occasionally returns last name + suffix", function () {
            sinon.stub(pure.random, 'number').returns(3);

            var city = pure.address.city();
            assert.ok(city);

            assert.ok(!pure.address.cityPrefix.called);
            assert.ok(!pure.name.firstName.called);
            assert.ok(pure.name.lastName.calledOnce);
            assert.ok(pure.address.citySuffix.calledOnce);
        });
    });

    describe("cityName()", function () {
        it("returns random cityName", function () {
            sinon.spy(pure.address, 'cityName');
            var cityName = pure.address.cityName();
            assert.ok(cityName);
            assert.ok(pure.address.cityName.called);
            pure.address.cityName.restore();
        });
    });

    describe("streetName()", function () {
        beforeEach(function () {
            sinon.spy(pure.name, 'firstName');
            sinon.spy(pure.name, 'lastName');
            sinon.spy(pure.address, 'streetSuffix');
        });

        afterEach(function () {
            pure.name.firstName.restore();
            pure.name.lastName.restore();
            pure.address.streetSuffix.restore();
        });

        it("occasionally returns last name + suffix", function () {
            sinon.stub(pure.random, 'number').returns(0);

            var street_name = pure.address.streetName();
            assert.ok(street_name);
            assert.ok(!pure.name.firstName.called);
            assert.ok(pure.name.lastName.calledOnce);
            assert.ok(pure.address.streetSuffix.calledOnce);

            pure.random.number.restore();
        });

        it("occasionally returns first name + suffix", function () {
            sinon.stub(pure.random, 'number').returns(1);

            var street_name = pure.address.streetName();
            assert.ok(street_name);

            assert.ok(pure.name.firstName.calledOnce);
            assert.ok(!pure.name.lastName.called);
            assert.ok(pure.address.streetSuffix.calledOnce);

            pure.random.number.restore();
        });

        it("trims trailing whitespace from the name", function() {
            pure.address.streetSuffix.restore();

            sinon.stub(pure.address, 'streetSuffix').returns("")
            var street_name = pure.address.streetName();
            assert.ok(!street_name.match(/ $/));
        });
    });



    describe("streetAddress()", function () {
        beforeEach(function () {
            sinon.spy(pure.address, 'streetName');
            sinon.spy(pure.address, 'secondaryAddress');
        });

        afterEach(function () {
            pure.address.streetName.restore();
            pure.address.secondaryAddress.restore();
        });

        it("occasionally returns a 5-digit street number", function () {
            sinon.stub(pure.random, 'number').returns(0);
            var address = pure.address.streetAddress();
            var parts = address.split(' ');

            assert.equal(parts[0].length, 5);
            assert.ok(pure.address.streetName.called);

            pure.random.number.restore();
        });

        it("occasionally returns a 4-digit street number", function () {
            sinon.stub(pure.random, 'number').returns(1);
            var address = pure.address.streetAddress();
            var parts = address.split(' ');

            assert.equal(parts[0].length, 4);
            assert.ok(pure.address.streetName.called);

            pure.random.number.restore();
        });

        it("occasionally returns a 3-digit street number", function () {
            sinon.stub(pure.random, 'number').returns(2);
            var address = pure.address.streetAddress();
            var parts = address.split(' ');

            assert.equal(parts[0].length, 3);
            assert.ok(pure.address.streetName.called);
            assert.ok(!pure.address.secondaryAddress.called);

            pure.random.number.restore();
        });

        context("when useFulladdress is true", function () {
            it("adds a secondary address to the result", function () {
                var address = pure.address.streetAddress(true);
                var parts = address.split(' ');

                assert.ok(pure.address.secondaryAddress.called);
            });
        });
    });


    describe("secondaryAddress()", function () {
        it("randomly chooses an Apt or Suite number", function () {
            sinon.spy(pure.random, 'arrayElement');

            var address = pure.address.secondaryAddress();

            var expected_array = [
                'Apt. ###',
                'Suite ###'
            ];

            assert.ok(address);
            assert.ok(pure.random.arrayElement.calledWith(expected_array));
            pure.random.arrayElement.restore();
        });
    });

    describe("county()", function () {
        it("returns random county", function () {
            sinon.spy(pure.address, 'county');
            var county = pure.address.county();
            assert.ok(county);
            assert.ok(pure.address.county.called);
            pure.address.county.restore();
        });
    });

    describe("country()", function () {
        it("returns random country", function () {
            sinon.spy(pure.address, 'country');
            var country = pure.address.country();
            assert.ok(country);
            assert.ok(pure.address.country.called);
            pure.address.country.restore();
        });
    });

    describe("defaultCountry()", function () {
        it("returns random defaultCountry", function () {
            sinon.spy(pure.address, 'defaultCountry');
            var defaultCountry = pure.address.defaultCountry();
            assert.ok(defaultCountry);
            assert.ok(pure.address.defaultCountry.called);
            pure.address.defaultCountry.restore();
        });
    });

    describe("countryCode()", function () {
        it("returns random countryCode", function () {
            sinon.spy(pure.address, 'countryCode');
            var countryCode = pure.address.countryCode();
            assert.ok(countryCode);
            assert.ok(pure.address.countryCode.called);
            pure.address.countryCode.restore();
        });

        it("returns random alpha-3 countryCode", function () {
            sinon.spy(pure.address, 'countryCode');
            var countryCode = pure.address.countryCode("alpha-3");
            assert.ok(countryCode);
            assert.ok(pure.address.countryCode.called);
            assert.equal(countryCode.length, 3);
            pure.address.countryCode.restore();
        });
    });

    describe("state()", function () {
        it("returns random state", function () {
            sinon.spy(pure.address, 'state');
            var state = pure.address.state();
            assert.ok(state);
            assert.ok(pure.address.state.called);
            pure.address.state.restore();
        });

        it("returns abbreviation when useAbbr is true", function () {
            var state = pure.address.state(true);
            assert.equal(typeof state, 'string');
            assert.equal(state.length <= 2, true);
        })
    });

    describe("zipCode()", function () {
        it("returns random zipCode", function () {
            sinon.spy(pure.address, 'zipCode');
            var zipCode = pure.address.zipCode();
            assert.ok(zipCode);
            assert.ok(pure.address.zipCode.called);
            pure.address.zipCode.restore();
        });

        it("returns random zipCode - user specified format", function () {
            var zipCode = pure.address.zipCode("?#? #?#");
            assert.ok(zipCode.match(/^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/));
            // try another format
            zipCode = pure.address.zipCode("###-###");
            assert.ok(zipCode.match(/^\d{3}-\d{3}$/));
        });

        it("returns zipCode with proper locale format", function () {
            // we'll use the en_CA locale..
            pure.locale = "en_CA";
            var zipCode = pure.address.zipCode();
            assert.ok(zipCode.match(/^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/));
        });
    });

    describe("zipCodeByState()", function () {
        it("returns zipCode valid for specified State", function () {
          pure.locale = "en_US";
          var states = ["IL", "GA", "WA"];

          var zipCode1 = pure.address.zipCodeByState(states[0]);
          assert.ok(zipCode1 >= 60001);
          assert.ok(zipCode1 <= 62999);
          var zipCode2 = pure.address.zipCodeByState(states[1]);
          assert.ok(zipCode2 >= 30001);
          assert.ok(zipCode2 <= 31999);
          var zipCode3 = pure.address.zipCodeByState(states[2]);
          assert.ok(zipCode3 >= 98001);
          assert.ok(zipCode3 <= 99403);
        });

        it("returns undefined if state is invalid", function () {
            var state = "XX";
            sinon.spy(pure.address, 'zipCode');
            var zipCode = pure.address.zipCodeByState(state);
            assert.ok(pure.address.zipCode.called);
            pure.address.zipCode.restore();
        });

        it("returns undefined if state is valid but localeis invalid", function () {
            pure.locale = "zh_CN";
            var state = "IL";
            sinon.spy(pure.address, 'zipCode');
            var zipCode = pure.address.zipCodeByState(state);
            assert.ok(pure.address.zipCode.called);
            pure.address.zipCode.restore();
        });
    });

    describe("latitude()", function () {
        it("returns random latitude", function () {
            for (var i = 0; i < 100; i++) {
                sinon.spy(pure.random, 'number');
                var latitude = pure.address.latitude();
                assert.ok(typeof latitude === 'string');
                var latitude_float = parseFloat(latitude);
                assert.ok(latitude_float >= -90.0);
                assert.ok(latitude_float <= 90.0);
                assert.ok(pure.random.number.called);
                pure.random.number.restore();
            }
        });

        it("returns latitude with min and max and default precision", function () {
            for (var i = 0; i < 100; i++) {
                sinon.spy(pure.random, 'number');
                var latitude = pure.address.latitude(-5, 5);
                assert.ok(typeof latitude === 'string');
                assert.equal(latitude.split('.')[1].length, 4);
                var latitude_float = parseFloat(latitude);
                assert.ok(latitude_float >= -5);
                assert.ok(latitude_float <= 5);
                assert.ok(pure.random.number.called);
                pure.random.number.restore();
            }
        });

        it("returns random latitude with custom precision", function () {
            for (var i = 0; i < 100; i++) {
                sinon.spy(pure.random, 'number');
                var latitude = pure.address.latitude(undefined, undefined, 7);
                assert.ok(typeof latitude === 'string');
                assert.equal(latitude.split('.')[1].length, 7);
                var latitude_float = parseFloat(latitude);
                assert.ok(latitude_float >= -180);
                assert.ok(latitude_float <= 180);
                assert.ok(pure.random.number.called);
                pure.random.number.restore();
            }
        });
    });

    describe("longitude()", function () {
        it("returns random longitude", function () {
            for (var i = 0; i < 100; i++) {
                sinon.spy(pure.random, 'number');
                var longitude = pure.address.longitude();
                assert.ok(typeof longitude === 'string');
                var longitude_float = parseFloat(longitude);
                assert.ok(longitude_float >= -180.0);
                assert.ok(longitude_float <= 180.0);
                assert.ok(pure.random.number.called);
                pure.random.number.restore();
            }
        });

        it("returns random longitude with min and max and default precision", function () {
            for (var i = 0; i < 100; i++) {
                sinon.spy(pure.random, 'number');
                var longitude = pure.address.longitude(100, -30);
                assert.ok(typeof longitude === 'string');
                assert.equal(longitude.split('.')[1].length, 4);
                var longitude_float = parseFloat(longitude);
                assert.ok(longitude_float >= -30);
                assert.ok(longitude_float <= 100);
                assert.ok(pure.random.number.called);
                pure.random.number.restore();
            }
        });

        it("returns random longitude with custom precision", function () {
            for (var i = 0; i < 100; i++) {
                sinon.spy(pure.random, 'number');
                var longitude = pure.address.longitude(undefined, undefined, 7);
                assert.ok(typeof longitude === 'string');
                assert.equal(longitude.split('.')[1].length, 7);
                var longitude_float = parseFloat(longitude);
                assert.ok(longitude_float >= -180);
                assert.ok(longitude_float <= 180);
                assert.ok(pure.random.number.called);
                pure.random.number.restore();
            }
        });
    });

    describe("direction()", function () {
        it("returns random direction", function () {
            sinon.stub(pure.address, 'direction').returns('North');
            var direction = pure.address.direction();

            assert.equal(direction, 'North');
            pure.address.direction.restore();
        })

        it("returns abbreviation when useAbbr is false", function () {
            sinon.stub(pure.address, 'direction').returns('N');
            var direction = pure.address.direction(false);
            assert.equal(direction, 'N');
            pure.address.direction.restore();
        })

        it("returns abbreviation when useAbbr is true", function () {
            var direction = pure.address.direction(true);
            assert.equal(typeof direction, 'string');
            assert.equal(direction.length <= 2, true);
        })

        it("returns abbreviation when useAbbr is true", function () {
            sinon.stub(pure.address, 'direction').returns('N');
            var direction = pure.address.direction(true);
            assert.equal(direction, 'N');
            pure.address.direction.restore();
        })

    })

    describe("ordinalDirection()", function () {
        it("returns random ordinal direction", function () {
            sinon.stub(pure.address, 'ordinalDirection').returns('West');
            var ordinalDirection = pure.address.ordinalDirection();

            assert.equal(ordinalDirection, 'West');
            pure.address.ordinalDirection.restore();
        })

        it("returns abbreviation when useAbbr is true", function () {
            sinon.stub(pure.address, 'ordinalDirection').returns('W');
            var ordinalDirection = pure.address.ordinalDirection(true);

            assert.equal(ordinalDirection, 'W');
            pure.address.ordinalDirection.restore();
        })

        it("returns abbreviation when useAbbr is true", function () {
            var ordinalDirection = pure.address.ordinalDirection(true);
            assert.equal(typeof ordinalDirection, 'string');
            assert.equal(ordinalDirection.length <= 2, true);
        })


    })

    describe("cardinalDirection()", function () {
        it("returns random cardinal direction", function () {
            sinon.stub(pure.address, 'cardinalDirection').returns('Northwest');
            var cardinalDirection = pure.address.cardinalDirection();

            assert.equal(cardinalDirection, 'Northwest');
            pure.address.cardinalDirection.restore();
        })

        it("returns abbreviation when useAbbr is true", function () {
            sinon.stub(pure.address, 'cardinalDirection').returns('NW');
            var cardinalDirection = pure.address.cardinalDirection(true);

            assert.equal(cardinalDirection, 'NW');
            pure.address.cardinalDirection.restore();
        })

        it("returns abbreviation when useAbbr is true", function () {
            var cardinalDirection = pure.address.cardinalDirection(true);
            assert.equal(typeof cardinalDirection, 'string');
            assert.equal(cardinalDirection.length <= 2, true);
        })

    })

    describe("nearbyGPSCoordinate()", function () {
        it("returns random gps coordinate within a distance of another one", function () {
            function haversine(lat1, lon1, lat2, lon2, isMetric) {
                function degreesToRadians(degrees) {
                    return degrees * (Math.PI/180.0);
                }
                function kilometersToMiles(miles) {
                    return miles * 0.621371;
                }
                var R = 6378.137;
                var dLat = degreesToRadians(lat2-lat1);
                var dLon = degreesToRadians(lon2-lon1);
                var a = Math.sin(dLat/2) * Math.sin(dLat/2)
                    + Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2))
                    * Math.sin(dLon/2) * Math.sin(dLon/2);
                var distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

                return isMetric ? distance : kilometersToMiles(distance);
            }
            for (var i = 0; i < 10000; i++) {
                var latFloat1 = parseFloat(pure.address.latitude());
                var lonFloat1 = parseFloat(pure.address.longitude());
                var radius = (Math.random() * 99) + 1; // range of [1, 100)
                var isMetric = (Math.round(Math.random()) == 1);

                var coordinate = pure.address.nearbyGPSCoordinate([latFloat1, lonFloat1], radius, isMetric);
                assert.ok(coordinate.length === 2);
                assert.ok(typeof coordinate[0] === 'string');
                assert.ok(typeof coordinate[1] === 'string');

                var latFloat2 = parseFloat(coordinate[0]);
                assert.ok(latFloat2 >= -90.0);
                assert.ok(latFloat2 <= 90.0);

                var lonFloat2 = parseFloat(coordinate[1]);
                assert.ok(lonFloat2 >= -180.0);
                assert.ok(lonFloat2 <= 180.0);

                // Due to floating point math, and constants that are not extremely precise,
                // returned points will not be strictly within the given radius of the input
                // coordinate. Using a error of 1.0 to compensate.
                var error = 1.0;
                var actualDistance = haversine(latFloat1, lonFloat1, latFloat2, lonFloat2, isMetric);
                assert.ok(actualDistance <= (radius + error));
            }

            // test once with undefined radius
            var coordinate = pure.address.nearbyGPSCoordinate([latFloat1, lonFloat1], undefined, isMetric);
            assert.ok(coordinate.length === 2);
            assert.ok(typeof coordinate[0] === 'string');
            assert.ok(typeof coordinate[1] === 'string');

        });
    });

});
