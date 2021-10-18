---
id: git
title: Pure Git Method
sidebar_label: Git
slug: pure/git
---

# git

## branch

#### Description
Method that generates random branch name
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
    console.log(pure.git.branch());
    ```
    2. **result**
    ```js
    'capacitor-calculate'
    ```

------------------------------------------------------------------------------

## commitEntry

#### Description
Method that generate random commit entry like text
#### Parameters
| Name          | Type          | Description                                         |
| ------------- | ------------- | --------------------------------------------------- |
| options       | <Object\>     | You can pass parameters as this object properties   |
| options.merge | <Boolean\>    | Define whether the merge string is displayed or not |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.git.commitEntry());
    ```
    2. **result**
    ```js
    'commit 38a601280ee427c21ff340ed7ee3f4125b8ca68b\r\n' +
    'Author: Hugo Pieterse <vincent_smit@mail.com>\r\n' +
    'Date: Mon Oct 18 2021 01:57:57 GMT-0300 \r\n' +
    '\r\n' +
    '    generate wireless alarm\r\n'
    ```

2. Describing that i want the merge string to be displayed
    1. **code**
    ```js
    console.log(pure.git.commitEntry({ merge: true }));
    ```
    2. **result**
    ```js
    'commit 51c05bd704f0ec3671c119991201afc8f581d6af\r\n' +
    'Merge: 5c68242 5c68242\r\n' +
    'Author: Audrey Erasmus <harvey.bosch@mail.com>\r\n' +
    'Date: Mon Oct 18 2021 14:34:49 GMT-0300 \r\n' +
    '\r\n' +
    '    input back-end circuit\r\n'
    ```

------------------------------------------------------------------------------

## commitMessage

#### Description
Method that generate random commit message
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
    console.log(pure.git.commitMessage());
    ```
    2. **result**
    ```js
    'back-up mobile port'
    ```

------------------------------------------------------------------------------

## commitSha

#### Description
Method that generate random commit SHA
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
    console.log(pure.git.commitSha());
    ```
    2. **result**
    ```js
    'f9d674ba7cdebc1253edad44780468bf168ec7e8'
    ```

------------------------------------------------------------------------------

## shortSha

#### Description
Method that generate random short commit SHA
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
    console.log(pure.git.shortSha());
    ```
    2. **result**
    ```js
    '5dee619'
    ```

------------------------------------------------------------------------------