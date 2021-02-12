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
        this.placeimg = new Placeimg(this.pure);
        this.unsplash = new Unsplash(this.pure);
    }

    /**
     * image
     *
     * @description Method to return image url with random category. Extended from Placeimg lib
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {boolean} [options.randomize= false] Define if generate random predetermined image
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
     * //outputs: "https://i.pravatar.cc/200"
     */

    /**
     * animals
     *
     * @description Method to return url from imageprovider with animals category. Extended from Placeimg lib
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {boolean} [options.randomize= false] Define if generate random predetermined image
     * @method pure.image.animals
     * @example
     * console.log(pure.image.animals());
     * //outputs: "http://placeimg.com/640/480/animals"
     */

    /**
     * architecture
     *
     * @description Method to return url from imageprovider with architecture category. Extended from Placeimg lib
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {boolean} [options.randomize= false] Define if generate random predetermined image
     * @method pure.image.architecture
     * @example
     * console.log(pure.image.architecture());
     * //outputs: "http://placeimg.com/640/480/architecture"
     */

    /**
     * nature
     *
     * @description Method to return url from imageprovider with nature category. Extended from Placeimg lib
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {boolean} [options.randomize= false] Define if generate random predetermined image
     * @method pure.image.nature
     * @example
     * console.log(pure.image.nature());
     * //outputs: "http://placeimg.com/640/480/nature"
     */

    /**
     * people
     *
     * @description Method to return url from imageprovider with people category. Extended from Placeimg lib
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {boolean} [options.randomize= false] Define if generate random predetermined image
     * @method pure.image.people
     * @example
     * console.log(pure.image.people());
     * //outputs: "http://placeimg.com/640/480/people"
     */

    /**
     * tech
     *
     * @description Method to return url from imageprovider with tech category. Extended from Placeimg lib
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {boolean} [options.randomize= false] Define if generate random predetermined image
     * @method pure.image.tech
     * @example
     * console.log(pure.image.tech());
     * //outputs: "http://placeimg.com/640/480/tech"
     */

    /**
     * dataUri
     *
     * @description Method to return data URI
     * @param {object} [options= {}] Options to be passed
     * @param {Number} [options.width= 640] Width of image
     * @param {Number} [options.height= 480] Height of image
     * @param {string} [options.color= random] Color fill
     * @method pure.image.dataUri
     * @example
     * console.log(pure.image.dataUri());
     * //outputs: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg
     * //%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22640%22%20height%3D%22480%22%3E%3
     * //Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22320
     * //%22%20y%3D%22240%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22
     * //middle%22%20fill%3D%22white%22%3E640x480%3C%2Ftext%3E%3C%2Fsvg%3E"
     */
    dataUri(options = {}) {
        const {
            width = 640,
            height = 480,
            color = this.pure.commerce.color(),
        } = options;
        const svgString = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"'
        + ` baseProfile="full" width="${width}" height="${height}"><rect width="100%"`
        + ` height="100%" fill="${color}"/><text x="${width / 2}" y="${height / 2}"`
        + ' font-size="20" alignment-baseline="middle" text-anchor="middle" '
        + `fill="white">${width}x${height}</text></svg>`;
        const rawPrefix = 'data:image/svg+xml;charset=UTF-8,';

        return rawPrefix + encodeURIComponent(svgString);
    }
}

module.exports = Image;
