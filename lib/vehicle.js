/**
 *
 * @namespace pure.vehicle
 */
function Vehicle(pure) {
    const self = this;

    /**
     * vehicle
     *
     * @description Return random vehicle name
     * @method pure.vehicle.vehicle
     * @example
     * console.log(pure.vehicle.vehicle());
     * //outputs: "Fiat A4"
     */
    self.vehicle = () => pure.fake('{{vehicle.manufacturer}} {{vehicle.model}}');

    self.vehicle.schema = {
        description: 'Generates a random vehicle.',
        sampleResults: ['BMW Explorer', 'Ford Camry', 'Lamborghini Ranchero'],
    };

    /**
     * manufacturer
     *
     * @description Return random manufacturer name
     * @method pure.vehicle.manufacturer
     * @example
     * console.log(pure.vehicle.manufacturer());
     * //outputs: "Mercedes Benz"
     */
    self.manufacturer = () => pure.random.arrayElement(pure.definitions.vehicle.manufacturer);

    self.manufacturer.schema = {
        description: 'Generates a manufacturer name.',
        sampleResults: ['Ford', 'Jeep', 'Tesla'],
    };


    /**
     * model
     *
     * @description Return random model name
     * @method pure.vehicle.model
     * @example
     * console.log(pure.vehicle.model());
     * //outputs: "Civic"
     */
    self.model = () => pure.random.arrayElement(pure.definitions.vehicle.model);

    self.model.schema = {
        description: 'Generates a vehicle model.',
        sampleResults: ['Explorer', 'Camry', 'Ranchero'],
    };

    /**
     * type
     *
     * @description Return random type
     * @method pure.vehicle.type
     * @example
     * console.log(pure.vehicle.type());
     * //outputs: "Coupe"
     */
    self.type = () => pure.random.arrayElement(pure.definitions.vehicle.type);

    self.type.schema = {
        description: 'Generates a vehicle type.',
        sampleResults: ['Coupe', 'Convertable', 'Sedan', 'SUV'],
    };

    /**
     * fuel
     *
     * @description Return random fuel
     * @method pure.vehicle.fuel
     * @example
     * console.log(pure.vehicle.fuel());
     * //outputs: "Electric"
     */
    self.fuel = () => pure.random.arrayElement(pure.definitions.vehicle.fuel);

    self.fuel.schema = {
        description: 'Generates a fuel type.',
        sampleResults: ['Electric', 'Gasoline', 'Diesel'],
    };

    /**
     * vin
     *
     * @description Return random vin number
     * @method pure.vehicle.vin
     * @example
     * console.log(pure.vehicle.vin());
     * //outputs: "YV1MH682762184654"
     */
    self.vin = () => {
        let result = pure.random.alphaNumeric(10);
        result += pure.random.alpha({ count: 1, upcase: true });
        result += pure.random.alphaNumeric(1);
        // return five digit #
        result += pure.random.number({ min: 10000, max: 100000 });
        return result.toUpperCase();
    };

    self.vin.schema = {
        description: 'Generates a valid VIN number.',
        sampleResults: ['YV1MH682762184654', '3C7WRMBJ2EG208836'],
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
    self.color = () => pure.fake('{{commerce.color}}');

    self.color.schema = {
        description: 'Generates a color',
        sampleResults: ['red', 'white', 'black'],
    };
}

module.exports = Vehicle;
