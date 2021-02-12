/**
 *
 * @namespace placeimg
 * @memberof pure.image
 */

class Placeimg {
    constructor(pure) {
        this.pure = pure;
    }

    /**
     * image
     *
     * @description Method to return image url with random category
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {boolean} [options.randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.image
     * @example
     * console.log(pure.image.placeimg.image());
     * //outputs: "http://placeimg.com/640/480/fashion"
     */
    image(options = {}) {
        const { width, height, randomize } = options;

        const categories = [
            'animals',
            'architecture',
            'nature',
            'people',
            'tech',
        ];

        return this[this.pure.random.arrayElement(categories)](width, height, randomize);
    }

    /**
     * avatar
     *
     * @description Method to return random avatar image url
     * @method pure.image.placeimg.avatar
     * @example
     * console.log(pure.image.placeimg.avatar());
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
     * @param {string} [options.category= empty] Category of image
     * @param {boolean} [options.randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.imageUrl
     * @example
     * console.log(pure.image.placeimg.imageUrl());
     * //outputs: "http://placeimg.com/640/480"
     */
    imageUrl(options = {}) {
        const {
            width = 640, height = 480, category, randomize,
        } = options;
        let url = `https://placeimg.com/${width}/${height}`;

        if (typeof category !== 'undefined') {
            url += `/${category}`;
        }

        if (randomize) {
            url += `?${this.pure.random.number()}`;
        }

        return url;
    }

    /**
     * animals
     *
     * @description Method to return url from imageprovider with animals category
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {boolean} [options.randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.animals
     * @example
     * console.log(pure.image.placeimg.animals());
     * //outputs: "http://placeimg.com/640/480/animals"
     */
    animals(options = {}) {
        const { width, height, randomize } = options;
        return this.imageUrl({
            width, height, category: 'animals', randomize,
        });
    }

    /**
     * architecture
     *
     * @description Method to return url from imageprovider with architecture category
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {boolean} [options.randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.architecture
     * @example
     * console.log(pure.image.placeimg.architecture());
     * //outputs: "http://placeimg.com/640/480/architecture"
     */
    architecture(options = {}) {
        const { width, height, randomize } = options;
        return this.imageUrl({
            width, height, category: 'arch', randomize,
        });
    }

    /**
     * nature
     *
     * @description Method to return url from imageprovider with nature category
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {boolean} [options.randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.nature
     * @example
     * console.log(pure.image.placeimg.nature());
     * //outputs: "http://placeimg.com/640/480/nature"
     */
    nature(options = {}) {
        const { width, height, randomize } = options;
        return this.imageUrl({
            width, height, category: 'nature', randomize,
        });
    }

    /**
     * people
     *
     * @description Method to return url from imageprovider with people category
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {boolean} [options.randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.people
     * @example
     * console.log(pure.image.placeimg.people());
     * //outputs: "http://placeimg.com/640/480/people"
     */
    people(options = {}) {
        const { width, height, randomize } = options;
        return this.imageUrl({
            width, height, category: 'people', randomize,
        });
    }

    /**
     * tech
     *
     * @description Method to return url from imageprovider with tech category
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {boolean} [options.randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.tech
     * @example
     * console.log(pure.image.placeimg.tech());
     * //outputs: "http://placeimg.com/640/480/tech"
     */
    tech(options = {}) {
        const { width, height, randomize } = options;
        return this.imageUrl({
            width, height, category: 'tech', randomize,
        });
    }
}

module.exports = Placeimg;
