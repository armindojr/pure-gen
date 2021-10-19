---
id: system
title: Pure System Method
sidebar_label: System
slug: pure/system
---

# system

## fileName

#### Description
Method that generate random file name with extension
#### Parameters
| Name | Type      | Description                                                                                                    |
| ---- | --------- | -------------------------------------------------------------------------------------------------------------- |
| ext  | <String\> | You can define what extension to use. If the parameter passed isn't valid it will randomize from internal list |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.system.fileName());
    ```
    2. **result**
    ```js
    'computer-tools.lua'
    ```

2. Describing that i want an file name using `jpeg` as extension
    1. **code**
    ```js
    console.log(pure.system.fileName('jpeg'));
    ```
    2. **result**
    ```js
    'com-facilitator.jpeg'
    ```

------------------------------------------------------------------------------

## commonFileName

#### Description
Method that generates random common file name with extension
#### Parameters
| Name | Type      | Description                                                                                                    |
| ---- | --------- | -------------------------------------------------------------------------------------------------------------- |
| ext  | <String\> | You can define what extension to use. If the parameter passed isn't valid it will randomize from internal list |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.system.commonFileName());
    ```
    2. **result**
    ```js
    'initiative-networks-research.wav'
    ```

2. Describing that i want an file name using `jpeg` as extension
    1. **code**
    ```js
    console.log(pure.system.commonFileName('jpeg'));
    ```
    2. **result**
    ```js
    'fault-tolerant.jpeg'
    ```

------------------------------------------------------------------------------

## mimeType

#### Description
Method that generate random internet media type
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
    console.log(pure.system.mimeType());
    ```
    2. **result**
    ```js
    'application/vnd.paos.xml'
    ```

------------------------------------------------------------------------------

## commonFileType

#### Description
Method that generate random common file type
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
    console.log(pure.system.commonFileType());
    ```
    2. **result**
    ```js
    'video'
    ```

------------------------------------------------------------------------------

## commonFileExt

#### Description
Method that generate random common file extension
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
    console.log(pure.system.commonFileExt());
    ```
    2. **result**
    ```js
    'png'
    ```

------------------------------------------------------------------------------

## fileType

#### Description
Method that generate random file type
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
    console.log(pure.system.fileType());
    ```
    2. **result**
    ```js
    'x-shader'
    ```

------------------------------------------------------------------------------

## fileExt

#### Description
Method that generate random file extension
#### Parameters
| Name     | Type      | Description                                                                                                   |
| -------- | --------- | ------------------------------------------------------------------------------------------------------------- |
| mimeType | <String\> | Define what internet media type to use. If the string passed isn't valid it will randomize from internal list |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.system.fileExt());
    ```
    2. **result**
    ```js
    'cdmic'
    ```

2. Describing that i want an file extension using `video/x-msvideo` as mime-type
    1. **code**
    ```js
    console.log(pure.system.fileExt('video/x-msvideo'));
    ```
    2. **result**
    ```js
    'avi'
    ```

------------------------------------------------------------------------------

## directoryPath

#### Description
Method that generate random fake directory path
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
    console.log(pure.system.directoryPath());
    ```
    2. **result**
    ```js
    '/Applications'
    ```

------------------------------------------------------------------------------

## filePath

#### Description
Method that generate random fake file path
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
    console.log(pure.system.filePath());
    ```
    2. **result**
    ```js
    '/opt/include/card.xap'
    ```

------------------------------------------------------------------------------

## semver

#### Description
Method that generate random semantic versioning number
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
    console.log(pure.system.semver());
    ```
    2. **result**
    ```js
    '9.0.2'
    ```

------------------------------------------------------------------------------