---
id: lorem
title: Pure Lorem Method
sidebar_label: Lorem
slug: pure/lorem
---

## lorem

### word

#### Parameters
| Name    | Type          | Description                                                             |
| ------- | ------------- | ----------------------------------------------------------------------- |
| length  | <Number\>     | Length of the word that should be returned. Default value is randomized |
#### Returns
- **<String\>** String containing a random word of a specified length
#### Usage
```js
console.log(pure.lorem.word());
```
```js
console.log(pure.lorem.word(5));
```

------------------------------------------------------------------------------

### words

#### Parameters
| Name    | Type          | Description                                                 |
| ------- | ------------- | ----------------------------------------------------------- |
| num     | <Number\>     | Number of words that should be returned. Default value is 3 |
#### Returns
- **<String\>** String containing specified length of random words
#### Usage
```js
console.log(pure.lorem.words());
```
```js
console.log(pure.lorem.words(5));
```

------------------------------------------------------------------------------

### sentence

#### Parameters
| Name      | Type      | Description                                                      |
| --------- | --------- | ---------------------------------------------------------------- |
| wordCount | <Number\> | Number of words that should be returned. Default value is random |
#### Returns
- **<String\>** String containing specified length of random words
#### Usage
```js
console.log(pure.lorem.sentence());
```
```js
console.log(pure.lorem.sentence(5));
```

------------------------------------------------------------------------------

### sentences

#### Parameters
| Name                  | Type      | Description                                            |
| --------------------- | --------- | ------------------------------------------------------ |
| options               | <Object\> | You can pass parameters as this object properties      |
| options.sentenceCount | <Number\> | Number of sentences to return. Default value is random |
| options.separator     | <String\> | What separator to use. Default value is spaced         |
#### Returns
- **<String\>** String containing multiple sentences
#### Usage
```js
console.log(pure.lorem.sentences());
```
```js
console.log(pure.lorem.sentences({ sentenceCount: 5, separator: '--' }));
```

------------------------------------------------------------------------------

### slug

#### Parameters
| Name      | Type      | Description                                                 |
| --------- | --------- | ----------------------------------------------------------- |
| wordCount | <Number\> | Number of words that should be returned. Default value is 3 |
#### Returns
- **<String\>** String containing slugified words
#### Usage
```js
console.log(pure.lorem.slug());
```
```js
console.log(pure.lorem.slug(2));
```

------------------------------------------------------------------------------

### paragraph

#### Parameters
| Name          | Type      | Description                                       |
| ------------- | --------- | ------------------------------------------------- |
| sentenceCount | <Number\> | Number of sentences to return. Default value is 3 |
#### Returns
- **<String\>** String containing random paragraph with determined sentences
#### Usage
```js
console.log(pure.lorem.paragraph());
```
```js
console.log(pure.lorem.paragraph(2));
```

------------------------------------------------------------------------------

### paragraphs

#### Parameters
| Name                   | Type      | Description                                        |
| ---------------------- | --------- | -------------------------------------------------- |
| options                | <Object\> | You can pass parameters as this object properties  |
| options.paragraphCount | <Number\> | Number of paragraphs to return. Default value is 3 |
| options.separator      | <String\> | What separator to use. Default value is '\n \r'    |
#### Returns
- **<String\>** String containing multiple paragraphs
#### Usage
```js
console.log(pure.lorem.paragraphs());
```
```js
console.log(pure.lorem.paragraphs({ paragraphCount: 5, separator: '--' }));
```

------------------------------------------------------------------------------

### text

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<String\>** String containing a random text based on a random lorem method
#### Usage
```js
console.log(pure.lorem.text());
```

------------------------------------------------------------------------------

### lines

#### Parameters
| Name      | Type      | Description                                        |
| --------- | --------- | -------------------------------------------------- |
| lineCount | <Number\> | Number of lines to return. Default value is random |
#### Returns
- **<String\>** String containing random lines of lorem separated by `'\n'`
#### Usage
```js
console.log(pure.lorem.lines());
```
```js
console.log(pure.lorem.lines(2));
```

------------------------------------------------------------------------------