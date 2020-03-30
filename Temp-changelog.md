## Updated
* Use proper full names for zh_CN states' names #358
* Added comma replace for price method. #392 -> with adjusts to include object as parameters for price method
* \+ lib/locales/ru/name/title.js #393
* \+ sentences dictionary #394
* Method to generate a random CPF (Individual register of Brazilians) #447 --> need to code, not implemented
* Fix typo in city names #485
* Add faker.markdown #511 --> Fixed bug where emphasis return undefined
* Update Random to create a per-instance copy of the RNG #513 --> need to test in real case, not implemented
* Typo fixes & small style improvements to docs.md #536
* Update Chinese phone format #545
* Add default_country method #550
* Readme.md: Add note about `faker.seed(0)` #551
* Implement length argument in lorem.word #553 --> Fixed bug when passing length to method that is bigger then all of words return undefined
* add Airport namespace #559
* update finance.js #566
* Added pt_BR commerce #571
* Fix pt_BR city suffixes #572
* Update Czech last names #578
* Add litecoinAddress generator #597 --> fixed a bug when addressLength generated value is 26, regex inside unit test fail
* Firstname and lastname are not read properly for locale 'SV' #609
* Bugfix random.shuffle last element. #614
* Added hungarian locale #618 --> need to test in real case, not implemented
* Update last_name.js in polish locales #644
* Handle negative maximum with no minimum (random.number) #648
* Fixes Swedish translation for products. #653
* Improve "fr" translation #658
* new first and last names in pt_BR #669
* Ensure faker.random.word does not return more than one word #683
* Update Vietnamese locale data #698
* updated first_name.js #702
* added more suffix #706
* added some suffix #707
* fix(npm): reduce package size #717
* Add date to pt_BR #719
* Better names for pt_BR #720
* Add 92 range number of MEO #721
* Add ar name #726
* Add gendered french first names #728
* Update currency symbol of turkish lira #731
* Change fallback for fr-CH to fr #738
* Add gendered italian first names and the most common last names #742
* Readme: add syntax highlight #743
* add Japanese lorem data #748
* Fix for some expansion key #751
* Get x dates between two dates #775 --> Fixed method name to be more clear of its function
* Add 'fr' and 'ja' locale country names and adjust 'pt_BR' city suffixes #777
* docs: fix typo #788
* Update options.max for random.number to Number.MAX_SAFE_INTEGER #793
* feat: added support for generating a random ISO_3166-1 alpha-3 country code #800 --> modified verification of country-code
* correct dobra code and symbol #812
* Adding some names #816
* fix Chinese first name and last name #821
* add random product description generator #823
* fix: absurd street name in ru #835
* Added the Music module #837
* Add gendered names to de locale #839
* Fixed issue where `useAbbr` parameter not used. #840
* Integrate ESLint and Husky #841
* Add support for Nigerian locale #844
* Czech Republic #848
* Fixed the currency list #853
* Changes LoremPixel from HTTP to HTTPS #856
* Translate to ar #859
* feat: add lorem ipsum to russian locale #868
* fix: remove mrmartineau #881
* Add possibility to generate iban for specific country #888 --> Fixing bug when passing unknown country code throw error. Fallback to random
* Update README.md with ES6 syntax #891
* Fix special characters in internet.url #895
* Add multi parameters support for faker.fake #896
* Removed an unused variable, password, found in internet.js on line 354 #897




## TODO:
- Refactor unit tests to using chai, sinon, jest
- Remove console.log in unit tests
- Review ./lib/index.js [_definitions]
- Refactor code to not use while loop = lib/finance.js / lib/helpers.js / lib/lorem.js
- Remove build to use in browsers (gulp)
- Remove support for older node versions (support v10 and up)
- Run lint to fix sintax errors
- Update version of package.json
- Change all references from LoremPixel to placeimg
- Refactor all files to use new name not faker

# -------------------------- OLD implemented changelog
## New API Methods

* Added faker.date.soon #487 OK
* Added aba routing number #423 OK
* Added method faker.random.float #530 OK
* Added address.nearbyGPSCoordinate method #378 OK
* Added finance.creditCardNumber #382 OK
* Added git faker module #662 OK

## Locality Updates

* Added South African za Locale #517 OK
* Added nl_BE locale #529 OK
* Added fa locality #391 OK
* Added ro locality #327 OK
* Added ar locality ( partial ) #505 OK
* Added pt_PT locality #714 OK
* Updated to 500 US Census names for en locality #360 OK
* Added a few female names ( sv locale ) #397 OK
* Wrong cell phone format for pl locale #655 OK
* Added address.zipCodeByState method #600 OK
* Added ru locale hacker directory #476 OK

## API Changes

* random.alphaNumeric now accepts count as a argument #363 OK

## API Fixes

* internet.userAgent missing random seed #521 OK
* commerce.price can no longer default to 0 #446 OK
* Generation of float numbers #401 #478 OK
* Added an explict faker.setLocale method to resolve ES6 import issue #488 OK
* this missing in password generator #386 OK