/**
 *
 * @namespace unsplash
 * @memberof pure.image
 */
function Unsplash(pure) {
    const self = this;

    /**
     * image
     *
     * @description Method to return image url from unsplash
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {boolean} [randomize= false] Define if generate random predetermined image
     * @method pure.image.unsplash.image
     * @example
     * console.log(pure.image.unsplash.image());
     * //outputs: "https://source.unsplash.com/640x480"
     */
    self.image = (width, height, keyword) => self.imageUrl(width, height, keyword);
    /**
     * avatar
     *
     * @description Method to return random avatar image url
     * @method pure.image.unsplash.avatar
     * @example
     * console.log(pure.image.unsplash.avatar());
     * //outputs: "https://s3.amazonaws.com/uifaces/faces/twitter/.."
     */
    self.avatar = () => pure.internet.avatar();

    /**
     * imageUrl
     *
     * @description Method to return url from imageprovider with given parameters
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @param {string} [keyword= empty] Category of image
     * @method pure.image.unsplash.imageUrl
     * @example
     * console.log(pure.image.unsplash.imageUrl());
     * //outputs: "https://source.unsplash.com/640x480"
     */
    self.imageUrl = (width, height, keyword) => {
        const nwidth = width || 640;
        const nheight = height || 480;

        let url = 'https://source.unsplash.com';

        url += `/${nwidth}x${nheight}`;

        if (typeof keyword !== 'undefined') {
            const keywordFormat = new RegExp('^([A-Za-z0-9].+,[A-Za-z0-9]+)$|^([A-Za-z0-9]+)$');
            if (keywordFormat.test(keyword)) {
                url += `?${keyword}`;
            }
        }

        return url;
    };

    /**
     * food
     * 
     * @description Method to return url from imageprovider with keyword
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @method pure.image.unsplash.food
     * @example
     * console.log(pure.image.unsplash.food());
     * //outputs: "https://source.unsplash.com/640x480?food"
     */
    self.food = (width, height) => pure.image.unsplash.imageUrl(width, height, 'food');

    /**
     * people
     * 
     * @description Method to return url from imageprovider with keyword
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @method pure.image.unsplash.people
     * @example
     * console.log(pure.image.unsplash.people());
     * //outputs: "https://source.unsplash.com/640x480?people"
     */
    self.people = (width, height) => pure.image.unsplash.imageUrl(width, height, 'people');

    /**
     * nature
     * 
     * @description Method to return url from imageprovider with keyword
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @method pure.image.unsplash.nature
     * @example
     * console.log(pure.image.unsplash.nature());
     * //outputs: "https://source.unsplash.com/640x480?nature"
     */
    self.nature = (width, height) => pure.image.unsplash.imageUrl(width, height, 'nature');

    /**
     * technology
     * 
     * @description Method to return url from imageprovider with keyword
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @method pure.image.unsplash.technology
     * @example
     * console.log(pure.image.unsplash.technology());
     * //outputs: "https://source.unsplash.com/640x480?technology"
     */
    self.technology = (width, height) => pure.image.unsplash.imageUrl(width, height, 'technology');

    /**
     * objects
     * 
     * @description Method to return url from imageprovider with keyword
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @method pure.image.unsplash.objects
     * @example
     * console.log(pure.image.unsplash.objects());
     * //outputs: "https://source.unsplash.com/640x480?objects"
     */
    self.objects = (width, height) => pure.image.unsplash.imageUrl(width, height, 'objects');

    /**
     * buildings
     * 
     * @description Method to return url from imageprovider with keyword
     * @param {number} [width= 640] Width of image
     * @param {number} [height= 480] Height of image
     * @method pure.image.unsplash.buildings
     * @example
     * console.log(pure.image.unsplash.buildings());
     * //outputs: "https://source.unsplash.com/640x480?buildings"
     */
    self.buildings = (width, height) => pure.image.unsplash.imageUrl(width, height, 'buildings');
}

module.exports = Unsplash;
