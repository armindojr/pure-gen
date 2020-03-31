/**
 *
 * @namespace lorempixel
 * @memberof pure.image
 */
function Lorempixel(pure) {
    const self = this;

    /**
   * image
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.lorempixel.image
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
   * @method pure.image.lorempixel.avatar
   */
    self.avatar = () => pure.internet.avatar();
    /**
   * imageUrl
   *
   * @param {number} width
   * @param {number} height
   * @param {string} category
   * @param {boolean} randomize
   * @method pure.image.lorempixel.imageUrl
   */
    self.imageUrl = (width, height, category, randomize) => {
        const nwidth = width || 640;
        const nheight = height || 480;

        let url = `https://lorempixel.com/${nwidth}/${nheight}`;
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
   * @method pure.image.lorempixel.abstract
   */
    self.abstract = (width, height, randomize) => pure.image.lorempixel.imageUrl(width, height, 'abstract', randomize);
    /**
   * animals
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.lorempixel.animals
   */
    self.animals = (width, height, randomize) => pure.image.lorempixel.imageUrl(width, height, 'animals', randomize);
    /**
   * business
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.lorempixel.business
   */
    self.business = (width, height, randomize) => pure.image.lorempixel.imageUrl(width, height, 'business', randomize);
    /**
   * cats
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.lorempixel.cats
   */
    self.cats = (width, height, randomize) => pure.image.lorempixel.imageUrl(width, height, 'cats', randomize);
    /**
   * city
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.lorempixel.city
   */
    self.city = (width, height, randomize) => pure.image.lorempixel.imageUrl(width, height, 'city', randomize);
    /**
   * food
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.lorempixel.food
   */
    self.food = (width, height, randomize) => pure.image.lorempixel.imageUrl(width, height, 'food', randomize);
    /**
   * nightlife
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.lorempixel.nightlife
   */
    self.nightlife = (width, height, randomize) => pure.image.lorempixel.imageUrl(
        width, height, 'nightlife', randomize,
    );
    /**
   * fashion
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.lorempixel.fashion
   */
    self.fashion = (width, height, randomize) => pure.image.lorempixel.imageUrl(width, height, 'fashion', randomize);
    /**
   * people
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.lorempixel.people
   */
    self.people = (width, height, randomize) => pure.image.lorempixel.imageUrl(width, height, 'people', randomize);
    /**
   * nature
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.lorempixel.nature
   */
    self.nature = (width, height, randomize) => pure.image.lorempixel.imageUrl(width, height, 'nature', randomize);
    /**
   * sports
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.lorempixel.sports
   */
    self.sports = (width, height, randomize) => pure.image.lorempixel.imageUrl(width, height, 'sports', randomize);
    /**
   * technics
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.lorempixel.technics
   */
    self.technics = (width, height, randomize) => pure.image.lorempixel.imageUrl(width, height, 'technics', randomize);
    /**
   * transport
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.lorempixel.transport
   */
    self.transport = (width, height, randomize) => pure.image.lorempixel.imageUrl(
        width, height, 'transport', randomize,
    );
}

module.exports = Lorempixel;
