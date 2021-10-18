---
id: lorem
title: Pure Lorem Method
sidebar_label: Lorem
slug: pure/lorem
---

# lorem

## word

#### Description
Method that generate random word of a specified length
#### Parameters
| Name    | Type          | Description                                                             |
| ------- | ------------- | ----------------------------------------------------------------------- |
| length  | <Number\>     | Length of the word that should be returned. Default value is randomized |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.lorem.word());
    ```
    2. **result**
    ```js
    'officiis'
    ```

2. Describing that i want an word with 5 letters
    1. **code**
    ```js
    console.log(pure.lorem.word(5));
    ```
    2. **result**
    ```js
    'eaque'
    ```

------------------------------------------------------------------------------

## words

#### Description
Method that generate random multiple words
#### Parameters
| Name    | Type          | Description                                                 |
| ------- | ------------- | ----------------------------------------------------------- |
| num     | <Number\>     | Number of words that should be returned. Default value is 3 |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.lorem.words());
    ```
    2. **result**
    ```js
    'sit culpa aperiam'
    ```

2. Describing that i want 5 random words
    1. **code**
    ```js
    console.log(pure.lorem.words(5));
    ```
    2. **result**
    ```js
    'fuga ea laborum libero veniam'
    ```

------------------------------------------------------------------------------

## sentence

#### Description
Method that generate random sentence
#### Parameters
| Name      | Type      | Description                                                      |
| --------- | --------- | ---------------------------------------------------------------- |
| wordCount | <Number\> | Number of words that should be returned. Default value is random |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.lorem.sentence());
    ```
    2. **result**
    ```js
    'Ullam hic expedita asperiores.'
    ```

2. Describing that i want a sentence with 5 words
    1. **code**
    ```js
    console.log(pure.lorem.sentence(5));
    ```
    2. **result**
    ```js
    'Perferendis aliquid itaque qui architecto.'
    ```

------------------------------------------------------------------------------

## sentences

#### Description
Method that generate random multiple sentences
#### Parameters
| Name                  | Type      | Description                                            |
| --------------------- | --------- | ------------------------------------------------------ |
| options               | <Object\> | You can pass parameters as this object properties      |
| options.sentenceCount | <Number\> | Number of sentences to return. Default value is random |
| options.separator     | <String\> | What separator to use. Default value is spaced         |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.lorem.sentences());
    ```
    2. **result**
    ```js
    'Quas sed cupiditate et et necessitatibus. Sit quas et iusto quo quia qui aut fugiat. Impedit voluptatem dolores voluptas. Sapiente voluptatibus voluptatem explicabo quo dolor rerum molestiae doloremque. Perspiciatis tempora pariatur asperiores libero atque sit assumenda. Fugiat maiores cupiditate quod aut natus dignissimos natus ut.'
    ```

2. Describing that i want 5 sentences with `\n` as a separator
    1. **code**
    ```js
    console.log(pure.lorem.sentences({ sentenceCount: 5, separator: '\n' }));
    ```
    2. **result**
    ```js
    'Aut dolor minima id inventore laudantium nisi reprehenderit minima eius.\n' +
    'Et amet explicabo.\n' +
    'Aspernatur minus officiis iusto.\n' +
    'Dignissimos eos tempore repellendus nemo consequuntur velit ab.\n' +
    'Illo aut qui iusto quis.'
    ```

------------------------------------------------------------------------------

## slug

#### Description
Method that generate random slugified words
#### Parameters
| Name      | Type      | Description                                                 |
| --------- | --------- | ----------------------------------------------------------- |
| wordCount | <Number\> | Number of words that should be returned. Default value is 3 |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.lorem.slug());
    ```
    2. **result**
    ```js
    'omnis-quibusdam-ea'
    ```

2. Describing that i want 2 slugified words
    1. **code**
    ```js
    console.log(pure.lorem.slug(2));
    ```
    2. **result**
    ```js
    'laborum-sed'
    ```

------------------------------------------------------------------------------

## paragraph

#### Description
Method that generate random paragraph with determined sentences
#### Parameters
| Name          | Type      | Description                                       |
| ------------- | --------- | ------------------------------------------------- |
| sentenceCount | <Number\> | Number of sentences to return. Default value is 3 |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.lorem.paragraph());
    ```
    2. **result**
    ```js
    'Dolores laborum quia. Blanditiis soluta possimus fuga odio necessitatibus et magni velit enim. Molestiae impedit totam accusantium alias nam rem.'
    ```

