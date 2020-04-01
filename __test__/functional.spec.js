const { assert } = require('chai');
const pure = require('../index');
const functionalHelpers = require('./support/function-helpers.js');

const modules = functionalHelpers.modulesList();

describe('functional tests', () => {
    Object.keys(pure.locales).forEach((locale) => {
        pure.locale = locale;
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
});

describe('pure.fake functional tests', () => {
    Object.keys(pure.locales).forEach((locale) => {
        pure.locale = locale;
        pure.seed(1);
        Object.keys(modules).forEach((module) => {
            describe(module, () => {
                modules[module].forEach((meth) => {
                    it(`${meth}()`, () => {
                        const result = pure.fake(`{{${module}.${meth}}}`);
                        // just make sure any result is returned
                        // an undefined result usually means an error
                        assert.ok(typeof result !== 'undefined');
                    /*
                    if (meth === 'boolean') {
                        assert.ok(result === true || result === false);
                    } else {
                        assert.ok(result);
                    }
                    */
                    });
                });
            });
        });
    });
});
