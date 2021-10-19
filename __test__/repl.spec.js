const { assert, expect } = require('chai');
const repl = require('repl');
const sinon = require('sinon');
const inquirer = require('inquirer');
const startRepl = require('../src/cli/repl');

describe('repl.js', () => {
    const sandbox = sinon.createSandbox();

    beforeEach(() => {
        sinon.stub(console, 'log').returns();
        sandbox.stub(repl, 'start').callsFake(() => 'foo');
    });

    afterEach(() => {
        console.log.restore();
        sandbox.restore();
    });

    it('start repl stubbed', async () => {
        sinon.stub(inquirer, 'prompt').resolves({
            localeInput: 'en',
        });

        startRepl();

        inquirer.prompt.restore();
    });

    it('start repl stubbed not passing locale', async () => {
        sinon.stub(inquirer, 'prompt').resolves({
            localeInput: false,
        });

        startRepl();

        inquirer.prompt.restore();
    });
});
