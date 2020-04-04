/**
 *
 * @namespace placeimg
 * @memberof pure.image
 */
function Placeimg(pure) {
    const self = this;

    /**
   * image
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.placeimg.image
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
   * @method pure.image.placeimg.avatar
   */
    self.avatar = () => pure.internet.avatar();
    /**
   * imageUrl
   *
   * @param {number} width
   * @param {number} height
   * @param {string} category
   * @param {boolean} randomize
   * @method pure.image.placeimg.imageUrl
   */
    self.imageUrl = (width, height, category, randomize) => {
        const nwidth = width || 640;
        const nheight = height || 480;

        let url = `https://placeimg.com/${nwidth}/${nheight}`;
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
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.placeimg.abstract
   */
    self.abstract = (width, height, randomize) => pure.image.placeimg.imageUrl(width, height, 'abstract', randomize);
    /**
   * animals
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.placeimg.animals
   */
    self.animals = (width, height, randomize) => pure.image.placeimg.imageUrl(width, height, 'animals', randomize);
    /**
   * business
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.placeimg.business
   */
    self.business = (width, height, randomize) => pure.image.placeimg.imageUrl(width, height, 'business', randomize);
    /**
   * cats
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.placeimg.cats
   */
    self.cats = (width, height, randomize) => pure.image.placeimg.imageUrl(width, height, 'cats', randomize);
    /**
   * city
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.placeimg.city
   */
    self.city = (width, height, randomize) => pure.image.placeimg.imageUrl(width, height, 'city', randomize);
    /**
   * food
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.placeimg.food
   */
    self.food = (width, height, randomize) => pure.image.placeimg.imageUrl(width, height, 'food', randomize);
    /**
   * nightlife
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.placeimg.nightlife
   */
    self.nightlife = (width, height, randomize) => pure.image.placeimg.imageUrl(
        width, height, 'nightlife', randomize,
    );
    /**
   * fashion
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.placeimg.fashion
   */
    self.fashion = (width, height, randomize) => pure.image.placeimg.imageUrl(width, height, 'fashion', randomize);
    /**
   * people
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.placeimg.people
   */
    self.people = (width, height, randomize) => pure.image.placeimg.imageUrl(width, height, 'people', randomize);
    /**
   * nature
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.placeimg.nature
   */
    self.nature = (width, height, randomize) => pure.image.placeimg.imageUrl(width, height, 'nature', randomize);
    /**
   * sports
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.placeimg.sports
   */
    self.sports = (width, height, randomize) => pure.image.placeimg.imageUrl(width, height, 'sports', randomize);
    /**
   * technics
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.placeimg.technics
   */
    self.technics = (width, height, randomize) => pure.image.placeimg.imageUrl(width, height, 'technics', randomize);
    /**
   * transport
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.placeimg.transport
   */
    self.transport = (width, height, randomize) => pure.image.placeimg.imageUrl(
        width, height, 'transport', randomize,
    );
}

module.exports = Placeimg;
