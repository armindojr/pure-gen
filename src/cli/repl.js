/* eslint no-console: "off" */
const repl = require('repl');
const colors = require('colors');
const inquirer = require('inquirer');
const pure = require('../../index');

const localeOpts = [
    'af_ZA',
    'ar',
    'az',
    'cz',
    'de',
    'de_AT',
    'de_CH',
    'el',
    'en',
    'en_AU',
    'en_BORK',
    'en_CA',
    'en_GB',
    'en_IE',
    'en_IND',
    'en_NG',
    'en_US',
    'en_ZA',
    'en_au_ocker',
    'es',
    'es_MX',
    'fa',
    'fr',
    'fr_CA',
    'fr_CH',
    'ge',
    'id_ID',
    'it',
    'ja',
    'ko',
    'lv',
    'nb_NO',
    'nep',
    'nl',
    'nl_BE',
    'pl',
    'pt_BR',
    'pt_PT',
    'ro',
    'ru',
    'sk',
    'sv',
    'tr',
    'uk',
    'vi',
    'zh_CN',
    'zh_TW',
    'zu_ZA',
];

/**
 * startRepl
 *
 * @description
 * After you install pure-gen, you can use repl in cli to quick generate fake data.
 * </br> When running command like example, it will start cli repl containing pure instance.
 * With it, you can use any pure method and the result will be printed as well. Efficient and quick.
 * </br> After run, cli will ask what locale you want to use in that instance, this will
 * automatically set locale for you.
 *
 * <b>Attention! some methods won't take any effect inside repl like: seed, setLocale, getSeed</b>
 *
 * To exit repl you can use ctrl+c or simply type ".exit"
 * @namespace repl
 * @example
 * $ npx pure repl
 */

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
            }

            const say = (message) => () => console.log(message);
            const sayWelcome = say(`
                Hello, ${colors.green(process.env.USER)}! 😁
                Pure will use locale: ${colors.blue(answers.localeInput)}
        
                ${colors.gray('.exit or ctrl+c to exit Repl')}
                ${colors.gray('Repl has autocomplete, type any pure method '
                + 'then hit <tab> 2x after "." and Repl will suggest')}
                ${colors.gray('Methods: seed, setLocale, getSeed will not work inside Repl')}
            `);

            const sayBye = say(`
                Bye ${colors.green(process.env.USER)}! 👋
            `);

            const state = {
                pure,
            };

            // Print the welcome message
            sayWelcome();

            const myRepl = repl.start('[/] ');

            Object.assign(myRepl.context, state);

            myRepl.on('exit', sayBye);
        });
}

module.exports = startRepl;
