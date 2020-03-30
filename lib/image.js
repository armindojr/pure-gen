/**
 *
 * @namespace pure.image
 * @property {object} lorempixel - pure.image.lorempixel
 * @property {object} unsplash - pure.image.unsplash
 * @default Default provider is unsplash image provider
 */
var Image = function (pure) {

  var self = this;
  var Lorempixel = require('./image_providers/lorempixel');
  var Unsplash = require('./image_providers/unsplash');

  /**
   * image
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.image
   */
  self.image = function (width, height, randomize) {
    var categories = ["abstract", "animals", "business", "cats", "city", "food", "nightlife", "fashion", "people", "nature", "sports", "technics", "transport"];
    return self[pure.random.arrayElement(categories)](width, height, randomize);
  };
  /**
   * avatar
   *
   * @method pure.image.avatar
   */
  self.avatar = function () {
    return pure.internet.avatar();
  };
  /**
   * imageUrl
   *
   * @param {number} width
   * @param {number} height
   * @param {string} category
   * @param {boolean} randomize
   * @method pure.image.imageUrl
   */
  self.imageUrl = function (width, height, category, randomize, https) {
      var width = width || 640;
      var height = height || 480;
      var protocol = 'http://';
      if (typeof https !== 'undefined' && https === true) {
        protocol = 'https://';
      }
      var url = protocol + 'lorempixel.com/' + width + '/' + height;
      if (typeof category !== 'undefined') {
        url += '/' + category;
      }

      if (randomize) {
        url += '?' + pure.random.number()
      }

      return url;
  };
  /**
   * abstract
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.abstract
   */
  self.abstract = function (width, height, randomize) {
    return pure.image.imageUrl(width, height, 'abstract', randomize);
  };
  /**
   * animals
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.animals
   */
  self.animals = function (width, height, randomize) {
    return pure.image.imageUrl(width, height, 'animals', randomize);
  };
  /**
   * business
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.business
   */
  self.business = function (width, height, randomize) {
    return pure.image.imageUrl(width, height, 'business', randomize);
  };
  /**
   * cats
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.cats
   */
  self.cats = function (width, height, randomize) {
    return pure.image.imageUrl(width, height, 'cats', randomize);
  };
  /**
   * city
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.city
   */
  self.city = function (width, height, randomize) {
    return pure.image.imageUrl(width, height, 'city', randomize);
  };
  /**
   * food
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.food
   */
  self.food = function (width, height, randomize) {
    return pure.image.imageUrl(width, height, 'food', randomize);
  };
  /**
   * nightlife
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.nightlife
   */
  self.nightlife = function (width, height, randomize) {
    return pure.image.imageUrl(width, height, 'nightlife', randomize);
  };
  /**
   * fashion
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.fashion
   */
  self.fashion = function (width, height, randomize) {
    return pure.image.imageUrl(width, height, 'fashion', randomize);
  };
  /**
   * people
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.people
   */
  self.people = function (width, height, randomize) {
    return pure.image.imageUrl(width, height, 'people', randomize);
  };
  /**
   * nature
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.nature
   */
  self.nature = function (width, height, randomize) {
    return pure.image.imageUrl(width, height, 'nature', randomize);
  };
  /**
   * sports
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.sports
   */
  self.sports = function (width, height, randomize) {
    return pure.image.imageUrl(width, height, 'sports', randomize);
  };
  /**
   * technics
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.technics
   */
  self.technics = function (width, height, randomize) {
    return pure.image.imageUrl(width, height, 'technics', randomize);
  };
  /**
   * transport
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method pure.image.transport
   */
  self.transport = function (width, height, randomize) {
    return pure.image.imageUrl(width, height, 'transport', randomize);
  };
  /**
   * dataUri
   *
   * @param {number} width
   * @param {number} height
   * @param {string} color
   * @method pure.image.dataUri
   */
  self.dataUri = function (width, height, color) {
    color = color || 'grey';
    var svgString = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="' + width + '" height="' + height + '"><rect width="100%" height="100%" fill="' + color + '"/><text x="' + width / 2 + '" y="' + height / 2 + '" font-size="20" alignment-baseline="middle" text-anchor="middle" fill="white">' + width + 'x' + height + '</text></svg>';
    var rawPrefix = 'data:image/svg+xml;charset=UTF-8,';
    return rawPrefix + encodeURIComponent(svgString);
  };

  self.lorempixel = new Lorempixel(pure);
  self.unsplash = new Unsplash(pure);

  // Object.assign(self, self.unsplash);
  // How to set default as unsplash? should be image.default?
}


module["exports"] = Image;