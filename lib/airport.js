/**
 *
 * @namespace pure.airport
 */
var Airport = function (pure) {
  var self = this;

  /**
   * name
   *
   * @method pure.airport.name
   */
  self.name = function () {
    return pure.random.arrayElement(pure.definitions.airport.name);
  };

  self.name.schema = {
    "description": "Generates an international airport.",
    "sampleResults": ["Bristol Airport", "LaGuardia Airport", "Vancouver International Airport"]
  };

  /**
   * IATA code
   *
   * @method pure.airport.iataCode
   */
  self.iataCode = function () {
    return pure.random.alpha({ count: 3, upcase: true });
  };

  self.iataCode.schema = {
    "description": "Generates an airport IATA code.",
    "sampleResults": ["LAX", "NAP", "ABC"]
  };

  /**
   * ICAO code
   *
   * @method pure.airport.icaoCode
   */
  self.icaoCode = function () {
    return pure.random.alpha({ count: 2, upcase: true });
  };

  self.icaoCode.schema = {
    "description": "Generates an airport ICAO code.",
    "sampleResults": ["TR", "BG", "PA"]
  };
};

module["exports"] = Airport;
