---
id: markdown
title: Pure Markdown Method
sidebar_label: Markdown
slug: pure/markdown
---

# markdown

## header

#### Description
Method that generate a markdown header randomly.
#### Parameters
| Name    | Type      | Description                                                 |
| ------- | --------- | ----------------------------------------------------------- |
| num     | <Number\> | How many heading tags will be generated. Default value is 1 |
#### Returns
- **<String\>** String containing a random header
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.markdown.header());
    ```
    2. **result**
    ```js
    '# aut'
    ```

2. Describing that i want the level of the header to be 5
    1. **code**
    ```js
    console.log(pure.markdown.header(5));
    ```
    2. **result**
    ```js
    '##### architecto'
    ```

------------------------------------------------------------------------------

## emphasis

#### Description
Method that generate random text with markdown emphasis.

#### Parameters
| Name    | Type      | Description                                                                                                            |
| ------- | --------- | ---------------------------------------------------------------------------------------------------------------------- |
| types   | <String\> | String containing what emphasis generated text will use. Default value is randomized from this types: '_','~','*','**' |
#### Returns
- **<String\>** String containing a random emphasis
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.markdown.emphasis());
    ```
    2. **result**
    ```js
    '*qui* possimus aut'
    ```

2. Describing that i want the text generated to have `_` as emphasis
    1. **code**
    ```js
    console.log(pure.markdown.emphasis('_'));
    ```
    2. **result**
    ```js
    'velit _eligendi_ explicabo'
    ```

------------------------------------------------------------------------------

## table

#### Description
Method that generate a markdown table randomly.

#### Parameters
| Name    | Type      | Description                                               |
| ------- | --------- | --------------------------------------------------------- |
| num     | <Number\> | How many table rows will be generated. Default value is 3 |
#### Returns
- **<String\>** String containing a random table
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.markdown.table());
    ```
    2. **result**
    ```
    | head1 | head2 | head3 |
    |:-----:|:-----:|:-----:|
    |perspiciatis|architecto|voluptatem|
    |officiis|animi|non|
    |optio|dolorem|autem|
    ```

2. Describing that i want the table generated to have only 2 rows
    1. **code**
    ```js
    console.log(pure.markdown.table(2));
    ```
    2. **result**
    ```
    | head1 | head2 | head3 |
    |:-----:|:-----:|:-----:|
    |similique|saepe|laborum|
    |nam|vitae|pariatur|
    ```

------------------------------------------------------------------------------

## orderedList

#### Description
Method that generate a markdown ordered list randomly.

#### Parameters
| Name    | Type      | Description                                                  |
| ------- | --------- | ------------------------------------------------------------ |
| num     | <Number\> | How many items in list will be generated. Default value is 3 |
#### Returns
- **<String\>** String containing a random ordered list
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.markdown.orderedList());
    ```
    2. **result**
    ```
    1. temporibus
    2. esse
    3. vero
    ```

2. Describing that i want the list generated to have 6 items
    1. **code**
    ```js
    console.log(pure.markdown.orderedList(6));
    ```
    2. **result**
    ```
    1. itaque
    2. non
    3. quidem
    4. ut
    5. quia
    6. nam
    ```

------------------------------------------------------------------------------

## unorderedList

#### Description
Method that generate a markdown unordered list randomly.

#### Parameters
| Name    | Type      | Description                                                  |
| ------- | --------- | ------------------------------------------------------------ |
| num     | <Number\> | How many items in list will be generated. Default value is 3 |
#### Returns
- **<String\>** String containing a random unordered list
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.markdown.unorderedList());
    ```
    2. **result**
    ```
    * laborum
    * sapiente
    * id
    ```

2. Describing that i want the list generated to have 6 items
    1. **code**
    ```js
    console.log(pure.markdown.unorderedList(6));
    ```
    2. **result**
    ```
    * aut
    * temporibus
    * nesciunt
    * molestiae
    * aut
    * ut
    ```

------------------------------------------------------------------------------

## inlineCode

#### Description
Method that generate random text with markdown inline code.

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<String\>** String containing a random word with inline code
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.markdown.inlineCode());
    ```
    2. **result**
    ```
    ` quo `
    ```

------------------------------------------------------------------------------

## blockCode

#### Description
Method that generate random text with markdown block code.

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<String\>** String containing a random word with block code
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.markdown.blockCode());
    ```
    2. **result**
    ```
        ```javascript
        dolores 
        ```
    ```

------------------------------------------------------------------------------