---
id: internet
title: Pure Internet Method
sidebar_label: Internet
slug: pure/internet
---

# internet

## avatar

#### Description
Method that generate a random avatar url. This method uses [Pravatar](https://pravatar.cc/)
#### Parameters
| Name  | Type      | Description                                                  |
| ----- | --------- | ------------------------------------------------------------ |
| width | <Number\> | What width of avatar will be generated. Default value is 200 |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.internet.avatar());
    ```
    2. **result**
    ```js
    'https://i.pravatar.cc/200'
    ```

2. Describing that i want an avatar with width as 400
    1. **code**
    ```js
    console.log(pure.internet.avatar(400));
    ```
    2. **result**
    ```js
    'https://i.pravatar.cc/400'
    ```

------------------------------------------------------------------------------

## email

#### Description
Method that generate random email
#### Parameters
| Name              | Type      | Description                                                          |
| ----------------- | --------- | -------------------------------------------------------------------- |
| options           | <Object\> | You can pass parameters as this object properties                    |
| options.firstName | <String\> | First name to be used when generating email. Default value is random |
| options.lastName  | <String\> | Last name to be used when generating email. Default value is random  |
| options.provider  | <String\> | Provider of email. Default value is random from locale               |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.internet.email());
    ```
    2. **result**
    ```js
    'carla.meintjies87@hotmail.com'
    ```

2. Describing that i want an email using `daniel` as first name and `swart` as last name with provider `mailfake.test`
    1. **code**
    ```js
    console.log(pure.internet.email({ firstName: 'daniel', lastName: 'swart', provider: 'mailfake.test' }));
    ```
    2. **result**
    ```js
    'daniel_swart12@mailfake.test'
    ```

------------------------------------------------------------------------------

## exampleEmail

#### Description
Method that generate random example email from locale
#### Parameters
| Name              | Type      | Description                                                          |
| ----------------- | --------- | -------------------------------------------------------------------- |
| options           | <Object\> | You can pass parameters as this object properties                    |
| options.firstName | <String\> | First name to be used when generating email. Default value is random |
| options.lastName  | <String\> | Last name to be used when generating email. Default value is random  |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.internet.exampleEmail());
    ```
    2. **result**
    ```js
    'vernon_uys21@example.net'
    ```

2. Describing that i want an email using `daniel` as first name and `swart` as last name
    1. **code**
    ```js
    console.log(pure.internet.exampleEmail({ firstName: 'daniel', lastName: 'swart' }));
    ```
    2. **result**
    ```js
    'daniel51@example.org'
    ```

------------------------------------------------------------------------------

## userName

#### Description
Method that generate random username
#### Parameters
| Name              | Type      | Description                                                             |
| ----------------- | --------- | ----------------------------------------------------------------------- |
| options           | <Object\> | You can pass parameters as this object properties                       |
| options.firstName | <String\> | First name to be used when generating username. Default value is random |
| options.lastName  | <String\> | Last name to be used when generating username. Default value is random  |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.internet.userName());
    ```
    2. **result**
    ```js
    'Alicia_Veldsman76'
    ```

2. Describing that i want an username using `daniel` as first name and `swart` as last name
    1. **code**
    ```js
    console.log(pure.internet.userName({ firstName: 'daniel', lastName: 'swart' }));
    ```
    2. **result**
    ```js
    'daniel.swart46'
    ```

------------------------------------------------------------------------------

## protocol

#### Description
Method that generate random web protocol
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
    console.log(pure.internet.protocol());
    ```
    2. **result**
    ```js
    'https'
    ```

------------------------------------------------------------------------------

## url

#### Description
Method that generate random url
#### Parameters
| Name               | Type      | Description                                                              |
| ------------------ | --------- | ------------------------------------------------------------------------ |
| options            | <Object\> | You can pass parameters as this object properties                        |
| options.protocol   | <String\> | Protocol to be used when generating username. Default value is random    |
| options.domainName | <String\> | Domain name to be used when generating username. Default value is random |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.internet.url());
    ```
    2. **result**
    ```js
    'http://pauline.net.za'
    ```

2. Describing that i want an url using `MQTT` as protocol and domain name randomized
    1. **code**
    ```js
    console.log(pure.internet.url({ protocol: 'MQTT' }));
    ```
    2. **result**
    ```js
    'MQTT://charl.info'
    ```

