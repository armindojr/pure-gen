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
     * @param {number} width
     * @param {number} height
     * @param {string} keyword
     * @method pure.image.unsplash.image
     * @description search image from unsplash
     */
    // TODO: Refactor to use categories instead of undefined
    // const categories = ['food', 'nature', 'people', 'technology', 'objects', 'buildings'];
    self.image = (width, height, keyword) => self.imageUrl(width, height, undefined, keyword);
    /**
   * avatar
   *
   * @method pure.image.unsplash.avatar
   */
    self.avatar = () => pure.internet.avatar();
    /**
   * imageUrl
   *
   * @param {number} width
   * @param {number} height
   * @param {string} category
   * @param {string} keyword
   * @method pure.image.unsplash.imageUrl
   */
    self.imageUrl = (width, height, category, keyword) => {
        const nwidth = width || 640;
        const nheight = height || 480;

        let url = 'https://source.unsplash.com';

        if (typeof category !== 'undefined') {
            url += `/category/${category}`;
        }

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
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method pure.image.unsplash.food
   */
    self.food = (width, height, keyword) => pure.image.unsplash.imageUrl(width, height, 'food', keyword);
    /**
   * people
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method pure.image.unsplash.people
   */
    self.people = (width, height, keyword) => pure.image.unsplash.imageUrl(width, height, 'people', keyword);
    /**
   * nature
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method pure.image.unsplash.nature
   */
    self.nature = (width, height, keyword) => pure.image.unsplash.imageUrl(width, height, 'nature', keyword);
    /**
   * technology
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method pure.image.unsplash.technology
   */
    self.technology = (width, height, keyword) => pure.image.unsplash.imageUrl(width, height, 'technology', keyword);
    /**
   * objects
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method pure.image.unsplash.objects
   */
    self.objects = (width, height, keyword) => pure.image.unsplash.imageUrl(width, height, 'objects', keyword);
    /**
   * buildings
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method pure.image.unsplash.buildings
   */
    self.buildings = (width, height, keyword) => pure.image.unsplash.imageUrl(width, height, 'buildings', keyword);
}

module.exports = Unsplash;
