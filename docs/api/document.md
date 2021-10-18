---
id: document
title: Pure Document Method
sidebar_label: Document
slug: pure/document
---

# document

## brazilianCitizenNumber

#### Description
Method that generate a random valid BR citizen Number (CPF).
#### Parameters
| Name           | Type       | Description                                                      |
| -------------- | ---------- | ---------------------------------------------------------------- |
| options        | <Object\>  | You can pass parameters as this object properties                |
| options.format | <Boolean\> | Define that result is formated or not. Default value is false    |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.document.brazilianCitizenNumber());
    ```
    2. **result**
    ```js
    '93361134374'
    ```

2. Describing that i want the document to be formatted
    1. **code**
    ```js
    console.log(pure.document.brazilianCitizenNumber({ format: true }));
    ```
    2. **result**
    ```js
    '855.804.966-13'
    ```

------------------------------------------------------------------------------

## brazilianCompanyNumber

#### Description
Method that generate a random valid BR company Number (CNPJ).
#### Parameters
| Name           | Type       | Description                                                      |
| -------------- | ---------- | ---------------------------------------------------------------- |
| options        | <Object\>  | You can pass parameters as this object properties                |
| options.format | <Boolean\> | Define that result is formated or not. Default value is false    |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.document.brazilianCompanyNumber());
    ```
    2. **result**
    ```js
    '16865761000146'
    ```

2. Describing that i want the document to be formatted
    1. **code**
    ```js
    console.log(pure.document.brazilianCompanyNumber({ format: true }));
    ```
    2. **result**
    ```js
    '45.441.632/0001-29'
    ```

------------------------------------------------------------------------------

## brazilianId

#### Description
Method that generate a random valid BR id Number (RG). It respect validation of SSP rules to verification digit.
#### Parameters
| Name           | Type       | Description                                                      |
| -------------- | ---------- | ---------------------------------------------------------------- |
| options        | <Object\>  | You can pass parameters as this object properties                |
| options.format | <Boolean\> | Define that result is formated or not. Default value is false    |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.document.brazilianId());
    ```
    2. **result**
    ```js
    '298551913'
    ```

2. Describing that i want the document to be formatted
    1. **code**
    ```js
    console.log(pure.document.brazilianId({ format: true }));
    ```
    2. **result**
    ```js
    '67.413.117-4'
    ```

------------------------------------------------------------------------------