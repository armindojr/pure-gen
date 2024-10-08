# CHANGELOG

## v3.0.0

_Attention! breaking changes between v2 and v3_

pure-gen is now a native Node ECMAScript module This will require your Node runtime to support es modules, and your app to be an es module. To keep up with this changes we are upgrading minimum node and npm version requirements. Node >= 18 and npm >= 10

If you cannot migrate, please remember you can keep using the v2.x release line until you're ready.

### New API Methods

- Added pure.internet.botUserAgent to generate bot user agent string based on locale

### API Changes

- pure.internet.userAgent now uses locale to generate random string
- pure.fake renamed to pure.fake.parse for architecture reasons
- pure.setLocale has now been changed to receive string with locale name as parameter
- Removed deprecated pure.company.suffixes

### Locality Updates

- Added more data to en locale

## v2.1.2

### API Fixes

- Fixed bug on pure.date.between and pure.date.arrayBetween that was returning string and not an date object

## v2.1.1

### General Fixes

- Fixing security reports when installing

## v2.1.0

### New API Methods

- Added pure.helpers.mod to calculate module operation of a given value.
- Added pure.company.companyPrefix to generate company prefix based on locale

### API Fixes

- Fixed bug on pure.random.number where the maximum value was never picked
- Fixed bug on pure.helpers.contextualCard where username is not respected when creating email
- Fixed bug on pure.company.companyName where you had to pass a number instead a format
- Fixed pure.document.brazilianId to generate only valid documents
- Fixed pure.address.city to return real localized city names and not fake anymore and fixes [#9](https://github.com/armindojr/pure-gen/issues/9)
- Fixed pure.random.number returning number below minimum specified value when using precision parameter

### CLI Fixes

- Generator method now requires to setup locale before generating new data. With this you can generate mocked localized data

### General Fixes

- Removed colors dependency and replaced by colorette
- Reorganized direction files in locales en, pt_PT to meet code changes

## v2.0.1

### API Fixes

- Fixed bug on pure.internet.email where firstName and lastName parameters isn't considered

### General Fixes

- Fixed vulnerabilities by removing some packages. By this change all docs will have to be recreated, soon this will be fixed.

## v2.0.0

_Attention! breaking changes between v1 and v2_

### New features

- Now pure has a CLI built-in to generate random data. Please check documentation for more info

### New API Methods

- Added pure.transport.vehicleRM #1053

### API Changes

- Removed deprecated helpers.randomize. Use random.arrayElement instead
- Setting locale now uses only setLocale method. Setting as variable will no longer works
- [Feature] Add Transport namespace [#17](https://github.com/armindojr/pure-gen/issues/17) - This will impact on airport and vehicle namespaces
- Unique executions now has scope functionality too and added method to clear found itens #1022
- Placeimg has been adequated to only 5 categories #1038
- Images generated by internet.avatar now uses dummy provider and fixes [#16](https://github.com/armindojr/pure-gen/issues/16)

### API Fixes

- Ensure random word doesn't contain unwanted chars #1028
- Fixed bug on pure.random.number where number is generating incorrectly on specific case

### General Fixes

- Locales is not compressed anymore. Installation time will increase but no script will run during installation process. This improve security for user.
- Locales has been reestructured. Now setting specific locale when importing pure will no longer work, instead use setLocale
- pure.fake now uses [mustache](https://github.com/janl/mustache.js) and this improve performance.
- pure.internet.password now uses [randexp](https://github.com/fent/randexp.js) and this improve performance and fixes [#10](https://github.com/armindojr/pure-gen/issues/10)
- pure.random.uuid now uses [uuid](https://github.com/uuidjs/uuid)
- In some methods arg is passed by object now, with this you can opt by passing specific args only and not all
- Removed internal variables that loaded all locales multiple times

## v1.4.2

### API Fixes

- Generate username without diacritic
- Fix generating array between dates always return same day and month #13
- Fix random price always output with zero floating point #12
- Fixed bug when not passing any parameters to pure.date.between

### General fixes

- Improved helpers documentation

## v1.4.1

### API Fixes

- Fixed invalid generated number with pure.document.brazilianCompanyNumber

## v1.4.0

### New API Methods

- Added pure.address.timeZone #968
- Added pure.random.object #962

### API Changes

- adds optional parameters to .url, docs, and tests #995

### API Fixes

- fixing bad behavior of pure.random.arrayElement when stubbing specific random number (unit test related)

### General fixes

- Removed redundant } in nl_BE city names #898
- Make user agent deterministic #924
- Add failing test for userAgent #936
- Fix double BQ in country code for #911 #953
- Suggestion to change the pt_BR location to make more sense in our country #966
- Fix typo in name inside manufacturer.js #972
- Added tests to finance.amount
- Fix wrong translations for country names - pt-BR locale #997
- perf(system): improve commonFileName, commonFileExt, fileType, directoryPath performance #985
- Improved tests, removing dependencies

## v1.3.1

### API fixes

- Fix incorrect capitalized e-mail generation (closes [#5](https://github.com/armindojr/pure-gen/issues/5))

### General fixes

- Bump lodash version due to security updates

## v1.3.0

### New API Methods

- Added pure.date.birthDay
- Added pure.getSeed to log what seed is using
- Added pure.helpers.replaceSymbolWithHex
- Added pure.helpers.mod97
- Added pure.helpers.toDigitString

### API Changes

- Improved document generation with template string
- Improved cvv generation with template string
- Improved ethereumAddress generation wit template string
- Method pure.image.dataUri now generates result containing random colors

### API fixes

- Memory leak fix when using pure.fake due to JSON.parse with try/catch

### General fixes

- Converted slugify to local package
- src/modules/finance improved to use local methods and removed src/modules/iban
- Improved unit tests execution
- Improved performance over random number generations by changing PRNG from mersenneTwister to LFib

Example of improvement:

- Before: `mersenne: 76.808ms`
- After: `lfib: 30.348ms`

Code used to benchmark, generate 1000000 times random number:

```js
console.time('lfib');
for (let index = 0; index < 1000000; index++) {
  pure.random.number();
}
console.timeEnd('lfib');
```

_to further comparison of PRNG's see:_ [benchmark](https://jsperf.com/prng-comparison/6)

## v1.2.1

### API Changes

- Revert due to bugs : Update options.max for random.number to Number.MAX_SAFE_INTEGER #793

## v1.2.0

### New API Methods

- Added pure.electricalComponents generator
- Added pure.esport generator

### API fixes

- pure.finance.creditCardNumber verification don't break anymore when credit_card is only string
- pure.name.firstName verification now return random names when first_name is undefined in locale

### General fixes

- Refactor lib/image.js to use class style and inherit from default provider
- Compress locales to shrink size
- Refactor functional tests to execute in less time
- Improve code coverage

## v1.1.0

### New API Methods

- Added pure.commerce.categories again
- Added pure.dessert generator
- Added pure.document.brazilianId
- Added pure.games generator

### API Changes

- Change image url to stable provider #885

```
Provider choosed is placeimage, where their APIs is the same from lorempixel
```

- Unsplash image provider doesn't have category in their api's, so i changed to keywords
- pure.system.fileName and pure.system.commonFileName now accepts extensions as parameter
- pure.helpers.createTransaction now creates transaction with dates from past 20 years
- pure.document.cpf renamed to pure.document.brazilianCitizenNumber
- pure.document.cnpj renamed to pure.document.brazilianCompanyNumber

### Api fixes

- Update Random to create a per-instance copy of the RNG #513

```
Fixed bug where creating seeeds with array as parameter always return same results
```

- pure.system.commonFileName now really do his job generating files with common ext

### General fixes

- added badges
- improve coverage
  From:

```
Statements   : 98.91% ( 4465/4514 )
Branches     : 86.82% ( 540/622 )
Functions    : 97.81% ( 312/319 )
Lines        : 98.92% ( 4300/4347 )
```

To:

```
See codecov
```

- Fix comented code / tests
- Improve documents description and add examples to methods in docs
- Locales definition moved from lib/locales to locale/modules

## v1.0.0

Changes implemented from base version, all PR's here have been tested and merged manually by me. So if anything is wrong, please let me know.

### New API Methods

- Added faker.date.soon #487
- Added aba routing number #423
- Added method faker.random.float #530
- Added address.nearbyGPSCoordinate method #378
- Added finance.creditCardNumber #382
- Added git faker module #662
- Add faker.markdown #511

```
Fixed bug where emphasis return undefined
```

- Add default_country method #550
- add Airport namespace #559
- Add litecoinAddress generator #597

```
Fixed a bug when addressLength generated value is 26, regex inside unit test fail
```

- Add date.arrayBetween array of dates between two dates #775

```
Fixed method name to be more clear of its function
```

- add commerce.productDescription random product description generator #823
- Added music.genre Music module #837
- Added document.cpf and document.cnpj

### Locality Updates

- Added South African za Locale #517
- Added nl_BE locale #529
- Added fa locality #391
- Added ro locality #327
- Added ar locality ( partial ) #505
- Added pt_PT locality #714
- Updated to 500 US Census names for en locality #360
- Added a few female names ( sv locale ) #397
- Wrong cell phone format for pl locale #655
- Added address.zipCodeByState method #600
- Added ru locale hacker directory #476
- Use proper full names for zh_CN states' names #358
- \+ lib/locales/ru/name/title.js #393
- \+ ru sentences dictionary #394
- Fix typo in city names #485
- Typo fixes & small style improvements to docs.md #536
- Update Chinese phone format #545
- Added pt_BR commerce #571
- Fix pt_BR city suffixes #572
- Update Czech last names #578
- Firstname and lastname are not read properly for locale 'SV' #609
- Update last_name.js in polish locales #644
- Fixes Swedish translation for products. #653
- Improve "fr" translation #658
- new first and last names in pt_BR #669
- Update Vietnamese locale data #698
- updated first_name.js en_IND #702
- added more suffix en_IND #706
- added some suffix en_IND #707
- Add date to pt_BR #719
- Better names for pt_BR #720
- Add 92 range number of MEO #721
- Add ar name #726
- Add gendered french first names #728
- Update currency symbol of turkish lira #731
- Change fallback for fr-CH to fr #738
- Add gendered italian first names and the most common last names #742
- add Japanese lorem data #748
- Fix for some expansion key ar/az/cz/es_MX/sk #751
- Add 'fr' and 'ja' locale country names and adjust 'pt_BR' city suffixes #777
- correct dobra code and symbol #812
- Adding some names pt_BR #816
- fix Chinese first name and last name #821
- fix: absurd street name in ru #835
- Add gendered names to de locale de #839
- Add support for Nigerian locale #844
- Czech Republic #848
- Fixed the currency list #853
- Translate to ar #859
- feat: add lorem ipsum to russian locale #868

### API Changes

- random.alphaNumeric now accepts count as a argument #363
- Added comma replace for price method. #392 -> with adjusts to include object as parameters for price method
- Implement length argument in lorem.word #553

```
Fixed bug when passing length to method that is bigger then all of words return undefined
```

- Update options.max for random.number to Number.MAX_SAFE_INTEGER #793
- feat: added support for generating a random ISO_3166-1 alpha-3 country code #800

```
Modified verification of country-code
```

- Add possibility to generate iban for specific country #888

```
Fixed bug when passing unknown country code throw error. Fallback to random
```

- Add multi parameters support for faker.fake #896
- Removed an unused variable, password, found in internet.js on line 354 #897

### API Fixes

- internet.userAgent missing random seed #521
- commerce.price can no longer default to 0 #446
- Generation of float numbers #401 #478
- Added an explict faker.setLocale method to resolve ES6 import issue #488
- this missing in password generator #386
- Bugfix random.shuffle last element. #614
- Handle negative maximum with no minimum (random.number) #648
- Ensure faker.random.word does not return more than one word #683
- Fixed issue where `useAbbr` parameter in address.state not used. #840
- Fix special characters in internet.url #895

### General Fixes

- Readme.md: Add note about `faker.seed(0)` #551
- update finance.js typo in doc #566
- fix(npm): reduce package size #717
- Readme: add syntax highlight #743
- docs: fix typo #788
- Integrate ESLint and Husky #841
- fix: remove mrmartineau #881
- Update README.md with ES6 syntax #891
- Update packages.json
- Removed some console.log() inside unit tests
- Added new logo
- fixed address.unit on `occasionally returns a 3-digit street number` where address is undefined but test wont fail
- removed support to use this package with browsers, and support only node v10 and up
- fixed all lint errors inside ./lib
- restructured unit tests, updating mocha and sinon
