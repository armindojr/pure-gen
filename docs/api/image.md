---
id: image
title: Pure Image Method
sidebar_label: Image
slug: pure/image
---

# image

With this method the default image provider is `placeimg` but you can also use `unsplash` as image provider. In next topics it will be explained how to do it.

## image

#### Description
Method that generate image url with random category
#### Parameters
| Name              | Type       | Description                                                                                                   |
| ----------------- | ---------- | ------------------------------------------------------------------------------------------------------------- |
| options           | <Object\>  | You can pass parameters as this object properties                                                             |
| options.width     | <Number\>  | Width of the generated image. Default value is 640                                                            |
| options.height    | <Number\>  | Height of the generated image. Default value is 480                                                           |
| options.keyword   | <String\>  | What keyword image has to have. This parameter is specific to unsplash provider. Default value is empty       |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.image.image());
    ```
    2. **result**
    ```js
    'https://placeimg.com/640/480/tech'
    ```

2. Describing that i want an image size of `200x250`
    1. **code**
    ```js
    console.log(pure.image.image({ width: '200', height: '250' }));
    ```
    2. **result**
    ```js
    'https://placeimg.com/200/250/arch'
    ```

3. Describing that i want an image size of `200x250` using `placeimg` as provider
    1. **code**
    ```js
    console.log(pure.image.placeimg.image({ width: '200', height: '250' }));
    ```
    2. **result**
    ```js
    'https://placeimg.com/200/250/arch'
    ```

4. Describing that i want an image size of `200x250` using `unsplash` as provider and keyword `tree`
    1. **code**
    ```js
    console.log(pure.image.unsplash.image({ width: '200', height: '250', keyword: 'tree' }));
    ```
    2. **result**
    ```js
    'https://source.unsplash.com/200x250?tree'
    ```

------------------------------------------------------------------------------

## avatar

#### Description
Method that generate random avatar. Same as [Avatar](./internet#avatar)
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
    console.log(pure.image.avatar());
    ```
    2. **result**
    ```js
    'https://i.pravatar.cc/200'
    ```

------------------------------------------------------------------------------

## animals

#### Description
Method that generate image url specific from `placeimg` with animals category
#### Parameters
| Name              | Type       | Description                                         |
| ----------------- | ---------- | --------------------------------------------------- |
| options           | <Object\>  | You can pass parameters as this object properties   |
| options.width     | <Number\>  | Width of the generated image. Default value is 640  |
| options.height    | <Number\>  | Height of the generated image. Default value is 480 |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.image.animals());
    ```
    2. **result**
    ```js
    'https://placeimg.com/640/480/animals'
    ```

2. Describing that i want an image size of `200x250`
    1. **code**
    ```js
    console.log(pure.image.animals({ width: '200', height: '250' }));
    ```
    2. **result**
    ```js
    'https://placeimg.com/200/250/animals'
    ```

3. Describing that i want an image size of `200x250` using `placeimg` as provider
    1. **code**
    ```js
    console.log(pure.image.placeimg.animals({ width: '200', height: '250' }));
    ```
    2. **result**
    ```js
    'https://placeimg.com/200/250/animals'
    ```

------------------------------------------------------------------------------

## food

#### Description
Method that generate image url specific from `unsplash` with food category
#### Parameters
| Name              | Type       | Description                                         |
| ----------------- | ---------- | --------------------------------------------------- |
| options           | <Object\>  | You can pass parameters as this object properties   |
| options.width     | <Number\>  | Width of the generated image. Default value is 640  |
| options.height    | <Number\>  | Height of the generated image. Default value is 480 |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.image.unsplash.food());
    ```
    2. **result**
    ```js
    'https://source.unsplash.com/640x480?food'
    ```

2. Describing that i want an image size of `200x250`
    1. **code**
    ```js
    console.log(pure.image.unsplash.food({ width: '200', height: '250' }));
    ```
    2. **result**
    ```js
    'https://source.unsplash.com/200x250?food'
    ```

------------------------------------------------------------------------------

## architecture

