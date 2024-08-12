#!/usr/bin/env node

import { Command } from 'commander';
import startRepl from '../src/cli/repl.js';
import gen from '../src/cli/generator.js';

const program = new Command();

program.version('3.0.0').description('Pure CLI application');

program
  .command('repl')
  .description('Interactive shell to execute pure methods')
  .option(
    '-l, --locale <locale code>',
    'specify the locale code that will be used. It must follow the ISO 639-1 for language and ISO 3166-1 for region.'
  )
  .action(arg => {
    startRepl(arg);
  });

program
  .command('generate')
  .description('Generate fake data based on given template from CLI')
  .option(
    '-l, --locale <locale code>',
    'specify the locale code that will be used. It must follow the ISO 639-1 for language and ISO 3166-1 for region.'
  )
  .action(arg => {
    gen.generator(arg);
  });

program.parse(process.argv);
