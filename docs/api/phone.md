---
id: phone
title: Pure Phone Method
sidebar_label: Phone
slug: pure/phone
---

# phone

## phoneNumber

#### Description
Method that generate random phone number
#### Parameters
| Name   | Type      | Description                                                                                                 |
| ------ | --------- | ----------------------------------------------------------------------------------------------------------- |
| format | <String\> | You can define what format to use. If the parameter passed isn't valid it will randomize from internal list |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.phone.phoneNumber());
    ```
    2. **result**
    ```js
    '026 579 44332'
    ```

2. Describing that i want an phone number following the pattern `(##) ####-####`
    1. **code**
    ```js
    console.log(pure.phone.phoneNumber('(##) ####-####'));
    ```
    2. **result**
    ```js
    '(23) 5598-3239'
    ```

------------------------------------------------------------------------------

## phoneNumberFormat

#### Description
Method that generate random phone number based on localization that you have set. If your locale has more than one phone format you can hard pass what index you want
#### Parameters
| Name                   | Type      | Description                                                         |
| ---------------------- | --------- | ------------------------------------------------------------------- |
| phoneFormatsArrayIndex | <Number\> | Index to use when retrieving format from locale. Default value is 0 |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.phone.phoneNumberFormat());
    ```
    2. **result**
    ```js
    '017 247 00083'
    ```

2. Describing that i want an phone number respecting the second item from the defined locale
    1. **code**
    ```js
    console.log(pure.phone.phoneNumberFormat(1));
    ```
    2. **result**
    ```js
    '022 944 84372'
    ```

------------------------------------------------------------------------------

## phoneFormats

#### Description
Method that returns random phone format respecting the defined locale
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
    console.log(pure.phone.phoneFormats());
    ```
    2. **result**
    ```js
    '01# ########'
    ```

------------------------------------------------------------------------------