------------------------------------------------------------------------------

## domainName

#### Description
Method that generate random domain name
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
    console.log(pure.internet.domainName());
    ```
    2. **result**
    ```js
    'craig.com'
    ```

------------------------------------------------------------------------------

## domainSuffix

#### Description
Method that generate random domain suffix
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
    console.log(pure.internet.domainSuffix());
    ```
    2. **result**
    ```js
    'org.za'
    ```

------------------------------------------------------------------------------

## domainWord

#### Description
Method that generate random domain suffix
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
    console.log(pure.internet.domainWord());
    ```
    2. **result**
    ```js
    'russell'
    ```

------------------------------------------------------------------------------

## ip

#### Description
Method that generate random ip address
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
    console.log(pure.internet.ip());
    ```
    2. **result**
    ```js
    '119.131.2.130'
    ```

------------------------------------------------------------------------------

## ipv6

#### Description
Method that generate random IPV6 address
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
    console.log(pure.internet.ipv6());
    ```
    2. **result**
    ```js
    '92bb:6241:c656:8d5a:b5a8:0807:7bd0:6ca0'
    ```

------------------------------------------------------------------------------

## userAgent

#### Description
Method that generate random user agent
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
    console.log(pure.internet.userAgent());
    ```
    2. **result**
    ```js
    'Mozilla/5.0 (Windows; U; Windows NT 5.1) AppleWebKit/535.2.2 (KHTML, like Gecko) Chrome/39.0.820.0 Safari/535.2.2'
    ```

------------------------------------------------------------------------------

## color

#### Description
Method that generate random hex color
#### Parameters
| Name                 | Type      | Description                                                   |
| -------------------- | --------- | ------------------------------------------------------------- |
| options              | <Object\> | You can pass parameters as this object properties             |
| options.baseRed255   | <Number\> | The red value. Valid values are 0 - 255. Default value is 0   |
| options.baseGreen255 | <Number\> | The green value. Valid values are 0 - 255. Default value is 0 |
| options.baseBlue255  | <Number\> | The blue value. Valid values are 0 - 255. Default value is 0  |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.internet.color());
    ```
    2. **result**
    ```js
    '#68055f'
    ```

2. Describing that i want an color using `200, 50, 0` as base value.
    1. **code**
    ```js
    console.log(pure.internet.color({ baseRed255: 200, baseGreen255: 50, baseBlue255: 0 }));
    ```
    2. **result**
    ```js
    '#896165'
    ```

------------------------------------------------------------------------------

## mac

#### Description
Method that generate a random mac address
#### Parameters
| Name | Type      | Description                                           |
| ---- | --------- | ----------------------------------------------------- |
| sep  | <String\> | Separator to use in mac address. Default value is ':' |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.internet.mac());
    ```
    2. **result**
    ```js
    '50:28:36:f9:b9:7c'
    ```

2. Describing that i want an mac address with separator as `-`
    1. **code**
    ```js
    console.log(pure.internet.mac('-'));
    ```
    2. **result**
    ```js
    '3d-88-57-59-a7-13'
    ```

------------------------------------------------------------------------------

## password

#### Description
Method that generate random password. **Attention**: the generated password isn`t secure, this is only for test purpose.
#### Parameters
| Name              | Type       | Description                                                            |
| ----------------- | ---------- | ---------------------------------------------------------------------- |
| options           | <Object\>  | You can pass parameters as this object properties                      |
| options.len       | <Number\>  | The number of characters in the password. Default value is 15          |
| options.memorable | <Boolean\> | Whether a password should be easy to remember. Default value is false  |
| options.pattern   | <String\>  | A regex to match each character of the password against. If memorable is true, then this will be ignored. If pattern has limit inside regex, it will be ignored. Default value is '/\w/' |
| options.prefix    | <String\>  | A value to prepend to the generated password. Default value is empty   |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.internet.password());
    ```
    2. **result**
    ```js
    'yVOWUMErBZjHZfU'
    ```

2. Describing that i want an password with `10` chars, it has to be memorable and with `TEST` as prefix
    1. **code**
    ```js
    console.log(pure.internet.password({ len: 10, memorable: true, prefix: 'TEST' }));
    ```
    2. **result**
    ```js
    'TESTexeduz'
    ```

------------------------------------------------------------------------------