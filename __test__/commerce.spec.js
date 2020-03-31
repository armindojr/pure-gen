var assert = require('assert');
var sinon = require('sinon');
var pure = require('../index');

describe("commerce.js", function() {

  describe("color()", function() {
      it("returns random value from commerce.color array", function() {
          var color = pure.commerce.color();
          assert.ok(pure.definitions.commerce.color.indexOf(color) !== -1);
      });
  });

  describe("department(max, fixedValue)", function() {

    it("should use the default amounts when not passing arguments", function() {
        var department = pure.commerce.department();
        assert.ok(department.split(" ").length === 1);
    });

    /*

    it("should return only one value if we specify a maximum of one", function() {
        sinon.spy(pure.random, 'arrayElement');

        var department = pure.commerce.department(1);

        assert.strictEqual(department.split(" ").length, 1);
        assert.ok(pure.random.arrayElement.calledOnce);

        pure.random.arrayElement.restore();
    });

    it("should return the maxiumum value if we specify the fixed value", function() {
        sinon.spy(pure.random, 'arrayElement');

        var department = pure.commerce.department(5, true);

        console.log(department);

        // account for the separator
        assert.strictEqual(department.split(" ").length, 6);
        // Sometimes it will generate duplicates that aren't used in the final string,
        // so we check if arrayElement has been called exactly or more than 5 times
        assert.ok(pure.random.arrayElement.callCount >= 5);

        pure.random.arrayElement.restore();
    });
    */
  });

  describe("productName()", function() {
      it("returns name comprising of an adjective, material and product", function() {
          sinon.spy(pure.random, 'arrayElement');
          sinon.spy(pure.commerce, 'productAdjective');
          sinon.spy(pure.commerce, 'productMaterial');
          sinon.spy(pure.commerce, 'product');
          var name = pure.commerce.productName();

          assert.ok(name.split(' ').length >= 3);
          assert.ok(pure.random.arrayElement.calledThrice);
          assert.ok(pure.commerce.productAdjective.calledOnce);
          assert.ok(pure.commerce.productMaterial.calledOnce);
          assert.ok(pure.commerce.product.calledOnce);

          pure.random.arrayElement.restore();
          pure.commerce.productAdjective.restore();
          pure.commerce.productMaterial.restore();
          pure.commerce.product.restore();
      });
  });

  describe("price(min, max, dec, symbol)", function() {
    it("should use the default amounts when not passing arguments", function() {
        var price = pure.commerce.price();

        assert.ok(price);
        assert.equal((price > 0), true, "the amount should be greater than 0");
        assert.equal((price < 1001), true, "the amount should be less than 1000");
    });

    it("should use the default decimal location when not passing arguments", function() {
        var price = pure.commerce.price();

        var decimal = ".";
        var expected = price.length - 3;
        var actual = price.indexOf(decimal);

        assert.equal(actual, expected, "The expected location of the decimal is " + expected + " but it was " + actual + " amount " + price);
    });

    it("should not include a currency symbol by default", function () {

        var amount = pure.commerce.price();

        var regexp = new RegExp(/[0-9.]/);

        var expected = true;
        var actual = regexp.test(amount);

        assert.equal(actual, expected, 'The expected match should not include a currency symbol');
    });

    it("it should handle negative amounts, but return 0", function () {

        var amount = pure.commerce.price({ min: -200, max: -1 });

        assert.ok(amount);
        assert.equal((amount == 0.00), true, "the amount should equal 0");
    });

    it("it should handle argument dec", function () {

        var price = pure.commerce.price({ min: 100, max: 100, dec: 1 });

        assert.ok(price);
        assert.strictEqual(price , '100.0', "the price should be equal 100.0");
    });

    it("it should handle argument dec = 0", function () {

        var price = pure.commerce.price({ min: 100, max: 100, dec: 0 });

        assert.ok(price);
        assert.strictEqual(price , '100', "the price should be equal 100");
    });

    it("should not contain comma's by default", function () {
        var amount = pure.commerce.price({ min: 1000 });
        var amountWithCommas = pure.commerce.price({ min: 1000, comma: true });
        
        var testRegExp = new RegExp(/,/);
        
        assert.equal(false, testRegExp.test(amount), "The amount should not contain commas.");

        assert.equal(true, testRegExp.test(amountWithCommas), "The amount should contain commas.");
    });

  });

	describe("productDescription()", function () {
		it("returns a random product description", function () {
			sinon.spy(pure.commerce, 'productDescription');
			var description = pure.commerce.productDescription();

			assert.ok(typeof description === 'string');
			assert.ok(pure.commerce.productDescription.calledOnce);

			pure.commerce.productDescription.restore();
		});
	});

});
