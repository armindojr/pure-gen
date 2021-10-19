---
id: random
title: Pure Random Method
sidebar_label: Random
slug: pure/random
---

# random

## number

#### Description
Method that generates a random number based on Lagged Fibonacci PRNG implementation in JS. If you want more info about this you can check this [repo](https://github.com/dworthen/prng#lfib)

#### Parameters
| Name              | Type      | Description                                                                                                |
| ----------------- | --------- | ---------------------------------------------------------------------------------------------------------- |
| options           | <Object\> | You can pass parameters as this object properties                                                          |
| options.min       | <Number\> | Min number to be generated. Default value is 0                                                             |
| options.max       | <Number\> | Max number to be generated. Default value is 99999                                                         |
| options.precision | <Number\> | Floating point precision to be used, if value is 0 then no floating point is generated. Default value is 0 |
#### Returns
- **<Number\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.random.number());
    ```
    2. **result**
    ```js
    33235
    ```

2. Random number between 5 and 10 and i wish the result with precision of 4 numbers after floating point
    1. **code**
    ```js
    console.log(pure.random.number({ min: 5, max: 10, precision: 4 }));
    ```
    2. **result**
    ```js
    7.6555
    ```

------------------------------------------------------------------------------

## float

#### Description
Method that generates a random float number.

#### Parameters
| Name              | Type      | Description                                                                                                |
| ----------------- | --------- | ---------------------------------------------------------------------------------------------------------- |
| options           | <Object\> | You can pass parameters as this object properties                                                          |
| options.min       | <Number\> | Min number to be generated. Default value is 0                                                             |
| options.max       | <Number\> | Max number to be generated. Default value is 99999                                                         |
| options.precision | <Number\> | Floating point precision to be used, if value is 0 then no floating point is generated. Default value is 0 |
#### Returns
- **<Number\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.random.float());
    ```
    2. **result**
    ```js
    38684.5
    ```

2. Random float between 5 and 10 and i wish the result with precision of 4 numbers after floating point
    1. **code**
    ```js
    console.log(pure.random.float({ min: 5, max: 10, precision: 4 }));
    ```
    2. **result**
    ```js
    9.461
    ```

------------------------------------------------------------------------------

## arrayElement

#### Description
Method that will pick a random item based on provided list as a parameter.

#### Parameters
| Name  | Type     | Description                                                                                                         |
| ----- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| array | <Array\> | Array list that will be randomized and picked one entry. Default value is randomized from this list: 'a', 'b', 'c'  |
#### Returns
- If you provided an number list, it will return a number and so on.
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.random.arrayElement());
    ```
    2. **result**
    ```js
    'c'
    ```

2. Passing an array as parameter
    1. **code**
    ```js
    console.log(pure.random.arrayElement([ 'apple', 'banana', 'watermelon' ]));
    ```
    2. **result**
    ```js
    'apple'
    ```

------------------------------------------------------------------------------

## arrayElements

#### Description
Method that will randomly excludes some entries and generate a subset of given list.

#### Parameters
| Name  | Type      | Description                                                                                                         |
| ----- | --------- | ------------------------------------------------------------------------------------------------------------------- |
| array | <Array\>  | Array list that will be randomized and created a subset. Default value is randomized from this list: 'a', 'b', 'c'  |
| count | <Number\> | Number of elements that will last in result list. Default value is randomized                                       |
#### Returns
- **<Array\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.random.arrayElements());
    ```
    2. **result**
    ```js
    [ 'a', 'b' ]
    ```

2. Passing an array as parameter and specifying that the subset has to had 3 entries
    1. **code**
    ```js
    console.log(pure.random.arrayElements([ 'apple', 'banana', 'watermelon', 1, 2, 5 ], 3));
    ```
    2. **result**
    ```js
    [ 'apple', 1, 5 ]
    ```

------------------------------------------------------------------------------

## objectElement

#### Description
Method that receives an object and will randomly pick a value or a key.

#### Parameters
| Name   | Type      | Description                                                                                                                        |
| ------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| object | <Array\>  | Object that will be randomized and picked a value or key. Default value is randomized from this object: { foo: 'bar', too: 'car' } |
| field  | <String\> | Field that will be returned, you can choose if you want a value or key. Default field is 'value'                                   |
#### Returns
- Randomized value from provided object. If you provided an number, it will return a number and so on. But if you ask to return only key field, it will always be a string as a result.
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.random.objectElement());
    ```
    2. **result**
    ```js
    'bar'
    ```

2. Passing an object as parameter and specifying that the value i want to be returned is a key
    1. **code**
    ```js
    console.log(pure.random.objectElement({ test: 'result', prop: 1 }, 'key'));
    ```
    2. **result**
    ```js
    'prop'
    ```

------------------------------------------------------------------------------

## generateObj

#### Description
Method that can generate an object with random keys and values.

#### Parameters
| Name   | Type      | Description                                                |
| ------ | --------- | ---------------------------------------------------------- |
| length | <Number\> | What length object generated will have. Default value is 2 |
#### Returns
- **<Object\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.random.generateObj());
    ```
    2. **result**
    ```js
    { 
        Baby: 'card',
        Liaison: 'empower'
    }
    ```

2. Passing 5 as a length to object
    1. **code**
    ```js
    console.log(pure.random.generateObj(5));
    ```
    2. **result**
    ```js
    {
        payment: 'Avon',
        Chicken: 'Bike',
        Incredible: 'Soap',
        Kenya: 'olive',
        neural: 'override'
    }
    ```

------------------------------------------------------------------------------

## uuid

