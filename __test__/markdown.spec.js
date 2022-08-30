import pure from '../index.js';

describe('markdown.js', () => {
    describe('header()', () => {
        it('returns text beginning with \'#\'', () => {
            const header = pure.markdown.header();

            expect(0).toEqual(header.indexOf('#'));
        });

        it('returns text beginning with \'#\' * num', () => {
            const header = pure.markdown.header(5);

            expect(0).toEqual(header.indexOf('#####'));
        });
    });

    describe('emphasis()', () => {
        it('returns emphasis text', () => {
            const text = pure.markdown.emphasis();
            const regexp = /\*|_|~/gi;

            expect(text.match(regexp).length).toBeGreaterThanOrEqual(2);
        });

        it('returns striped text', () => {
            const text = pure.markdown.emphasis('~');
            const regexp = /[~]/gi;

            expect(text.match(regexp).length).toBeGreaterThanOrEqual(2);
        });
    });

    describe('table()', () => {
        it('returns number of rows is 5 (head + hyphens + num)', () => {
            const table = pure.markdown.table().split('\n');

            expect(table.length).toEqual(5);
        });

        it('returns number of rows is \'num\'', () => {
            const table = pure.markdown.table(5).split('\n');

            expect(table.length).toEqual(7);
        });
    });

    describe('orderdList()', () => {
        it('returns 3 ordered list', () => {
            const list = pure.markdown.orderedList().split('\n');

            expect(list.length).toEqual(3);
            expect(list[0].substr(0, 1)).toEqual('1');
        });

        it('returns 5 ordered list', () => {
            const list = pure.markdown.orderedList(5).split('\n');

            expect(list.length).toEqual(5);
            expect(list[0].substr(0, 1)).toEqual('1');
        });
    });

    describe('unorderdList()', () => {
        it('returns 3 unordered list', () => {
            const list = pure.markdown.unorderedList().split('\n');

            expect(list.length).toEqual(3);
            expect(list[0].substr(0, 1)).toEqual('*');
        });

        it('returns 5 unordered list', () => {
            const list = pure.markdown.unorderedList(5).split('\n');

            expect(list.length).toEqual(5);
            expect(list[0].substr(0, 1)).toEqual('*');
        });
    });

    describe('inlineCode()', () => {
        it('return inline code text', () => {
            const text = pure.markdown.inlineCode();

            expect(text.substr(0, 1)).toEqual('`');
            expect(text.substr(text.length - 1)).toEqual('`');
        });
    });

    describe('bockCode()', () => {
        it('returns block code text', () => {
            const text = pure.markdown.blockCode();

            expect(text.substr(0, 3)).toEqual('```');
            expect(text.substr(text.length - 3)).toEqual('```');
        });
    });
});
