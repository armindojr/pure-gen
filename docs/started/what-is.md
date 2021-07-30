---
id: whatis
title: What is Pure Gen
sidebar_label: What is Pure Gen
slug: /
---

Pure Gen main purpose is to provide fake data for you to be used in automation tests frameworks. It can be used as dataset generator too with CLI tools provided.

This project is derivative from [Faker.js](https://github.com/Marak/faker.js) and that's why most of that code is here. This project was created to update some features inside original repo and extends its functionality.

### API Documentation
- [Docs](https://armindojr.github.io/pure-gen/)

## FAQ

- What purpose serve this repository?

This project purpose is to update old code from faker.js and extend it with new functionalities

- Why have you decided to fork?

Just because i wanted to bring some quick features without the gap time that exists if i have done an PR to original project

- Why did you renamed it?

Because i wanted to publish this as an new package in npm

- What are the major changes compared to original project?

I removed all script builds that make this generator compatible with standalone js. Older node versions is hard to mantain, so i decided to only offer support to versions after v10. All unit tests is rewrite to use modern testing tools like chai and sinon with mocha. Extended changelog in CHANGELOG.md

## Maintainer

#### Armindo Junior

## Credits

This repo use some codes from other projects and i want to credit them:

* [Random ua gen](https://github.com/picturepan2/modern-random-ua)
* [Slugify](https://github.com/simov/slugify)
* [lfib PRNG](https://github.com/nquinlan/better-random-numbers-for-javascript-mirror)

## License

pure-gen - Copyright (c) 2021
Armindo Junior
http://github.com/

pure-gen was inspired by and has used data definitions from:

 * https://github.com/Marak/faker.js - Copyright (c) 2017 by Marak Squires
 * https://github.com/stympy/faker/ - Copyright (c) 2007-2010 by Benjamin Curtis
 * http://search.cpan.org/~jasonk/Data-Faker-0.07/ - Copyright (c) 2004-2005 by Jason Kohles

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.