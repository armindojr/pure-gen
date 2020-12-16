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
            'abstract',
            'animals',
            'business',
            'cats',
            'city',
            'food',
            'nightlife',
            'fashion',
            'people',
            'nature',
            'sports',
            'technics',
            'transport',
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
     * //outputs: "https://s3.amazonaws.com/uifaces/faces/twitter/.."
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
     * abstract
     *
     * @description Method to return url from imageprovider with abstract category
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {boolean} [options.randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.abstract
     * @example
     * console.log(pure.image.placeimg.abstract());
     * //outputs: "http://placeimg.com/640/480/abstract"
     */
    abstract(options = {}) {
        const { width, height, randomize } = options;
        return this.imageUrl({
            width, height, category: 'abstract', randomize,
        });
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
     * business
     *
     * @description Method to return url from imageprovider with business category
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {boolean} [options.randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.business
     * @example
     * console.log(pure.image.placeimg.business());
     * //outputs: "http://placeimg.com/640/480/business"
     */
    business(options = {}) {
        const { width, height, randomize } = options;
        return this.imageUrl({
            width, height, category: 'business', randomize,
        });
    }

    /**
     * cats
     *
     * @description Method to return url from imageprovider with cats category
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {boolean} [options.randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.cats
     * @example
     * console.log(pure.image.placeimg.cats());
     * //outputs: "http://placeimg.com/640/480/cats"
     */
    cats(options = {}) {
        const { width, height, randomize } = options;
        return this.imageUrl({
            width, height, category: 'cats', randomize,
        });
    }

    /**
     * city
     *
     * @description Method to return url from imageprovider with city category
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {boolean} [options.randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.city
     * @example
     * console.log(pure.image.placeimg.city());
     * //outputs: "http://placeimg.com/640/480/city"
     */
    city(options = {}) {
        const { width, height, randomize } = options;
        return this.imageUrl({
            width, height, category: 'city', randomize,
        });
    }

    /**
     * food
     *
     * @description Method to return url from imageprovider with food category
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {boolean} [options.randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.food
     * @example
     * console.log(pure.image.placeimg.food());
     * //outputs: "http://placeimg.com/640/480/food"
     */
    food(options = {}) {
        const { width, height, randomize } = options;
        return this.imageUrl({
            width, height, category: 'food', randomize,
        });
    }

    /**
     * nightlife
     *
     * @description Method to return url from imageprovider with nightlife category
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {boolean} [options.randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.nightlife
     * @example
     * console.log(pure.image.placeimg.nightlife());
     * //outputs: "http://placeimg.com/640/480/nightlife"
     */
    nightlife(options = {}) {
        const { width, height, randomize } = options;
        return this.imageUrl({
            width, height, category: 'nightlife', randomize,
        });
    }

    /**
     * fashion
     *
     * @description Method to return url from imageprovider with fashion category
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {boolean} [options.randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.fashion
     * @example
     * console.log(pure.image.placeimg.fashion());
     * //outputs: "http://placeimg.com/640/480/fashion"
     */
    fashion(options = {}) {
        const { width, height, randomize } = options;
        return this.imageUrl({
            width, height, category: 'fashion', randomize,
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
     * sports
     *
     * @description Method to return url from imageprovider with sports category
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {boolean} [options.randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.sports
     * @example
     * console.log(pure.image.placeimg.sports());
     * //outputs: "http://placeimg.com/640/480/sports"
     */
    sports(options = {}) {
        const { width, height, randomize } = options;
        return this.imageUrl({
            width, height, category: 'sports', randomize,
        });
    }

    /**
     * technics
     *
     * @description Method to return url from imageprovider with technics category
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {boolean} [options.randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.technics
     * @example
     * console.log(pure.image.placeimg.technics());
     * //outputs: "http://placeimg.com/640/480/technics"
     */
    technics(options = {}) {
        const { width, height, randomize } = options;
        return this.imageUrl({
            width, height, category: 'technics', randomize,
        });
    }

    /**
     * transport
     *
     * @description Method to return url from imageprovider with transport category
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {boolean} [options.randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.transport
     * @example
     * console.log(pure.image.placeimg.transport());
     * //outputs: "http://placeimg.com/640/480/transport"
     */
    transport(options = {}) {
        const { width, height, randomize } = options;
        return this.imageUrl({
            width, height, category: 'transport', randomize,
        });
    }
}

module.exports = Placeimg;