#### Description
Method that generate image url specific from `placeimg` with architecture category
#### Parameters
| Name              | Type       | Description                                         |
| ----------------- | ---------- | --------------------------------------------------- |
| options           | <Object\>  | You can pass parameters as this object properties   |
| options.width     | <Number\>  | Width of the generated image. Default value is 640  |
| options.height    | <Number\>  | Height of the generated image. Default value is 480 |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.image.architecture());
    ```
    2. **result**
    ```js
    'https://placeimg.com/640/480/arch'
    ```

2. Describing that i want an image size of `200x250`
    1. **code**
    ```js
    console.log(pure.image.architecture({ width: '200', height: '250' }));
    ```
    2. **result**
    ```js
    'https://placeimg.com/200/250/arch'
    ```

3. Describing that i want an image size of `200x250` using `placeimg` as provider
    1. **code**
    ```js
    console.log(pure.image.placeimg.architecture({ width: '200', height: '250' }));
    ```
    2. **result**
    ```js
    'https://placeimg.com/200/250/arch'
    ```

------------------------------------------------------------------------------

## people

#### Description
Method that generate image url for both providers with people category
#### Parameters
| Name              | Type       | Description                                                                                                   |
| ----------------- | ---------- | ------------------------------------------------------------------------------------------------------------- |
| options           | <Object\>  | You can pass parameters as this object properties                                                             |
| options.width     | <Number\>  | Width of the generated image. Default value is 640                                                            |
| options.height    | <Number\>  | Height of the generated image. Default value is 480                                                           |
| options.keyword   | <String\>  | What keyword image has to have. This parameter is specific to unsplash provider. Default value is empty       |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.image.people());
    ```
    2. **result**
    ```js
    'https://placeimg.com/640/480/people'
    ```

2. Describing that i want an image size of `200x250`
    1. **code**
    ```js
    console.log(pure.image.people({ width: '200', height: '250' }));
    ```
    2. **result**
    ```js
    'https://placeimg.com/200/250/people'
    ```

3. Describing that i want an image size of `200x250` using `placeimg` as provider
    1. **code**
    ```js
    console.log(pure.image.placeimg.people({ width: '200', height: '250' }));
    ```
    2. **result**
    ```js
    'https://placeimg.com/200/250/people'
    ```

4. Describing that i want an image size of `200x250` using `unsplash` as provider
    1. **code**
    ```js
    console.log(pure.image.unsplash.people({ width: '200', height: '250' }));
    ```
    2. **result**
    ```js
    'https://source.unsplash.com/200x250?people'
    ```

------------------------------------------------------------------------------

## nature

#### Description
Method that generate image url for both providers with nature category
#### Parameters
| Name              | Type       | Description                                                                                                   |
| ----------------- | ---------- | ------------------------------------------------------------------------------------------------------------- |
| options           | <Object\>  | You can pass parameters as this object properties                                                             |
| options.width     | <Number\>  | Width of the generated image. Default value is 640                                                            |
| options.height    | <Number\>  | Height of the generated image. Default value is 480                                                           |
| options.keyword   | <String\>  | What keyword image has to have. This parameter is specific to unsplash provider. Default value is empty       |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.image.nature());
    ```
    2. **result**
    ```js
    'https://placeimg.com/640/480/nature'
    ```

2. Describing that i want an image size of `200x250`
    1. **code**
    ```js
    console.log(pure.image.nature({ width: '200', height: '250' }));
    ```
    2. **result**
    ```js
    'https://placeimg.com/200/250/nature'
    ```

3. Describing that i want an image size of `200x250` using `placeimg` as provider
    1. **code**
    ```js
    console.log(pure.image.placeimg.nature({ width: '200', height: '250' }));
    ```
    2. **result**
    ```js
    'https://placeimg.com/200/250/nature'
    ```

4. Describing that i want an image size of `200x250` using `unsplash` as provider
    1. **code**
    ```js
    console.log(pure.image.unsplash.nature({ width: '200', height: '250' }));
    ```
    2. **result**
    ```js
    'https://source.unsplash.com/200x250?nature'
    ```

------------------------------------------------------------------------------

## tech

#### Description
Method that generate image url specific from `placeimg` with tech category
#### Parameters
| Name              | Type       | Description                                         |
| ----------------- | ---------- | --------------------------------------------------- |
| options           | <Object\>  | You can pass parameters as this object properties   |
| options.width     | <Number\>  | Width of the generated image. Default value is 640  |
| options.height    | <Number\>  | Height of the generated image. Default value is 480 |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.image.tech());
    ```
    2. **result**
    ```js
    'https://placeimg.com/640/480/tech'
    ```

