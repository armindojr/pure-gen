/**
 *
 * @namespace unsplash
 * @memberof pure.image
 */
class Unsplash {
    constructor(pure) {
        this.pure = pure;
        this.width = 640;
        this.height = 480;
    }

    /**
     * image
     *
     * @description Method to return image url from unsplash
     * @param {Number} [width= 640] Width of image
     * @param {Number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.unsplash.image
     * @example
     * console.log(pure.image.unsplash.image());
     * //outputs: "https://source.unsplash.com/640x480"
     */
    image(width, height, keyword) {
        return this.imageUrl(width, height, keyword);
    }

    /**
     * avatar
     *
     * @description Method to return random avatar image url
     * @method pure.image.unsplash.avatar
     * @example
     * console.log(pure.image.unsplash.avatar());
     * //outputs: "https://s3.amazonaws.com/uifaces/faces/twitter/.."
     */
    avatar() {
        return this.pure.internet.avatar();
    }

    /**
     * imageUrl
     *
     * @description Method to return url from imageprovider with given parameters
     * @param {Number} [width= 640] Width of image
     * @param {Number} [height= 480] Height of image
     * @param {string} [keyword= empty] Category of image
     * @method pure.image.unsplash.imageUrl
     * @example
     * console.log(pure.image.unsplash.imageUrl());
     * //outputs: "https://source.unsplash.com/640x480"
     */
    imageUrl(width, height, keyword) {
        const nwidth = width || this.width;
        const nheight = height || this.height;

        let url = 'https://source.unsplash.com';

        url += `/${nwidth}x${nheight}`;

        if (typeof keyword !== 'undefined') {
            const keywordFormat = new RegExp('^([A-Za-z0-9].+,[A-Za-z0-9]+)$|^([A-Za-z0-9]+)$');
            if (keywordFormat.test(keyword)) {
                url += `?${keyword}`;
            }
        }

        return url;
    }

    /**
     * food
     *
     * @description Method to return url from imageprovider with keyword
     * @param {Number} [width= 640] Width of image
     * @param {Number} [height= 480] Height of image
     * @method pure.image.unsplash.food
     * @example
     * console.log(pure.image.unsplash.food());
     * //outputs: "https://source.unsplash.com/640x480?food"
     */
    food(width, height) {
        return this.imageUrl(width, height, 'food');
    }

    /**
     * people
     *
     * @description Method to return url from imageprovider with keyword
     * @param {Number} [width= 640] Width of image
     * @param {Number} [height= 480] Height of image
     * @method pure.image.unsplash.people
     * @example
     * console.log(pure.image.unsplash.people());
     * //outputs: "https://source.unsplash.com/640x480?people"
     */
    people(width, height) {
        return this.imageUrl(width, height, 'people');
    }

    /**
     * nature
     *
     * @description Method to return url from imageprovider with keyword
     * @param {Number} [width= 640] Width of image
     * @param {Number} [height= 480] Height of image
     * @method pure.image.unsplash.nature
     * @example
     * console.log(pure.image.unsplash.nature());
     * //outputs: "https://source.unsplash.com/640x480?nature"
     */
    nature(width, height) {
        return this.imageUrl(width, height, 'nature');
    }

    /**
     * technology
     *
     * @description Method to return url from imageprovider with keyword
     * @param {Number} [width= 640] Width of image
     * @param {Number} [height= 480] Height of image
     * @method pure.image.unsplash.technology
     * @example
     * console.log(pure.image.unsplash.technology());
     * //outputs: "https://source.unsplash.com/640x480?technology"
     */
    technology(width, height) {
        return this.imageUrl(width, height, 'technology');
    }

    /**
     * objects
     *
     * @description Method to return url from imageprovider with keyword
     * @param {Number} [width= 640] Width of image
     * @param {Number} [height= 480] Height of image
     * @method pure.image.unsplash.objects
     * @example
     * console.log(pure.image.unsplash.objects());
     * //outputs: "https://source.unsplash.com/640x480?objects"
     */
    objects(width, height) {
        return this.imageUrl(width, height, 'objects');
    }

    /**
     * buildings
     *
     * @description Method to return url from imageprovider with keyword
     * @param {Number} [width= 640] Width of image
     * @param {Number} [height= 480] Height of image
     * @method pure.image.unsplash.buildings
     * @example
     * console.log(pure.image.unsplash.buildings());
     * //outputs: "https://source.unsplash.com/640x480?buildings"
     */
    buildings(width, height) {
        return this.imageUrl(width, height, 'buildings');
    }
}

module.exports = Unsplash;
