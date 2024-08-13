export class Address {
  constructor(pure) {
    this.pure = pure;
  }

  zipCode(format) {
    let def = format;

    // if zip format is not specified, use the zip format defined for the locale
    if (typeof def === 'undefined') {
      const localeFormat = this.pure.registeredModules.address.postcode;

      if (typeof localeFormat === 'string') {
        def = localeFormat;
      } else {
        def = this.pure.random.arrayElement(localeFormat);
      }
    }

    return this.pure.helpers.replaceSymbols(def);
  }

  zipCodeByState(state) {
    const zipRange = this.pure.registeredModules.address.postcodeByState[state];

    if (zipRange) {
      return this.pure.random.number(zipRange);
    }

    return this.pure.address.zipCode();
  }

  city(state) {
    let def = state;

    if (typeof def !== 'string') {
      if (this.pure.registeredModules.address.city[def] === undefined) {
        def = this.pure.random.objectElement(this.pure.registeredModules.address.city, 'key');
      } else {
        def = this.pure.address.state();
      }
    } else if (def.length < 1) {
      def = this.pure.random.objectElement(this.pure.registeredModules.address.city, 'key');
    } else {
      def = def.toLowerCase().charAt(0).toUpperCase() + def.slice(1);
    }

    let result = this.pure.random.arrayElement(this.pure.registeredModules.address.city[def]);

    if (result === undefined || result.length <= 1) {
      result = this.pure.fake.parse(
        this.pure.random.arrayElement(this.pure.registeredModules.address.city)
      );
    }

    return result;
  }

  cityPrefix() {
    return this.pure.random.arrayElement(this.pure.registeredModules.address.cityPrefix);
  }

  citySuffix() {
    return this.pure.random.arrayElement(this.pure.registeredModules.address.citySuffix);
  }

  cityName() {
    return this.pure.address.city();
  }

  // TODO: Refactor to use real street names not pure.name.lastName()
  streetName() {
    let result;
    const random = this.pure.random.number(1);
    let suffix = this.pure.address.streetSuffix();

    if (suffix !== '') {
      suffix = ` ${suffix}`;
    }

    if (random === 0) {
      result = this.pure.name.lastName() + suffix;
    } else if (random === 1) {
      result = this.pure.name.firstName() + suffix;
    } else {
      result = this.pure.address.streetSuffix();
    }

    return result;
  }

  streetAddress(useFullAddress) {
    let def = useFullAddress;
    const random = this.pure.random.number(2);

    if (def === undefined) {
      def = false;
    }

    let address = '';

    if (random === 0) {
      address = `${this.pure.helpers.replaceSymbolWithNumber({
        string: '#####'
      })} ${this.pure.address.streetName()}`;
    } else if (random === 1) {
      address = `${this.pure.helpers.replaceSymbolWithNumber({
        string: '####'
      })} ${this.pure.address.streetName()}`;
    } else if (random === 2) {
      address = `${this.pure.helpers.replaceSymbolWithNumber({
        string: '###'
      })} ${this.pure.address.streetName()}`;
    } else {
      address = `${this.pure.helpers.replaceSymbolWithNumber({
        string: '##'
      })} ${this.pure.address.streetName()}`;
    }

    return def ? `${address} ${this.secondaryAddress()}` : address;
  }

  streetSuffix() {
    return this.pure.random.arrayElement(this.pure.registeredModules.address.streetSuffix);
  }

  streetPrefix() {
    return this.pure.random.arrayElement(this.pure.registeredModules.address.streetPrefix);
  }

  secondaryAddress() {
    return this.pure.helpers.replaceSymbolWithNumber({
      string: this.pure.random.arrayElement(['Apt. ###', 'Suite ###'])
    });
  }

  county() {
    // TODO: Add province support
    return this.pure.random.arrayElement(this.pure.registeredModules.address.county);
  }

  country() {
    return this.pure.random.arrayElement(this.pure.registeredModules.address.country);
  }

  defaultCountry() {
    return this.pure.random.arrayElement(this.pure.registeredModules.address.defaultCountry);
  }

  countryCode(alphaCode) {
    let code;

    if (alphaCode === 'alpha-3') {
      code = this.pure.random.arrayElement(this.pure.registeredModules.address.countryCodeAlpha3);
    } else {
      code = this.pure.random.arrayElement(this.pure.registeredModules.address.countryCode);
    }

    return code;
  }

  state(useAbbr) {
    return useAbbr
      ? this.pure.random.arrayElement(this.pure.registeredModules.address.stateAbbr)
      : this.pure.random.arrayElement(this.pure.registeredModules.address.state);
  }

  stateAbbr() {
    return this.pure.random.arrayElement(this.pure.registeredModules.address.stateAbbr);
  }

  latitude(options) {
    const def = options || {};
    const { max = 90, min = -90, precision = 4 } = def;

    return this.pure.random.number({ min, max, precision }).toFixed(precision);
  }

  longitude(options) {
    const def = options || {};
    const { max = 180, min = -180, precision = 4 } = def;

    return this.pure.random.number({ min, max, precision }).toFixed(precision);
  }

  direction(useAbbr) {
    let direction;

    if (useAbbr) {
      direction = this.pure.random.objectElement(this.pure.registeredModules.address.directionAbbr);
    } else {
      direction = this.pure.random.objectElement(this.pure.registeredModules.address.direction);
    }

    return this.pure.random.arrayElement(direction);
  }

  cardinalDirection(useAbbr) {
    let result = '';

    if (useAbbr) {
      result = this.pure.random.arrayElement(
        this.pure.registeredModules.address.directionAbbr.cardinal
      );
    } else {
      result = this.pure.random.arrayElement(
        this.pure.registeredModules.address.direction.cardinal
      );
    }

    return result;
  }

  ordinalDirection(useAbbr) {
    let result = '';

    if (useAbbr) {
      result = this.pure.random.arrayElement(
        this.pure.registeredModules.address.directionAbbr.ordinal
      );
    } else {
      result = this.pure.random.arrayElement(this.pure.registeredModules.address.direction.ordinal);
    }

    return result;
  }

  // TODO: rename radius param to distance
  nearbyGPSCoordinate(options) {
    const def = options || {};
    const { coordinate, radius = 10.0, isMetric = false } = def;
    // If there is no coordinate, the best we can do is return a random GPS coordinate.
    if (coordinate === undefined) {
      return [this.pure.address.latitude(), this.pure.address.longitude()];
    }

    function degreesToRadians(degrees) {
      return degrees * (Math.PI / 180.0);
    }

    function radiansToDegrees(radians) {
      return radians * (180.0 / Math.PI);
    }

    function kilometersToMiles(miles) {
      return miles * 0.621371;
    }

    function coordinateWithOffset(coord, bearing, distance, ismetric) {
      // Radius of the Earth (http://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html)
      const R = 6378.137;
      // Distance in km
      const d = ismetric ? distance : kilometersToMiles(distance);
      // Current lat point converted to radians
      const lat1 = degreesToRadians(coord[0]);
      // Current long point converted to radians
      const lon1 = degreesToRadians(coord[1]);
      const lat2 = Math.asin(
        Math.sin(lat1) * Math.cos(d / R) + Math.cos(lat1) * Math.sin(d / R) * Math.cos(bearing)
      );
      let lon2 =
        lon1 +
        Math.atan2(
          Math.sin(bearing) * Math.sin(d / R) * Math.cos(lat1),
          Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2)
        );

      // Keep longitude in range [-180, 180]
      if (lon2 > degreesToRadians(180)) {
        lon2 -= degreesToRadians(360);
      } else if (lon2 < degreesToRadians(-180)) {
        lon2 += degreesToRadians(360);
      }

      return [radiansToDegrees(lat2), radiansToDegrees(lon2)];
    }
    // This approach will likely result in a higher density of points near the center.
    const randomCoord = coordinateWithOffset(
      coordinate,
      degreesToRadians(Math.random() * 360.0),
      radius,
      isMetric
    );

    return [randomCoord[0].toFixed(4), randomCoord[1].toFixed(4)];
  }

  timeZone() {
    return this.pure.random.arrayElement(this.pure.registeredModules.address.timeZone);
  }
}
