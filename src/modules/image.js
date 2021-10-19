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
