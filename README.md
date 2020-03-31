<div>
    <p  align="center">
    	<a>
    	    <img  alt="Pure-gen"  src="static/logo/logo-completo-hor.svg"  width="350">
    	</a>
    </p>
</div>

<div>
    <p  align="center">
    	Generate fake data to be used in test automation
    </p>
</div>

This project is derivative (Fork) from [Faker.js](https://github.com/Marak/faker.js) and that's why most of that code is here. This fork is created to update some features inside original repo and extends its functionality.

## API Documentation


## Usage

### Node.js

```js
const pure = require('pure-gen');

let randomName = pure.name.findName(); // Rowan Nikolaus
let randomEmail = pure.internet.email(); // Kassandra.Haley@erich.biz
let randomCard = pure.helpers.createCard(); // random contact card containing many properties
```

## API


### pure.fake()

pure-gen contains a super useful generator method `pure.fake` for combining pure API methods using a mustache string format.

**Example:**

``` js
console.log(pure.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"));
// outputs: "Marks, Dean Sr."
```

This will interpolate the format string with the value of methods `name.lastName()`, `name.firstName()`, and `name.suffix()`

If you want to pass parameters to the method you called in `pure.fake`, just pass them in a valid JSON format. That is to say, strings and object keys must be written in double quotes.

**Example:**

``` js
console.log(pure.fake('{{helpers.randomize(["randomA","randomB"])}}'));
// outputs "randomA" or "randomB"
```

### JSDoc API Browser



### API Methods

* address
  * zipCode
  * zipCodeByState
  * city
  * cityPrefix
  * citySuffix
  * cityName
  * streetName
  * streetAddress
  * streetSuffix
  * streetPrefix
  * secondaryAddress
  * county
  * country
  * defaultCountry
  * countryCode
  * state
  * stateAbbr
  * latitude
  * longitude
  * direction
  * cardinalDirection
  * ordinalDirection
  * nearbyGPSCoordinate
* airport
  * name
  * iataCode
  * icaoCode
* commerce
  * color
  * department
  * productName
  * price
  * productAdjective
  * productMaterial
  * product
  * productDescription
* company
  * suffixes
  * companyName
  * companySuffix
  * catchPhrase
  * bs
  * catchPhraseAdjective
  * catchPhraseDescriptor
  * catchPhraseNoun
  * bsAdjective
  * bsBuzz
  * bsNoun
* database
  * column
  * type
  * collation
  * engine
* date
  * past
  * future
  * between
  * arrayBetween
  * recent
  * soon
  * month
  * weekday
* fake
* finance
  * account
  * accountName
  * routingNumber
  * mask
  * amount
  * transactionType
  * currencyCode
  * currencyName
  * currencySymbol
  * bitcoinAddress
  * creditCardNumber
  * creditCardCVV
  * ethereumAddress
  * litecoinAddress
  * iban
  * bic
* git
  * branch
  * commitEntry
  * commitMessage
  * commitSha
  * shortSha
* hacker
  * abbreviation
  * adjective
  * noun
  * verb
  * ingverb
  * phrase
* helpers
  * randomize
  * slugify
  * replaceSymbolWithNumber
  * replaceSymbols
  * shuffle
  * mustache
  * createCard
  * contextualCard
  * userCard
  * createTransaction
* image
  * image
  * avatar
  * imageUrl
  * abstract
  * animals
  * business
  * cats
  * city
  * food
  * nightlife
  * fashion
  * people
  * nature
  * sports
  * technics
  * transport
  * dataUri
* internet
  * avatar
  * email
  * exampleEmail
  * userName
  * protocol
  * url
  * domainName
  * domainSuffix
  * domainWord
  * ip
  * ipv6
  * userAgent
  * color
  * mac
  * password
* markdown
  * header
  * emphasis
  * table
  * orderedList
  * unorderedList
  * inlineCode
  * blockCode
* music
  * genre
* lorem
  * word
  * words
  * sentence
  * slug
  * sentences
  * paragraph
  * paragraphs
  * text
  * lines
* name
  * firstName
  * lastName
  * findName
  * jobTitle
  * prefix
  * suffix
  * title
  * jobDescriptor
  * jobArea
  * jobType
* phone
  * phoneNumber
  * phoneNumberFormat
  * phoneFormats
* random
  * number
  * float
  * arrayElement
  * objectElement
  * uuid
  * boolean
  * word
  * words
  * image
  * locale
  * alpha
  * alphaNumeric
  * hexaDecimal
* system
  * fileName
  * commonFileName
  * mimeType
  * commonFileType
  * commonFileExt
  * fileType
  * fileExt
  * directoryPath
  * filePath
  * semver


## Localization

pure-gen has support for multiple localities.

The default language locale is set to English.

Setting a new locale is simple:

```js
// sets locale to de
pure.setLocale("de");
// or
pure.locale = "de";
```

 * az
 * cz
 * de
 * de_AT
 * de_CH
 * en
 * en_AU
 * en_BORK
 * en_CA
 * en_GB
 * en_IE
 * en_IND
 * en_NG
 * en_US
 * en_ZA
 * en_au_ocker
 * es
 * es_MX
 * fa
 * fr
 * fr_CA
 * ge
 * id_ID
 * it
 * ja
 * ko
 * nb_NO
 * nep
 * nl
 * pl
 * pt_BR
 * pt_PT
 * ru
 * sk
 * sv
 * tr
 * uk
 * vi
 * zh_CN
 * zh_TW


### Individual Localization Packages

pure-gen also supports incremental loading of locales.

By default, requiring `pure` will include *all* locale data.

In a production environment, you may only want to include the locale data for a specific set of locales.

```js
// loads only de locale
const pure = require('pure-gen/locale/de');
```

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

## Tests

```
$ npm run test
```

You can view a code coverage report generated in coverage/lcov-report/index.html.

## Building JSDocs

```
$ npm run doc
```

## FAQ

What purpose serve this repository?
- This project purpose is to update old code from faker.js and extend it with new functionalities

Why have you decided to fork?
- Just because i wanted to bring some quick features without the gap time that exists if i have done an PR to original project

Why did you renamed it?
- Because i wanted to publish this as an new package in npm

What are the major changes compared to original project?
- I removed all script builds that make this generator compatible with standalone js. In my opinion older node versions is hard to mantain too, so i decided to only offer support to versions after v8. All unit tests is rewrite to use modern testing tools like chai and sinon with mocha. Extended changelog in [CHANGELOG.md](static/doc/CHANGELOG.md)

## Maintainer

#### Armindo Junior

## License

pure-gen - Copyright (c) 2020
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