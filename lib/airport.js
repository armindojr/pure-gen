/**
 *
 * @namespace pure.airport
 */
function Airport(pure) {
    const self = this;

    /**
     * name
     *
     * @description Generate random airport name
     * @method pure.airport.name
     * @example
     * console.log(pure.airport.name());
     * //outputs: "Ram Lala International Airport"
     */
    self.name = () => pure.random.arrayElement(pure.definitions.airport.name);

    /**
     * iataCode
     *
     * @description Generate random IATA airport code
     * @method pure.airport.iataCode
     * @example
     * console.log(pure.airport.iataCode());
     * //outputs: "YOA"
     */
    self.iataCode = () => pure.random.alpha({ count: 3, upcase: true });

    /**
     * icaoCode
     *
     * @description Generate random ICAO airport code
     * @method pure.airport.icaoCode
     * @example
     * console.log(pure.airport.icaoCode());
     * //outputs: "HR"
     */
    self.icaoCode = () => pure.random.alpha({ count: 2, upcase: true });
}

module.exports = Airport;
