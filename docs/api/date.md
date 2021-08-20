---
id: date
title: Pure Date Method
sidebar_label: Date
slug: pure/date
---

## date

### past

#### Parameters
| Name            | Type      | Description                                                       |
| --------------- | --------- | ----------------------------------------------------------------- |
| options         | <Object\> | You can pass parameters as this object properties                 |
| options.years   | <Number\> | How many years the date can possible be before refDate. Default value is 1 |
| options.refDate | <Date\>   | Reference to generate a past date. Default value is Today date    |
#### Returns
- **<Object\>** Date object containing a random past date generated considering reference date
#### Usage
```js
console.log(pure.date.past());
```
```js
console.log(pure.date.past({ years: 5, refDate: '01-01-1995' }));
```

------------------------------------------------------------------------------

### future

#### Parameters
| Name            | Type      | Description                                                       |
| --------------- | --------- | ----------------------------------------------------------------- |
| options         | <Object\> | You can pass parameters as this object properties                 |
| options.years   | <Number\> | How many years the date can possible be after refDate. Default value is 1 |
| options.refDate | <Date\>   | Reference to generate a future date. Default value is Today date  |
#### Returns
- **<Object\>** Date object containing a random future date generated considering reference date
#### Usage
```js
console.log(pure.date.future());
```
```js
console.log(pure.date.future({ years: 5, refDate: '01-01-1995' }));
```

------------------------------------------------------------------------------

### between

#### Parameters
| Name         | Type      | Description                                                         |
| ------------ | --------- | ------------------------------------------------------------------- |
| options      | <Object\> | You can pass parameters as this object properties                   |
| options.from | <Date\>   | First reference date. Default value is 5 years back from Today date |
| options.to   | <Date\>   | Second reference date. Default value is Today date                  |
#### Returns
- **<String\>** String containing a random date generated between two reference date
#### Usage
```js
console.log(pure.date.between());
```
```js
console.log(pure.date.between({ from: '01-01-1995', to: '03-01-1995' }));
```

------------------------------------------------------------------------------

### arrayBetween

#### Parameters
| Name         | Type      | Description                                                         |
| ------------ | --------- | ------------------------------------------------------------------- |
| options      | <Object\> | You can pass parameters as this object properties                   |
| options.from | <Date\>   | First reference date. Default value is 5 years back from Today date |
| options.to   | <Date\>   | Second reference date. Default value is Today date                  |
| options.num  | <Number\> | Number of samples to return in array. Default value is 3            |
#### Returns
- **<Array\>** Array containing multiple date generated between two reference date
#### Usage
```js
console.log(pure.date.arrayBetween());
```
```js
console.log(pure.date.arrayBetween({ from: '01-01-1995', to: '03-01-1995', num: 10 }));
```

------------------------------------------------------------------------------

### recent

#### Parameters
| Name            | Type      | Description                                           |
| --------------- | --------- | ----------------------------------------------------- |
| options         | <Object\> | You can pass parameters as this object properties     |
| options.days    | <Number\> | Reference to generate recent date. Default value is 1 |
| options.refDate | <Date\>   | Reference date. Default value is Today date           |
#### Returns
- **<Object\>** Date object containing a random recent date generated considering reference date
#### Usage
```js
console.log(pure.date.recent());
```
```js
console.log(pure.date.recent({ days: 5, refDate: '01-01-1995' }));
```

------------------------------------------------------------------------------

### soon

#### Parameters
| Name            | Type      | Description                                           |
| --------------- | --------- | ----------------------------------------------------- |
| options         | <Object\> | You can pass parameters as this object properties     |
| options.days    | <Number\> | Reference to generate soon date. Default value is 1   |
| options.refDate | <Date\>   | Reference date. Default value is Today date           |
#### Returns
- **<Object\>** Date object containing a random soon date generated considering reference date
#### Usage
```js
console.log(pure.date.soon());
```
```js
console.log(pure.date.soon({ days: 5, refDate: '01-01-1995' }));
```

------------------------------------------------------------------------------

### month

#### Parameters
| Name            | Type       | Description                                       |
| --------------- | ---------- | ------------------------------------------------- |
| options         | <Object\>  | You can pass parameters as this object properties |
| options.abbr    | <Boolean\> | Abbreviated string. Default value is false        |
| options.context | <Boolean\> | N/A                                               |
#### Returns
- **<String\>** String containing a random month
#### Usage
```js
console.log(pure.date.month());
```
```js
console.log(pure.date.month({ abbr: true }));
```

------------------------------------------------------------------------------


### weekday

#### Parameters
| Name            | Type       | Description                                       |
| --------------- | ---------- | ------------------------------------------------- |
| options         | <Object\>  | You can pass parameters as this object properties |
| options.abbr    | <Boolean\> | Abbreviated string. Default value is false        |
| options.context | <Boolean\> | N/A                                               |
#### Returns
- **<String\>** String containing a random weekday
#### Usage
```js
console.log(pure.date.weekday());
```
```js
console.log(pure.date.weekday({ abbr: true }));
```

------------------------------------------------------------------------------



### birthDay

#### Parameters
| Name           | Type      | Description                                       |
| -------------- | --------- | ------------------------------------------------- |
| options        | <Object\> | You can pass parameters as this object properties |
| options.minAge | <Number\> | Minimum age to generate date. Default value is 18 |
| options.maxAge | <Number\> | Minimum age to generate date. Default value is 60 |
#### Returns
- **<String\>** String containing a random date respecting age interval provided
#### Usage
```js
console.log(pure.date.birthDay());
```
```js
console.log(pure.date.birthDay({ minAge: 18, maxAge: 20  }));
```

------------------------------------------------------------------------------