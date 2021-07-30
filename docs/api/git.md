---
id: git
title: Pure Git Method
sidebar_label: Git
slug: pure/git
---

## git

### branch

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<String\>** String containing a random branch name
#### Usage
```js
console.log(pure.git.branch());
```

------------------------------------------------------------------------------

### commitEntry

#### Parameters
| Name          | Type          | Description                                         |
| ------------- | ------------- | --------------------------------------------------- |
| options       | <Object\>     | You can pass parameters as this object properties   |
| options.merge | <Boolean\>    | Define whether the merge string is displayed or not |
#### Returns
- **<String\>** String containing an random multi line commit entry
#### Usage
```js
console.log(pure.git.commitEntry());
```
```js
console.log(pure.git.commitEntry({ merge: true }));
```

------------------------------------------------------------------------------

### commitMessage

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<String\>** String containing a random commit message
#### Usage
```js
console.log(pure.git.commitMessage());
```

------------------------------------------------------------------------------

### commitSha

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<String\>** String containing a random commit SHA
#### Usage
```js
console.log(pure.git.commitSha());
```

------------------------------------------------------------------------------

### shortSha

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<String\>** String containing a random short commit SHA
#### Usage
```js
console.log(pure.git.shortSha());
```

------------------------------------------------------------------------------