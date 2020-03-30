/**
 *
 * @namespace pure.commerce
 */
var Commerce = function (pure) {
  var self = this;

  /**
   * color
   *
   * @method pure.commerce.color
   */
  self.color = function() {
      return pure.random.arrayElement(pure.definitions.commerce.color);
  };

  /**
   * department
   *
   * @method pure.commerce.department
   */
  self.department = function() {
      return pure.random.arrayElement(pure.definitions.commerce.department);
  };

  /**
   * productName
   *
   * @method pure.commerce.productName
   */
  self.productName = function() {
      return pure.commerce.productAdjective() + " " +
              pure.commerce.productMaterial() + " " +
              pure.commerce.product();
  };

  /**
   * price
   *
   * @method pure.commerce.price
   * @param {mixed} options {min, max, dec, symbol, comma}
   *
   * @return {string}
   */
  self.price = function(options) {
      if (options === undefined) {
          var options = {
              min: 1
          }
      } else {
          options.min = options.min;
      }

      options.max = options.max || 1000*options.min;
      options.dec = options.dec === undefined ? 2 : options.dec;
      options.symbol = options.symbol || '';

      if (options.min < 0 || options.max < 0) {
          return options.symbol + 0.00;
      }

      var randValue = pure.random.number({ max: options.max, min: options.min });
      var finalValue = options.symbol + (Math.round(randValue * Math.pow(10, options.dec)) / Math.pow(10, options.dec)).toFixed(options.dec);
      
      return (options.comma) ? finalValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : finalValue;
  };

  /*
  self.categories = function(num) {
      var categories = [];

      do {
          var category = pure.random.arrayElement(pure.definitions.commerce.department);
          if(categories.indexOf(category) === -1) {
              categories.push(category);
          }
      } while(categories.length < num);

      return categories;
  };

  */
  /*
  self.mergeCategories = function(categories) {
      var separator = pure.definitions.separator || " &";
      // TODO: find undefined here
      categories = categories || pure.definitions.commerce.categories;
      var commaSeparated = categories.slice(0, -1).join(', ');

      return [commaSeparated, categories[categories.length - 1]].join(separator + " ");
  };
  */

  /**
   * productAdjective
   *
   * @method pure.commerce.productAdjective
   */
  self.productAdjective = function() {
      return pure.random.arrayElement(pure.definitions.commerce.product_name.adjective);
  };

  /**
   * productMaterial
   *
   * @method pure.commerce.productMaterial
   */
  self.productMaterial = function() {
      return pure.random.arrayElement(pure.definitions.commerce.product_name.material);
  };

  /**
   * product
   *
   * @method pure.commerce.product
   */
  self.product = function() {
      return pure.random.arrayElement(pure.definitions.commerce.product_name.product);
  };

  /**
   * productDescription
   *
   * @method pure.commerce.productDescription
   */
  self.productDescription = function () {
      return pure.random.arrayElement(pure.definitions.commerce.product_description);
  };

  return self;
};

module['exports'] = Commerce;
