/* eslint no-console: "off" */

import * as colorette from 'colorette';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import pure from '../../index.js';

const formats = [
    'csv',
    'json',
    'txt',
    'none',
];

const template = '{{random.number}}; {{internet.password}}; {{address.city}};\n';
const templatejson = '{ "number": {{random.number}}, "pass": "{{internet.password}}" }';

function defaultTemplate(answers) {
    if (answers.formatType === 'json') {
        return templatejson;
    }
    return template;
}

function validateTemplate(answer) {
    if (!/^\s*$/.test(answer)) {
        return true;
    }
    return 'You need to pass a valid string!';
}

function validateRows(answer) {
    if (!Number.isNaN(answer) && answer !== '') {
        return true;
    }
    return 'You need to pass a valid number';
}

function conditionalPath(answers) {
    return answers.formatType !== 'none';
}

function validatePath(answer) {
    if (!/^\s*$/.test(answer)) {
        if (fs.existsSync(answer)) {
            return true;
        }
        return 'No such directory. You need to pass a valid path!';
    }
    return 'You need to pass a valid string!';
}

function conditionalName(answers) {
    return answers.formatType !== 'none';
}

function generator(arg) {
    return new Promise((resolve, reject) => {
        if (arg.locale) {
            const verifyExtension = arg.locale.split('.');

            if (verifyExtension[verifyExtension.length - 1] === 'json') {
                pure.setLocale(JSON.parse(fs.readFileSync(arg.locale)));
            }
        }

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
                    default: defaultTemplate.bind(this),
                    validate: validateTemplate.bind(this),
                }, {
                    type: 'input',
                    name: 'rows',
                    message: 'How many rows to generate',
                    default: 1,
                    validate: validateRows.bind(this),
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
                    when: conditionalPath.bind(this),
                    validate: validatePath.bind(this),
                }, {
                    type: 'input',
                    name: 'saveName',
                    message: 'What filename to save',
                    default: 'generated',
                    when: conditionalName.bind(this),
                    validate: validateTemplate.bind(this),
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

                    generated = pure.fake.parse(`[${templateStr}]`);
                } else if (answers.formatType === 'json' && answers.uniqueRows) {
                    generated = [];

                    for (let index = 0; index < answers.rows; index += 1) {
                        generated.push(pure.unique.exec(pure.fake.parse, [answers.templateStr.replace(/\n/g, '')]));
                    }

                    generated = `[${generated}]`;
                } else if (answers.uniqueRows) {
                    for (let index = 0; index < answers.rows; index += 1) {
                        generated += pure.unique.exec(pure.fake.parse, [answers.templateStr]);
                    }
                } else {
                    for (let index = 0; index < answers.rows; index += 1) {
                        templateStr += `${answers.templateStr}`;
                    }

                    generated = pure.fake.parse(templateStr);
                }

                // Save output
                let pathJoin = '';
                if (answers.formatType !== 'none') {
                    if (answers.savePath === process.cwd()) {
                        const filename = `/${answers.saveName}.${answers.formatType}`;
                        pathJoin = path.join(answers.savePath, filename);
                        fs.writeFileSync(pathJoin, generated);
                        console.log(colorette.gray('\nGenerated ✔️'));
                    } else {
                        const filename = `/${answers.saveName}.${answers.formatType}`;
                        pathJoin = path.join(process.cwd(), answers.savePath, filename);
                        fs.writeFileSync(pathJoin, generated);
                        console.log(colorette.gray('\nGenerated ✔️'));
                    }
                } else {
                    console.log(colorette.gray('\nResult 🖨️'));
                    console.log(colorette.blue(generated));
                }

                resolve({ pathJoin, generated });
            })
            .catch((error) => {
                reject(new Error(colorette.red(`\n🛑 The following error has occurred: \n${error}`)));
            });
    });
}

export { generator };
export default {
    defaultTemplate,
    validateTemplate,
    validateRows,
    conditionalPath,
    validatePath,
    conditionalName,
    generator,
};
