if (typeof module !== 'undefined') {
    var assert = require('assert');
    var sinon = require('sinon');
    var pure = require('../index');
}

describe("database.js", function () {
    describe("column()", function () {
        it("returns a column name", function () {
            sinon.stub(pure.database, 'column').returns('title');
            var column = pure.database.column();

            assert.equal(column, 'title');
            pure.database.column.restore();
        });
    });

    describe("collation()", function () {
        it("returns a collation", function () {
            sinon.stub(pure.database, 'collation').returns('utf8_bin');
            var collation = pure.database.collation();

            assert.equal(collation, 'utf8_bin');
            pure.database.collation.restore();
        });
    });

    describe("engine()", function () {
        it("returns an engine", function () {
            sinon.stub(pure.database, 'engine').returns('InnoDB');
            var engine = pure.database.engine();

            assert.equal(engine, 'InnoDB');
            pure.database.engine.restore();
        });
    });

    describe("type()", function () {
        it("returns a column type", function () {
            sinon.stub(pure.database, 'type').returns('int');
            var type = pure.database.type();

            assert.equal(type, 'int');
            pure.database.type.restore();
        });
    });
});
