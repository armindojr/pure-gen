var assert = require('assert');
var sinon = require('sinon');
var pure = require('../index');

describe("helpers.js", function () {
    describe("replaceSymbolWithNumber()", function () {
        context("when no symbol passed in", function () {
            it("uses '#' by default", function () {
                var num = pure.helpers.replaceSymbolWithNumber('#AB');
                assert.ok(num.match(/\dAB/));
            });
        });

        context("when symbol passed in", function () {
            it("replaces that symbol with integers", function () {
                var num = pure.helpers.replaceSymbolWithNumber('#AB', 'A');
                assert.ok(num.match(/#\dB/));
            });
        });
    });

    describe("replaceSymbols()", function () {
        context("when '*' passed", function () {
            it("replaces it with alphanumeric", function(){
                var num = pure.helpers.replaceSymbols('*AB');
                assert.ok(num.match(/\wAB/));
            });
        });
    });

    describe("shuffle()", function () {
        it("the output is the same length as the input", function () {
            sinon.spy(pure.random, 'number');
            var shuffled = pure.helpers.shuffle(["a", "b"]);
            assert.ok(shuffled.length === 2);
            assert.ok(pure.random.number.calledWith(1));
            pure.random.number.restore();
        });

        it("empty array returns empty array", function () {
            var shuffled = pure.helpers.shuffle([]);
            assert.ok(shuffled.length === 0);
        });

        it("mutates the input array in place", function () {
            var input = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
            var shuffled = pure.helpers.shuffle(input);
            assert.deepEqual(shuffled, input);
        });

        it("all items shuffled as expected when seeded", function () {
            var input = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
            pure.seed(100);
            var shuffled = pure.helpers.shuffle(input);
            assert.deepEqual(shuffled, ["b", "e", "a", "d", "j", "i", "h", "c", "g", "f"]);
        });
    });

    describe("slugify()", function () {
        it("removes unwanted characters from URI string", function () {
            assert.equal(pure.helpers.slugify("Aiden.Harªann"), "Aiden.Harann");
            assert.equal(pure.helpers.slugify("d'angelo.net"), "dangelo.net");
        });
    });

    describe("mustache()", function () {
        it("returns empty string with no arguments", function () {
            assert.equal(pure.helpers.mustache(), "");
        });
    });

    describe("repeatString()", function () {
        it("returns empty string with no arguments", function () {
            assert.equal(pure.helpers.repeatString(), "");
        });
    });

    describe("replaceSymbols()", function () {
        it("returns empty string with no arguments", function () {
            assert.equal(pure.helpers.replaceSymbols(), "");
        });
    });

    /*
    describe("replaceCreditCardSymbols()", function () {
        it("returns empty string with no arguments", function () {
            assert.equal(pure.helpers.replaceCreditCardSymbols(), "");
        });
    });
    */

    describe("createCard()", function () {
        it("returns an object", function () {
            var card = pure.helpers.createCard();
            assert.ok(typeof card === 'object');
        });
    });

    describe("contextualCard()", function () {
        it("returns an object", function () {
            var card = pure.helpers.contextualCard();
            assert.ok(typeof card === 'object');
        });
    });

    describe("userCard()", function () {
        it("returns an object", function () {
            var card = pure.helpers.userCard();
            assert.ok(typeof card === 'object');
        });
    });

    // Make sure we keep this function for backward-compatibility.
    describe("randomize()", function () {
        it("returns a random element from an array", function () {
            var arr = ['a', 'b', 'c'];
            var elem = pure.helpers.randomize(arr);
            assert.ok(elem);
            assert.ok(arr.indexOf(elem) !== -1);
        });
    });

    describe("replaceCreditCardSymbols()", function () {
      var luhnCheck = require("./support/luhnCheck.js");
      it("returns a credit card number given a schema", function () {
        var number = pure.helpers.replaceCreditCardSymbols("6453-####-####-####-###L");
        assert.ok(number.match(/^6453\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}$/));
        assert.ok(luhnCheck(number));
      });
      it("supports different symbols", function () {
        var number = pure.helpers.replaceCreditCardSymbols("6453-****-****-****-***L","*");
        assert.ok(number.match(/^6453\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}$/));
        assert.ok(luhnCheck(number));
      });
      it("handles regexp style input", function () {
        var number = pure.helpers.replaceCreditCardSymbols("6453-*{4}-*{4}-*{4}-*{3}L","*");
        assert.ok(number.match(/^6453\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}$/));
        assert.ok(luhnCheck(number));
        number = pure.helpers.replaceCreditCardSymbols("645[5-9]-#{4,6}-#{1,2}-#{4,6}-#{3}L");
        assert.ok(number.match(/^645[5-9]\-([0-9]){4,6}\-([0-9]){1,2}\-([0-9]){4,6}\-([0-9]){4}$/));
        assert.ok(luhnCheck(number));
      });
    });

    describe("regexpStyleStringParse()", function () {
      it("returns an empty string when called without param", function () {
        assert.ok(pure.helpers.regexpStyleStringParse() === "");
      });
      it("deals with range repeat", function () {
        var string = pure.helpers.regexpStyleStringParse("#{5,10}");
        assert.ok(string.length <= 10 && string.length >= 5);
        assert.ok(string.match(/^\#{5,10}$/));
      });
      it("flips the range when min > max", function () {
        var string = pure.helpers.regexpStyleStringParse("#{10,5}");
        assert.ok(string.length <= 10 && string.length >= 5);
        assert.ok(string.match(/^\#{5,10}$/));
      });
      it("repeats string {n} number of times", function () {
        assert.ok(pure.helpers.regexpStyleStringParse("%{10}") === pure.helpers.repeatString("%",10));
        assert.ok(pure.helpers.regexpStyleStringParse("%{30}") === pure.helpers.repeatString("%",30));
        assert.ok(pure.helpers.regexpStyleStringParse("%{5}") === pure.helpers.repeatString("%",5));
      });
      it("creates a numerical range", function () {
        var string = pure.helpers.regexpStyleStringParse("Hello[0-9]");
        assert.ok(string.match(/^Hello[0-9]$/));
      });
      it("deals with multiple tokens in one string", function () {
        var string = pure.helpers.regexpStyleStringParse("Test#{5}%{2,5}Testing**[1-5]**{10}END");
        assert.ok(string.match(/^Test\#{5}%{2,5}Testing\*\*[1-5]\*\*{10}END$/));
      });
    });

  describe("createTransaction()", function() {
    it("should create a random transaction", function() {
      var transaction = pure.helpers.createTransaction();
      assert.ok(transaction);
      assert.ok(transaction.amount);
      assert.ok(transaction.date);
      assert.ok(transaction.business);
      assert.ok(transaction.name);
      assert.ok(transaction.type);
      assert.ok(transaction.account);
    });
  });
});
