/**
 *
 * @namespace pure.commerce
 */
function Commerce(pure) {
    const self = this;

    /**
   * color
   *
   * @method pure.commerce.color
   */
    self.color = () => pure.random.arrayElement(pure.definitions.commerce.color);

    /**
   * department
   *
   * @method pure.commerce.department
   */
    self.department = () => pure.random.arrayElement(pure.definitions.commerce.department);

    /**
   * productName
   *
   * @method pure.commerce.productName
   */
    self.productName = () => `${pure.commerce.productAdjective()} ${
        pure.commerce.productMaterial()} ${
        pure.commerce.product()}`;

    /**
   * price
   *
   * @method pure.commerce.price
   * @param {mixed} options {min, max, dec, symbol, comma}
   *
   * @return {string}
   */
    self.price = (options) => {
        let def = options;
        if (def === undefined) {
            def = {
                min: 1,
            };
        }

        def.max = def.max || 1000 * def.min;
        def.dec = def.dec === undefined ? 2 : def.dec;
        def.symbol = def.symbol || '';

        if (def.min < 0 || def.max < 0) {
            return def.symbol + 0.00;
        }

        const randValue = pure.random.number({ max: def.max, min: def.min });
        const finalValue = def.symbol + (Math.round(randValue * (10 ** def.dec)) / (10 ** def.dec))
            .toFixed(def.dec);

        return (def.comma) ? finalValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : finalValue;
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
    self.productAdjective = () => pure.random.arrayElement(pure.definitions.commerce.product_name.adjective);

    /**
   * productMaterial
   *
   * @method pure.commerce.productMaterial
   */
    self.productMaterial = () => pure.random.arrayElement(pure.definitions.commerce.product_name.material);

    /**
   * product
   *
   * @method pure.commerce.product
   */
    self.product = () => pure.random.arrayElement(pure.definitions.commerce.product_name.product);

    /**
   * productDescription
   *
   * @method pure.commerce.productDescription
   */
    self.productDescription = () => pure.random.arrayElement(pure.definitions.commerce.product_description);

    return self;
}

module.exports = Commerce;
