/* eslint no-console: "off" */
const colors = require('colors');
const inquirer = require('inquirer');
const fs = require('fs');
const pure = require('../../index');

const formats = [
    'csv',
    'json',
    'txt',
    'none',
];

const template = '{{random.number}}; {{internet.password}}; {{address.city}};';

/**
 * generator
 *
 * @description
 * After you install pure-gen, you can use generator to quick generate fake data from
 * template given by you.
 * </br> When running command like example, it will ask some questions to set some data.
 * With that you can set information like: format of file, template, how many rows, unique
 * information, path to save and file name.
 * </br> With it, you can quickly generate csv files, or json by given template and populate
 * with fake data.
 *
 * <b> If you want to know what format to use inside template, it simple uses mustache template
 * parser. You only pass pure "module.method" inside curly brackets and back-end will automatically
 * populate that. [pure.fake]{@link pure.fake}</b>
 *
 * Possible templates:
 * - Json like > { "number": {{random.number}}, "pass": "{{internet.password}}" }
 * - CSV like > {{random.number}}; {{internet.password}}; {{address.city}};
 * @namespace generator
 * @example
 * $ npx pure generate
 */

function generator() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'formatType',
                message: 'What format to use',
                choices: formats,
            }, {
                type: 'editor',
                name: 'templateStr',
                message: 'What template to use to generate',
                default: template,
            }, {
                type: 'number',
                name: 'rows',
                message: 'How many rows to generate',
                default: 1,
                when(answers) {
                    return answers.formatType !== 'json';
                },
            }, {
                type: 'confirm',
                name: 'uniqueRows',
                message: 'Unique informations',
                default: false,
            }, {
                type: 'input',
                name: 'savePath',
                message: 'What path to save',
                default: process.cwd(),
                when(answers) {
                    return answers.formatType !== 'none';
                },
            }, {
                type: 'input',
                name: 'saveName',
                message: 'What filename to save',
                default: 'generated',
                when(answers) {
                    return answers.formatType !== 'none';
                },
            },
        ])
        .then((answers) => {
            let templateStr = '';
            let generated = '';

            // repeat
            if (answers.uniqueRows) {
                for (let index = 0; index < answers.rows; index += 1) {
                    generated += pure.unique(pure.fake, [answers.templateStr]);
                }
            } else {
                for (let index = 0; index < answers.rows; index += 1) {
                    templateStr += `${answers.templateStr}`;
                }

                generated = pure.fake(templateStr);
            }

            // save output
            if (answers.formatType !== 'none') {
                if (answers.savePath === process.cwd()) {
                    const path = `${answers.savePath}/${answers.saveName}.${answers.formatType}`;
                    fs.writeFileSync(path, generated);
                    console.log(colors.grey('\nGenerated ✔️'));
                } else {
                    const path = `${process.cwd()}/${answers.savePath}/${answers.saveName}.${answers.formatType}`;
                    fs.writeFileSync(path, generated);
                    console.log(colors.grey('\nGenerated ✔'));
                }
            } else {
                console.log(colors.grey('\nResult 🖨️'));
                console.log(colors.blue(generated));
            }
        });
}

module.exports = generator;
