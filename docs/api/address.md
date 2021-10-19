---
id: address
title: Pure Address Method
sidebar_label: Address
slug: pure/address
---

# address

## zipCode

#### Description
Method that generate random zipcode from format. If format is not specified, the locale's zip format is used.
#### Parameters
| Name   | Type      | Description                                                              |
| ------ | --------- | ------------------------------------------------------------------------ |
| format | <String\> | What format to use when generate zipCode. Default value is locale format |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.address.zipCode());
    ```
    2. **result**
    ```js
    '93001'
    ```

2. Describing that i want an zip code using `###-##.###` as template
    1. **code**
    ```js
    console.log(pure.address.zipCode('###-##.###'));
    ```
    2. **result**
    ```js
    '868-80.346'
    ```

------------------------------------------------------------------------------

## zipCodeByState

#### Description
Method that generates random zipcode from state abbreviation. If state abbreviation is not specified, a random zip code is generated according to the locale's zip format. Only works for locales with postcode_by_state definition. If a locale does not have a postcode_by_state definition, a random zip code is generated according to the locale's zip format.
#### Parameters
| Name  | Type      | Description                                                         |
| ----- | --------- | ------------------------------------------------------------------- |
| state | <String\> | State used to format zipCode. Default is random zipCode from locale |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.address.zipCodeByState());
    ```
    2. **result**
    ```js
    '70563'
    ```

2. Describing that i want an zip code from California, USA
    1. **code**
    ```js
    pure.setLocale('en_US');
    console.log(pure.address.zipCodeByState('CA'));
    ```
    2. **result**
    ```js
    '91357'
    ```

------------------------------------------------------------------------------

## city

#### Description
Method that generate a random localized city name. The format string can contain any method provided by pure wrapped in `{{}}`, e.g. `{{name.firstName}}` in order to build the city name. If no format string is provided one of the following is randomly used:
* `{{address.cityPrefix}} {{name.firstName}}{{address.citySuffix}}`
* `{{address.cityPrefix}} {{name.firstName}}`
* `{{name.firstName}}{{address.citySuffix}}`
* `{{name.lastName}}{{address.citySuffix}}`
#### Parameters
| Name   | Type      | Description                                                                                                 |
| ------ | --------- | ----------------------------------------------------------------------------------------------------------- |
| format | <Number\> | You can define what format to use. Index to use when retrieving format from locale. Default value is random |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.address.city());
    ```
    2. **result**
    ```js
    'Ivoryville'
    ```

2. Describing that i want an city respecting the second item from the list
    1. **code**
    ```js
    console.log(pure.address.city(1));
    ```
    2. **result**
    ```js
    'Port Bonita'
    ```

------------------------------------------------------------------------------

## cityPrefix

#### Description
Method that generate random localized city prefix
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
    console.log(pure.address.cityPrefix());
    ```
    2. **result**
    ```js
    'Port'
    ```

------------------------------------------------------------------------------

## citySuffix

#### Description
Method that generate random localized city suffix
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
    console.log(pure.address.citySuffix());
    ```
    2. **result**
    ```js
    'chester'
    ```

------------------------------------------------------------------------------

## cityName

#### Description
Method that generate random localized city name
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
    pure.setLocale('pt_PT');
    console.log(pure.address.cityName());
    ```
    2. **result**
    ```js
    'Leiria'
    ```

------------------------------------------------------------------------------

## streetName

#### Description
Method that generate random street name
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
    console.log(pure.address.streetName());
    ```
    2. **result**
    ```js
    'Botsford Mills'
    ```

------------------------------------------------------------------------------

## streetAddress

#### Description
Method that generate random localized street address
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
    console.log(pure.address.streetAddress());
    ```
    2. **result**
    ```js
    '45282 Metz Streets'
    ```

------------------------------------------------------------------------------

## streetSuffix

#### Description
Method that generate random localized street suffix
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
    console.log(pure.address.streetSuffix());
    ```
    2. **result**
    ```js
    'Overpass'
    ```

------------------------------------------------------------------------------

## streetPrefix

#### Description
Method that generate random localized street prefix
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
    pure.setLocale('pt_PT');
    console.log(pure.address.streetPrefix());
    ```
    2. **result**
    ```js
    'Acesso'
    ```

------------------------------------------------------------------------------

## secondaryAddress

#### Description
Method that generate random secondary address
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
    console.log(pure.address.secondaryAddress());
    ```
    2. **result**
    ```js
    'Apt. 110'
    ```

------------------------------------------------------------------------------

## county

#### Description
Method that generate random localized county
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
    console.log(pure.address.county());
    ```
    2. **result**
    ```js
    'Bedfordshire'
    ```

------------------------------------------------------------------------------

## country

#### Description
Method that generate random localized country
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
    console.log(pure.address.country());
    ```
    2. **result**
    ```js
    'Philippines'
    ```

------------------------------------------------------------------------------

## defaultCountry

#### Description
Method that generate random localized default country
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
    console.log(pure.address.defaultCountry());
    ```
    2. **result**
    ```js
    'United States of America'
    ```

------------------------------------------------------------------------------

## countryCode

#### Description
Method that generate random localized country code
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
    console.log(pure.address.countryCode());
    ```
    2. **result**
    ```js
    'GN'
    ```

------------------------------------------------------------------------------

## state

