const { assert, expect } = require('chai');
const sinon = require('sinon');
const pure = require('../index');

describe('lorem.js', () => {
    describe('word()', () => {
        describe("when no 'length' param passed in", () => {
            it('returns a word with a random length', () => {
                const str = pure.lorem.word();
                assert.ok(typeof str === 'string');
            });
        });

        describe("when 'length' param passed in", () => {
            it('returns a word with the requested length', () => {
                const str = pure.lorem.word(5);
                assert.ok(typeof str === 'string');
                assert.equal(str.length, 5);
            });
        });

        describe("when 'length' param is bigger than word list", () => {
            it('returns a word with the biggest lenght', () => {
                const str = pure.lorem.word(50);
                assert.ok(typeof str === 'string');
                assert.ok(typeof str !== 'undefined');
            });
        });
    });

    describe('words()', () => {
        beforeEach(() => {
            sinon.spy(pure.helpers, 'shuffle');
        });

        afterEach(() => {
            pure.helpers.shuffle.restore();
        });

        describe("when no 'num' param passed in", () => {
            it('returns three words', () => {
                const str = pure.lorem.words();
                const words = str.split(' ');
                assert.ok(Array.isArray(words));
                assert.equal(true, words.length >= 3);
            });
        });

        describe("when 'num' param passed in", () => {
            it('returns requested number of words', () => {
                const str = pure.lorem.words(7);
                const words = str.split(' ');
                assert.ok(Array.isArray(words));
                assert.equal(words.length, 7);
            });
        });
    });

    describe('slug()', () => {
        beforeEach(() => {
            sinon.spy(pure.helpers, 'shuffle');
        });

        afterEach(() => {
            pure.helpers.shuffle.restore();
        });

        const validateSlug = (wordCount, str) => {
            assert.equal(1, str.match(/^[a-z][a-z-]*[a-z]$/).length);
            assert.equal(wordCount - 1, str.match(/-/g).length);
        };

        describe("when no 'wordCount' param passed in", () => {
            it('returns a slug with three words', () => {
                const str = pure.lorem.slug();
                validateSlug(3, str);
            });
        });

        describe("when 'wordCount' param passed in", () => {
            it('returns a slug with requested number of words', () => {
                const str = pure.lorem.slug(7);
                validateSlug(7, str);
            });
        });
    });

    describe('sentences()', () => {
        describe("when no 'sentenceCount' param passed in", () => {
            it('returns random sentences from lorem ipsum', () => {
                sinon.spy(pure.lorem, 'sentence');
                const sentences = pure.lorem.sentences();

                assert.ok(typeof sentences === 'string');
                const words = sentences.split(' ');
                expect(words.length).greaterThan(0);

                pure.lorem.sentence.restore();
            });
        });
        describe("when 'sentenceCount' param passed in", () => {
            it('returns random sentences', () => {
                sinon.spy(pure.lorem, 'sentence');
                const sentences = pure.lorem.sentences(1);

                assert.ok(typeof sentences === 'string');
                const words = sentences.split(' ');
                expect(words.length).greaterThan(0);

                pure.lorem.sentence.restore();
            });
        });
        describe('When using RU locale', () => {
            it('Generate random sentences', () => {
                pure.locale = 'ru';
                const sentences = pure.lorem.sentence(2);

                assert.ok(typeof sentences === 'string');
                const words = sentences.split(' ');
                expect(words.length).greaterThan(1);

                pure.locale = 'en';
            });
        });
    });

    describe('paragraph()', () => {
        describe("when no 'sentenceCount' param passed in", () => {
            it('returns a string of at least three sentences', () => {
                sinon.spy(pure.lorem, 'sentences');
                const paragraph = pure.lorem.paragraph();

                assert.ok(typeof paragraph === 'string');
                const parts = paragraph.split('. ');
                assert.equal(parts.length, 3);
                assert.ok(pure.lorem.sentences.calledWith(3));

                pure.lorem.sentences.restore();
            });
        });

        describe("when 'sentenceCount' param passed in", () => {
            it('returns a string of at least the requested number of sentences', () => {
                sinon.spy(pure.lorem, 'sentences');
                const paragraph = pure.lorem.paragraph(5);

                assert.ok(typeof paragraph === 'string');
                const parts = paragraph.split('. ');
                assert.equal(parts.length, 5);
                assert.ok(pure.lorem.sentences.calledWith(5));

                pure.lorem.sentences.restore();
            });
        });
    });

    describe('text()', () => {
        it('return random text', () => {
            const text = pure.lorem.text();

            assert.ok(text);
        });
    });

    describe('paragraphs()', () => {
        describe("when no 'paragraphCount' param passed in", () => {
            it('returns newline-separated string of three paragraphs', () => {
                sinon.spy(pure.lorem, 'paragraph');
                const paragraphs = pure.lorem.paragraphs();

                assert.ok(typeof paragraphs === 'string');
                const parts = paragraphs.split('\n \r');
                assert.equal(parts.length, 3);
                assert.ok(pure.lorem.paragraph.calledThrice);

                pure.lorem.paragraph.restore();
            });
        });
        describe("when 'paragraphCount' param passed in", () => {
            it('returns newline-separated string of requested number of paragraphs', () => {
                sinon.spy(pure.lorem, 'paragraph');
                const paragraphs = pure.lorem.paragraphs(5);

                assert.ok(typeof paragraphs === 'string');
                const parts = paragraphs.split('\n \r');
                assert.equal(parts.length, 5);

                pure.lorem.paragraph.restore();
            });
        });
        describe("when 'separator' param passed in", () => {
            it('returns newline-separated </br> string of requested number of paragraphs', () => {
                sinon.spy(pure.lorem, 'paragraph');
                const paragraphs = pure.lorem.paragraphs(3, '</br>');

                assert.ok(typeof paragraphs === 'string');
                const parts = paragraphs.split('</br>');
                assert.equal(parts.length, 3);

                pure.lorem.paragraph.restore();
            });
        });
    });

    describe('lines()', () => {
        describe("when no 'lineCount' is passed in", () => {
            it('returns more then 1 lines from lorem', () => {
                const lines = pure.lorem.lines();

                assert.ok(typeof lines === 'string');
                const parts = lines.split('\n');
                expect(parts.length).greaterThan(0);
            });
        });
        describe("when 'lineCount' is passed in", () => {
            it('returns 5 lines from lorem', () => {
                const lines = pure.lorem.lines(5);

                assert.ok(typeof lines === 'string');
                const parts = lines.split('\n');
                assert.equal(parts.length, 5);
            });
        });
    });
});
