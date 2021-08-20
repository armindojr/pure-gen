---
id: unique
title: Pure Unique Method
sidebar_label: Unique
slug: pure/unique
---

## unique

### exec

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
- Generate unique entries passing specific method, normally used inside loops. Result type depends on what method you will call.
#### Usage
```js
let list = [];

for (let index = 0; index < 5; index++) {
    list.push(pure.unique.exec(pure.internet.email))
}

console.log(list);
```
```js
let list = [];

for (let index = 0; index < 5; index++) {
    list.push(pure.unique.exec(pure.internet.email, [{ provider: 'mailinator.com' }]))
}

console.log(list);
```

------------------------------------------------------------------------------

### clear

#### Parameters
| Name  | Type      | Description                                |
| ----- | --------- | ------------------------------------------ |
| scope | <String\> | Define what scope unique will cleared, if nothing is passed then it will consider global scope |
#### Returns
- Clear previously generated entries to use inside another scope
#### Usage
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

------------------------------------------------------------------------------