/**
 *
 * @namespace unsplash
 * @memberof pure.image
 */
var Unsplash = function (pure) {

  var self = this;
  var categories = ["food", "nature", "people", "technology", "objects", "buildings"];

  /**
   * image
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method pure.image.unsplash.image
   * @description search image from unsplash
   */
  self.image = function (width, height, keyword) {
    return self.imageUrl(width, height, undefined, keyword);
  };
  /**
   * avatar
   *
   * @method pure.image.unsplash.avatar
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
   * @param {string} keyword
   * @method pure.image.unsplash.imageUrl
   */
  self.imageUrl = function (width, height, category, keyword) {
      var width = width || 640;
      var height = height || 480;

      var url ='https://source.unsplash.com';

      if (typeof category !== 'undefined') {
          url += '/category/' + category;
      }

      url += '/' + width + 'x' + height;

      if (typeof keyword !== 'undefined') {
          var keywordFormat = new RegExp('^([A-Za-z0-9].+,[A-Za-z0-9]+)$|^([A-Za-z0-9]+)$');
          if (keywordFormat.test(keyword)) {
            url += '?' + keyword;
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
  self.food = function (width, height, keyword) {
    return pure.image.unsplash.imageUrl(width, height, 'food', keyword);
  };
  /**
   * people
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method pure.image.unsplash.people
   */
  self.people = function (width, height, keyword) {
    return pure.image.unsplash.imageUrl(width, height, 'people', keyword);
  };
  /**
   * nature
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method pure.image.unsplash.nature
   */
  self.nature = function (width, height, keyword) {
    return pure.image.unsplash.imageUrl(width, height, 'nature', keyword);
  };
  /**
   * technology
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method pure.image.unsplash.technology
   */
  self.technology = function (width, height, keyword) {
    return pure.image.unsplash.imageUrl(width, height, 'technology', keyword);
  };
  /**
   * objects
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method pure.image.unsplash.objects
   */
  self.objects = function (width, height, keyword) {
    return pure.image.unsplash.imageUrl(width, height, 'objects', keyword);
  };
  /**
   * buildings
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method pure.image.unsplash.buildings
   */
  self.buildings = function (width, height, keyword) {
    return pure.image.unsplash.imageUrl(width, height, 'buildings', keyword);
  };
}

module["exports"] = Unsplash;
