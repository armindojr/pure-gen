export default class ElectricalComponents {
    constructor(pure) {
        this.pure = pure;
    }

    active() {
        return this.pure.random.arrayElement(this.pure.registeredModules.electricalComponents.active);
    }

    passive() {
        return this.pure.random.arrayElement(this.pure.registeredModules.electricalComponents.passive);
    }

    electromechanical() {
        return this.pure.random.arrayElement(this.pure.registeredModules.electricalComponents.electromechanical);
    }
}
