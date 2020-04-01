# CHANGELOG

## v1.0.0

Changes implemented from base version, all PR's here have been tested and merged manually by me. So if anything is wrong, please let me know.

## New API Methods

* Added faker.date.soon #487
* Added aba routing number #423
* Added method faker.random.float #530
* Added address.nearbyGPSCoordinate method #378
* Added finance.creditCardNumber #382
* Added git faker module #662
* Add faker.markdown #511
```
Fixed bug where emphasis return undefined
```
* Add default_country method #550
* add Airport namespace #559
* Add litecoinAddress generator #597 
```
Fixed a bug when addressLength generated value is 26, regex inside unit test fail
```
* Add date.arrayBetween array of dates between two dates #775
```
Fixed method name to be more clear of its function
```
* add commerce.productDescription random product description generator #823
* Added music.genre Music module #837
* Added document.cpf and document.cnpj

## Locality Updates

* Added South African za Locale #517
* Added nl_BE locale #529
* Added fa locality #391
* Added ro locality #327
* Added ar locality ( partial ) #505
* Added pt_PT locality #714
* Updated to 500 US Census names for en locality #360
* Added a few female names ( sv locale ) #397
* Wrong cell phone format for pl locale #655
* Added address.zipCodeByState method #600
* Added ru locale hacker directory #476
* Use proper full names for zh_CN states' names #358
* \+ lib/locales/ru/name/title.js #393
* \+ ru sentences dictionary #394
* Fix typo in city names #485
* Typo fixes & small style improvements to docs.md #536
* Update Chinese phone format #545
* Added pt_BR commerce #571
* Fix pt_BR city suffixes #572
* Update Czech last names #578
* Firstname and lastname are not read properly for locale 'SV' #609
* Update last_name.js in polish locales #644
* Fixes Swedish translation for products. #653
* Improve "fr" translation #658
* new first and last names in pt_BR #669
* Update Vietnamese locale data #698
* updated first_name.js en_IND #702
* added more suffix en_IND #706
* added some suffix en_IND #707
* Add date to pt_BR #719
* Better names for pt_BR #720
* Add 92 range number of MEO #721
* Add ar name #726
* Add gendered french first names #728
* Update currency symbol of turkish lira #731
* Change fallback for fr-CH to fr #738
* Add gendered italian first names and the most common last names #742
* add Japanese lorem data #748
* Fix for some expansion key ar/az/cz/es_MX/sk #751
* Add 'fr' and 'ja' locale country names and adjust 'pt_BR' city suffixes #777
* correct dobra code and symbol #812
* Adding some names pt_BR #816
* fix Chinese first name and last name #821
* fix: absurd street name in ru #835
* Add gendered names to de locale de #839
* Add support for Nigerian locale #844
* Czech Republic #848
* Fixed the currency list #853
* Translate to ar #859
* feat: add lorem ipsum to russian locale #868

## API Changes

* random.alphaNumeric now accepts count as a argument #363
* Added comma replace for price method. #392 -> with adjusts to include object as parameters for price method
* Implement length argument in lorem.word #553
```
Fixed bug when passing length to method that is bigger then all of words return undefined
```
* Update options.max for random.number to Number.MAX_SAFE_INTEGER #793
* feat: added support for generating a random ISO_3166-1 alpha-3 country code #800
```
Modified verification of country-code
```
* Add possibility to generate iban for specific country #888
```
Fixed bug when passing unknown country code throw error. Fallback to random
```
* Add multi parameters support for faker.fake #896
* Removed an unused variable, password, found in internet.js on line 354 #897

## API Fixes

* internet.userAgent missing random seed #521
* commerce.price can no longer default to 0 #446
* Generation of float numbers #401 #478
* Added an explict faker.setLocale method to resolve ES6 import issue #488
* this missing in password generator #386
* Bugfix random.shuffle last element. #614
* Handle negative maximum with no minimum (random.number) #648
* Ensure faker.random.word does not return more than one word #683
* Fixed issue where `useAbbr` parameter in address.state not used. #840
* Fix special characters in internet.url #895

## General Fixes

* Readme.md: Add note about `faker.seed(0)` #551
* update finance.js typo in doc #566
* fix(npm): reduce package size #717
* Readme: add syntax highlight #743
* docs: fix typo #788
* Integrate ESLint and Husky #841
* fix: remove mrmartineau #881
* Update README.md with ES6 syntax #891
* Update packages.json
* Removed some console.log() inside unit tests
* Added new logo
* fixed address.unit on `occasionally returns a 3-digit street number` where address is undefined but test wont fail
* removed support to use this package with browsers, and support only node v10 and up
* fixed all lint errors inside ./lib
* restructured unit tests, updating mocha and sinon