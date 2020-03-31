var assert = require('assert');
var sinon = require('sinon');
var pure = require('../index');

describe("fake.js", function () {
    describe("fake()", function () {
        it("replaces a token with a random value for a method with no parameters", function () {
            var name = pure.fake('{{phone.phoneNumber}}');
            assert.ok(name.match(/\d/));
        });

        it("replaces multiple tokens with random values for methods with no parameters", function () {
            var name = pure.fake('{{helpers.randomize}}{{helpers.randomize}}{{helpers.randomize}}');
            assert.ok(name.match(/[abc]{3}/));
        });

        it("replaces a token with a random value for a methods with a simple parameter", function () {
            var arr = ["one", "two", "three"];
            var random = pure.fake('{{helpers.slugify("Will This Work")}}');
            assert.ok(random === "Will-This-Work");
        });

        it("replaces a token with a random value for a method with an array parameter", function () {
            var arr = ["one", "two", "three"];
            var random = pure.fake('{{helpers.randomize(["one", "two", "three"])}}');
            assert.ok(arr.indexOf(random) > -1);
        });

        it("allows the user to pass multiple parameters to a function", function () {
            sinon.spy(pure.date, 'between');

            pure.fake('{{date.between("2015-01-01", "2015-01-05")}}');

            assert.ok(pure.date.between.calledOnce);
            assert.ok(pure.date.between.withArgs('2015-01-01', '2015-01-05'));

            pure.date.between.restore();
        });

        it("does not allow undefined parameters", function () {
            assert.throws(function () {
              pure.fake()
            }, Error);
        });

        it("does not allow invalid module name", function () {
            assert.throws(function () {
              pure.fake('{{foo.bar}}')
            }, Error);
        });

        it("does not allow invalid method name", function () {
            assert.throws(function () {
              pure.fake('{{address.foo}}')
            }, Error);
        });


    });
});
