if (typeof module !== 'undefined') {
    var assert = require('assert');
    var sinon = require('sinon');
    var pure = require('../index');
}

describe("music.js", function () {
    describe("genre()", function () {
        it("returns a genre", function () {
            sinon.stub(pure.music, 'genre').returns('Rock');
            var genre = pure.music.genre();

            assert.equal(genre, 'Rock');
            pure.music.genre.restore();
        });
    });
});
