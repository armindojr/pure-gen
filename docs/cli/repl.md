---
id: repl
title: Pure CLI REPL
sidebar_label: REPL
slug: repl
---

## Description
Read-Eval-Print-Loop (**REPL**) is an interactive shell that processes Node.js expressions. The shell reads JavaScript code the user enters, evaluates the result of interpreting the line of code, prints the result to the user, and loops until the user signals to quit. It is a built-in CLI tool inside Pure Gen that you can use to quick test and quick use all methods without creating a single file to use it.

Attention! some methods won't take any effect inside REPL like: `seed`, `setLocale`, `getSeed`

To exit REPL you can use `ctrl+c` on your keyboard or simply type `.exit`

## Usage
To use the Pure REPL you first need to have the npm package installed, be in your project in the terminal, and run the following command:

```bash
npx pure repl
```

You will be requested the following question:
- Select what locale pure will set in Repl -> You can choose from a list what locale REPL will be using to print data.

After you selected it, an message greeting you will appear and REPL will start. From here you can simply type any pure method you want and press `enter` and an result will be printed.