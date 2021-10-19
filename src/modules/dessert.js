class Dessert {
    constructor(pure) {
        this.flavor = () => pure.random.arrayElement(pure.registeredModules.dessert.flavor);

        this.topping = () => pure.random.arrayElement(pure.registeredModules.dessert.topping);

        this.variety = () => pure.random.arrayElement(pure.registeredModules.dessert.variety);
    }
}

module.exports = Dessert;
