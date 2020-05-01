/**
 *
 * @namespace pure.dessert
 */
function Dessert(pure) {
    /**
     * flavor
     *
     * @description Generate random flavor
     * @method pure.dessert.flavor
     * @example
     * console.log(pure.dessert.flavor());
     * //outputs: "Doughnut"
     */
    this.flavor = () => pure.random.arrayElement(pure.definitions.dessert.flavor);

    /**
     * topping
     *
     * @description Generate random topping
     * @method pure.dessert.topping
     * @example
     * console.log(pure.dessert.topping());
     * //outputs: "Peanut Butter"
     */
    this.topping = () => pure.random.arrayElement(pure.definitions.dessert.topping);

    /**
     * variety
     *
     * @description Generate random variety
     * @method pure.dessert.variety
     * @example
     * console.log(pure.dessert.variety());
     * //outputs: "Banana"
     */
    this.variety = () => pure.random.arrayElement(pure.definitions.dessert.variety);
}

module.exports = Dessert;