2. Describing that i want an image size of `200x250`
    1. **code**
    ```js
    console.log(pure.image.tech({ width: '200', height: '250' }));
    ```
    2. **result**
    ```js
    'https://placeimg.com/200/250/tech'
    ```

3. Describing that i want an image size of `200x250` using `placeimg` as provider
    1. **code**
    ```js
    console.log(pure.image.placeimg.tech({ width: '200', height: '250' }));
    ```
    2. **result**
    ```js
    'https://placeimg.com/200/250/tech'
    ```

------------------------------------------------------------------------------

## technology

#### Description
Method that generate image url specific from `unsplash` with technology category
#### Parameters
| Name              | Type       | Description                                         |
| ----------------- | ---------- | --------------------------------------------------- |
| options           | <Object\>  | You can pass parameters as this object properties   |
| options.width     | <Number\>  | Width of the generated image. Default value is 640  |
| options.height    | <Number\>  | Height of the generated image. Default value is 480 |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.image.unsplash.technology());
    ```
    2. **result**
    ```js
    'https://source.unsplash.com/640x480?technology'
    ```

2. Describing that i want an image size of `200x250`
    1. **code**
    ```js
    console.log(pure.image.unsplash.technology({ width: '200', height: '250' }));
    ```
    2. **result**
    ```js
    'https://source.unsplash.com/200x250?technology'
    ```

------------------------------------------------------------------------------

## objects

#### Description
Method that generate image url specific from `unsplash` with objects category
#### Parameters
| Name              | Type       | Description                                         |
| ----------------- | ---------- | --------------------------------------------------- |
| options           | <Object\>  | You can pass parameters as this object properties   |
| options.width     | <Number\>  | Width of the generated image. Default value is 640  |
| options.height    | <Number\>  | Height of the generated image. Default value is 480 |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.image.unsplash.objects());
    ```
    2. **result**
    ```js
    'https://source.unsplash.com/640x480?objects'
    ```

2. Describing that i want an image size of `200x250`
    1. **code**
    ```js
    console.log(pure.image.unsplash.objects({ width: '200', height: '250' }));
    ```
    2. **result**
    ```js
    'https://source.unsplash.com/200x250?objects'
    ```

------------------------------------------------------------------------------

## buildings

#### Description
Method that generate image url specific from `unsplash` with buildings category
#### Parameters
| Name              | Type       | Description                                         |
| ----------------- | ---------- | --------------------------------------------------- |
| options           | <Object\>  | You can pass parameters as this object properties   |
| options.width     | <Number\>  | Width of the generated image. Default value is 640  |
| options.height    | <Number\>  | Height of the generated image. Default value is 480 |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.image.unsplash.buildings());
    ```
    2. **result**
    ```js
    'https://source.unsplash.com/640x480?buildings'
    ```

2. Describing that i want an image size of `200x250`
    1. **code**
    ```js
    console.log(pure.image.unsplash.buildings({ width: '200', height: '250' }));
    ```
    2. **result**
    ```js
    'https://source.unsplash.com/200x250?buildings'
    ```

------------------------------------------------------------------------------

## dataUri

#### Description
Method that generate random data URI
#### Parameters
| Name              | Type       | Description                                              |
| ----------------- | ---------- | -------------------------------------------------------- |
| options           | <Object\>  | You can pass parameters as this object properties        |
| options.width     | <Number\>  | Width of the generated URI. Default value is 640         |
| options.height    | <Number\>  | Height of the generated URI. Default value is 480        |
| options.color     | <Number\>  | Color name of the generated URI. Default value is random |
#### Returns
- **<String\>**
#### Usage
1. Without passing parameters
    1. **code**
    ```js
    console.log(pure.image.dataUri());
    ```
    2. **result**
    ```js
    'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22640%22%20height%3D%22480%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22pink%22%2F%3E%3Ctext%20x%3D%22320%22%20y%3D%22240%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3E640x480%3C%2Ftext%3E%3C%2Fsvg%3E'
    ```

2. Describing that i want an image size of `200x250`
    1. **code**
    ```js
    console.log(pure.image.dataUri({ width: '200', height: '250', color: 'green' }));
    ```
    2. **result**
    ```js
    'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22200%22%20height%3D%22250%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22green%22%2F%3E%3Ctext%20x%3D%22100%22%20y%3D%22125%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3E200x250%3C%2Ftext%3E%3C%2Fsvg%3E'
    ```

------------------------------------------------------------------------------