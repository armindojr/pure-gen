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
     * @param {Number} [width= 640] Width of image
     * @param {Number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.image
     * @example
     * console.log(pure.image.placeimg.image());
     * //outputs: "http://placeimg.com/640/480/fashion"
     */
    image(width, height, randomize) {
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
     * @param {Number} [width= 640] Width of image
     * @param {Number} [height= 480] Height of image
     * @param {string} [category= empty] Category of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @param {boolean} [https= false] Define if output is https or not
     * @method pure.image.placeimg.imageUrl
     * @example
     * console.log(pure.image.placeimg.imageUrl());
     * //outputs: "http://placeimg.com/640/480"
     */
    imageUrl(width, height, category, randomize) {
        const nwidth = width || 640;
        const nheight = height || 480;

        let url = `https://placeimg.com/${nwidth}/${nheight}`;
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
     * @param {Number} [width= 640] Width of image
     * @param {Number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.abstract
     * @example
     * console.log(pure.image.placeimg.abstract());
     * //outputs: "http://placeimg.com/640/480/abstract"
     */
    abstract(width, height, randomize) {
        return this.pure.image.placeimg.imageUrl(width, height, 'abstract', randomize);
    }

    /**
     * animals
     *
     * @description Method to return url from imageprovider with animals category
     * @param {Number} [width= 640] Width of image
     * @param {Number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.animals
     * @example
     * console.log(pure.image.placeimg.animals());
     * //outputs: "http://placeimg.com/640/480/animals"
     */
    animals(width, height, randomize) {
        return this.pure.image.placeimg.imageUrl(width, height, 'animals', randomize);
    }

    /**
     * business
     *
     * @description Method to return url from imageprovider with business category
     * @param {Number} [width= 640] Width of image
     * @param {Number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.business
     * @example
     * console.log(pure.image.placeimg.business());
     * //outputs: "http://placeimg.com/640/480/business"
     */
    business(width, height, randomize) {
        return this.pure.image.placeimg.imageUrl(width, height, 'business', randomize);
    }

    /**
     * cats
     *
     * @description Method to return url from imageprovider with cats category
     * @param {Number} [width= 640] Width of image
     * @param {Number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.cats
     * @example
     * console.log(pure.image.placeimg.cats());
     * //outputs: "http://placeimg.com/640/480/cats"
     */
    cats(width, height, randomize) {
        return this.pure.image.placeimg.imageUrl(width, height, 'cats', randomize);
    }

    /**
     * city
     *
     * @description Method to return url from imageprovider with city category
     * @param {Number} [width= 640] Width of image
     * @param {Number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.city
     * @example
     * console.log(pure.image.placeimg.city());
     * //outputs: "http://placeimg.com/640/480/city"
     */
    city(width, height, randomize) {
        return this.pure.image.placeimg.imageUrl(width, height, 'city', randomize);
    }

    /**
     * food
     *
     * @description Method to return url from imageprovider with food category
     * @param {Number} [width= 640] Width of image
     * @param {Number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.food
     * @example
     * console.log(pure.image.placeimg.food());
     * //outputs: "http://placeimg.com/640/480/food"
     */
    food(width, height, randomize) {
        return this.pure.image.placeimg.imageUrl(width, height, 'food', randomize);
    }

    /**
     * nightlife
     *
     * @description Method to return url from imageprovider with nightlife category
     * @param {Number} [width= 640] Width of image
     * @param {Number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.nightlife
     * @example
     * console.log(pure.image.placeimg.nightlife());
     * //outputs: "http://placeimg.com/640/480/nightlife"
     */
    nightlife(width, height, randomize) {
        return this.pure.image.placeimg.imageUrl(width, height, 'nightlife', randomize);
    }

    /**
     * fashion
     *
     * @description Method to return url from imageprovider with fashion category
     * @param {Number} [width= 640] Width of image
     * @param {Number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.fashion
     * @example
     * console.log(pure.image.placeimg.fashion());
     * //outputs: "http://placeimg.com/640/480/fashion"
     */
    fashion(width, height, randomize) {
        return this.pure.image.placeimg.imageUrl(width, height, 'fashion', randomize);
    }

    /**
     * people
     *
     * @description Method to return url from imageprovider with people category
     * @param {Number} [width= 640] Width of image
     * @param {Number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.people
     * @example
     * console.log(pure.image.placeimg.people());
     * //outputs: "http://placeimg.com/640/480/people"
     */
    people(width, height, randomize) {
        return this.pure.image.placeimg.imageUrl(width, height, 'people', randomize);
    }

    /**
     * nature
     *
     * @description Method to return url from imageprovider with nature category
     * @param {Number} [width= 640] Width of image
     * @param {Number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.nature
     * @example
     * console.log(pure.image.placeimg.nature());
     * //outputs: "http://placeimg.com/640/480/nature"
     */
    nature(width, height, randomize) {
        return this.pure.image.placeimg.imageUrl(width, height, 'nature', randomize);
    }

    /**
     * sports
     *
     * @description Method to return url from imageprovider with sports category
     * @param {Number} [width= 640] Width of image
     * @param {Number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.sports
     * @example
     * console.log(pure.image.placeimg.sports());
     * //outputs: "http://placeimg.com/640/480/sports"
     */
    sports(width, height, randomize) {
        return this.pure.image.placeimg.imageUrl(width, height, 'sports', randomize);
    }

    /**
     * technics
     *
     * @description Method to return url from imageprovider with technics category
     * @param {Number} [width= 640] Width of image
     * @param {Number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.technics
     * @example
     * console.log(pure.image.placeimg.technics());
     * //outputs: "http://placeimg.com/640/480/technics"
     */
    technics(width, height, randomize) {
        return this.pure.image.placeimg.imageUrl(width, height, 'technics', randomize);
    }

    /**
     * transport
     *
     * @description Method to return url from imageprovider with transport category
     * @param {Number} [width= 640] Width of image
     * @param {Number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.placeimg.transport
     * @example
     * console.log(pure.image.placeimg.transport());
     * //outputs: "http://placeimg.com/640/480/transport"
     */
    transport(width, height, randomize) {
        return this.pure.image.placeimg.imageUrl(width, height, 'transport', randomize);
    }
}

module.exports = Placeimg;
