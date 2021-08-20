---
id: commerce
title: Pure Commerce Method
sidebar_label: Commerce
slug: pure/commerce
---

## commerce

### color

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<String\>** String containing a random color
#### Usage
```js
console.log(pure.commerce.color());
```

------------------------------------------------------------------------------

### department

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<String\>** String containing a random department name
#### Usage
```js
console.log(pure.commerce.department());
```

------------------------------------------------------------------------------

### productName

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<String\>** String containing a random product name
#### Usage
```js
console.log(pure.commerce.productName());
```

------------------------------------------------------------------------------

### price

#### Parameters
| Name          | Type          | Description                                                      |
| ------------- | ------------- | ---------------------------------------------------------------- |
| options       | <Object\>     | You can pass parameters as this object properties                |
| options.min   | <Number\>     | Minimum product price. Default value is 1                        |
| options.max   | <Number\>     | Maximum product price. Default value is 1000                     |
| options.dec   | <Number\>     | Floating point precision. Default value is 2                     |
| options.symbol| <String\>     | What price symbol will be used. Default is empty                 |
| options.comma | <Boolean\>    | Set if result will be separated by comma. Default value is false |
#### Returns
- **<String\>** String containing a random price
#### Usage
```js
console.log(pure.commerce.price());
```
```js
console.log(pure.commerce.price({ min: 2, max: 10, dec: 5, symbol: 'US$', comma: false }));
```

------------------------------------------------------------------------------

### categories

#### Parameters
| Name          | Type          | Description                                                 |
| ------------- | ------------- | ----------------------------------------------------------- |
| num           | <Number\>     | Number of categories to return. Default value is randomized |
#### Returns
- **<Array\>** Array containing random product categories
#### Usage
```js
console.log(pure.commerce.categories());
```
```js
console.log(pure.commerce.categories(2));
```

------------------------------------------------------------------------------

### productAdjective

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<String\>** String containing a random product adjective
#### Usage
```js
console.log(pure.commerce.productAdjective());
```

------------------------------------------------------------------------------

### productMaterial

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<String\>** String containing a random product material
#### Usage
```js
console.log(pure.commerce.productMaterial());
```

------------------------------------------------------------------------------

### product

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<String\>** String containing a random product name
#### Usage
```js
console.log(pure.commerce.product());
```

------------------------------------------------------------------------------

### productDescription

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<String\>** String containing a random product description
#### Usage
```js
console.log(pure.commerce.productDescription());
```

------------------------------------------------------------------------------
