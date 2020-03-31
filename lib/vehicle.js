/**
 *
 * @namespace pure.vehicle
 */
function Vehicle(pure) {
    const self = this;
    const { fake } = pure;

    /**
   * vehicle
   *
   * @method pure.vehicle.vehicle
   */
    self.vehicle = () => fake('{{vehicle.manufacturer}} {{vehicle.model}}');

    self.vehicle.schema = {
        description: 'Generates a random vehicle.',
        sampleResults: ['BMW Explorer', 'Ford Camry', 'Lamborghini Ranchero'],
    };

    /**
   * manufacturer
   *
   * @method pure.vehicle.manufacturer
   */
    self.manufacturer = () => pure.random.arrayElement(pure.definitions.vehicle.manufacturer);

    self.manufacturer.schema = {
        description: 'Generates a manufacturer name.',
        sampleResults: ['Ford', 'Jeep', 'Tesla'],
    };


    /**
   * model
   *
   * @method pure.vehicle.model
   */
    self.model = () => pure.random.arrayElement(pure.definitions.vehicle.model);

    self.model.schema = {
        description: 'Generates a vehicle model.',
        sampleResults: ['Explorer', 'Camry', 'Ranchero'],
    };

    /**
   * type
   *
   * @method pure.vehicle.type
   */
    self.type = () => pure.random.arrayElement(pure.definitions.vehicle.type);

    self.type.schema = {
        description: 'Generates a vehicle type.',
        sampleResults: ['Coupe', 'Convertable', 'Sedan', 'SUV'],
    };

    /**
   * fuel
   *
   * @method pure.vehicle.fuel
   */
    self.fuel = () => pure.random.arrayElement(pure.definitions.vehicle.fuel);

    self.fuel.schema = {
        description: 'Generates a fuel type.',
        sampleResults: ['Electric', 'Gasoline', 'Diesel'],
    };

    /**
   * vin
   *
   * @method pure.vehicle.vin
   */
    self.vin = () => {
        let result = pure.random.alphaNumeric(10);
        result += pure.random.alpha({ count: 1, upcase: true });
        result += pure.random.alphaNumeric(1);
        result += pure.random.number({ min: 10000, max: 100000 }); // return five digit #
        return result.toUpperCase();
    };

    self.vin.schema = {
        description: 'Generates a valid VIN number.',
        sampleResults: ['YV1MH682762184654', '3C7WRMBJ2EG208836'],
    };

    /**
   * color
   *
   * @method pure.vehicle.color
   */
    self.color = () => fake('{{commerce.color}}');

    self.color.schema = {
        description: 'Generates a color',
        sampleResults: ['red', 'white', 'black'],
    };
}

module.exports = Vehicle;
