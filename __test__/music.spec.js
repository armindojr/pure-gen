const { assert } = require('chai');
const sinon = require('sinon');
const pure = require('../index');

describe('music.js', () => {
    describe('genre()', () => {
        it('returns a genre', () => {
            sinon.stub(pure.music, 'genre').returns('Rock');
            const genre = pure.music.genre();

            assert.equal(genre, 'Rock');
            pure.music.genre.restore();
        });
    });
});
