/**
 *
 * @namespace pure.dessert
 */
class Dessert {
    constructor(pure) {
        /**
         * flavor
         *
         * @description Generate random flavor
         * @method pure.dessert.flavor
         * @example
         * console.log(pure.dessert.flavor());
         * //outputs: "Doughnut"
         */
        this.flavor = () => pure.random.arrayElement(pure.registeredModules.dessert.flavor);

        /**
         * topping
         *
         * @description Generate random topping
         * @method pure.dessert.topping
         * @example
         * console.log(pure.dessert.topping());
         * //outputs: "Peanut Butter"
         */
        this.topping = () => pure.random.arrayElement(pure.registeredModules.dessert.topping);

        /**
         * variety
         *
         * @description Generate random variety
         * @method pure.dessert.variety
         * @example
         * console.log(pure.dessert.variety());
         * //outputs: "Banana"
         */
        this.variety = () => pure.random.arrayElement(pure.registeredModules.dessert.variety);
    }
}

module.exports = Dessert;
