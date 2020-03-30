if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var pure = require('../index');
}

describe("airport.js", function () {
  describe("name()", function () {
      it("returns a random international airport", function () {
          sinon.stub(pure.airport, 'name').returns('Los Angeles International Airport');
          var airport = pure.airport.name();

          assert.equal(airport, 'Los Angeles International Airport');
          pure.airport.name.restore();
      });
  });

  describe("iataCode()", function () {
      it("returns random IATA code", function () {
        var iataCode = pure.airport.iataCode();
        assert.ok(iataCode.match(/^[A-Z]{3}$/));
      });
  });

  describe("icaoCode()", function () {
      it("returns random ICAO code", function () {
        var icaoCode = pure.airport.icaoCode();
        assert.ok(icaoCode.match(/^[A-Z]{2}$/));
      });
  });
});
