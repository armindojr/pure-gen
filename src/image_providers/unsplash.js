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
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {boolean} [options.keyword= empty] Category of image
     * @method pure.image.unsplash.image
     * @example
     * console.log(pure.image.unsplash.image());
     * //outputs: "https://source.unsplash.com/640x480"
     */
    image(options = {}) {
        const { width, height, keyword } = options;
        return this.imageUrl({ width, height, keyword });
    }

    /**
     * avatar
     *
     * @description Method to return random avatar image url
     * @method pure.image.unsplash.avatar
     * @example
     * console.log(pure.image.unsplash.avatar());
     * //outputs: "https://i.pravatar.cc/200"
     */
    avatar() {
        return this.pure.internet.avatar();
    }

    /**
     * imageUrl
     *
     * @description Method to return url from imageprovider with given parameters
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {boolean} [options.keyword= empty] Category of image
     * @method pure.image.unsplash.imageUrl
     * @example
     * console.log(pure.image.unsplash.imageUrl());
     * //outputs: "https://source.unsplash.com/640x480"
     */
    imageUrl(options = {}) {
        const { width = this.width, height = this.height, keyword } = options;
        let url = 'https://source.unsplash.com';

        url += `/${width}x${height}`;

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
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @method pure.image.unsplash.food
     * @example
     * console.log(pure.image.unsplash.food());
     * //outputs: "https://source.unsplash.com/640x480?food"
     */
    food(options = {}) {
        const { width, height } = options;
        return this.imageUrl({ width, height, keyword: 'food' });
    }

    /**
     * people
     *
     * @description Method to return url from imageprovider with keyword
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @method pure.image.unsplash.people
     * @example
     * console.log(pure.image.unsplash.people());
     * //outputs: "https://source.unsplash.com/640x480?people"
     */
    people(options = {}) {
        const { width, height } = options;
        return this.imageUrl({ width, height, keyword: 'people' });
    }

    /**
     * nature
     *
     * @description Method to return url from imageprovider with keyword
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @method pure.image.unsplash.nature
     * @example
     * console.log(pure.image.unsplash.nature());
     * //outputs: "https://source.unsplash.com/640x480?nature"
     */
    nature(options = {}) {
        const { width, height } = options;
        return this.imageUrl({ width, height, keyword: 'nature' });
    }

    /**
     * technology
     *
     * @description Method to return url from imageprovider with keyword
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @method pure.image.unsplash.technology
     * @example
     * console.log(pure.image.unsplash.technology());
     * //outputs: "https://source.unsplash.com/640x480?technology"
     */
    technology(options = {}) {
        const { width, height } = options;
        return this.imageUrl({ width, height, keyword: 'technology' });
    }

    /**
     * objects
     *
     * @description Method to return url from imageprovider with keyword
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @method pure.image.unsplash.objects
     * @example
     * console.log(pure.image.unsplash.objects());
     * //outputs: "https://source.unsplash.com/640x480?objects"
     */
    objects(options = {}) {
        const { width, height } = options;
        return this.imageUrl({ width, height, keyword: 'objects' });
    }

    /**
     * buildings
     *
     * @description Method to return url from imageprovider with keyword
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @method pure.image.unsplash.buildings
     * @example
     * console.log(pure.image.unsplash.buildings());
     * //outputs: "https://source.unsplash.com/640x480?buildings"
     */
    buildings(options = {}) {
        const { width, height } = options;
        return this.imageUrl({ width, height, keyword: 'buildings' });
    }
}

module.exports = Unsplash;
