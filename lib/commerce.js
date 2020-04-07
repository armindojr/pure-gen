/**
 *
 * @namespace pure.commerce
 */
function Commerce(pure) {
    const self = this;

    /**
     * color
     *
     * @description Generate random color name
     * @method pure.commerce.color
     * @example
     * console.log(pure.commerce.color());
     * //outputs: "pink"
     */
    self.color = () => pure.random.arrayElement(pure.definitions.commerce.color);

    /**
     * department
     *
     * @description Generate random department name
     * @method pure.commerce.department
     * @example
     * console.log(pure.commerce.department());
     * //outputs: "Games"
     */
    self.department = () => pure.random.arrayElement(pure.definitions.commerce.department);

    /**
     * productName
     *
     * @description Generate random product name
     * @method pure.commerce.productName
     * @example
     * console.log(pure.commerce.productName());
     * //outputs: "Gorgeous Cotton Shirt"
     */
    self.productName = () => `${pure.commerce.productAdjective()} ${
        pure.commerce.productMaterial()} ${
        pure.commerce.product()}`;

    /**
     * price
     *
     * @description Generate random product price
     * @param {object} options
     * @param {number} [options.min= 1] Minimum product price
     * @param {number} [options.max= 1000] Maximum product price
     * @param {number} [options.dec= 2] Floating point precision
     * @param {number} [options.symbol= empty] Price symbol
     * @param {boolean} [options.comma= false] Price separated by comma
     * @method pure.commerce.price
     * @example
     * console.log(pure.commerce.price());
     * //outputs: "941.00"
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

    /**
     * categories
     *
     * @description Generate random categories
     * @param {number} num Number of categories to return
     * @method pure.commerce.categories
     * @example
     * console.log(pure.commerce.categories());
     * //outputs: "[ 'Home', 'Clothing', 'Shoes', 'Toys', 'Tools' ]"
     */
    self.categories = (num) => {
        const categories = [];
        let def = num;
        if (typeof def === 'undefined') {
            def = pure.random.number({ min: 1, max: 10 });
        } else if (def > pure.definitions.commerce.department.length) {
            def = pure.definitions.commerce.department.length;
        }

        while (categories.length < def) {
            const category = pure.random.arrayElement(pure.definitions.commerce.department);
            if (categories.indexOf(category) === -1) {
                categories.push(category);
            }
        }

        return categories;
    };

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
     * @description Generate random product adjective
     * @method pure.commerce.productAdjective
     * @example
     * console.log(pure.commerce.productAdjective());
     * //outputs: "Tasty"
     */
    self.productAdjective = () => pure.random.arrayElement(pure.definitions.commerce.product_name.adjective);

    /**
     * productMaterial
     *
     * @description Generate random product material
     * @method pure.commerce.productMaterial
     * @example
     * console.log(pure.commerce.productMaterial());
     * //outputs: "Granite"
     */
    self.productMaterial = () => pure.random.arrayElement(pure.definitions.commerce.product_name.material);

    /**
     * product
     *
     * @description Generate random product name
     * @method pure.commerce.product
     * @example
     * console.log(pure.commerce.product());
     * //outputs: "Bike"
     */
    self.product = () => pure.random.arrayElement(pure.definitions.commerce.product_name.product);

    /**
     * productDescription
     *
     * @description Generate random product description
     * @method pure.commerce.productDescription
     * @example
     * console.log(pure.commerce.productDescription());
     * //outputs: "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart"
     */
    self.productDescription = () => pure.random.arrayElement(pure.definitions.commerce.product_description);

    return self;
}

module.exports = Commerce;
