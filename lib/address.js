/**
 *
 * @namespace pure.address
 */
function Address(pure) {
    const f = pure.fake;
    const Helpers = pure.helpers;

    /**
   * Generates random zipcode from format. If format is not specified, the
   * locale's zip format is used.
   *
   * @method pure.address.zipCode
   * @param {String} format
   */
    this.zipCode = (format) => {
        let def = format;
        // if zip format is not specified, use the zip format defined for the locale
        if (typeof def === 'undefined') {
            const localeFormat = pure.definitions.address.postcode;
            if (typeof localeFormat === 'string') {
                def = localeFormat;
            } else {
                def = pure.random.arrayElement(localeFormat);
            }
        }
        return Helpers.replaceSymbols(def);
    };

    /**
   * Generates random zipcode from state abbreviation. If state abbreviation is
   * not specified, a random zip code is generated according to the locale's zip format.
   * Only works for locales with postcode_by_state definition. If a locale does not
   * have a postcode_by_state definition, a random zip code is generated according
   * to the locale's zip format.
   *
   * @method pure.address.zipCodeByState
   * @param {String} state
   */
    this.zipCodeByState = (state) => {
        const zipRange = pure.definitions.address.postcode_by_state[state];
        if (zipRange) {
            return pure.random.number(zipRange);
        }
        return pure.address.zipCode();
    };

    /**
   * Generates a random localized city name. The format string can contain any
   * method provided by pure wrapped in `{{}}`, e.g. `{{name.firstName}}` in
   * order to build the city name.
   *
   * If no format string is provided one of the following is randomly used:
   *
   * * `{{address.cityPrefix}} {{name.firstName}}{{address.citySuffix}}`
   * * `{{address.cityPrefix}} {{name.firstName}}`
   * * `{{name.firstName}}{{address.citySuffix}}`
   * * `{{name.lastName}}{{address.citySuffix}}`
   *
   * @method pure.address.city
   * @param {String} format
   */
    this.city = (format) => {
        let def = format;
        const formats = [
            '{{address.cityPrefix}} {{name.firstName}}{{address.citySuffix}}',
            '{{address.cityPrefix}} {{name.firstName}}',
            '{{name.firstName}}{{address.citySuffix}}',
            '{{name.lastName}}{{address.citySuffix}}',
        ];

        if (typeof def !== 'number') {
            def = pure.random.number(formats.length - 1);
        }

        return f(formats[def]);
    };

    /**
   * Return a random localized city prefix
   * @method pure.address.cityPrefix
   */
    this.cityPrefix = () => pure.random.arrayElement(pure.definitions.address.city_prefix);

    /**
   * Return a random localized city suffix
   *
   * @method pure.address.citySuffix
   */
    this.citySuffix = () => pure.random.arrayElement(pure.definitions.address.city_suffix);

    /**
   * cityName
   *
   * @method pure.address.cityName
   */
    this.cityName = () => pure.random.arrayElement(pure.definitions.address.city_name);

    /**
   * Returns a random localized street name
   *
   * @method pure.address.streetName
   */
    // TODO: Refactor to use real street names not pure.name.lastName()
    this.streetName = () => {
        let result;
        let suffix = pure.address.streetSuffix();
        if (suffix !== '') {
            suffix = ` ${suffix}`;
        }

        switch (pure.random.number(1)) {
        case 0:
            result = pure.name.lastName() + suffix;
            break;
        case 1:
            result = pure.name.firstName() + suffix;
            break;
        default:
            result = pure.address.streetSuffix();
        }
        return result;
    };

    //
    // TODO: change all these methods that accept a boolean to instead accept an options hash.
    //
    /**
   * Returns a random localized street address
   *
   * @method pure.address.streetAddress
   * @param {Boolean} useFullAddress
   */
    this.streetAddress = (useFullAddress) => {
        let def = useFullAddress;
        if (def === undefined) {
            def = false;
        }
        let address = '';
        switch (pure.random.number(2)) {
        case 0:
            address = `${Helpers.replaceSymbolWithNumber('#####')} ${pure.address.streetName()}`;
            break;
        case 1:
            address = `${Helpers.replaceSymbolWithNumber('####')} ${pure.address.streetName()}`;
            break;
        case 2:
            address = `${Helpers.replaceSymbolWithNumber('###')} ${pure.address.streetName()}`;
            break;
        default:
            address = `${Helpers.replaceSymbolWithNumber('##')} ${pure.address.streetName()}`;
        }
        return def ? (`${address} ${pure.address.secondaryAddress()}`) : address;
    };

    /**
   * streetSuffix
   *
   * @method pure.address.streetSuffix
   */
    this.streetSuffix = () => pure.random.arrayElement(pure.definitions.address.street_suffix);

    /**
   * streetPrefix
   *
   * @method pure.address.streetPrefix
   */
    this.streetPrefix = () => pure.random.arrayElement(pure.definitions.address.street_prefix);

    /**
   * secondaryAddress
   *
   * @method pure.address.secondaryAddress
   */
    this.secondaryAddress = () => Helpers.replaceSymbolWithNumber(pure.random.arrayElement(
        [
            'Apt. ###',
            'Suite ###',
        ],
    ));

    /**
   * county
   *
   * @method pure.address.county
   */
    this.county = () => pure.random.arrayElement(pure.definitions.address.county);

    /**
   * country
   *
   * @method pure.address.country
   */
    this.country = () => pure.random.arrayElement(pure.definitions.address.country);

    /**
   * defaultCountry
   *
   * @method pure.address.defaultCountry
   */
    this.defaultCountry = () => pure.random.arrayElement(pure.definitions.address.default_country);

    /**
   * countryCode
   *
   * @method pure.address.countryCode
   * @param {string} alphaCode default alpha-2
   */
    this.countryCode = (alphaCode) => {
        let code;
        if (alphaCode === 'alpha-3') {
            code = pure.random.arrayElement(pure.definitions.address.country_code_alpha_3);
        } else {
            code = pure.random.arrayElement(pure.definitions.address.country_code);
        }

        return code;
    };

    /**
   * state
   *
   * @method pure.address.state
   * @param {Boolean} useAbbr
   */
    this.state = (useAbbr) => (useAbbr
        ? pure.random.arrayElement(pure.definitions.address.state_abbr)
        : pure.random.arrayElement(pure.definitions.address.state));

    /**
   * stateAbbr
   *
   * @method pure.address.stateAbbr
   */
    this.stateAbbr = () => pure.random.arrayElement(pure.definitions.address.state_abbr);

    /**
   * latitude
   *
   * @method pure.address.latitude
   * @param {Double} max default is 90
   * @param {Double} min default is -90
   * @param {number} precision default is 4
   */
    this.latitude = (max, min, precision) => {
        const nmax = max || 90;
        const nmin = min || -90;
        const nprecision = precision || 4;

        return pure.random.number({
            max: nmax,
            min: nmin,
            precision: parseFloat(`${(0.0).toPrecision(nprecision)}1`),
        }).toFixed(nprecision);
    };

    /**
   * longitude
   *
   * @method pure.address.longitude
   * @param {Double} max default is 180
   * @param {Double} min default is -180
   * @param {number} precision default is 4
   */
    this.longitude = (max, min, precision) => {
        const nmax = max || 180;
        const nmin = min || -180;
        const nprecision = precision || 4;

        return pure.random.number({
            max: nmax,
            min: nmin,
            precision: parseFloat(`${(0.0).toPrecision(nprecision)}1`),
        }).toFixed(nprecision);
    };

    /**
   *  direction
   *
   * @method pure.address.direction
   * @param {Boolean} useAbbr return direction abbreviation. defaults to false
   */
    this.direction = (useAbbr) => {
        if (typeof useAbbr === 'undefined' || useAbbr === false) {
            return pure.random.arrayElement(pure.definitions.address.direction);
        }
        return pure.random.arrayElement(pure.definitions.address.direction_abbr);
    };

    this.direction.schema = {
        description: 'Generates a direction. Use optional useAbbr bool to return abbrevation',
        sampleResults: ['Northwest', 'South', 'SW', 'E'],
    };

    /**
   * cardinal direction
   *
   * @method pure.address.cardinalDirection
   * @param {Boolean} useAbbr return direction abbreviation. defaults to false
   */
    this.cardinalDirection = (useAbbr) => {
        if (typeof useAbbr === 'undefined' || useAbbr === false) {
            return (
                pure.random.arrayElement(pure.definitions.address.direction.slice(0, 4))
            );
        }
        return (
            pure.random.arrayElement(pure.definitions.address.direction_abbr.slice(0, 4))
        );
    };

    this.cardinalDirection.schema = {
        description: 'Generates a cardinal direction. Use optional useAbbr boolean to return abbrevation',
        sampleResults: ['North', 'South', 'E', 'W'],
    };

    /**
   * ordinal direction
   *
   * @method pure.address.ordinalDirection
   * @param {Boolean} useAbbr return direction abbreviation. defaults to false
   */
    this.ordinalDirection = (useAbbr) => {
        if (typeof useAbbr === 'undefined' || useAbbr === false) {
            return (
                pure.random.arrayElement(pure.definitions.address.direction.slice(4, 8))
            );
        }
        return (
            pure.random.arrayElement(pure.definitions.address.direction_abbr.slice(4, 8))
        );
    };

    this.ordinalDirection.schema = {
        description: 'Generates an ordinal direction. Use optional useAbbr boolean to return abbrevation',
        sampleResults: ['Northwest', 'Southeast', 'SW', 'NE'],
    };

    this.nearbyGPSCoordinate = (coordinate, radius, isMetric) => {
        // TODO: this isn't used somewhat, need to investigate
        // function randomFloat(min, max) {
        //     return Math.random() * (max - min) + min;
        // }
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
            const R = 6378.137; // Radius of the Earth (http://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html)
            const d = ismetric ? distance : kilometersToMiles(distance); // Distance in km

            const lat1 = degreesToRadians(coord[0]); // Current lat point converted to radians
            const lon1 = degreesToRadians(coord[1]); // Current long point converted to radians

            const lat2 = Math.asin(Math.sin(lat1) * Math.cos(d / R)
                + Math.cos(lat1) * Math.sin(d / R) * Math.cos(bearing));

            let lon2 = lon1 + Math.atan2(
                Math.sin(bearing) * Math.sin(d / R) * Math.cos(lat1),
                Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2),
            );

            // Keep longitude in range [-180, 180]
            if (lon2 > degreesToRadians(180)) {
                lon2 -= degreesToRadians(360);
            } else if (lon2 < degreesToRadians(-180)) {
                lon2 += degreesToRadians(360);
            }

            return [radiansToDegrees(lat2), radiansToDegrees(lon2)];
        }

        // If there is no coordinate, the best we can do is return a random GPS coordinate.
        if (coordinate === undefined) {
            return [pure.address.latitude(), pure.address.longitude()];
        }
        const nRadius = radius || 10.0;
        const nIsMetric = isMetric || false;

        // TODO: implement either a gaussian/uniform distribution of points in cicular region.
        // Possibly include param to function that allows user to choose between distributions.

        // This approach will likely result in a higher density of points near the center.
        const randomCoord = coordinateWithOffset(
            coordinate, degreesToRadians(Math.random() * 360.0), nRadius, nIsMetric,
        );
        return [randomCoord[0].toFixed(4), randomCoord[1].toFixed(4)];
    };

    return this;
}

module.exports = Address;
