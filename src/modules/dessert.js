export default class Dessert {
    constructor(pure) {
        this.pure = pure;
    }

    flavor() {
        return this.pure.random.arrayElement(this.pure.registeredModules.dessert.flavor);
    }

    topping() {
        return this.pure.random.arrayElement(this.pure.registeredModules.dessert.topping);
    }

    variety() {
        return this.pure.random.arrayElement(this.pure.registeredModules.dessert.variety);
    }
}
