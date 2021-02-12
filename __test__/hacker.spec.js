const { assert } = require('chai');
const pure = require('../index');

describe('hacker.js', () => {
    describe('abbreviation()', () => {
        it('return random abbreviation', () => {
            const abbreviation = pure.hacker.abbreviation();

            assert.ok(abbreviation);
        });
    });
    describe('adjective()', () => {
        it('return random adjective', () => {
            const adj = pure.hacker.adjective();

            assert.ok(adj);
        });
    });
    describe('noun()', () => {
        it('return random noun', () => {
            const noun = pure.hacker.noun();

            assert.ok(noun);
        });
    });
    describe('verb()', () => {
        it('return random verb', () => {
            const verb = pure.hacker.verb();

            assert.ok(verb);
        });
    });
    describe('ingverb()', () => {
        it('return random ingverb', () => {
            const ing = pure.hacker.ingverb();

            assert.ok(ing);
        });
    });
    describe('phrase()', () => {
        it('return random phrase', () => {
            const phrase = pure.hacker.phrase();

            assert.ok(phrase);
        });
    });
});
