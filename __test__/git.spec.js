const { assert } = require('chai');
const sinon = require('sinon');
const pure = require('../index');

describe('git.js', () => {
    describe('branch()', () => {
        beforeEach(() => {
            sinon.spy(pure.hacker, 'noun');
            sinon.spy(pure.hacker, 'verb');
        });

        afterEach(() => {
            pure.hacker.noun.restore();
            pure.hacker.verb.restore();
        });

        it('returns a branch with hacker noun and verb', () => {
            pure.git.branch();

            assert.ok(pure.hacker.noun.calledOnce);
            assert.ok(pure.hacker.verb.calledOnce);
        });
    });

    describe('commitEntry()', () => {
        beforeEach(() => {
            sinon.spy(pure.git, 'commitMessage');
            sinon.spy(pure.git, 'commitSha');
            sinon.spy(pure.internet, 'email');
            sinon.spy(pure.name, 'firstName');
            sinon.spy(pure.name, 'lastName');
            sinon.spy(pure.random, 'number');
        });

        afterEach(() => {
            pure.git.commitMessage.restore();
            pure.git.commitSha.restore();
            pure.internet.email.restore();
            pure.name.firstName.restore();
            pure.name.lastName.restore();
            pure.random.number.restore();
        });

        it('returns merge entry at random', () => {
            pure.git.commitEntry();

            assert.ok(pure.random.number.called);
        });

        it('returns a commit entry with git commit message and sha', () => {
            pure.git.commitEntry();

            assert.ok(pure.git.commitMessage.calledOnce);
            assert.ok(pure.git.commitSha.calledOnce);
        });

        it('returns a commit entry with internet email', () => {
            pure.git.commitEntry();

            assert.ok(pure.internet.email.calledOnce);
        });

        it('returns a commit entry with name first and last', () => {
            pure.git.commitEntry();

            assert.ok(pure.name.firstName.calledTwice);
            assert.ok(pure.name.lastName.calledTwice);
        });

        describe("with options['merge'] equal to true", () => {
            beforeEach(() => {
                sinon.spy(pure.git, 'shortSha');
            });

            afterEach(() => {
                pure.git.shortSha.restore();
            });

            it('returns a commit entry with merge details', () => {
                pure.git.commitEntry({ merge: true });

                assert.ok(pure.git.shortSha.calledTwice);
            });
        });
    });

    describe('commitMessage()', () => {
        beforeEach(() => {
            sinon.spy(pure.hacker, 'verb');
            sinon.spy(pure.hacker, 'adjective');
            sinon.spy(pure.hacker, 'noun');
        });

        afterEach(() => {
            pure.hacker.verb.restore();
            pure.hacker.adjective.restore();
            pure.hacker.noun.restore();
        });

        it('returns a commit message with hacker noun, adj and verb', () => {
            pure.git.commitMessage();

            assert.ok(pure.hacker.verb.calledOnce);
            assert.ok(pure.hacker.adjective.calledOnce);
            assert.ok(pure.hacker.noun.calledOnce);
        });
    });


    describe('commitSha()', () => {
        it('returns a random commit SHA', () => {
            const commitSha = pure.git.commitSha();
            assert.ok(commitSha.match(/^[a-f0-9]{40}$/));
        });
    });

    describe('shortSha()', () => {
        it('returns a random short SHA', () => {
            const shortSha = pure.git.shortSha();
            assert.ok(shortSha.match(/^[a-f0-9]{7}$/));
        });
    });
});
