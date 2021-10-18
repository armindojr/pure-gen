---
id: unique
title: Pure Unique Method
sidebar_label: Unique
slug: pure/unique
---

# unique

## exec

#### Description
Method that generate unique entries passing specific method, normally used inside loops
#### Parameters
| Name            | Type          | Description                                            |
| --------------- | ------------- | ------------------------------------------------------ |
| method          | <Function\> | Method that will be executed to generate data          |
| args            | <Array\>    | Arguments that will be passed to method                |
| opts            | <Object\>   | You can pass parameters as this object properties      |
| opts.maxTime    | <Number\>   | Maximum time unique.exec will attempt to run before aborting. Default value is 3 |
| opts.maxRetries | <Number\>   | Maximum retries unique.exec will recurse before abortings ( max loop depth ). Default value is 50 |
| opts.exclude    | <Array\>    | Global exclude list of results. Default value is empty |
| opts.compare    | <Function\> | Uniqueness compare function, default behavior is to check value as key against object hash |
| opts.scope      | <String\>   | Define what scope unique will be added, if nothing is passed then it will consider global scope |
#### Returns
- Result type depends on what method you will call.
#### Usage
1. Generating 5 random unique emails list
    1. **code**
    ```js
    let list = [];

    for (let index = 0; index < 5; index++) {
        list.push(pure.unique.exec(pure.internet.email))
    }

    console.log(list);
    ```
    2. **result**
    ```js
    [
        'oscar.basson@mail.com',
        'sara.zimmerman@mail.com',
        'gerald.oosthuizen@mail.com',
        'brenda.van-den-berg@mail.com',
        'lydia_cloete3@mail.com'
    ]
    ```

2. Generating 5 random unique emails list with provider `mailinator.com`
    1. **code**
    ```js
    let list = [];

    for (let index = 0; index < 5; index++) {
        list.push(pure.unique.exec(pure.internet.email, [{ provider: 'mailinator.com' }]))
    }

    console.log(list);
    ```
    2. **result**
    ```js
    [
        'karla_hanekom@mailinator.com',
        'vernon7@mailinator.com',
        'monica59@mailinator.com',
        'jacobus37@mailinator.com',
        'adriaan15@mailinator.com'
    ]
    ```

------------------------------------------------------------------------------

## clear

#### Description
Clear previously generated entries to use inside another scope
#### Parameters
| Name  | Type      | Description                                |
| ----- | --------- | ------------------------------------------ |
| scope | <String\> | Define what scope unique will cleared, if nothing is passed then it will consider global scope |
#### Usage
1. Clearing previously selected result on global scope. As you can see the result is that the same value can be picked again without stopping the program.
    1. **code**
    ```js
    let result = pure.unique.exec(pure.internet.protocol, [], {
        exclude: ['https'],
    });

    console.log(result);

    pure.unique.clear();

    let result2 = pure.unique.exec(pure.internet.protocol, [], {
        exclude: ['https'],
    });

    console.log(result2);
    ```
    2. **result**
    ```js
    http
    http
    ```

------------------------------------------------------------------------------