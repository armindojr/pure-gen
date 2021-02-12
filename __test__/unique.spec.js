const { assert } = require('chai');
const pure = require('../index');

describe('unique.js', () => {
    describe('exec()', () => {
        it('is able to call a function with no arguments and return a result', () => {
            const result = pure.unique.exec(pure.internet.email);
            assert.equal(typeof result, 'string');
        });

        it('is able to call a function with arguments and return a result', () => {
            // third argument is provider, or domain for email
            const result = pure.unique.exec(pure.internet.email, [{ firstName: 'a', lastName: 'b', provider: 'c' }]);
            assert.ok(result.match(/[@]c/));
        });

        it('is able to call same function with arguments and return a result', () => {
            // third argument is provider, or domain for email
            const result = pure.unique.exec(pure.internet.email, [{ firstName: 'a', lastName: 'b', provider: 'c' }]);
            assert.ok(result.match(/[@]c/));
        });

        it('is able to exclude results as array', () => {
            const result = pure.unique.exec(pure.internet.protocol, [], { exclude: ['https'] });
            assert.equal(result, 'http');
        });

        it('is able to limit unique call by maxTime in ms', () => {
            try {
                pure.unique.exec(pure.internet.protocol, [], {
                    maxTime: 1,
                    maxRetries: 9999,
                    exclude: [
                        'https',
                        'http',
                    ],
                });
            } catch (err) {
                assert.include(err.message, 'Exceeded maxTime');
            }
        });

        it('is able to limit unique call by maxRetries', () => {
            try {
                pure.unique.exec(pure.internet.protocol, [], {
                    maxTime: 5000,
                    maxRetries: 5,
                    exclude: [
                        'https',
                        'http',
                    ],
                });
            } catch (err) {
                assert.include(err.message, 'Exceeded maxRetries');
            }
        });

        it('is able to call last function with arguments and return a result', () => {
            // third argument is provider, or domain for email
            const result = pure.unique.exec(pure.internet.email, [{ firstName: 'a', lastName: 'b', provider: 'c' }]);
            assert.ok(result.match(/[@]c/));
        });
    });

    describe('clear()', () => {
        it('is able to clear the found items at global scope', () => {
            pure.unique.clear();
            pure.unique.exec(pure.internet.protocol, [], {
                exclude: ['https'],
            });
            pure.unique.clear();

            const result = pure.unique.exec(pure.internet.protocol, [], {
                exclude: ['https'],
            });

            assert.equal(result, 'http');
        });

        it('is able to clear the found items at functional scope', () => {
            pure.unique.exec(pure.internet.protocol, [], {
                exclude: ['https'],
                scope: 'pureInternetProtocol',
            });
            pure.unique.clear('pureInternetProtocol');

            const result = pure.unique.exec(pure.internet.protocol, [], {
                exclude: ['https'],
                scope: 'pureInternetProtocol',
            });

            assert.equal(result, 'http');
        });
    });
});
