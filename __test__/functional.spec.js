const { assert } = require('chai');
const pure = require('../index');
const functionalHelpers = require('./support/function-helpers.js');

const modules = functionalHelpers.modulesList();

describe('functional tests', () => {
    Object.keys(modules).forEach((module) => {
        describe(module, () => {
            modules[module].forEach((meth) => {
                it(`${meth}()`, () => {
                    const result = pure[module][meth]();
                    if (meth === 'boolean') {
                        assert.ok(result === true || result === false);
                    } else {
                        assert.ok(result);
                    }
                });
            });
        });
    });
});
