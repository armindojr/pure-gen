<div>
    <p  align="center">
    	<a>
    	    <img  alt="Pure-gen"  src="https://cdn.statically.io/gh/armindojr/pure-gen/a62e2abc/static/logo/logo-completo-hor.svg"  width="350">
    	</a>
    </p>
</div>

<div>
    <p  align="center">
    	Generate fake data to be used in test automation
    </p>
</div>

<div>
    <p align="center">
      <a href="https://www.travis-ci.com/github/armindojr/pure-gen">
        <img alt="Build Status" src="https://www.travis-ci.com/armindojr/pure-gen.svg?branch=master">
      </a>
      <a href="https://codecov.io/gh/armindojr/pure-gen">
        <img alt="CodeCov" src="https://codecov.io/gh/armindojr/pure-gen/branch/master/graph/badge.svg">
      </a>
    </p>
</div>
Pure Gen main purpose is to provide fake data for you to be used in automation tests frameworks. It can be used as dataset generator too with CLI tools provided.

This project is derivative from [Faker.js](https://github.com/Marak/faker.js) and that's why most of that code is here. This project is created to update some features inside original repo and extends its functionality.

### API Documentation
- [Docs](https://armindojr.github.io/pure-gen/)

## CLI
Now you can use pure from cli after installing. 

Run in your cli:
```
$ npx pure repl
```

This will start repl interface with pure. For more information see [Repl](https://armindojr.github.io/pure-gen/repl.html)

or:
```
$ npx pure generate
```

This will ask some questions and generate fake data based on pre-configured template. You can save in any given format. For more information see [Generator](https://armindojr.github.io/pure-gen/generator.html)


## Usage

First, install package with:
```
$ npm i --save pure-gen
```

```js
const pure = require('pure-gen');

let randomName = pure.name.findName(); // Rowan Nikolaus
```

## Localization

pure-gen has support for multiple localities.

The default language locale is set to English.

[How to set specific location](https://armindojr.github.io/pure-gen/pure.html#.setLocale)

## Setting a randomness seed

If you want consistent results, you can set your own seed:

```js
pure.seed(123);

let firstRandom = pure.random.number();

// Setting the seed again resets the sequence.
pure.seed(123);

let secondRandom = pure.random.number();

console.log(firstRandom === secondRandom);
```

_Note_: Setting the seed to `0` (`pure.seed(0)`) is the same as not having a seed. The seed must be greater than zero.

If you want to known your current seed then you can:

```js
console.log(pure.getSeed())
```

## FAQ

What purpose serve this repository?
- This project purpose is to update old code from faker.js and extend it with new functionalities

Why have you decided to fork?
- Just because i wanted to bring some quick features without the gap time that exists if i have done an PR to original project

Why did you renamed it?
- Because i wanted to publish this as an new package in npm

What are the major changes compared to original project?
- I removed all script builds that make this generator compatible with standalone js. In my opinion older node versions is hard to mantain too, so i decided to only offer support to versions after v10. All unit tests is rewrite to use modern testing tools like chai and sinon with mocha. Extended changelog in CHANGELOG.md

## Contributing
I want to add or modify dictionary for my language, what i do?
- Fork this repo
- Clone your forked repo to your pc
- Make modifications
- Commit changes to your fork
- Create PR of your fork to this repo

**Do not create PR changing /doc/ files, i will not accept!!**

## Maintainer

#### Armindo Junior

## Credits

This repo use some codes from other projects and i want to credit them:

* [Random ua gen](https://github.com/picturepan2/modern-random-ua)
* [Slugify](https://github.com/simov/slugify)
* [lfib PRNG](https://github.com/nquinlan/better-random-numbers-for-javascript-mirror)

## License

pure-gen - Copyright (c) 2022 Armindo Junior

pure-gen was inspired by and has used data definitions from:

 * https://github.com/Marak/faker.js - Copyright (c) 2017 by Marak Squires
 * https://github.com/stympy/faker/ - Copyright (c) 2007-2010 by Benjamin Curtis
 * http://search.cpan.org/~jasonk/Data-Faker-0.07/ - Copyright (c) 2004-2005 by Jason Kohles

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.