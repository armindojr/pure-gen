const { assert } = require('chai');
const pure = require('../index');

describe('unique.js', () => {
    describe('unique()', () => {
        it('is able to call a function with no arguments and return a result', () => {
            const result = pure.unique(pure.internet.email);
            assert.equal(typeof result, 'string');
        });

        it('is able to call a function with arguments and return a result', () => {
            // third argument is provider, or domain for email
            const result = pure.unique(pure.internet.email, [{ firstName: 'a', lastName: 'b', provider: 'c'}]);
            assert.ok(result.match(/[@]c/));
        });

        it('is able to call same function with arguments and return a result', () => {
            // third argument is provider, or domain for email
            const result = pure.unique(pure.internet.email, [{ firstName: 'a', lastName: 'b', provider: 'c'}]);
            assert.ok(result.match(/[@]c/));
        });

        it('is able to exclude results as array', () => {
            const result = pure.unique(pure.internet.protocol, [], { exclude: ['https'] });
            assert.equal(result, 'http');
        });

        it('is able to limit unique call by maxTime in ms', () => {
            try {
                pure.unique(pure.internet.protocol, [], {
                    maxTime: 1,
                    maxRetries: 9999,
                    exclude: [
                        'https',
                        'http',
                    ],
                });
            } catch (err) {
                assert.equal(err.message.substr(0, 16), 'Exceeded maxTime');
            }
        });

        it('is able to limit unique call by maxRetries', () => {
            try {
                pure.unique(pure.internet.protocol, [], {
                    maxTime: 5000,
                    maxRetries: 5,
                    exclude: [
                        'https',
                        'http',
                    ],
                });
            } catch (err) {
                assert.equal(err.message.substr(0, 19), 'Exceeded maxRetries');
            }
        });

        it('is able to call last function with arguments and return a result', () => {
            // third argument is provider, or domain for email
            const result = pure.unique(pure.internet.email, [{ firstName: 'a', lastName: 'b', provider: 'c'}]);
            assert.ok(result.match(/[@]c/));
        });
    });
});
