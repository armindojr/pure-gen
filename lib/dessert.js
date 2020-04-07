/**
 *
 * @namespace pure.dessert
 */
function Dessert(pure) {
    const self = this;
    /**
     * flavor
     *
     * @description Generate random flavor
     * @method pure.dessert.flavor
     * @example
     * console.log(pure.dessert.flavor());
     * //outputs: "Doughnut"
     */
    self.flavor = () => pure.random.arrayElement(pure.definitions.dessert.flavor);

    /**
     * topping
     *
     * @description Generate random topping
     * @method pure.dessert.topping
     * @example
     * console.log(pure.dessert.topping());
     * //outputs: "Peanut Butter"
     */
    self.topping = () => pure.random.arrayElement(pure.definitions.dessert.topping);

    /**
     * variety
     *
     * @description Generate random variety
     * @method pure.dessert.variety
     * @example
     * console.log(pure.dessert.variety());
     * //outputs: "Banana"
     */
    self.variety = () => pure.random.arrayElement(pure.definitions.dessert.variety);
}

module.exports = Dessert;
