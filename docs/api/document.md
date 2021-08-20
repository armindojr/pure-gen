---
id: document
title: Pure Document Method
sidebar_label: Document
slug: pure/document
---

## document

### brazilianCitizenNumber

#### Parameters
| Name           | Type       | Description                                                      |
| -------------- | ---------- | ---------------------------------------------------------------- |
| options        | <Object\>  | You can pass parameters as this object properties                |
| options.format | <Boolean\> | Define that result is formated or not. Default value is false    |
#### Returns
- **<String\>** String containing a random valid document number
#### Usage
```js
console.log(pure.document.brazilianCitizenNumber());
```
```js
console.log(pure.document.brazilianCitizenNumber({ format: true }));
```

------------------------------------------------------------------------------

### brazilianCompanyNumber

#### Parameters
| Name           | Type       | Description                                                      |
| -------------- | ---------- | ---------------------------------------------------------------- |
| options        | <Object\>  | You can pass parameters as this object properties                |
| options.format | <Boolean\> | Define that result is formated or not. Default value is false    |
#### Returns
- **<String\>** String containing a random valid company number
#### Usage
```js
console.log(pure.document.brazilianCompanyNumber());
```
```js
console.log(pure.document.brazilianCompanyNumber({ format: true }));
```

------------------------------------------------------------------------------

### brazilianId

#### Parameters
| Name           | Type       | Description                                                      |
| -------------- | ---------- | ---------------------------------------------------------------- |
| options        | <Object\>  | You can pass parameters as this object properties                |
| options.format | <Boolean\> | Define that result is formated or not. Default value is false    |
#### Returns
- **<String\>** String containing a random ID number
#### Usage
```js
console.log(pure.document.brazilianId());
```
```js
console.log(pure.document.brazilianId({ format: true }));
```

------------------------------------------------------------------------------