---
id: finance
title: Pure Finance Method
sidebar_label: Finance
slug: pure/finance
---

# finance

## account

#### Description
Method that generate random account number
#### Parameters
| Name   | Type      | Description                                                                     |
| ------ | --------- | ------------------------------------------------------------------------------- |
| length | <Number\> | What length of account number will be generated. Default value is locale format |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.finance.account());
    ```
    2. **result**
    ```js
    '44941618'
    ```

2. Describing that i want an account with 10 numbers
    1. **code**
    ```js
    console.log(pure.finance.account(10));
    ```
    2. **result**
    ```js
    '5584477073'
    ```

------------------------------------------------------------------------------

## accountName

#### Description
Method that generate random account name
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
    console.log(pure.finance.accountName());
    ```
    2. **result**
    ```js
    'Money Market Account'
    ```

------------------------------------------------------------------------------

## routingNumber

#### Description
Method that generate random routing number
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
    console.log(pure.finance.routingNumber());
    ```
    2. **result**
    ```js
    '484765369'
    ```

------------------------------------------------------------------------------

## mask

#### Description
Method that generate random mask number
#### Parameters
| Name             | Type       | Description                                           |
| ---------------- | ---------- | ----------------------------------------------------- |
| options          | <Object\>  | You can pass parameters as this object properties     |
| options.length   | <Number\>  | Length of mask number. Default value is 4             |
| options.parens   | <Boolean\> | Format result with parentesis. Default value is false |
| options.ellipsis | <Boolean\> | Format result with ellipsis. Default value is false   |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.finance.mask());
    ```
    2. **result**
    ```js
    '5877'
    ```

2. Describing that i want an mask number with length `6` and formatted with ellipsis
    1. **code**
    ```js
    console.log(pure.finance.mask({ length: 6, parens: false, ellipsis: true }));
    ```
    2. **result**
    ```js
    '...296528'
    ```

------------------------------------------------------------------------------

## amount

#### Description
Method that generate a random amount value

#### Parameters
| Name           | Type      | Description                                                                                                |
| -------------- | --------- | ---------------------------------------------------------------------------------------------------------- |
| options        | <Object\> | You can pass parameters as this object properties                                                          |
| options.min    | <Number\> | Min number to be generated. Default value is 0                                                             |
| options.max    | <Number\> | Max number to be generated. Default value is 1000                                                          |
| options.dec    | <Number\> | Floating point precision to be used, if value is 0 then no floating point is generated. Default value is 2 |
| options.symbol | <String\> | What symbol to use when generating number. Default value is empty                                          |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.finance.amount());
    ```
    2. **result**
    ```js
    '618.48'
    ```

2. Describing that i want an random amount between 5 and 10 and i wish the result with precision of 4 numbers after floating point and use the Azerbaijanian Manat currency symbol `ман`
    1. **code**
    ```js
    console.log(pure.finance.amount({ min: 5, max: 10, dec: 4, symbol: 'ман' }));
    ```
    2. **result**
    ```js
    'ман6.2894'
    ```

------------------------------------------------------------------------------

## transactionType

#### Description
Method that generate random transaction type
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
    console.log(pure.finance.transactionType());
    ```
    2. **result**
    ```js
    'invoice'
    ```

------------------------------------------------------------------------------

## currencyCode

#### Description
Method that generate random currency code
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
    console.log(pure.finance.currencyCode());
    ```
    2. **result**
    ```js
    'EGP'
    ```

------------------------------------------------------------------------------

## currencyName

#### Description
Method that generate random currency name
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
    console.log(pure.finance.currencyName());
    ```
    2. **result**
    ```js
    'US Dollar'
    ```

------------------------------------------------------------------------------

## currencySymbol

#### Description
Method that generate random currency symbol
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
    console.log(pure.finance.currencySymbol());
    ```
    2. **result**
    ```js
    '₡'
    ```

------------------------------------------------------------------------------

## bitcoinAddress

#### Description
Method that generate random bitcoin address
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
    console.log(pure.finance.bitcoinAddress());
    ```
    2. **result**
    ```js
    '3pqJ9Qq1kN3trBQWt5oti5A2ULMxDZnT'
    ```

------------------------------------------------------------------------------

## litecoinAddress

#### Description
Method that generate random litecoin address
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
    console.log(pure.finance.litecoinAddress());
    ```
    2. **result**
    ```js
    '3jiLj9MZrdXGkBPcmEfX4ka1Yrgm9WQ'
    ```

------------------------------------------------------------------------------

## creditCardNumber

#### Description
Method that generate random credit card number
#### Parameters
| Name     | Type      | Description                                                                                     |
| -------- | --------- | ----------------------------------------------------------------------------------------------- |
| provider | <String\> | Provider to generate from schema, it respects format declared in locale. Default value is empty |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.finance.creditCardNumber());
    ```
    2. **result**
    ```js
    '6767-4787-8355-5427-030'
    ```

2. Describing that i want an credit card respecting `maestro` template
    1. **code**
    ```js
    console.log(pure.finance.creditCardNumber('maestro'));
    ```
    2. **result**
    ```js
    '5018-7171-7413-6719'
    ```

------------------------------------------------------------------------------

## creditCardCVV

#### Description
Method that generate random litecoin address
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
    console.log(pure.finance.creditCardCVV());
    ```
    2. **result**
    ```js
    '841'
    ```

------------------------------------------------------------------------------

## ethereumAddress

#### Description
Method that generate random ethereum address
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
    console.log(pure.finance.ethereumAddress());
    ```
    2. **result**
    ```js
    '0x520772c47f57b934de18977ad31ca3f2dbcf42a4'
    ```

------------------------------------------------------------------------------

## iban

#### Description
Method that generate a random International Bank Account Number

#### Parameters
| Name              | Type       | Description                                                                          |
| ----------------- | ---------- | ------------------------------------------------------------------------------------ |
| options           | <Object\>  | You can pass parameters as this object properties                                    |
| options.formatted | <Boolean\> | Format output or not. Default value is 0                                             |
| options.country   | <String\>  | What country will be used to generate, alpha-2 country code. Default value is random |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.finance.iban());
    ```
    2. **result**
    ```js
    'MC6661044700616M827O760L128'
    ```

2. Describing that i want an random IBAN formatted from `Bosnia and Herzegovina`
    1. **code**
    ```js
    console.log(pure.finance.iban({ formatted: true, country: 'BA' }));
    ```
    2. **result**
    ```js
    'BA81 9167 2671 3670 8538'
    ```

------------------------------------------------------------------------------

## bic

#### Description
Method that generate random Bank Identifier Code
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
    console.log(pure.finance.bic());
    ```
    2. **result**
    ```js
    'KCJUNIM1'
    ```

------------------------------------------------------------------------------