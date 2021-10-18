---
id: helpers
title: Pure Helpers Method
sidebar_label: Helpers
slug: pure/helpers
---

# helpers

## slugify

#### Description
This method can slugify any string and remove non standard chars and spaces. It is based on slugify package for node, if you want more details consult [Slugify](https://www.npmjs.com/package/slugify).

#### Parameters
| Name           | Type      | Description                                                                           |
| -------------- | --------- | ------------------------------------------------------------------------------------- |
| version        | <String\> | What version of uuid you want, can be: 'v1', 'v4' or 'v5'. Default value is 'v1'      |
| opts           | <Object\> | You can pass parameters as this object properties                                     |
| opts.name      | <String\> | String to use in v5 uuid generation. Default value is 'uuid'                          |
| opts.namespace | <String\> | String with uuid namespace to use in v5 generation. Default value is a random v1 uuid |
#### Returns
- **<String\>**

#### Usage
1. Passing string without slug to be standardized
    1. **code**
    ```js
    console.log(pure.helpers.slugify('string to test slugify áéíóúãçù'));
    ```
    2. **result**
    ```js
    'string-to-test-slugify-aeiouacu'
    ```

------------------------------------------------------------------------------

## replaceSymbolWithNumber

#### Description
This method replaces all symbol inside a string with number

#### Parameters
| Name           | Type      | Description                                                     |
| -------------- | --------- | --------------------------------------------------------------- |
| options        | <Object\> | You can pass parameters as this object properties               |
| options.string | <String\> | String that will be parsed and replaced. Default value is empty |
| options.symbol | <String\> | What symbol to search and replace. Default value is '#'         |
#### Returns
- **<String\>**

#### Usage
1. Passing string with specific symbol to be replaced and specifying the symbol to be searched
    1. **code**
    ```js
    console.log(pure.helpers.replaceSymbolWithNumber({ string: 'test@@', symbol: '@' }));
    ```
    2. **result**
    ```js
    'test71'
    ```

------------------------------------------------------------------------------

## replaceSymbolWithHex

#### Description
This method replaces all symbol inside a string with hexadecimal chars

#### Parameters
| Name           | Type      | Description                                                     |
| -------------- | --------- | --------------------------------------------------------------- |
| options        | <Object\> | You can pass parameters as this object properties               |
| options.string | <String\> | String that will be parsed and replaced. Default value is empty |
| options.symbol | <String\> | What symbol to search and replace. Default value is '#'         |
#### Returns
- **<String\>**

#### Usage
1. Passing string with specific symbol to be replaced and specifying the symbol to be searched
    1. **code**
    ```js
    console.log(pure.helpers.replaceSymbolWithHex({ string: 'test@@', symbol: '@' }));
    ```
    2. **result**
    ```js
    'test3c'
    ```

------------------------------------------------------------------------------

## replaceSymbols

#### Description
Method that parses a string for symbols and replaces them appropriately. '#' will be replaced with number,'?' with letter and '*' will be replaced with number or letter

#### Parameters
| Name   | Type      | Description                                                     |
| ------ | --------- | --------------------------------------------------------------- |
| string | <String\> | String that will be parsed and replaced. Default value is empty |
#### Returns
- **<String\>**

#### Usage
1. Passing string with specific symbol to be replaced
    1. **code**
    ```js
    console.log(pure.helpers.replaceSymbols('test#?#??#'));
    ```
    2. **result**
    ```js
    'test3V4BH7'
    ```

------------------------------------------------------------------------------

## replaceCreditCardSymbols

#### Description
Method that replace symbols in a credit card schema and can add a Luhn checksum

#### Parameters
| Name           | Type      | Description                                                     |
| -------------- | --------- | --------------------------------------------------------------- |
| options        | <Object\> | You can pass parameters as this object properties               |
| options.string | <String\> | String that will be parsed and replaced. Default value is empty |
| options.symbol | <String\> | What symbol to search and replace. Default value is '#'         |
#### Returns
- **<String\>**
#### Usage
1. Passing string with credit card format with symbol to be replaced and specifying the symbol to be searched
    1. **code**
    ```js
    console.log(pure.helpers.replaceCreditCardSymbols({ string: '6453-****-****-****-***L', symbol: '*' }));
    ```
    2. **result**
    ```js
    '6453-7430-7346-1644-4044'
    ```

------------------------------------------------------------------------------

## repeatString

#### Description
Method to repeat string by given times. It is a internal alternative to String.prototype.repeat

#### Parameters
| Name           | Type      | Description                                                     |
| -------------- | --------- | --------------------------------------------------------------- |
| options        | <Object\> | You can pass parameters as this object properties               |
| options.string | <String\> | String that will be parsed and repeated. Default value is empty |
| options.num    | <Number\> | Times to repeat given string. Default value is 0                |
#### Returns
- **<String\>**

#### Usage
1. Passing string to be repeated and specifying that it has to be repeated 7 times
    1. **code**
    ```js
    console.log(pure.helpers.repeatString({ string: '-', num: 7 }));
    ```
    2. **result**
    ```js
    '-------'
    ```

------------------------------------------------------------------------------

## regexpStyleStringParse

#### Description
Method that parses a Regex pattern and generate a string based on that.

#### Parameters
| Name   | Type      | Description                                        |
| ------ | --------- | -------------------------------------------------- |
| string | <String\> | String that will be parsed. Default value is empty |
#### Returns
- **<String\>**
#### Usage
1. Passing string with Regex pattern to generate new random string
    1. **code**
    ```js
    console.log(pure.helpers.repeatString({ string: '-', num: 7 }));
    ```
    2. **result**
    ```js
    '###test3'
    ```

------------------------------------------------------------------------------

## shuffle

#### Description
Method that shuffle items in a given array randomly.

#### Parameters
| Name   | Type      | Description                                                      |
| ------ | --------- | ---------------------------------------------------------------- |
| data   | <Array\>  | Array with items that will be randomized. Default value is empty |
#### Returns
- **<Array\>**
#### Usage
1. Passing an array to be shuffled randomly
    1. **code**
    ```js
    console.log(pure.helpers.shuffle([ 1, 2, 3, 4 ]));
    ```
    2. **result**
    ```js
    [ 3, 4, 2, 1 ]
    ```

------------------------------------------------------------------------------

## mustache

#### Description
This method can parse a string and replace template tags with given data. It is based on mustache package for node, if you want more details consult [Mustache](https://www.npmjs.com/package/mustache).

#### Parameters
| Name         | Type      | Description                                                                                              |
| ------------ | --------- | -------------------------------------------------------------------------------------------------------- |
| options      | <Object\> | You can pass parameters as this object properties                                                        |
| options.str  | <String\> | String with template tags that will be replaced. Default value is empty                                  |
| options.data | <Object\> | Object with data that will replace template. This parameter is required so it doesn't have default value |
#### Returns
- **<String\>**
#### Usage
1. Passing a string with template tags and providing an object with data
    1. **code**
    ```js
    console.log(pure.helpers.mustache({ str: 'Creating string to replace: {{foo}}', data: { foo: 'lorem' } }));
    ```
    2. **result**
    ```js
    'Creating string to replace: lorem'
    ```

------------------------------------------------------------------------------

## createCard

#### Description
This method create a person card with multiple faked info.

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<Object\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.helpers.createCard());
    ```
    2. **result**
    ```js
    {
        name: 'Charlotte Gerber',
        username: 'Sue-Marie34',
        email: 'annette_jantjies@hotmail.com',
        address: {
            streetA: 'Bekker Inlet',
            streetB: '0222 Richard Lake',
            streetC: '5754 Kirsten Roads Suite 117',
            streetD: 'Suite 646',
            city: 'Tashaville',
            state: 'Kentucky',
            country: 'Martinique',
            zipcode: '0137',
            geo: { lat: '47.0000', lng: '-85.0000' }
        },
        phone: '01172691463',
        website: 'steve.net.za',
        company: {
            name: 'Immelman Pty Ltd',
            catchPhrase: 'Phased responsive hub',
            bs: 'engineer best-of-breed e-services'
        },
        posts: [
            {
                words: 'eaque omnis quo',
                sentence: 'Soluta et quam voluptatem quidem nihil.',
                sentences: 'Autem recusandae aut assumenda aperiam modi tenetur. Et in voluptatem quas. Et voluptas optio aut totam.',
                paragraph: 'Ab consequatur recusandae voluptatem magnam consectetur placeat et quidem. Distinctio enim tempora sunt suscipit labore. Consequatur est quia unde nemo.'
            },
            {
                words: 'omnis quia deleniti',
                sentence: 'Dolorem ipsam facilis voluptate et.',
                sentences: 'Autem sit dolor quia dolores. Rerum animi ut consequuntur deserunt. Atque ut mollitia eius reiciendis qui exercitationem perferendis. Ad quis est corporis aliquam aliquid tempora in aut.',
                paragraph: 'Sequi culpa sit minima. Dolores facere est. Totam quibusdam molestias alias.'
            },
            {
                words: 'quia autem molestiae',
                sentence: 'Totam repudiandae excepturi numquam dolorem.',
                sentences: 'Quibusdam quae quos ut. Et omnis necessitatibus.',
                paragraph: 'Blanditiis ipsam accusantium amet quo. Debitis qui dolorem aliquid aperiam. Autem quae quo rerum.'
            }
        ],
        accountHistory: [
            {
                amount: '318.24',
                date: 2003-06-04T03:12:22.965Z,
                business: 'Serfontein - Serfontein',
                name: 'Personal Loan Account 8625',
                type: 'invoice',
                account: '69876381'
            },
            {
                amount: '50.58',
                date: 2006-03-31T13:49:08.029Z,
                business: 'van de Heefer - van de Heefer',
                name: 'Personal Loan Account 8164',
                type: 'withdrawal',
                account: '55067780'
            },
            {
                amount: '719.19',
                date: 2005-06-10T20:46:20.838Z,
                business: 'Els Pty Ltd',
                name: 'Personal Loan Account 5526',
                type: 'deposit',
                account: '03186670'
            }
        ]
    }
    ```

------------------------------------------------------------------------------

## contextualCard

#### Description
This method create a person card with multiple contextual faked info.

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<Object\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.helpers.contextualCard());
    ```
    2. **result**
    ```js
    {
        name: 'Theuns',
        username: 'Theuns_Swart',
        avatar: 'https://i.pravatar.cc/200',
        email: 'theuns_swart_els@yahoo.com',
        dob: 1966-05-11T11:32:41.600Z,
        phone: '014 66015188',
        address: {
            street: 'Raymond Radial',
            suite: 'Suite 491',
            city: 'Derrickchester',
            zipcode: '9565',
            geo: { lat: '26.0000', lng: '-54.0000' }
        },
        website: 'hugo.net.za',
        company: {
            name: 'Boje, Boje and Boje',
            catchPhrase: 'Optimized encompassing database',
            bs: 'synthesize synergistic metrics'
        }
    }
    ```

------------------------------------------------------------------------------

## userCard

#### Description
This method create a user card with multiple faked info.

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<Object\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.helpers.userCard());
    ```
    2. **result**
    ```js
    {
        name: 'Theunis Bekker',
        username: 'Karl_Boyes15',
        email: 'rudy6@hotmail.com',
        address: {
            street: 'de Bruyn Green',
            suite: 'Apt. 971',
            city: 'Morkelfort',
            zipcode: '32661',
            geo: { lat: '58.0000', lng: '62.0000' }
        },
        phone: '01343931594',
        website: 'jan.net.za',
        company: {
            name: 'Bredenkamp - Bredenkamp',
            catchPhrase: 'Function-based incremental capability',
            bs: 'streamline innovative partnerships'
        }
    }
    ```

------------------------------------------------------------------------------

## createTransaction

#### Description
This method create a object containing multiple items about a bank transaction.

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<Object\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.helpers.createTransaction());
    ```
    2. **result**
    ```js
    {
        amount: '334.17',
        date: 2004-10-29T02:16:41.746Z,
        business: 'Serfontein Pty Ltd',
        name: 'Money Market Account 4742',
        type: 'payment',
        account: '47895364'
    }
    ```

