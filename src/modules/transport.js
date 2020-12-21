/**
 *
 * @namespace pure.transport
 */
class Transport {
    constructor(pure) {
        /**
         * vehicleName
         *
         * @description Return random vehicle name
         * @method pure.transport.vehicleName
         * @example
         * console.log(pure.transport.vehicleName());
         * //outputs: "Fiat A4"
         */
        this.vehicleName = () => pure.fake('{{transport.vehicleManufacturer}} {{transport.vehicleModel}}');

        /**
         * vehicleManufacturer
         *
         * @description Return random manufacturer name
         * @method pure.transport.vehicleManufacturer
         * @example
         * console.log(pure.transport.vehicleManufacturer());
         * //outputs: "Mercedes Benz"
         */
        this.vehicleManufacturer = () => pure.random.arrayElement(pure.registeredModules.vehicle.manufacturer);

        /**
         * vehicleModel
         *
         * @description Return random model name
         * @method pure.transport.vehicleModel
         * @example
         * console.log(pure.transport.vehicleModel());
         * //outputs: "Civic"
         */
        this.vehicleModel = () => pure.random.arrayElement(pure.registeredModules.vehicle.model);

        /**
         * vehicleType
         *
         * @description Return random vehicle type
         * @method pure.transport.vehicleType
         * @example
         * console.log(pure.transport.vehicleType());
         * //outputs: "Coupe"
         */
        this.vehicleType = () => pure.random.arrayElement(pure.registeredModules.vehicle.type);

        /**
         * fuel
         *
         * @description Return random vehicle fuel
         * @method pure.transport.vehicleFuel
         * @example
         * console.log(pure.transport.vehicleFuel());
         * //outputs: "Electric"
         */
        this.vehicleFuel = () => pure.random.arrayElement(pure.registeredModules.vehicle.fuel);

        /**
         * vehicleVin
         *
         * @description Return random vehicle identification number
         * @method pure.transport.vehicleVin
         * @example
         * console.log(pure.transport.vehicleVin());
         * //outputs: "YV1MH682762184654"
         */
        this.vehicleVin = () => {
            let result = pure.random.alphaNumeric(10);
            result += pure.random.alpha({ count: 1, upcase: true });
            result += pure.random.alphaNumeric(1);
            // return five digit #
            result += pure.random.number({ min: 10000, max: 99999 });
            return result.toUpperCase();
        };

        /**
         * vehicleColor
         *
         * @description Return random color name
         * @method pure.transport.vehicleColor
         * @example
         * console.log(pure.transport.vehicleColor());
         * //outputs: "red"
         */
        this.vehicleColor = () => pure.commerce.color();

        /**
         * vehicleRM
         *
         * @description Return random vehicle registration mark typically found in UK
         * @method pure.transport.vehicleRM
         * @example
         * console.log(pure.transport.vehicleRM());
         * //outputs: "MF56UPA"
         */
        this.vehicleRM = () => (
            pure.random.alpha({ count: 2, upcase: true })
                + pure.random.number({ min: 0, max: 9 })
                + pure.random.number({ min: 0, max: 9 })
                + pure.random.alpha({ count: 3, upcase: true })
        ).toUpperCase();

        /**
         * airportName
         *
         * @description Generate random airport name
         * @method pure.transport.airportName
         * @example
         * console.log(pure.transport.airportName());
         * //outputs: "Ram Lala International Airport"
         */
        this.airportName = () => pure.random.arrayElement(pure.registeredModules.airport.name);

        /**
         * airportIata
         *
         * @description Generate random IATA airport code
         * @method pure.transport.airportIata
         * @example
         * console.log(pure.transport.airportIata());
         * //outputs: "YOA"
         */
        this.airportIata = () => pure.random.alpha({ count: 3, upcase: true });

        /**
         * airportIcao
         *
         * @description Generate random ICAO airport code
         * @method pure.transport.airportIcao
         * @example
         * console.log(pure.transport.airportIcao());
         * //outputs: "HR"
         */
        this.airportIcao = () => pure.random.alpha({ count: 2, upcase: true });
    }
}

module.exports = Transport;
