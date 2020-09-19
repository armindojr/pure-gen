const { assert } = require('chai');
const pure = require('../index');

describe('markdown.js', () => {
    describe('header()', () => {
        describe("when no 'num' param passed in", () => {
            it("returns text beginning with '#'", () => {
                const header = pure.markdown.header();
                assert.equal(0, header.indexOf('#'));
            });
        });

        describe("when 'num' param passd in", () => {
            it("returns text beginning with '#' * num", () => {
                const header = pure.markdown.header(5);
                assert.equal(0, header.indexOf('#####'));
            });
        });
    });

    describe('emphasis()', () => {
        describe("when no 'type' param passed in", () => {
            it('returns emphasis text', () => {
                const text = pure.markdown.emphasis();
                const regexp = /\*|_|~/gi;
                assert(text.match(regexp).length >= 2);
            });
        });

        describe("when 'type' param passed in", () => {
            it('returns striped text', () => {
                const text = pure.markdown.emphasis('~');
                const regexp = /[~]/gi;
                assert(text.match(regexp).length >= 2);
            });
        });
    });

    describe('table()', () => {
        describe("when no 'num' param passed in", () => {
            it('returns number of rows is 5 (head + hyphens + num)', () => {
                const table = pure.markdown.table().split('\n');
                assert.equal(table.length, 5);
            });
        });

        describe("when 'num' param passed in", () => {
            it("returns number of rows is 'num'", () => {
                const table = pure.markdown.table(5).split('\n');
                assert.equal(table.length, 7);
            });
        });
    });

    describe('orderdList()', () => {
        describe("when no 'num' param passed in", () => {
            it('returns 3 ordered list', () => {
                const list = pure.markdown.orderedList().split('\n');
                assert.equal(list.length, 3);
                assert.equal(list[0].substr(0, 1), '1');
            });
        });

        describe("when 'num' param passed in", () => {
            it('returns 5 ordered list', () => {
                const list = pure.markdown.orderedList(5).split('\n');
                assert.equal(list.length, 5);
                assert.equal(list[0].substr(0, 1), '1');
            });
        });
    });

    describe('unorderdList()', () => {
        describe("when no 'num' param passed in", () => {
            it('returns 3 unordered list', () => {
                const list = pure.markdown.unorderedList().split('\n');
                assert.equal(list.length, 3);
                assert.equal(list[0].substr(0, 1), '*');
            });
        });

        describe("when 'num' param passed in", () => {
            it('returns 5 unordered list', () => {
                const list = pure.markdown.unorderedList(5).split('\n');
                assert.equal(list.length, 5);
                assert.equal(list[0].substr(0, 1), '*');
            });
        });
    });

    describe('inlineCode()', () => {
        it('return inline code text', () => {
            const text = pure.markdown.inlineCode();
            assert.equal(text.substr(0, 1), '`');
            assert.equal(text.substr(text.length - 1), '`');
        });
    });

    describe('bockCode()', () => {
        it('returns block code text', () => {
            const text = pure.markdown.blockCode();
            assert.equal(text.substr(0, 3), '```');
            assert.equal(text.substr(text.length - 3), '```');
        });
    });
});
