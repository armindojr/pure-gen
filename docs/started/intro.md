---
id: intro
title: Introduction to Pure Gen
sidebar_label: Introduction
slug: intro
---

:::info
These are the docs for the latest version (__>=2.x__) of Pure Gen. If you are still using an older version, please upgrade it.
:::

## Installation
Use npm to install the Pure Gen in your Node.js project. See [system requirements](#system-requirements).
```bash
npm i --save pure-gen
```

This command will save Pure Gen to your `package.json` and it will be available to use right after.

## Setup
Once you have installed Pure Gen, you can import it in your test file.
```js
const pure = require('pure-gen')
```

After importing it, you can use it by simple calling an method that you want.
```js
pure.random.number()
```

## System Requirements
You’ll need [Node.js](http://nodejs.org) installed.

- Install at least v10 or higher
- Only releases that are LTS are officially supported

If you don't have Node installed, you can use [NVM](https://github.com/creationix/nvm) to assist managing multiple active Node.js versions.