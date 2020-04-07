/**
 *
 * @namespace pure.image
 * @description Return image url from default provider
 * @default Default provider is placeimg
 */
const Placeimg = require('./image_providers/placeimg');
const Unsplash = require('./image_providers/unsplash');

function Image(pure) {
    const self = this;

    /**
     * image
     *
     * @description Method to return image url with random category
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.image
     * @example
     * console.log(pure.image.image());
     * //outputs: "http://placeimg.com/640/480/fashion"
     */
    self.image = (width, height, randomize) => {
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
        return self[pure.random.arrayElement(categories)](width, height, randomize);
    };
    
    /**
     * avatar
     *
     * @description Method to return random avatar image url
     * @method pure.image.avatar
     * @example
     * console.log(pure.image.avatar());
     * //outputs: "https://s3.amazonaws.com/uifaces/faces/twitter/.."
     */
    self.avatar = () => pure.internet.avatar();

    /**
     * imageUrl
     *
     * @description Method to return url from imageprovider with given parameters
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {string} [category= empty] Category of image 
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @param {boolean} [https= false] Define if output is https or not
     * @method pure.image.imageUrl
     * @example
     * console.log(pure.image.imageUrl());
     * //outputs: "http://placeimg.com/640/480"
     */
    self.imageUrl = (width, height, category, randomize, https) => {
        const nWidth = width || 640;
        const nHeight = height || 480;
        let protocol = 'http://';
        if (typeof https !== 'undefined' && https === true) {
            protocol = 'https://';
        }
        let url = `${protocol}placeimg.com/${nWidth}/${nHeight}`;
        if (typeof category !== 'undefined') {
            url += `/${category}`;
        }

        if (randomize) {
            url += `?${pure.random.number()}`;
        }

        return url;
    };

    /**
     * abstract
     *
     * @description Method to return url from imageprovider with abstract category
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.abstract
     * @example
     * console.log(pure.image.abstract());
     * //outputs: "http://placeimg.com/640/480/abstract"
     */
    self.abstract = (width, height, randomize) => pure.image.imageUrl(width, height, 'abstract', randomize);

    /**
     * animals
     *
     * @description Method to return url from imageprovider with animals category
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.animals
     * @example
     * console.log(pure.image.animals());
     * //outputs: "http://placeimg.com/640/480/animals"
     */
    self.animals = (width, height, randomize) => pure.image.imageUrl(width, height, 'animals', randomize);

    /**
     * business
     *
     * @description Method to return url from imageprovider with business category
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.business
     * @example
     * console.log(pure.image.business());
     * //outputs: "http://placeimg.com/640/480/business"
     */
    self.business = (width, height, randomize) => pure.image.imageUrl(width, height, 'business', randomize);

    /**
     * cats
     *
     * @description Method to return url from imageprovider with cats category
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.cats
     * @example
     * console.log(pure.image.cats());
     * //outputs: "http://placeimg.com/640/480/cats"
     */
    self.cats = (width, height, randomize) => pure.image.imageUrl(width, height, 'cats', randomize);

    /**
     * city
     *
     * @description Method to return url from imageprovider with city category
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.city
     * @example
     * console.log(pure.image.city());
     * //outputs: "http://placeimg.com/640/480/city"
     */
    self.city = (width, height, randomize) => pure.image.imageUrl(width, height, 'city', randomize);

    /**
     * food
     *
     * @description Method to return url from imageprovider with food category
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.food
     * @example
     * console.log(pure.image.food());
     * //outputs: "http://placeimg.com/640/480/food"
     */
    self.food = (width, height, randomize) => pure.image.imageUrl(width, height, 'food', randomize);

    /**
     * nightlife
     *
     * @description Method to return url from imageprovider with nightlife category
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.nightlife
     * @example
     * console.log(pure.image.nightlife());
     * //outputs: "http://placeimg.com/640/480/nightlife"
     */
    self.nightlife = (width, height, randomize) => pure.image.imageUrl(width, height, 'nightlife', randomize);

    /**
     * fashion
     *
     * @description Method to return url from imageprovider with fashion category
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.fashion
     * @example
     * console.log(pure.image.fashion());
     * //outputs: "http://placeimg.com/640/480/fashion"
     */
    self.fashion = (width, height, randomize) => pure.image.imageUrl(width, height, 'fashion', randomize);

    /**
     * people
     *
     * @description Method to return url from imageprovider with people category
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.people
     * @example
     * console.log(pure.image.people());
     * //outputs: "http://placeimg.com/640/480/people"
     */
    self.people = (width, height, randomize) => pure.image.imageUrl(width, height, 'people', randomize);

    /**
     * nature
     *
     * @description Method to return url from imageprovider with nature category
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.nature
     * @example
     * console.log(pure.image.nature());
     * //outputs: "http://placeimg.com/640/480/nature"
     */
    self.nature = (width, height, randomize) => pure.image.imageUrl(width, height, 'nature', randomize);

    /**
     * sports
     *
     * @description Method to return url from imageprovider with sports category
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.sports
     * @example
     * console.log(pure.image.sports());
     * //outputs: "http://placeimg.com/640/480/sports"
     */
    self.sports = (width, height, randomize) => pure.image.imageUrl(width, height, 'sports', randomize);

    /**
     * technics
     *
     * @description Method to return url from imageprovider with technics category
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.technics
     * @example
     * console.log(pure.image.technics());
     * //outputs: "http://placeimg.com/640/480/technics"
     */
    self.technics = (width, height, randomize) => pure.image.imageUrl(width, height, 'technics', randomize);

    /**
     * transport
     *
     * @description Method to return url from imageprovider with transport category
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.transport
     * @example
     * console.log(pure.image.transport());
     * //outputs: "http://placeimg.com/640/480/transport"
     */
    self.transport = (width, height, randomize) => pure.image.imageUrl(width, height, 'transport', randomize);

    /**
     * dataUri
     *
     * @description Method to return data URI
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {string} color
     * @method pure.image.dataUri
     * @example
     * console.log(pure.image.dataUri());
     * //outputs: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg
     * //%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22640%22%20height%3D%22480%22%3E%3
     * //Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22320
     * //%22%20y%3D%22240%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22
     * //middle%22%20fill%3D%22white%22%3E640x480%3C%2Ftext%3E%3C%2Fsvg%3E"
     */
    self.dataUri = (width, height, color) => {
        const def = color || 'grey';
        const nWidth = width || 640;
        const nHeight = height || 480;
        const svgString = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"'
        + ` baseProfile="full" width="${nWidth}" height="${nHeight}"><rect width="100%"`
        + ` height="100%" fill="${def}"/><text x="${nWidth / 2}" y="${nHeight / 2}"`
        + ' font-size="20" alignment-baseline="middle" text-anchor="middle" '
        + `fill="white">${nWidth}x${nHeight}</text></svg>`;
        const rawPrefix = 'data:image/svg+xml;charset=UTF-8,';
        return rawPrefix + encodeURIComponent(svgString);
    };

    self.placeimg = new Placeimg(pure);
    self.unsplash = new Unsplash(pure);
}


module.exports = Image;
