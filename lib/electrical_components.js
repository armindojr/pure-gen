/**
 *
 * @namespace pure.electricalComponents
 */
function ElectricalComponents(pure) {
    /**
     * active
     *
     * @description Generate random active components name
     * @method pure.electricalComponents.active
     * @example
     * console.log(pure.electricalComponents.active());
     * //outputs: "Diode"
     */
    this.active = () => pure.random.arrayElement(pure.definitions.electricalComponents.active);

    /**
     * passive
     *
     * @description Generate random passive components name
     * @method pure.electricalComponents.passive
     * @example
     * console.log(pure.electricalComponents.passive());
     * //outputs: "Varistor"
     */
    this.passive = () => pure.random.arrayElement(pure.definitions.electricalComponents.passive);

    /**
     * electromechanical
     *
     * @description Generate random electromechanical components name
     * @method pure.electricalComponents.electromechanical
     * @example
     * console.log(pure.electricalComponents.electromechanical());
     * //outputs: "crystal"
     */
    this.electromechanical = () => pure.random.arrayElement(pure.definitions.electricalComponents.electromechanical);
}

module.exports = ElectricalComponents;
