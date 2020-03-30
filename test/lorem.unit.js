if (typeof module !== 'undefined') {
    var assert = require('assert');
    var sinon = require('sinon');
    var pure = require('../index');
}

describe("lorem.js", function () {
    describe("word()", function () {

        context("when no 'length' param passed in", function () {
            it("returns a word with a random length", function () {
                var str = pure.lorem.word();
                assert.ok(typeof str === 'string');
            });
        });

        context("when 'length' param passed in", function () {
            it("returns a word with the requested length", function () {
                var str = pure.lorem.word(5);
                assert.ok(typeof str === 'string');
                assert.equal(str.length, 5);
            });
        });

        context("when 'length' param is bigger than word list", function () {
            it("returns a word with the biggest lenght", function () {
                var str = pure.lorem.word(50);
                assert.ok(typeof str === 'string');
                assert.isDefined(str, 'is undefined!');
            });
        });
    });

    describe("words()", function () {
        beforeEach(function () {
            sinon.spy(pure.helpers, 'shuffle');
        });

        afterEach(function () {
            pure.helpers.shuffle.restore();
        });

        context("when no 'num' param passed in", function () {
            it("returns three words", function () {
                var str = pure.lorem.words();
                var words = str.split(' ');
                assert.ok(Array.isArray(words));
                assert.equal(true, words.length >= 3);
                // assert.ok(pure.helpers.shuffle.called);
            });
        });

        context("when 'num' param passed in", function () {
            it("returns requested number of words", function () {
                var str = pure.lorem.words(7);
                var words = str.split(' ');
                assert.ok(Array.isArray(words));
                assert.equal(words.length, 7);
            });
        });
    });

    describe("slug()", function () {
        beforeEach(function () {
            sinon.spy(pure.helpers, 'shuffle');
        });

        afterEach(function () {
            pure.helpers.shuffle.restore();
        });

        var validateSlug = function (wordCount, str) {
            assert.equal(1, str.match(/^[a-z][a-z-]*[a-z]$/).length);
            assert.equal(wordCount - 1, str.match(/-/g).length);
        };

        context("when no 'wordCount' param passed in", function () {
            it("returns a slug with three words", function () {
                var str = pure.lorem.slug();
                validateSlug(3, str);
            });
        });

        context("when 'wordCount' param passed in", function () {
            it("returns a slug with requested number of words", function () {
                var str = pure.lorem.slug(7);
                validateSlug(7, str);
            });
        });

    });

    /*
    describe("sentence()", function () {
        context("when no 'wordCount' or 'range' param passed in", function () {
            it("returns a string of at least three words", function () {
                sinon.spy(pure.lorem, 'words');
                sinon.stub(pure.random, 'number').returns(2);
                var sentence = pure.lorem.sentence();
                assert.ok(typeof sentence === 'string');
                var parts = sentence.split(' ');
                assert.equal(parts.length, 5); // default 3 plus stubbed 2.
                assert.ok(pure.lorem.words.calledWith(5));

                pure.lorem.words.restore();
                pure.random.number.restore();
            });
        });

        context("when 'wordCount' param passed in", function () {
            it("returns a string of at least the requested number of words", function () {
                sinon.spy(pure.lorem, 'words');
                sinon.stub(pure.random, 'number').withArgs(7).returns(2);
                var sentence = pure.lorem.sentence(10);

                assert.ok(typeof sentence === 'string');
                var parts = sentence.split(' ');
                assert.equal(parts.length, 12); // requested 10 plus stubbed 2.
                assert.ok(pure.lorem.words.calledWith(12));

                pure.lorem.words.restore();
                pure.random.number.restore();
            });
        });

        context("when 'wordCount' and 'range' params passed in", function () {
            it("returns a string of at least the requested number of words", function () {
                sinon.spy(pure.lorem, 'words');
                sinon.stub(pure.random, 'number').withArgs(4).returns(4);

                var sentence = pure.lorem.sentence(10, 4);

                assert.ok(typeof sentence === 'string');
                var parts = sentence.split(' ');
                assert.equal(parts.length, 14); // requested 10 plus stubbed 4.
                assert.ok(pure.random.number.calledWith(4)); // random.number should be called with the 'range' we passed. 
                assert.ok(pure.lorem.words.calledWith(14));

                pure.lorem.words.restore();
                pure.random.number.restore();
            });


        });
    });
    */
    /*
    describe("sentences()", function () {
        context("when no 'sentenceCount' param passed in", function () {
            it("returns newline-separated string of three sentences", function () {
                sinon.spy(pure.lorem, 'sentence');
                var sentences = pure.lorem.sentences();

                assert.ok(typeof sentences === 'string');
                var parts = sentences.split('\n');
                assert.equal(parts.length, 3);
                assert.ok(pure.lorem.sentence.calledThrice);

                pure.lorem.sentence.restore();
            });
        });

        context("when 'sentenceCount' param passed in", function () {
            it("returns newline-separated string of requested number of sentences", function () {
                sinon.spy(pure.lorem, 'sentence');
                var sentences = pure.lorem.sentences(5);

                assert.ok(typeof sentences === 'string');
                var parts = sentences.split('\n');
                assert.equal(parts.length, 5);

                pure.lorem.sentence.restore();
            });
        });
    });
    */
    /*
    describe("paragraph()", function () {
        context("when no 'wordCount' param passed in", function () {
            it("returns a string of at least three sentences", function () {
                sinon.spy(pure.lorem, 'sentences');
                sinon.stub(pure.random, 'number').returns(2);
                var paragraph = pure.lorem.paragraph();

                assert.ok(typeof paragraph === 'string');
                var parts = paragraph.split('\n');
                assert.equal(parts.length, 5); // default 3 plus stubbed 2.
                assert.ok(pure.lorem.sentences.calledWith(5));

                pure.lorem.sentences.restore();
                pure.random.number.restore();
            });
        });

        context("when 'wordCount' param passed in", function () {
            it("returns a string of at least the requested number of sentences", function () {
                sinon.spy(pure.lorem, 'sentences');
                sinon.stub(pure.random, 'number').returns(2);
                var paragraph = pure.lorem.paragraph(10);

                assert.ok(typeof paragraph === 'string');
                var parts = paragraph.split('\n');
                assert.equal(parts.length, 12); // requested 10 plus stubbed 2.
                assert.ok(pure.lorem.sentences.calledWith(12));

                pure.lorem.sentences.restore();
                pure.random.number.restore();
            });
        });
    });
    */
    
    /*

    describe("paragraphs()", function () {
        context("when no 'paragraphCount' param passed in", function () {
            it("returns newline-separated string of three paragraphs", function () {
                sinon.spy(pure.lorem, 'paragraph');
                var paragraphs = pure.lorem.paragraphs();

                assert.ok(typeof paragraphs === 'string');
                var parts = paragraphs.split('\n \r');
                assert.equal(parts.length, 3);
                assert.ok(pure.lorem.paragraph.calledThrice);

                pure.lorem.paragraph.restore();
            });
        });

        context("when 'paragraphCount' param passed in", function () {
            it("returns newline-separated string of requested number of paragraphs", function () {
                sinon.spy(pure.lorem, 'paragraph');
                var paragraphs = pure.lorem.paragraphs(5);

                assert.ok(typeof paragraphs === 'string');
                var parts = paragraphs.split('\n \r');
                assert.equal(parts.length, 5);

                pure.lorem.paragraph.restore();
            });
        });
    });
    */
});