2. Describing that i want 2 paragraphs
    1. **code**
    ```js
    console.log(pure.lorem.paragraph(2));
    ```
    2. **result**
    ```js
    'Culpa non in eligendi ipsam. Sunt dignissimos rem aut ut.'
    ```

------------------------------------------------------------------------------

## paragraphs

#### Description
Method that generate random multiple paragraphs
#### Parameters
| Name                   | Type      | Description                                        |
| ---------------------- | --------- | -------------------------------------------------- |
| options                | <Object\> | You can pass parameters as this object properties  |
| options.paragraphCount | <Number\> | Number of paragraphs to return. Default value is 3 |
| options.separator      | <String\> | What separator to use. Default value is '\n \r'    |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.lorem.paragraphs());
    ```
    2. **result**
    ```js
    'A doloremque et temporibus aut delectus animi nulla. Sit sequi temporibus sapiente. Deleniti eaque et doloremque nihil et mollitia consequatur rerum.\n' +
    ' \rEt harum in ut dolorem et. Et eos porro vel aspernatur doloremque. Id est unde ex a eum voluptatem at quis.\n' +
    ' \rDolorum rerum consectetur dolor corporis explicabo ea laboriosam cum sunt. Aut fuga eos vel earum nobis mollitia autem ad. Ut ad eaque et.'
    ```

2. Describing that i want 5 paragraphs with `-- ` as a separator
    1. **code**
    ```js
    console.log(pure.lorem.paragraphs({ paragraphCount: 5, separator: '-- ' }));
    ```
    2. **result**
    ```js
    'Rerum vero sapiente unde aspernatur et voluptatem. Est libero modi aut. Facere consequuntur velit ut libero aut tempora sunt vero.-- Excepturi sint labore suscipit. Quasi nisi perferendis et. Incidunt id est beatae necessitatibus non.-- Voluptas aperiam quod ut consequatur unde ipsam nobis. Omnis magni sapiente sit nihil aut eius qui quidem temporibus. Sed minima sit sint sint.-- Distinctio id et sapiente et eum voluptatibus deleniti. Eum fugit est eaque cupiditate optio. Reprehenderit omnis voluptas repellendus autem nulla enim ut vitae accusamus.-- Doloremque autem vitae suscipit odio sit autem id voluptatem. Quidem et exercitationem ad incidunt omnis voluptatum. Aut facere quo facilis non nostrum voluptates libero a.'
    ```

------------------------------------------------------------------------------

## text

#### Description
Method that generate random text based on a random lorem method
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
    console.log(pure.lorem.text());
    ```
    2. **result**
    ```js
    'Soluta pariatur inventore et architecto ipsa nihil nobis earum. Mollitia quidem totam doloribus cumque commodi enim voluptatem. Temporibus dicta rerum accusamus et. Nemo ipsam corporis temporibus doloribus voluptas velit excepturi. Excepturi inventore et dolorum amet iure eaque.'
    ```

------------------------------------------------------------------------------

## lines

#### Description
Method that generate random lines of lorem separated by `\n`
#### Parameters
| Name      | Type      | Description                                        |
| --------- | --------- | -------------------------------------------------- |
| lineCount | <Number\> | Number of lines to return. Default value is random |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.lorem.paragraph());
    ```
    2. **result**
    ```js
    'Qui sed et vitae sit. Magnam et aut labore expedita voluptatem quam non quibusdam. Totam quo reiciendis cupiditate nemo facere unde facilis.'
    ```

2. Describing that i want 2 lines on a paragraph
    1. **code**
    ```js
    console.log(pure.lorem.paragraph(2));
    ```
    2. **result**
    ```js
    'Tempora illo molestiae ratione. Hic ipsum modi commodi suscipit a laboriosam.'
    ```

------------------------------------------------------------------------------