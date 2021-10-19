class Commerce {
    constructor(pure) {
        this.color = () => pure.random.arrayElement(pure.registeredModules.commerce.color);

        this.department = () => pure.random.arrayElement(pure.registeredModules.commerce.department);

        this.productName = () => `${this.productAdjective()}`
        + ` ${this.productMaterial()} ${this.product()}`;

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

        this.categories = (num) => {
            let categories = [];
            let def = num;
            if (typeof def === 'undefined') {
                def = pure.random.number({ min: 1, max: 10 });
            }

            if (def > pure.registeredModules.commerce.department.length) {
                categories = pure.registeredModules.commerce.department;
            } else {
                const shuffledArr = pure.helpers.shuffle(pure.registeredModules.commerce.department);
                const diff = pure.registeredModules.commerce.department.length - num;

                shuffledArr.splice(0, diff);
                categories = shuffledArr;
            }

            return categories;
        };

        this.productAdjective = () => pure.random.arrayElement(pure.registeredModules.commerce.product_name.adjective);

        this.productMaterial = () => pure.random.arrayElement(pure.registeredModules.commerce.product_name.material);

        this.product = () => pure.random.arrayElement(pure.registeredModules.commerce.product_name.product);

        this.productDescription = () => pure.random.arrayElement(pure.registeredModules.commerce.product_description);
    }
}

module.exports = Commerce;
