const { assert } = require('chai');
const sinon = require('sinon');
const pure = require('../index');

describe('database.js', () => {
    describe('column()', () => {
        it('returns a column name', () => {
            sinon.stub(pure.database, 'column').returns('title');
            const column = pure.database.column();

            assert.equal(column, 'title');
            pure.database.column.restore();
        });
    });

    describe('collation()', () => {
        it('returns a collation', () => {
            sinon.stub(pure.database, 'collation').returns('utf8_bin');
            const collation = pure.database.collation();

            assert.equal(collation, 'utf8_bin');
            pure.database.collation.restore();
        });
    });

    describe('engine()', () => {
        it('returns an engine', () => {
            sinon.stub(pure.database, 'engine').returns('InnoDB');
            const engine = pure.database.engine();

            assert.equal(engine, 'InnoDB');
            pure.database.engine.restore();
        });
    });

    describe('type()', () => {
        it('returns a column type', () => {
            sinon.stub(pure.database, 'type').returns('int');
            const type = pure.database.type();

            assert.equal(type, 'int');
            pure.database.type.restore();
        });
    });
});
