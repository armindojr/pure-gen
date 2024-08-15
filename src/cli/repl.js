import * as colorette from 'colorette';
import repl from 'repl';
import pure from '../index.js';

function prettyPrint(message) {
  console.log(message);
}

function startRepl(arg) {
  if (arg.locale) {
    pure.setLocale(arg.locale);
  }

  const sayWelcome = `
            Hello, ${colorette.green(process.env.USER)}! 😁
            Pure will use locale: ${colorette.blue(pure.registeredModules.title)}
    
            ${colorette.gray('.exit or ctrl+c to exit Repl')}
            ${colorette.gray(
              'Repl has autocomplete, type any pure method ' +
                'then hit <tab> 2x after "." and Repl will suggest'
            )}
            ${colorette.gray('Methods: seed, setLocale, getSeed will not work inside Repl')}
        `;

  const sayBye = `\nBye ${colorette.green(process.env.USER)}! 👋`;

  // Print the welcome message
  prettyPrint(sayWelcome);

  const myRepl = repl.start('[/] ');

  // Add pure to the context
  myRepl.context.pure = pure;

  myRepl.on('exit', () => prettyPrint(sayBye));
}

export default startRepl;
