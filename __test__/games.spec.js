const sinon = require('sinon');
const pure = require('../index');

describe('games.js', () => {
    describe('title()', () => {
        it('returns a game title', () => {
            const title = pure.games.title();

            expect(title).toBeDefined();
        });

        it('returns exact game title stubbed', () => {
            const stub = sinon.stub(pure.registeredModules, 'games').get(() => ({
                title: [ 'Half-Life' ],
            }));

            const title = pure.games.title();

            expect(title).toEqual('Half-Life');

            stub.restore();
        });
    });

    describe('genre()', () => {
        it('returns a game genre', () => {
            const genre = pure.games.genre();

            expect(genre).toBeDefined();
        });

        it('returns exact game genre stubbed', () => {
            const stub = sinon.stub(pure.registeredModules, 'games').get(() => ({
                genre: [ 'First-person shooter' ],
            }));

            const genre = pure.games.genre();

            expect(genre).toEqual('First-person shooter');

            stub.restore();
        });
    });

    describe('platform()', () => {
        it('returns a game platform', () => {
            const platform = pure.games.platform();

            expect(platform).toBeDefined();
        });

        it('returns exact game platform stubbed', () => {
            const stub = sinon.stub(pure.registeredModules, 'games').get(() => ({
                platform: [ 'Nintendo DS' ],
            }));

            const platform = pure.games.platform();

            expect(platform).toEqual('Nintendo DS');

            stub.restore();
        });
    });
});
