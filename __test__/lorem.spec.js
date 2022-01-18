const sinon = require('sinon');
const pure = require('../index');

describe('lorem.js', () => {
    describe('word()', () => {
        it('returns a word with a random length', () => {
            const str = pure.lorem.word();

            expect(typeof str).toBe('string');
        });

        it('returns a word with the requested length', () => {
            const str = pure.lorem.word(5);

            expect(typeof str).toBe('string');
            expect(str.length).toEqual(5);
        });

        it('returns a word with the biggest lenght', () => {
            const str = pure.lorem.word(50);

            expect(typeof str).toBe('string');
        });
    });

    describe('words()', () => {
        beforeEach(() => {
            sinon.spy(pure.helpers, 'shuffle');
        });

        afterEach(() => {
            pure.helpers.shuffle.restore();
        });

        it('returns three words', () => {
            const str = pure.lorem.words();
            const words = str.split(' ');

            expect(Array.isArray(words)).toEqual(true);
            expect(words.length).toBeGreaterThanOrEqual(3);
        });

        it('returns requested number of words', () => {
            const str = pure.lorem.words(7);
            const words = str.split(' ');

            expect(Array.isArray(words)).toEqual(true);
            expect(words.length).toEqual(7);
        });
    });

    describe('slug()', () => {
        beforeEach(() => {
            sinon.spy(pure.helpers, 'shuffle');
        });

        afterEach(() => {
            pure.helpers.shuffle.restore();
        });

        it('returns a slug with three words', () => {
            const str = pure.lorem.slug();

            expect(1).toEqual(str.match(/^[a-z][a-z-]*[a-z]$/).length);
            expect(3 - 1).toEqual(str.match(/-/g).length);
        });

        it('returns a slug with requested number of words', () => {
            const str = pure.lorem.slug(7);

            expect(1).toEqual(str.match(/^[a-z][a-z-]*[a-z]$/).length);
            expect(7 - 1).toEqual(str.match(/-/g).length);
        });
    });

    describe('sentences()', () => {
        it('returns random sentences from lorem ipsum', () => {
            sinon.spy(pure.lorem, 'sentence');

            const sentences = pure.lorem.sentences();
            const words = sentences.split(' ');

            expect(typeof sentences).toBe('string');
            expect(words.length).toBeGreaterThan(0);

            pure.lorem.sentence.restore();
        });

        it('returns random sentences', () => {
            sinon.spy(pure.lorem, 'sentence');

            const sentences = pure.lorem.sentences(1);
            const words = sentences.split(' ');

            expect(typeof sentences).toBe('string');
            expect(words.length).toBeGreaterThan(0);

            pure.lorem.sentence.restore();
        });

        it('Generate random sentences', () => {
            pure.setLocale('ru');

            const sentences = pure.lorem.sentence(2);
            const words = sentences.split(' ');

            expect(typeof sentences).toBe('string');
            expect(words.length).toBeGreaterThan(1);

            pure.setLocale('en');
        });
    });

    describe('paragraph()', () => {
        it('returns a string of at least three sentences', () => {
            sinon.spy(pure.lorem, 'sentences');

            const paragraph = pure.lorem.paragraph();
            const parts = paragraph.split('. ');

            expect(typeof paragraph).toBe('string');
            expect(parts.length).toEqual(3);
            expect(pure.lorem.sentences.calledWith({ sentenceCount: 3 })).toEqual(true);

            pure.lorem.sentences.restore();
        });

        it('returns a string of at least the requested number of sentences', () => {
            sinon.spy(pure.lorem, 'sentences');

            const paragraph = pure.lorem.paragraph(5);
            const parts = paragraph.split('. ');

            expect(typeof paragraph).toBe('string');
            expect(parts.length).toEqual(5);
            expect(pure.lorem.sentences.calledWith({ sentenceCount: 5 })).toEqual(true);

            pure.lorem.sentences.restore();
        });
    });

    describe('text()', () => {
        it('return random text', () => {
            const text = pure.lorem.text();

            expect(text).toBeDefined();
        });
    });

    describe('paragraphs()', () => {
        it('returns newline-separated string of three paragraphs', () => {
            sinon.spy(pure.lorem, 'paragraph');

            const paragraphs = pure.lorem.paragraphs();
            const parts = paragraphs.split('\n \r');

            expect(typeof paragraphs).toBe('string');
            expect(parts.length).toEqual(3);
            expect(pure.lorem.paragraph.calledThrice).toEqual(true);

            pure.lorem.paragraph.restore();
        });

        it('returns newline-separated string of requested number of paragraphs', () => {
            sinon.spy(pure.lorem, 'paragraph');

            const paragraphs = pure.lorem.paragraphs({ paragraphCount: 5 });
            const parts = paragraphs.split('\n \r');

            expect(typeof paragraphs).toBe('string');
            expect(parts.length).toEqual(5);

            pure.lorem.paragraph.restore();
        });

        it('returns newline-separated </br> string of requested number of paragraphs', () => {
            sinon.spy(pure.lorem, 'paragraph');

            const paragraphs = pure.lorem.paragraphs({ paragraphCount: 3, separator: '</br>' });
            const parts = paragraphs.split('</br>');

            expect(typeof paragraphs).toBe('string');
            expect(parts.length).toEqual(3);

            pure.lorem.paragraph.restore();
        });
    });

    describe('lines()', () => {
        it('returns more then 1 lines from lorem', () => {
            const lines = pure.lorem.lines();
            const parts = lines.split('\n');

            expect(typeof lines).toBe('string');
            expect(parts.length).toBeGreaterThan(0);
        });

        it('returns 5 lines from lorem', () => {
            const lines = pure.lorem.lines(5);
            const parts = lines.split('\n');

            expect(typeof lines).toBe('string');
            expect(parts.length).toEqual(5);
        });
    });
});
