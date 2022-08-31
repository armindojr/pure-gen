#!/usr/bin/env node

import { Command } from 'commander';
import startRepl from '../src/cli/repl.js';
import { generator } from '../src/cli/generator.js';

const program = new Command();

program
    .version('3.0.0')
    .description('Pure CLI application');

program
    .command('repl')
    .description('Interactive shell to execute pure methods')
    .option('-l, --locale <path to locale>', 'specify the path to locale that will be used. It must be a json file.')
    .action((arg) => {
        startRepl(arg);
    });

program
    .command('generate')
    .description('Generate fake data based on given template from CLI')
    .option('-l, --locale <path to locale>', 'specify the path to locale that will be used. It must be a json file.')
    .action((arg) => {
        generator(arg);
    });

program.parse(process.argv);
