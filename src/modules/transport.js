export class Transport {
  constructor(pure) {
    this.pure = pure;
  }

  vehicleName() {
    return `${this.pure.transport.vehicleManufacturer()} ${this.pure.transport.vehicleModel()}`;
  }

  vehicleManufacturer() {
    return this.pure.random.arrayElement(this.pure.registeredModules.transport.vehicleManufacturer);
  }

  vehicleModel() {
    return this.pure.random.arrayElement(this.pure.registeredModules.transport.vehicleModel);
  }

  vehicleType() {
    return this.pure.random.arrayElement(this.pure.registeredModules.transport.vehicleType);
  }

  vehicleFuel() {
    return this.pure.random.arrayElement(this.pure.registeredModules.transport.vehicleFuel);
  }

  vehicleVin() {
    let result = this.pure.random.alphaNumeric(10);
    result += this.pure.random.alpha({ count: 1, upcase: true });
    result += this.pure.random.alphaNumeric(1);
    // return five digit #
    result += this.pure.random.number({ min: 10000, max: 99999 });

    return result.toUpperCase();
  }

  vehicleColor() {
    return this.pure.commerce.color();
  }

  vehicleRM() {
    return (
      this.pure.random.alpha({ count: 2, upcase: true }) +
      this.pure.random.number({ min: 0, max: 9 }) +
      this.pure.random.number({ min: 0, max: 9 }) +
      this.pure.random.alpha({ count: 3, upcase: true })
    ).toUpperCase();
  }

  airportName() {
    return this.pure.random.arrayElement(this.pure.registeredModules.transport.airportName);
  }

  airportIata() {
    return this.pure.random.alpha({ count: 3, upcase: true });
  }

  airportIcao() {
    return this.pure.random.alpha({ count: 2, upcase: true });
  }
}
