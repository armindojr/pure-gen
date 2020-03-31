var assert = require('assert');
var sinon = require('sinon');
var pure = require('../index');

describe("vehicle.js", function () {
  describe("vehicle()", function () {
      it("returns a random vehicle", function () {
          sinon.stub(pure.vehicle, 'vehicle').returns('Ford Explorer');
          var vehicle = pure.vehicle.vehicle();

          assert.equal(vehicle, 'Ford Explorer');
          pure.vehicle.vehicle.restore();
      });
  });

  describe("manufacturer()", function () {
      it("returns random manufacturer", function () {
          sinon.stub(pure.vehicle, 'manufacturer').returns('Porsche');
          var manufacturer = pure.vehicle.manufacturer();

          assert.equal(manufacturer, 'Porsche');
          pure.vehicle.manufacturer.restore();
      });
  });

  describe("type()", function () {
    it("returns random vehicle type", function () {
      sinon.stub(pure.vehicle, 'type').returns('Minivan');
          var type = pure.vehicle.type();

          assert.equal(type, 'Minivan');
          pure.vehicle.type.restore();
      });
  });

  describe("fuel()", function () {
      it("returns a fuel type", function () {
          sinon.stub(pure.vehicle, 'fuel').returns('Hybrid');
          var fuel = pure.vehicle.fuel();

          assert.equal(fuel, 'Hybrid');
          pure.vehicle.fuel.restore();
      });
  });

  describe("vin()", function () {
      it("returns valid vin number", function () {
        var vin = pure.vehicle.vin();
        assert.ok(vin.match(/^[A-Z0-9]{10}[A-Z]{1}[A-Z0-9]{1}\d{5}$/));
      });
  });

  describe("color()", function () {
      it("returns a random color", function () {
          sinon.stub(pure.vehicle, 'color').returns('black');
          var color = pure.vehicle.color();

          assert.equal(color, 'black');
          pure.vehicle.color.restore();
      });
  });
});
