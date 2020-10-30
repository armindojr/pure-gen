/**
 *
 * @namespace pure.vehicle
 */
class Vehicle {
    constructor(pure) {
        /**
         * vehicle
         *
         * @description Return random vehicle name
         * @method pure.vehicle.vehicle
         * @example
         * console.log(pure.vehicle.vehicle());
         * //outputs: "Fiat A4"
         */
        this.vehicle = () => pure.fake('{{vehicle.manufacturer}} {{vehicle.model}}');

        /**
         * manufacturer
         *
         * @description Return random manufacturer name
         * @method pure.vehicle.manufacturer
         * @example
         * console.log(pure.vehicle.manufacturer());
         * //outputs: "Mercedes Benz"
         */
        this.manufacturer = () => pure.random.arrayElement(pure.registeredModules.vehicle.manufacturer);

        /**
         * model
         *
         * @description Return random model name
         * @method pure.vehicle.model
         * @example
         * console.log(pure.vehicle.model());
         * //outputs: "Civic"
         */
        this.model = () => pure.random.arrayElement(pure.registeredModules.vehicle.model);

        /**
         * type
         *
         * @description Return random vehicle type
         * @method pure.vehicle.type
         * @example
         * console.log(pure.vehicle.type());
         * //outputs: "Coupe"
         */
        this.type = () => pure.random.arrayElement(pure.registeredModules.vehicle.type);

        /**
         * fuel
         *
         * @description Return random vehicle fuel
         * @method pure.vehicle.fuel
         * @example
         * console.log(pure.vehicle.fuel());
         * //outputs: "Electric"
         */
        this.fuel = () => pure.random.arrayElement(pure.registeredModules.vehicle.fuel);

        /**
         * vin
         *
         * @description Return random vehicle identification number
         * @method pure.vehicle.vin
         * @example
         * console.log(pure.vehicle.vin());
         * //outputs: "YV1MH682762184654"
         */
        this.vin = () => {
            let result = pure.random.alphaNumeric(10);
            result += pure.random.alpha({ count: 1, upcase: true });
            result += pure.random.alphaNumeric(1);
            // return five digit #
            result += pure.random.number({ min: 10000, max: 99999 });
            return result.toUpperCase();
        };

        /**
         * color
         *
         * @description Return random color name
         * @method pure.vehicle.color
         * @example
         * console.log(pure.vehicle.color());
         * //outputs: "red"
         */
        this.color = () => pure.fake('{{commerce.color}}');
    }
}

module.exports = Vehicle;