#### Description
Method that generate random localized state
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
    console.log(pure.address.state());
    ```
    2. **result**
    ```js
    'South Dakota'
    ```

------------------------------------------------------------------------------

## stateAbbr

#### Description
Method that generate random localized state abbreviation
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
    console.log(pure.address.stateAbbr());
    ```
    2. **result**
    ```js
    'SD'
    ```

------------------------------------------------------------------------------

## latitude

#### Description
Method that generate random latitude respecting parameters
#### Parameters
| Name              | Type      | Description                                                                                                |
| ----------------- | --------- | ---------------------------------------------------------------------------------------------------------- |
| options           | <Object\> | You can pass parameters as this object properties                                                          |
| options.min       | <Number\> | Min number to be generated. Default value is -90                                                           |
| options.max       | <Number\> | Max number to be generated. Default value is 90                                                            |
| options.precision | <Number\> | Floating point precision to be used, if value is 0 then no floating point is generated. Default value is 4 |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.address.latitude());
    ```
    2. **result**
    ```js
    '16.3386'
    ```

2. Describing that i want an latitude between `-8` and `10` with `4` floating point precision
    1. **code**
    ```js
    console.log(pure.address.latitude({ min: -8, max: 10, precision: 4 }));
    ```
    2. **result**
    ```js
    '9.2941'
    ```

------------------------------------------------------------------------------

## longitude

#### Description
Method that generate random longitude respecting parameters
#### Parameters
| Name              | Type      | Description                                                                                                |
| ----------------- | --------- | ---------------------------------------------------------------------------------------------------------- |
| options           | <Object\> | You can pass parameters as this object properties                                                          |
| options.min       | <Number\> | Min number to be generated. Default value is -180                                                          |
| options.max       | <Number\> | Max number to be generated. Default value is 180                                                           |
| options.precision | <Number\> | Floating point precision to be used, if value is 0 then no floating point is generated. Default value is 4 |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.address.longitude());
    ```
    2. **result**
    ```js
    '154.4644'
    ```

2. Describing that i want an longitude between `-100` and `90` with `4` floating point precision
    1. **code**
    ```js
    console.log(pure.address.longitude({ min: -100, max: 90, precision: 4 }));
    ```
    2. **result**
    ```js
    '-59.8514'
    ```

------------------------------------------------------------------------------

## direction

#### Description
Method that generate random direction
#### Parameters
| Name    | Type       | Description                                                               |
| ------- | ---------- | ------------------------------------------------------------------------- |
| useAbbr | <Boolean\> | Use or not abbreviation when generating direction. Default value is false |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.address.direction());
    ```
    2. **result**
    ```js
    'Southeast'
    ```

2. Describing that i want an direction abbreviated
    1. **code**
    ```js
    console.log(pure.address.direction(true));
    ```
    2. **result**
    ```js
    'NW'
    ```

------------------------------------------------------------------------------

## cardinalDirection

#### Description
Method that generate random cardinal direction
#### Parameters
| Name    | Type       | Description                                                               |
| ------- | ---------- | ------------------------------------------------------------------------- |
| useAbbr | <Boolean\> | Use or not abbreviation when generating direction. Default value is false |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.address.cardinalDirection());
    ```
    2. **result**
    ```js
    'East'
    ```

2. Describing that i want an cardinal direction abbreviated
    1. **code**
    ```js
    console.log(pure.address.cardinalDirection(true));
    ```
    2. **result**
    ```js
    'N'
    ```

------------------------------------------------------------------------------

## ordinalDirection

#### Description
Method that generate random ordinal direction
#### Parameters
| Name    | Type       | Description                                                               |
| ------- | ---------- | ------------------------------------------------------------------------- |
| useAbbr | <Boolean\> | Use or not abbreviation when generating direction. Default value is false |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.address.ordinalDirection());
    ```
    2. **result**
    ```js
    'Northwest'
    ```

2. Describing that i want an ordinal direction abbreviated
    1. **code**
    ```js
    console.log(pure.address.ordinalDirection(true));
    ```
    2. **result**
    ```js
    'SE'
    ```

------------------------------------------------------------------------------

## nearbyGPSCoordinate

#### Description
Method that generate random nearby GPS coordinate respecting parameters
#### Parameters
| Name               | Type       | Description                                                                             |
| ------------------ | ---------- | --------------------------------------------------------------------------------------- |
| options            | <Object\>  | You can pass parameters as this object properties                                       |
| options.coordinate | <Array\>   | Array with latitude and longitude used as base. Default value is random                 |
| options.radius     | <Number\>  | Max distance in KM between base coordinate that can be generated. Default value is 10.0 |
| options.isMetric   | <Boolean\> | Declare if radius passed is metric or imperial. Default value is false                  |
#### Returns
- **<Array\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.address.nearbyGPSCoordinate());
    ```
    2. **result**
    ```js
    [ '12.2727', '-22.5733' ]
    ```

2. Describing that i want an nearby coordinate using `-23.561414` as latitude and `-46.6558819` as longitude with `4` as distance
    1. **code**
    ```js
    console.log(pure.address.nearbyGPSCoordinate({ coordinate: [ '-23.561414', '-46.6558819' ], radius: 4, isMetric: true }));
    ```
    2. **result**
    ```js
    [ '-23.5969', '-46.6619' ]
    ```

------------------------------------------------------------------------------

## timeZone

#### Description
Method that generate random time zone
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
    console.log(pure.address.timeZone());
    ```
    2. **result**
    ```js
    'Pacific/Auckland'
    ```

------------------------------------------------------------------------------