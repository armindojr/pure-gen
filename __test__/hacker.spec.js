const pure = require('../index');

describe('hacker.js', () => {
    describe('abbreviation()', () => {
        it('return random abbreviation', () => {
            const abbreviation = pure.hacker.abbreviation();

            expect(abbreviation).toBeDefined();
        });
    });

    describe('adjective()', () => {
        it('return random adjective', () => {
            const adj = pure.hacker.adjective();

            expect(adj).toBeDefined();
        });
    });

    describe('noun()', () => {
        it('return random noun', () => {
            const noun = pure.hacker.noun();

            expect(noun).toBeDefined();
        });
    });

    describe('verb()', () => {
        it('return random verb', () => {
            const verb = pure.hacker.verb();

            expect(verb).toBeDefined();
        });
    });

    describe('ingverb()', () => {
        it('return random ingverb', () => {
            const ing = pure.hacker.ingverb();

            expect(ing).toBeDefined();
        });
    });

    describe('phrase()', () => {
        it('return random phrase', () => {
            const phrase = pure.hacker.phrase();

            expect(phrase).toBeDefined();
        });
    });
});
