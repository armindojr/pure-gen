const { assert } = require('chai');
const sinon = require('sinon');
const pure = require('../index');

describe('games.js', () => {
    describe('title()', () => {
        it('returns a game title', () => {
            const title = pure.games.title();

            assert.ok(title);
        });

        it('returns exact game title stubbed', () => {
            sinon.stub(pure.games, 'title').returns('Half-Life');
            const title = pure.games.title();

            assert.equal(title, 'Half-Life');
            pure.games.title.restore();
        });
    });
    describe('genre()', () => {
        it('returns a game genre', () => {
            const genre = pure.games.genre();

            assert.ok(genre);
        });

        it('returns exact game genre stubbed', () => {
            sinon.stub(pure.games, 'genre').returns('First-person shooter');
            const genre = pure.games.genre();

            assert.equal(genre, 'First-person shooter');
            pure.games.genre.restore();
        });
    });
    describe('platform()', () => {
        it('returns a game platform', () => {
            const platform = pure.games.platform();

            assert.ok(platform);
        });

        it('returns exact game platform stubbed', () => {
            sinon.stub(pure.games, 'platform').returns('Nintendo DS');
            const platform = pure.games.platform();

            assert.equal(platform, 'Nintendo DS');
            pure.games.platform.restore();
        });
    });
});
