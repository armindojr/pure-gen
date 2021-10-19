/* eslint no-console: "off" */
const repl = require('repl');
const colors = require('colors');
const inquirer = require('inquirer');
const pure = require('../../index');

const localeOpts = pure.possibleLocales;

function prettyPrint(message) {
    console.log(message);
}

function startRepl() {
    inquirer
        .prompt({
            type: 'list',
            name: 'localeInput',
            message: 'Select what locale pure will set in Repl',
            choices: localeOpts,
        })
        .then((answers) => {
            if (answers.localeInput) {
                pure.setLocale(answers.localeInput);
            } else {
                pure.setLocale('en');
            }

            const sayWelcome = `
                Hello, ${colors.green(process.env.USER)}! 😁
                Pure will use locale: ${colors.blue(answers.localeInput)}
        
                ${colors.gray('.exit or ctrl+c to exit Repl')}
                ${colors.gray('Repl has autocomplete, type any pure method '
                + 'then hit <tab> 2x after "." and Repl will suggest')}
                ${colors.gray('Methods: seed, setLocale, getSeed will not work inside Repl')}
            `;

            const sayBye = `\nBye ${colors.green(process.env.USER)}! 👋`;

            // Print the welcome message
            prettyPrint(sayWelcome);

            const myRepl = repl.start('[/] ');

            Object.assign(myRepl.context, { pure });

            myRepl.on('exit', () => prettyPrint(sayBye));
        });
}

module.exports = startRepl;