------------------------------------------------------------------------------

## mod97

#### Description
Method that calculate mod 97 of given string.

#### Parameters
| Name   | Type      | Description           |
| ------ | --------- | --------------------- |
| string | <String\> | String to apply mod97 |
#### Returns
- **<Number\>**
#### Usage
1. Passing number `111` as a string to calculate mod97
    1. **code**
    ```js
    console.log(pure.helpers.mod97('111'));
    ```
    2. **result**
    ```js
    14
    ```

------------------------------------------------------------------------------


## mod

#### Description
Method that calculate any mod of given string.

#### Parameters
| Name             | Type      | Description                                                  |
| ---------------- | --------- | ------------------------------------------------------------ |
| options          | <Object\> | You can pass parameters as this object properties            |
| options.digitStr | <String\> | String to be dividend of the operation. Default value is '1' |
| options.modValue | <Number\> | Number to be divisor of the operation. Default value is 1    |
#### Returns
- **<Number\>**
#### Usage
1. Passing number `238` as a string to calculate mod 6
    1. **code**
    ```js
    console.log(pure.helpers.mod({ digitStr: '238', modValue: 6 }));
    ```
    2. **result**
    ```js
    4
    ```

------------------------------------------------------------------------------

## toDigitString

#### Description
Method that parses string and convert letters to numbers

#### Parameters
| Name   | Type      | Description           |
| ------ | --------- | --------------------- |
| string | <String\> | String to be replaced |
#### Returns
- **<String\>**
#### Usage
1. Passing string `ABC123` to convert all chars and replace them by number
    1. **code**
    ```js
    console.log(pure.helpers.toDigitString('ABC123'));
    ```
    2. **result**
    ```js
    '101112123'
    ```

------------------------------------------------------------------------------