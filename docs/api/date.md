---
id: date
title: Pure Date Method
sidebar_label: Date
slug: pure/date
---

# date

Date pattern considered can be: 
- `12-31-2021`
- `2021-12-31`
- `December 31, 2021`
- `Dec 31, 2021`
- `2021-12-31T00:00:00.000Z`
- `31 Dec 2021 00:00:00 GMT-0`

## past

#### Description
Method that generates random past date from a reference.
#### Parameters
| Name            | Type      | Description                                                       |
| --------------- | --------- | ----------------------------------------------------------------- |
| options         | <Object\> | You can pass parameters as this object properties                 |
| options.years   | <Number\> | How many years the date can possible be before refDate. Default value is 1 |
| options.refDate | <Date\>   | Reference to generate a past date. Default value is Today date    |
#### Returns
- **<Object\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.date.past());
    ```
    2. **result**
    ```js
    2021-02-21T17:41:43.055Z
    ```

2. Describing that i want a date 5 years before our reference date that is `01-01-1995`
    1. **code**
    ```js
    console.log(pure.date.past({ years: 5, refDate: '01-01-1995' }));
    ```
    2. **result**
    ```js
    1991-09-23T15:48:58.583Z
    ```

------------------------------------------------------------------------------

## future

#### Description
Method that generates random future date from a reference.
#### Parameters
| Name            | Type      | Description                                                       |
| --------------- | --------- | ----------------------------------------------------------------- |
| options         | <Object\> | You can pass parameters as this object properties                 |
| options.years   | <Number\> | How many years the date can possible be after refDate. Default value is 1 |
| options.refDate | <Date\>   | Reference to generate a future date. Default value is Today date  |
#### Returns
- **<Object\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.date.future());
    ```
    2. **result**
    ```js
    2022-07-10T21:34:34.425Z
    ```

2. Describing that i want a date 5 years after our reference date that is `01-01-1995`
    1. **code**
    ```js
    console.log(pure.date.future({ years: 5, refDate: '01-01-1995' }));
    ```
    2. **result**
    ```js
    1997-04-27T18:34:16.365Z
    ```

------------------------------------------------------------------------------

## between

#### Description
Method that generates random date between two reference dates.
#### Parameters
| Name         | Type      | Description                                                         |
| ------------ | --------- | ------------------------------------------------------------------- |
| options      | <Object\> | You can pass parameters as this object properties                   |
| options.from | <Date\>   | First reference date. Default value is 5 years back from Today date |
| options.to   | <Date\>   | Second reference date. Default value is Today date                  |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.date.between());
    ```
    2. **result**
    ```js
    '2020-12-14T22:19:50.678Z'
    ```

2. Describing that i want a date 5 years after our reference date that is `01-01-1995`
    1. **code**
    ```js
    console.log(pure.date.between({ from: '01-01-1995', to: '03-01-1995' }));
    ```
    2. **result**
    ```js
    '1995-02-28T08:12:07.614Z'
    ```

------------------------------------------------------------------------------

## arrayBetween

#### Description
Method that generates multiple random dates between two reference dates.
#### Parameters
| Name         | Type      | Description                                                         |
| ------------ | --------- | ------------------------------------------------------------------- |
| options      | <Object\> | You can pass parameters as this object properties                   |
| options.from | <Date\>   | First reference date. Default value is 5 years back from Today date |
| options.to   | <Date\>   | Second reference date. Default value is Today date                  |
| options.num  | <Number\> | Number of samples to return in array. Default value is 3            |
#### Returns
- **<Array\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.date.arrayBetween());
    ```
    2. **result**
    ```js
    [
        '2021-03-28T10:05:53.092Z',
        '2021-05-20T08:44:46.593Z',
        '2021-05-23T15:34:39.194Z'
    ]
    ```

2. Describing that i want 10 generated date and time between `01-01-1995` and `03-01-1995`
    1. **code**
    ```js
    console.log(pure.date.arrayBetween({ from: '01-01-1995', to: '03-01-1995', num: 10 }));
    ```
    2. **result**
    ```js
    [
        '1995-01-03T13:09:42.960Z',
        '1995-01-05T06:29:11.668Z',
        '1995-01-15T05:23:02.411Z',
        '1995-01-15T12:06:21.678Z',
        '1995-01-18T07:12:06.945Z',
        '1995-01-25T21:19:31.473Z',
        '1995-02-09T17:34:18.641Z',
        '1995-02-12T07:52:26.974Z',
        '1995-02-17T19:48:59.835Z',
        '1995-02-28T12:46:01.776Z'
    ]
    ```

