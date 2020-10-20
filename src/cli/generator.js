/* eslint no-console: "off" */
/* eslint no-restricted-globals: "off" */
const colors = require('colors');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const pure = require('../../index');

const formats = [
    'csv',
    'json',
    'txt',
    'none',
];

const template = '{{random.number}}; {{internet.password}}; {{address.city}};';
const templatejson = '{ "number": {{random.number}}, "pass": "{{internet.password}}" }';

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
                default: (answers) => {
                    if (answers.formatType === 'json') {
                        return templatejson;
                    }
                    return template;
                },
                validate: (answer) => {
                    if (!/^\s*$/.test(answer)) {
                        return true;
                    }
                    return 'You need to pass a valid string!';
                },
            }, {
                type: 'input',
                name: 'rows',
                message: 'How many rows to generate',
                default: 1,
                validate: (answer) => {
                    if (!isNaN(answer) && answer !== '') {
                        return true;
                    }
                    return 'You need to pass a valid number';
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
                validate: (answer) => {
                    if (!/^\s*$/.test(answer)) {
                        if (fs.existsSync(answer)) {
                            return true;
                        }
                        return 'No such directory. You need to pass a valid path!';
                    }
                    return 'You need to pass a valid string!';
                },
            }, {
                type: 'input',
                name: 'saveName',
                message: 'What filename to save',
                default: 'generated',
                when(answers) {
                    return answers.formatType !== 'none';
                },
                validate: (answer) => {
                    if (!/^\s*$/.test(answer)) {
                        return true;
                    }
                    return 'You need to pass a valid string!';
                },
            },
        ])
        .then((answers) => {
            let templateStr = '';
            let generated = '';

            // Unique rows information
            if (answers.formatType === 'json' && !answers.uniqueRows) {
                templateStr = [];

                for (let index = 0; index < answers.rows; index += 1) {
                    templateStr.push(answers.templateStr.replace(/\n/g, ''));
                }

                generated = pure.fake(`[${templateStr}]`);
            } else if (answers.formatType === 'json' && answers.uniqueRows) {
                generated = [];

                for (let index = 0; index < answers.rows; index += 1) {
                    generated.push(pure.unique(pure.fake, [answers.templateStr.replace(/\n/g, '')]));
                }

                generated = `[${generated}]`;
            } else if (answers.uniqueRows) {
                for (let index = 0; index < answers.rows; index += 1) {
                    generated += pure.unique(pure.fake, [answers.templateStr]);
                }
            } else {
                for (let index = 0; index < answers.rows; index += 1) {
                    templateStr += `${answers.templateStr}`;
                }

                generated = pure.fake(templateStr);
            }

            // Save output
            if (answers.formatType !== 'none') {
                if (answers.savePath === process.cwd()) {
                    const filename = `/${answers.saveName}.${answers.formatType}`;
                    const pathJoin = path.join(answers.savePath, filename);
                    fs.writeFileSync(pathJoin, generated);
                    console.log(colors.grey('\nGenerated ✔️'));
                } else {
                    const filename = `/${answers.saveName}.${answers.formatType}`;
                    const pathJoin = path.join(process.cwd(), answers.savePath, filename);
                    fs.writeFileSync(pathJoin, generated);
                    console.log(colors.grey('\nGenerated ✔'));
                }
            } else {
                console.log(colors.grey('\nResult 🖨️'));
                console.log(colors.blue(generated));
            }
        })
        .catch((error) => {
            console.log(colors.red(`\n🛑 The following error has occurred: \n${error}`));
        });
}

module.exports = generator;
