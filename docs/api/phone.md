---
id: phone
title: Pure Phone Method
sidebar_label: Phone
slug: pure/phone
---

## phone

### phoneNumber

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| format        | <String\>     | You can define what format to use. If the parameter passed isn't valid it will randomize from internal list |
#### Returns
- **<String\>** String containing a random phone number
#### Usage
```js
console.log(pure.phone.phoneNumber());
```
```js
console.log(pure.phone.phoneNumber('(##) ####-####'));
```

------------------------------------------------------------------------------

### phoneNumberFormat

#### Parameters
| Name                          | Type          | Description                                |
| ----------------------------- | ------------- | ------------------------------------------ |
| phoneFormatsArrayIndex        | <Number\>     | Index to use when retrieving format from locale. If the parameter passed isn't valid it will randomize from internal list |
#### Returns
- **<String\>** String containing a random localized fromatted phone number
#### Usage
```js
console.log(pure.phone.phoneNumber());
```
```js
console.log(pure.phone.phoneNumber(1));
```

------------------------------------------------------------------------------

### phoneFormats

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<String\>** String containing a random localized phone format
#### Usage
```js
console.log(pure.phone.phoneFormats());
```

------------------------------------------------------------------------------
