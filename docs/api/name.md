---
id: name
title: Pure Name Method
sidebar_label: Name
slug: pure/name
---

# name

## firstName

#### Description
Method that generate a random localized first name. Some locales has specific first name for male and female
#### Parameters
| Name   | Type      | Description                                                            |
| ------ | --------- | ---------------------------------------------------------------------- |
| gender | <Number\> | Defines gendered names by 0 male and 1 female. Default value is random |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.name.firstName());
    ```
    2. **result**
    ```js
    'Elliott'
    ```

2. Describing that i want an first name for a female
    1. **code**
    ```js
    console.log(pure.name.firstName(1));
    ```
    2. **result**
    ```js
    'Tracy'
    ```

------------------------------------------------------------------------------

## lastName

#### Description
Method that generate a random localized last name. Some locales (Like Russian one) has specific last name for male and female
#### Parameters
| Name   | Type      | Description                                                            |
| ------ | --------- | ---------------------------------------------------------------------- |
| gender | <Number\> | Defines gendered names by 0 male and 1 female. Default value is random |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.name.lastName());
    ```
    2. **result**
    ```js
    'Schaden'
    ```

2. Describing that i want an last name for a female
    1. **code**
    ```js
    console.log(pure.name.lastName(1));
    ```
    2. **result**
    ```js
    'Moore'
    ```

------------------------------------------------------------------------------

## findName

#### Description
Method that generate a random localized complete name
#### Parameters
| Name   | Type      | Description                                                            |
| ------ | --------- | ---------------------------------------------------------------------- |
| gender | <Number\> | Defines gendered names by 0 male and 1 female. Default value is random |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.name.findName());
    ```
    2. **result**
    ```js
    'Forrest Wintheiser'
    ```

2. Describing that i want an complete name for a female
    1. **code**
    ```js
    console.log(pure.name.findName(1));
    ```
    2. **result**
    ```js
    'Lindsay Williamson'
    ```

------------------------------------------------------------------------------

## jobTitle

#### Description
Method that generate random job title
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
    console.log(pure.name.jobTitle());
    ```
    2. **result**
    ```js
    'Corporate Communications Specialist'
    ```

------------------------------------------------------------------------------

## gender

#### Description
Method that generate random gender
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
    console.log(pure.name.gender());
    ```
    2. **result**
    ```js
    'Androgynes'
    ```

------------------------------------------------------------------------------

## prefix

#### Description
Method that generate random prefix
#### Parameters
| Name   | Type      | Description                                                            |
| ------ | --------- | ---------------------------------------------------------------------- |
| gender | <Number\> | Defines gendered names by 0 male and 1 female. Default value is random |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.name.prefix());
    ```
    2. **result**
    ```js
    'Mr.'
    ```

2. Describing that i want an prefix for a female
    1. **code**
    ```js
    console.log(pure.name.prefix(1));
    ```
    2. **result**
    ```js
    'Miss'
    ```

------------------------------------------------------------------------------

## suffix

#### Description
Method that generate random suffix
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
    console.log(pure.name.suffix());
    ```
    2. **result**
    ```js
    'Jr.'
    ```

------------------------------------------------------------------------------

## title

#### Description
Method that generate random title
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
    console.log(pure.name.title());
    ```
    2. **result**
    ```js
    'Legacy Security Consultant'
    ```

------------------------------------------------------------------------------

## jobDescriptor

#### Description
Method that generate random job descriptor
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
    console.log(pure.name.jobDescriptor());
    ```
    2. **result**
    ```js
    'Future'
    ```

------------------------------------------------------------------------------

## jobArea

#### Description
Method that generate random job area
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
    console.log(pure.name.jobArea());
    ```
    2. **result**
    ```js
    'Directives'
    ```

------------------------------------------------------------------------------

## jobType

#### Description
Method that generate random job type
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
    console.log(pure.name.jobType());
    ```
    2. **result**
    ```js
    'Supervisor'
    ```

------------------------------------------------------------------------------