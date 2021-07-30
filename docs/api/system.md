---
id: system
title: Pure System Method
sidebar_label: System
slug: pure/system
---

## system

### fileName

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| ext           | <String\>     | You can define what extension to use. If the parameter passed isn't valid it will randomize from internal list |
#### Returns
- **<String\>** String containing a random file name with extension
#### Usage
```js
console.log(pure.system.fileName());
```
```js
console.log(pure.system.fileName('jpeg'));
```

------------------------------------------------------------------------------

### commonFileName

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| ext           | <String\>     | You can define what extension to use. If the parameter passed isn't valid it will randomize from internal list |
#### Returns
- **<String\>** String containing a random file name with extension
#### Usage
```js
console.log(pure.system.commonFileName());
```
```js
console.log(pure.system.commonFileName('jpeg'));
```

------------------------------------------------------------------------------

### mimeType

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<String\>** String containing a random internet media type
#### Usage
```js
console.log(pure.system.mimeType());
```

------------------------------------------------------------------------------

### commonFileType

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<String\>** String containing a random common file type
#### Usage
```js
console.log(pure.system.commonFileType());
```

------------------------------------------------------------------------------

### commonFileExt

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<String\>** String containing a random common file extension
#### Usage
```js
console.log(pure.system.commonFileExt());
```

------------------------------------------------------------------------------

### fileType

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<String\>** String containing a random file type available as mime-type
#### Usage
```js
console.log(pure.system.fileType());
```

------------------------------------------------------------------------------

### fileExt

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| mimeType      | <String\>     | Define what internet media type to use. If the string passed isn't valid it will randomize from internal list |
#### Returns
- **<String\>** String containing a random file name with extension
#### Usage
```js
console.log(pure.system.fileExt());
```
```js
console.log(pure.system.fileExt('video/x-msvideo'));
```

------------------------------------------------------------------------------

### directoryPath

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<String\>** String containing a random fake directory path
#### Usage
```js
console.log(pure.system.directoryPath());
```

------------------------------------------------------------------------------

### filePath

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<String\>** String containing a random fake file path
#### Usage
```js
console.log(pure.system.filePath());
```

------------------------------------------------------------------------------

### semver

#### Parameters
| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| N/A           | N/A           | This method doesn't receive any parameters |
#### Returns
- **<String\>** String containing a random semantic versioning
#### Usage
```js
console.log(pure.system.semver());
```

------------------------------------------------------------------------------