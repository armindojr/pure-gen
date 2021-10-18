---
id: commerce
title: Pure Commerce Method
sidebar_label: Commerce
slug: pure/commerce
---

# commerce

## color

#### Description
Method that generate a random color name
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
    console.log(pure.commerce.color());
    ```
    2. **result**
    ```js
    'magenta'
    ```

------------------------------------------------------------------------------

## department

#### Description
Method that generate random commerce department name
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
    console.log(pure.commerce.department());
    ```
    2. **result**
    ```js
    'Clothing'
    ```

------------------------------------------------------------------------------

## productName

#### Description
Method that generate a random product name. Is composed by default of [Product Adjective](#productadjective), [Product Material](#productmaterial) and [Product](#product)
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
    console.log(pure.commerce.productName());
    ```
    2. **result**
    ```js
    'Practical Concrete Gloves'
    ```

------------------------------------------------------------------------------

## price

#### Description
Method that generates a random price for a product.
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
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.commerce.price());
    ```
    2. **result**
    ```js
    '783.92'
    ```

2. Describing that i want the result number to be between 2 and 10, it has to had 5 precision number after floating point, use `US$` as a symbol and do not separate the value with a comma
    1. **code**
    ```js
    console.log(pure.commerce.price({ min: 2, max: 10, dec: 5, symbol: 'US$', comma: false }));
    ```
    2. **result**
    ```js
    'US$2.59513'
    ```

------------------------------------------------------------------------------

## categories

#### Description
Method that generates an array with random product categories.
#### Parameters
| Name          | Type          | Description                                                 |
| ------------- | ------------- | ----------------------------------------------------------- |
| num           | <Number\>     | Number of categories to return. Default value is randomized |
#### Returns
- **<Array\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.commerce.categories());
    ```
    2. **result**
    ```js
    [
        'Books',     'Industrial',
        'Jewelery',  'Sports',
        'Music',     'Clothing',
        'Outdoors',  'Automotive',
        'Tools',     'Beauty',
        'Toys',      'Electronics',
        'Movies',    'Garden',
        'Grocery',   'Kids',
        'Home',      'Health',
        'Computers', 'Games',
        'Baby',      'Shoes'
    ]
    ```

2. Describing that i want only 2 categories on result array
    1. **code**
    ```js
    console.log(pure.commerce.categories(2));
    ```
    2. **result**
    ```js
    [ 'Jewelery', 'Sports' ]
    ```

------------------------------------------------------------------------------

## productAdjective

#### Description
Method that generates a random product adjective.
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
    console.log(pure.commerce.productAdjective());
    ```
    2. **result**
    ```js
    'Small'
    ```

------------------------------------------------------------------------------

## productMaterial

#### Description
Method that generates a random product material.
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
    console.log(pure.commerce.productMaterial());
    ```
    2. **result**
    ```js
    'Plastic'
    ```

------------------------------------------------------------------------------

## product

#### Description
Method that generates a random product.
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
    console.log(pure.commerce.product());
    ```
    2. **result**
    ```js
    'Ball'
    ```

------------------------------------------------------------------------------

## productDescription

#### Description
Method that generates a random product description.
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
    console.log(pure.commerce.productDescription());
    ```
    2. **result**
    ```js
    'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality'
    ```

------------------------------------------------------------------------------
