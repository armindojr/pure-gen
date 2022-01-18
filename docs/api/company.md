---
id: company
title: Pure Company Method
sidebar_label: Company
slug: pure/company
---

# company

## suffixes

#### Description
Method that generates random company suffixes
#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<Array\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.company.suffixes());
    ```
    2. **result**
    ```js
    [ 'Pty Ltd', 'Ltd', 'CC' ]
    ```

------------------------------------------------------------------------------

## companyName

#### Description
Method that generates random company name. If you want a specific format you can pass as a parameter considering mustache templates like [Fake](../pure#fake).
#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| format        | <String\>     | You can define what format to use. If the parameter passed isn't valid it will randomize from internal list |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.company.companyName());
    ```
    2. **result**
    ```js
    'Streich LLC'
    ```

2. Describing that i want the company name to respect this template `{{name.lastName}}-{{random.number}} {{company.companySuffix}}`
    1. **code**
    ```js
    console.log(pure.company.companyName('{{name.lastName}}-{{random.number}} {{company.companySuffix}}'));
    ```
    2. **result**
    ```js
    'Grimes-20458 LLC'
    ```

------------------------------------------------------------------------------

## companySuffix

#### Description
Method that generates random company suffix
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
    console.log(pure.company.companySuffix());
    ```
    2. **result**
    ```js
    'Group'
    ```

------------------------------------------------------------------------------

## companyPrefix

#### Description
Method that generates random company prefix
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
    pure.setLocale('az')
    console.log(pure.company.companyPrefix());
    ```
    2. **result**
    ```js
    'QSC'
    ```

------------------------------------------------------------------------------

## catchPhrase

#### Description
Method that generates random company suffix
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
    console.log(pure.company.catchPhrase());
    ```
    2. **result**
    ```js
    'Reduced discrete core'
    ```

------------------------------------------------------------------------------

## catchPhraseAdjective

#### Description
Method that generates random catch phrase adjectives.
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
    console.log(pure.company.catchPhraseAdjective());
    ```
    2. **result**
    ```js
    'Intuitive'
    ```

------------------------------------------------------------------------------

## catchPhraseDescriptor

#### Description
Method that generates random catch phrase descriptor.
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
    console.log(pure.company.catchPhraseDescriptor());
    ```
    2. **result**
    ```js
    'next generation'
    ```

------------------------------------------------------------------------------

## catchPhraseNoun

#### Description
Method that generates random catch phrase noun.
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
    console.log(pure.company.catchPhraseNoun());
    ```
    2. **result**
    ```js
    'benchmark'
    ```

------------------------------------------------------------------------------

## bs

#### Description
Method that generates random company BS.
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
    console.log(pure.company.bs());
    ```
    2. **result**
    ```js
    'enable front-end methodologies'
    ```

------------------------------------------------------------------------------

## bsAdjective

#### Description
Method that generates random BS adjective.
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
    console.log(pure.company.bsAdjective());
    ```
    2. **result**
    ```js
    'extensible'
    ```

------------------------------------------------------------------------------

## bsBuzz

#### Description
Method that generates random BS buzz.
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
    console.log(pure.company.bsBuzz());
    ```
    2. **result**
    ```js
    'repurpose'
    ```

------------------------------------------------------------------------------

## bsNoun

#### Description
Method that generates random BS noun.
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
    console.log(pure.company.bsNoun());
    ```
    2. **result**
    ```js
    'deliverables'
    ```

------------------------------------------------------------------------------