class Transport {
    constructor(pure) {
        this.vehicleName = () => `${this.vehicleManufacturer()} ${this.vehicleModel()}`;

        this.vehicleManufacturer = () => pure.random.arrayElement(pure.registeredModules.transport.vehicleManufacturer);

        this.vehicleModel = () => pure.random.arrayElement(pure.registeredModules.transport.vehicleModel);

        this.vehicleType = () => pure.random.arrayElement(pure.registeredModules.transport.vehicleType);

        this.vehicleFuel = () => pure.random.arrayElement(pure.registeredModules.transport.vehicleFuel);

        this.vehicleVin = () => {
            let result = pure.random.alphaNumeric(10);
            result += pure.random.alpha({ count: 1, upcase: true });
            result += pure.random.alphaNumeric(1);
            // return five digit #
            result += pure.random.number({ min: 10000, max: 99999 });
            return result.toUpperCase();
        };

        this.vehicleColor = () => pure.commerce.color();

        this.vehicleRM = () => (
            pure.random.alpha({ count: 2, upcase: true })
                + pure.random.number({ min: 0, max: 9 })
                + pure.random.number({ min: 0, max: 9 })
                + pure.random.alpha({ count: 3, upcase: true })
        ).toUpperCase();

        this.airportName = () => pure.random.arrayElement(pure.registeredModules.transport.airportName);

        this.airportIata = () => pure.random.alpha({ count: 3, upcase: true });

        this.airportIcao = () => pure.random.alpha({ count: 2, upcase: true });
    }
}

module.exports = Transport;
