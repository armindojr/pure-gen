/**
 *
 * @namespace pure.airport
 */
class Airport {
    constructor(pure) {
        /**
         * name
         *
         * @description Generate random airport name
         * @method pure.airport.name
         * @example
         * console.log(pure.airport.name());
         * //outputs: "Ram Lala International Airport"
         */
        this.name = () => pure.random.arrayElement(pure.registeredModules.airport.name);

        /**
         * iataCode
         *
         * @description Generate random IATA airport code
         * @method pure.airport.iataCode
         * @example
         * console.log(pure.airport.iataCode());
         * //outputs: "YOA"
         */
        this.iataCode = () => pure.random.alpha({ count: 3, upcase: true });

        /**
         * icaoCode
         *
         * @description Generate random ICAO airport code
         * @method pure.airport.icaoCode
         * @example
         * console.log(pure.airport.icaoCode());
         * //outputs: "HR"
         */
        this.icaoCode = () => pure.random.alpha({ count: 2, upcase: true });
    }
}

module.exports = Airport;
