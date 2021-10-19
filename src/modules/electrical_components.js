class ElectricalComponents {
    constructor(pure) {
        this.active = () => pure.random.arrayElement(pure.registeredModules.electricalComponents.active);

        this.passive = () => pure.random.arrayElement(pure.registeredModules.electricalComponents.passive);

        this.electromechanical = () => {
            const result = pure.random.arrayElement(pure.registeredModules.electricalComponents.electromechanical);
            return result;
        };
    }
}

module.exports = ElectricalComponents;
