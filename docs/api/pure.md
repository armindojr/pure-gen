---
id: pure
title: Pure Object
sidebar_label: Pure
slug: pure
---

# Pure

This is the root of pure, in wich you can use some methods to help you with random generation params.

## seed

#### Description
Method to set specific seed to RNG. If you pass a hardcoded number to this method after using pure all the random things will now be static.
#### Parameters
| Name  | Type      | Description                                      |
| ----- | --------- | ------------------------------------------------ |
| value | <Number\> | Seed value that RNG will use to generate numbers |
#### Usage
1. Describing that i want to use the number `100` initially as a seed so every time RNG things will be the same. After printing some number i will change seed to `101` and print again a number, then i will return seed to `100`.
    1. **code**
    ```js
    pure.seed(100);
    console.log(pure.random.number());

    pure.seed(101);
    console.log(pure.random.number());

    pure.seed(100);
    console.log(pure.random.number());
    ```
    2. **result**
    ```js
    15394
    39829
    15394
    ```

------------------------------------------------------------------------------

## setLocale

#### Description
Method to set specific locale that will be using when generating random names, cities and so on. All possibilities:
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
| Name   | Type      | Description                            |
| ------ | --------- | -------------------------------------- |
| locale | <String\> | Locale to be used when generating data |
#### Usage
1. Describing that i want to use `fr` as a locale
    1. **code**
    ```js
    pure.setLocale('fr');
    console.log(pure.name.firstName());
    ```
    2. **result**
    ```js
    'Baptiste'
    ```

------------------------------------------------------------------------------
## getSeed

#### Description
Method to set specific seed to RNG. If you pass a hardcoded number to this method after using pure all the random things will now be static.
#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Usage
1. Describing that i want to use the number `100` as a seed printing to terminal what seed i am using.
    1. **code**
    ```js
    pure.seed(100);
    console.log(pure.getSeed());
    ```
    2. **result**
    ```js
    100
    ```

------------------------------------------------------------------------------
## fake

#### Description
Main purpose is to take template string and fill in with generated data using method passed inside double curly brackets. It uses [Mustache](./pure/helpers#mustache) to parse string.

**Attention**: On some methods they require object as parameter, in this case you need to pass object formatted as json.
#### Parameters
| Name | Type      | Description                       |
| ---- | --------- | --------------------------------- |
| str  | <String\> | Docstring to replace with methods |
#### Usage
1. Describing that i want pure to auto fill the curly brackets method with respective response from they.
    1. **code**
    ```js
    console.log(pure.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'));
    ```
    2. **result**
    ```js
    'Marks, Dean Sr.'
    ```

------------------------------------------------------------------------------