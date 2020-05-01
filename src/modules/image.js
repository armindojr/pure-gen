/**
 *
 * @namespace pure.image
 * @description Return image url from default provider
 * @default Default provider is placeimg
 */
const Placeimg = require('../image_providers/placeimg');
const Unsplash = require('../image_providers/unsplash');

class Image extends Placeimg {
    constructor(pure) {
        super(pure);
        this.pure = pure;
        this.width = 640;
        this.height = 480;
        this.placeimg = new Placeimg(this.pure);
        this.unsplash = new Unsplash(this.pure);
    }

    /**
     * image
     *
     * @description Method to return image url with random category. Extended from Placeimg lib
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.image
     * @example
     * console.log(pure.image.image());
     * //outputs: "http://placeimg.com/640/480/fashion"
     */

    /**
     * avatar
     *
     * @description Method to return random avatar image url. Extended from Placeimg lib
     * @method pure.image.avatar
     * @example
     * console.log(pure.image.avatar());
     * //outputs: "https://s3.amazonaws.com/uifaces/faces/twitter/.."
     */

    /**
     * abstract
     *
     * @description Method to return url from imageprovider with abstract category. Extended from Placeimg lib
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.abstract
     * @example
     * console.log(pure.image.abstract());
     * //outputs: "http://placeimg.com/640/480/abstract"
     */

    /**
     * animals
     *
     * @description Method to return url from imageprovider with animals category. Extended from Placeimg lib
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.animals
     * @example
     * console.log(pure.image.animals());
     * //outputs: "http://placeimg.com/640/480/animals"
     */

    /**
     * business
     *
     * @description Method to return url from imageprovider with business category. Extended from Placeimg lib
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.business
     * @example
     * console.log(pure.image.business());
     * //outputs: "http://placeimg.com/640/480/business"
     */

    /**
     * cats
     *
     * @description Method to return url from imageprovider with cats category. Extended from Placeimg lib
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.cats
     * @example
     * console.log(pure.image.cats());
     * //outputs: "http://placeimg.com/640/480/cats"
     */

    /**
     * city
     *
     * @description Method to return url from imageprovider with city category. Extended from Placeimg lib
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.city
     * @example
     * console.log(pure.image.city());
     * //outputs: "http://placeimg.com/640/480/city"
     */

    /**
     * food
     *
     * @description Method to return url from imageprovider with food category. Extended from Placeimg lib
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.food
     * @example
     * console.log(pure.image.food());
     * //outputs: "http://placeimg.com/640/480/food"
     */

    /**
     * nightlife
     *
     * @description Method to return url from imageprovider with nightlife category. Extended from Placeimg lib
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.nightlife
     * @example
     * console.log(pure.image.nightlife());
     * //outputs: "http://placeimg.com/640/480/nightlife"
     */

    /**
     * fashion
     *
     * @description Method to return url from imageprovider with fashion category. Extended from Placeimg lib
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.fashion
     * @example
     * console.log(pure.image.fashion());
     * //outputs: "http://placeimg.com/640/480/fashion"
     */

    /**
     * people
     *
     * @description Method to return url from imageprovider with people category. Extended from Placeimg lib
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.people
     * @example
     * console.log(pure.image.people());
     * //outputs: "http://placeimg.com/640/480/people"
     */

    /**
     * nature
     *
     * @description Method to return url from imageprovider with nature category. Extended from Placeimg lib
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.nature
     * @example
     * console.log(pure.image.nature());
     * //outputs: "http://placeimg.com/640/480/nature"
     */

    /**
     * sports
     *
     * @description Method to return url from imageprovider with sports category. Extended from Placeimg lib
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.sports
     * @example
     * console.log(pure.image.sports());
     * //outputs: "http://placeimg.com/640/480/sports"
     */

    /**
     * technics
     *
     * @description Method to return url from imageprovider with technics category. Extended from Placeimg lib
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.technics
     * @example
     * console.log(pure.image.technics());
     * //outputs: "http://placeimg.com/640/480/technics"
     */

    /**
     * transport
     *
     * @description Method to return url from imageprovider with transport category. Extended from Placeimg lib
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.transport
     * @example
     * console.log(pure.image.transport());
     * //outputs: "http://placeimg.com/640/480/transport"
     */

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
    dataUri(width, height, color) {
        const def = color || 'grey';
        const nWidth = width || this.width;
        const nHeight = height || this.height;
        const svgString = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"'
        + ` baseProfile="full" width="${nWidth}" height="${nHeight}"><rect width="100%"`
        + ` height="100%" fill="${def}"/><text x="${nWidth / 2}" y="${nHeight / 2}"`
        + ' font-size="20" alignment-baseline="middle" text-anchor="middle" '
        + `fill="white">${nWidth}x${nHeight}</text></svg>`;
        const rawPrefix = 'data:image/svg+xml;charset=UTF-8,';
        return rawPrefix + encodeURIComponent(svgString);
    }
}

module.exports = Image;