#### Description
This method can generate a random valid uuid. It is based on uuid package for node, if you want more details consult [UUID](https://www.npmjs.com/package/uuid).
Note: if you pass v5 as a version to generate and always give the same name and namespace it will generate the same uuid.

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
1. Without passing parameters
    1. code
    ```js
    console.log(pure.random.uuid());
    ```
    2. result
    ```js
    '7a3c7de0-22c1-11ec-a3ea-c7f4a0fdd1fc'
    ```

2. Passing v5 as a version to uuid and specifying that the string to use in uuid generation has to be `https://www.w3.org/`
    1. code
    ```js 
    console.log(pure.random.uuid('v5', { name: 'https://www.w3.org/' }));
    ```
    2. result
    ```js 
    'ad349628-05b3-5419-9633-82c22c136baa'
    ```

------------------------------------------------------------------------------

## boolean

#### Description
Method that generates random boolean

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<Boolean\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.random.boolean());
    ```
    2. **result**
    ```js
    true
    ```

------------------------------------------------------------------------------

## word

#### Description
Method that generates random word based on multiple pure methods. Possible word methods: 
- [Department](./commerce#department)
- [Product Name](./commerce#productname)
- [Product Adjective](./commerce#productadjective)
- [Product Material](./commerce#productmaterial)
- [Product](./commerce#product)
- [Color](./commerce#color)
- [Catch Phrase Adjective](./company#catchphraseadjective)
- [Catch Phrase Descriptor](./company#catchphrasedescriptor)
- [Catch Phrase Noun](./company#catchphraseNoun)
- [Bs Adjective](./company#bsadjective)
- [Bs Buzz](./company#bsbuzz)
- [Bs Noun](./company#bsnoun)
- [Street Suffix](./address#streetsuffix)
- [County](./address#county)
- [Country](./address#country)
- [State](./address#state)
- [Account Name](./finance#accountname)
- [Transaction Type](./finance#transactiontype)
- [Currency Name](./finance#currencyname)
- [Noun](./hacker#noun)
- [Verb](./hacker#verb)
- [Adjective](./hacker#adjective)
- [Ing Verb](./hacker#ingverb)
- [Abbreviation](./hacker#abbreviation)
- [Job Descriptor](./name#jobdescriptor)
- [Job Area](./name#jobarea)
- [Job Type](./name#jobtype)

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.random.word());
    ```
    2. **result**
    ```js
    'transmit'
    ```

------------------------------------------------------------------------------

## words

#### Description
Method that generates random multiple words. All the possibilities are the same as [Word](#word) but this method generates more then one.

#### Parameters
| Name  | Type      | Description                                                                           |
| ----- | --------- | ------------------------------------------------------------------------------------- |
| count | <Number\> | How many words that will be returned. Default value is a random value between 1 and 3 |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.random.words());
    ```
    2. **result**
    ```js
    'Berkshire'
    ```

2. Specifying that i want 7 random words as result
    1. **code**
    ```js
    console.log(pure.random.words(7));
    ```
    2. **result**
    ```js
    'Research Avenue e-markets payment Investment Orchestrator transmitting'
    ```

------------------------------------------------------------------------------

## locale

#### Description
Method that returns random possible locale to use in pure. All possibilities:
- af_ZA
- ar
- az
- cz
- de
- de_AT
- de_CH
- el
- en
- en_AU
- en_BORK
- en_CA
- en_GB
- en_IE
- en_IND
- en_NG
- en_US
- en_ZA
- en_au_ocker
- es
- es_MX
- fa
- fr
- fr_CA
- fr_CH
- ge
- id_ID
- it
- ja
- ko
- lv
- nb_NO
- nep
- nl
- nl_BE
- pl
- pt_BR
- pt_PT
- ro
- ru
- sk
- sv
- tr
- uk
- vi
- zh_CN
- zh_TW
- zu_ZA

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.random.locale());
    ```
    2. **result**
    ```js
    'it'
    ```

------------------------------------------------------------------------------

## alpha

#### Description
Method that generates a string with random letters.

#### Parameters
| Name           | Type       | Description                                                          |
| -------------- | ---------- | -------------------------------------------------------------------- |
| options        | <Object\>  | You can pass parameters as this object properties                    |
| options.count  | <Number\>  | How many letters to return. Default value is 1                       |
| options.upcase | <Boolean\> | If letters returned will be uppercase or not. Default value is false |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.random.alpha());
    ```
    2. result
    ```js
    'v'
    ```

2. Describing that i want the string to feature 6 chars in upper case
    1. **code**
    ```js
    console.log(pure.random.alpha({ count: 6, upcase: true }));
    ```
    2. **result**
    ```js
    'ZDVPFX'
    ```

------------------------------------------------------------------------------

## alphaNumeric

#### Description
Method that generates a string with random alpha numeric chars.

#### Parameters
| Name  | Type      | Description                                              |
| ----- | --------- | -------------------------------------------------------- |
| count | <Number\> | How many chars that will be returned. Default value is 1 |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.random.alphaNumeric());
    ```
    2. **result**
    ```js
    'e'
    ```

2. Describing that i want the string to feature 9 chars
    1. **code**
    ```js
    console.log(pure.random.alphaNumeric(9));
    ```
    2. **result**
    ```js
    'kqmlaj282'
    ```

------------------------------------------------------------------------------

## hexaDecimal

#### Description
Method that generates a string with random hexa decimal chars.

#### Parameters
| Name  | Type      | Description                                              |
| ----- | --------- | -------------------------------------------------------- |
| count | <Number\> | How many chars that will be returned. Default value is 1 |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.random.hexaDecimal());
    ```
    2. **result**
    ```js
    '6'
    ```

2. Describing that i want the string to feature 3 chars
    1. **code**
    ```js
    console.log(pure.random.hexaDecimal(3));
    ```
    2. **result**
    ```js
    'e24'
    ```

------------------------------------------------------------------------------