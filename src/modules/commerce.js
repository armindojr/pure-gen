/**
 *
 * @namespace pure.commerce
 */
function Commerce(pure) {
    /**
     * color
     *
     * @description Generate random color name
     * @method pure.commerce.color
     * @example
     * console.log(pure.commerce.color());
     * //outputs: "pink"
     */
    this.color = () => pure.random.arrayElement(pure.definitions.commerce.color);

    /**
     * department
     *
     * @description Generate random department name
     * @method pure.commerce.department
     * @example
     * console.log(pure.commerce.department());
     * //outputs: "Games"
     */
    this.department = () => pure.random.arrayElement(pure.definitions.commerce.department);

    /**
     * productName
     *
     * @description Generate random product name
     * @method pure.commerce.productName
     * @example
     * console.log(pure.commerce.productName());
     * //outputs: "Gorgeous Cotton Shirt"
     */
    this.productName = () => `${pure.commerce.productAdjective()} ${
        pure.commerce.productMaterial()} ${
        pure.commerce.product()}`;

    /**
     * price
     *
     * @description Generate random product price
     * @param {object} options
     * @param {Number} [options.min= 1] Minimum product price
     * @param {Number} [options.max= 1000] Maximum product price
     * @param {Number} [options.dec= 2] Floating point precision
     * @param {Number} [options.symbol= empty] Price symbol
     * @param {boolean} [options.comma= false] Price separated by comma
     * @method pure.commerce.price
     * @example
     * console.log(pure.commerce.price());
     * //outputs: "941.00"
     */
    this.price = (options) => {
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

        const randValue = pure.random.number({ max: def.max, min: def.min, precision: def.dec }).toFixed(def.dec);
        const finalValue = def.symbol + randValue.toString();

        return (def.comma) ? finalValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : finalValue;
    };

    /**
     * categories
     *
     * @description Generate random categories
     * @param {Number} num Number of categories to return
     * @method pure.commerce.categories
     * @example
     * console.log(pure.commerce.categories());
     * //outputs: "[ 'Home', 'Clothing', 'Shoes', 'Toys', 'Tools' ]"
     */
    this.categories = (num) => {
        let categories = [];
        let def = num;
        if (typeof def === 'undefined') {
            def = pure.random.number({ min: 1, max: 10 });
        }

        if (def > pure.definitions.commerce.department.length) {
            categories = pure.definitions.commerce.department;
        } else {
            const shuffledArr = pure.helpers.shuffle(pure.definitions.commerce.department);
            const diff = pure.definitions.commerce.department.length - num;

            shuffledArr.splice(0, diff);
            categories = shuffledArr;
        }

        return categories;
    };

    /**
     * productAdjective
     *
     * @description Generate random product adjective
     * @method pure.commerce.productAdjective
     * @example
     * console.log(pure.commerce.productAdjective());
     * //outputs: "Tasty"
     */
    this.productAdjective = () => pure.random.arrayElement(pure.definitions.commerce.product_name.adjective);

    /**
     * productMaterial
     *
     * @description Generate random product material
     * @method pure.commerce.productMaterial
     * @example
     * console.log(pure.commerce.productMaterial());
     * //outputs: "Granite"
     */
    this.productMaterial = () => pure.random.arrayElement(pure.definitions.commerce.product_name.material);

    /**
     * product
     *
     * @description Generate random product name
     * @method pure.commerce.product
     * @example
     * console.log(pure.commerce.product());
     * //outputs: "Bike"
     */
    this.product = () => pure.random.arrayElement(pure.definitions.commerce.product_name.product);

    /**
     * productDescription
     *
     * @description Generate random product description
     * @method pure.commerce.productDescription
     * @example
     * console.log(pure.commerce.productDescription());
     * //outputs: "New range of formal shirts are designed keeping you in mind. With fits and
     * //styling that will make you stand apart"
     */
    this.productDescription = () => pure.random.arrayElement(pure.definitions.commerce.product_description);
}

module.exports = Commerce;