------------------------------------------------------------------------------

## recent

#### Description
Method that generates random recent date. The main difference between this and [Past](#past) is that with **recent** you can get a date just days away from the reference date where in **past** you can get a date years away from the reference date.
#### Parameters
| Name            | Type      | Description                                           |
| --------------- | --------- | ----------------------------------------------------- |
| options         | <Object\> | You can pass parameters as this object properties     |
| options.days    | <Number\> | Reference to generate recent date. Default value is 1 |
| options.refDate | <Date\>   | Reference date. Default value is Today date           |
#### Returns
- **<Object\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.date.recent());
    ```
    2. **result**
    ```js
    2021-10-02T10:01:28.051Z
    ```

2. Describing that i want a date 5 days before our reference date that is `01-01-1995`
    1. **code**
    ```js
    console.log(pure.date.recent({ days: 5, refDate: '01-01-1995' }));
    ```
    2. **result**
    ```js
    1994-12-29T13:21:38.814Z
    ```

------------------------------------------------------------------------------

## soon

#### Description
Method that generates random soon date. The main difference between this and [Future](#future) is that with **soon** you can get a date just days away from the reference date where in **future** you can get a date years away from the reference date.
#### Parameters
| Name            | Type      | Description                                           |
| --------------- | --------- | ----------------------------------------------------- |
| options         | <Object\> | You can pass parameters as this object properties     |
| options.days    | <Number\> | Reference to generate soon date. Default value is 1   |
| options.refDate | <Date\>   | Reference date. Default value is Today date           |
#### Returns
- **<Object\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.date.soon());
    ```
    2. **result**
    ```js
    2021-10-03T01:26:23.052Z
    ```

2. Describing that i want a date 5 days after our reference date that is `01-01-1995`
    1. **code**
    ```js
    console.log(pure.date.soon({ days: 5, refDate: '01-01-1995' }));
    ```
    2. **result**
    ```js
    1995-01-05T15:04:10.449Z
    ```

------------------------------------------------------------------------------

## month

#### Description
Method that generates random month name.
#### Parameters
| Name            | Type       | Description                                       |
| --------------- | ---------- | ------------------------------------------------- |
| options         | <Object\>  | You can pass parameters as this object properties |
| options.abbr    | <Boolean\> | Abbreviated string. Default value is false        |
| options.context | <Boolean\> | N/A                                               |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.date.month());
    ```
    2. **result**
    ```js
    'July'
    ```

2. Describing that i want the month name to be abbreviated
    1. **code**
    ```js
    console.log(pure.date.month({ abbr: true }));
    ```
    2. **result**
    ```js
    'Sep'
    ```

------------------------------------------------------------------------------


## weekday

#### Description
Method that generates random weekday name.
#### Parameters
| Name            | Type       | Description                                       |
| --------------- | ---------- | ------------------------------------------------- |
| options         | <Object\>  | You can pass parameters as this object properties |
| options.abbr    | <Boolean\> | Abbreviated string. Default value is false        |
| options.context | <Boolean\> | N/A                                               |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.date.weekday());
    ```
    2. **result**
    ```js
    'Wednesday'
    ```

2. Describing that i want the week day name to be abbreviated
    1. **code**
    ```js
    console.log(pure.date.weekday({ abbr: true }));
    ```
    2. **result**
    ```js
    'Mon'
    ```

------------------------------------------------------------------------------



## birthDay

#### Description
Method that generates random date respecting the age that you want it to be.
#### Parameters
| Name           | Type      | Description                                       |
| -------------- | --------- | ------------------------------------------------- |
| options        | <Object\> | You can pass parameters as this object properties |
| options.minAge | <Number\> | Minimum age to generate date. Default value is 18 |
| options.maxAge | <Number\> | Minimum age to generate date. Default value is 60 |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.date.birthDay());
    ```
    2. **result**
    ```js
    '2001-03-20T15:10:29.231Z'
    ```

2. Describing that i want the generated date has to be between 18 or 20 years past the actual year.
    1. **code**
    ```js
    console.log(pure.date.birthDay({ minAge: 18, maxAge: 20  }));
    ```
    2. **result**
    ```js
    '2001-11-13T06:33:27.047Z'
    ```

------------------------------------------------------------------------------