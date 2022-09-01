import sinon from 'sinon';
import pure from '../index.js';

describe('database.js', () => {
    describe('column()', () => {
        it('returns a column name', () => {
            const column = pure.database.column();

            expect(column).toBeDefined();
        });

        it('returns exact column name stubbed', () => {
            const stub = sinon.stub(pure.registeredModules, 'database').get(() => ({
                column: ['title'],
            }));

            const column = pure.database.column();

            expect(column).toEqual('title');

            stub.restore();
        });
    });

    describe('collation()', () => {
        it('returns a collation', () => {
            const collation = pure.database.collation();

            expect(collation).toBeDefined();
        });

        it('returns exact collation stubbed', () => {
            const stub = sinon.stub(pure.registeredModules, 'database').get(() => ({
                collation: ['utf8_bin'],
            }));

            const collation = pure.database.collation();

            expect(collation).toEqual('utf8_bin');

            stub.restore();
        });
    });

    describe('engine()', () => {
        it('returns an engine', () => {
            const engine = pure.database.engine();

            expect(engine).toBeDefined();
        });

        it('returns exact engine stubbed', () => {
            const stub = sinon.stub(pure.registeredModules, 'database').get(() => ({
                engine: ['InnoDB'],
            }));

            const engine = pure.database.engine();

            expect(engine).toEqual('InnoDB');

            stub.restore();
        });
    });

    describe('type()', () => {
        it('returns a column type', () => {
            const type = pure.database.type();

            expect(type).toBeDefined();
        });

        it('returns exact column type stubbed', () => {
            const stub = sinon.stub(pure.registeredModules, 'database').get(() => ({
                dataType: ['int'],
            }));

            const type = pure.database.type();

            expect(type).toEqual('int');

            stub.restore();
        });
    });
});
