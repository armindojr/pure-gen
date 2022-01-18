class Address {
    constructor(pure) {
        this.zipCode = (format) => {
            let def = format;

            // if zip format is not specified, use the zip format defined for the locale
            if (typeof def === 'undefined') {
                const localeFormat = pure.registeredModules.address.postcode;
                if (typeof localeFormat === 'string') {
                    def = localeFormat;
                } else {
                    def = pure.random.arrayElement(localeFormat);
                }
            }

            return pure.helpers.replaceSymbols(def);
        };

        this.zipCodeByState = (state) => {
            const zipRange = pure.registeredModules.address.postcode_by_state[state];

            if (zipRange) {
                return pure.random.number(zipRange);
            }

            return this.zipCode();
        };

        this.city = (state) => {
            let def = state;

            if (typeof def !== 'string') {
                if (pure.registeredModules.address.city[def] === undefined) {
                    def = pure.random.objectElement(pure.registeredModules.address.city, 'key');
                } else {
                    def = this.state();
                }
            } else if (def.length < 1) {
                def = pure.random.objectElement(pure.registeredModules.address.city, 'key');
            } else {
                def = def.toLowerCase().charAt(0).toUpperCase() + def.slice(1);
            }

            let result = pure.random.arrayElement(pure.registeredModules.address.city[def]);

            if (result === undefined || result.length <= 1) {
                result = pure.fake(pure.random.arrayElement(pure.registeredModules.address.city));
            }

            return result;
        };

        this.cityPrefix = () => pure.random.arrayElement(pure.registeredModules.address.city_prefix);

        this.citySuffix = () => pure.random.arrayElement(pure.registeredModules.address.city_suffix);

        this.cityName = () => this.city();

        // TODO: Refactor to use real street names not pure.name.lastName()
        this.streetName = () => {
            let result;
            const random = pure.random.number(1);
            let suffix = this.streetSuffix();

            if (suffix !== '') {
                suffix = ` ${suffix}`;
            }

            if (random === 0) {
                result = pure.name.lastName() + suffix;
            } else if (random === 1) {
                result = pure.name.firstName() + suffix;
            } else {
                result = this.streetSuffix();
            }

            return result;
        };

        this.streetAddress = (useFullAddress) => {
            let def = useFullAddress;
            const random = pure.random.number(2);

            if (def === undefined) {
                def = false;
            }

            let address = '';

            if (random === 0) {
                address = `${pure.helpers.replaceSymbolWithNumber({ string: '#####' })} ${this.streetName()}`;
            } else if (random === 1) {
                address = `${pure.helpers.replaceSymbolWithNumber({ string: '####' })} ${this.streetName()}`;
            } else if (random === 2) {
                address = `${pure.helpers.replaceSymbolWithNumber({ string: '###' })} ${this.streetName()}`;
            } else {
                address = `${pure.helpers.replaceSymbolWithNumber({ string: '##' })} ${this.streetName()}`;
            }

            return def ? (`${address} ${this.secondaryAddress()}`) : address;
        };

        this.streetSuffix = () => pure.random.arrayElement(pure.registeredModules.address.street_suffix);

        this.streetPrefix = () => pure.random.arrayElement(pure.registeredModules.address.street_prefix);

        this.secondaryAddress = () => pure.helpers.replaceSymbolWithNumber({
            string: pure.random.arrayElement(
                [
                    'Apt. ###',
                    'Suite ###',
                ],
            ),
        });

        this.county = () => pure.random.arrayElement(pure.registeredModules.address.county);

        this.country = () => pure.random.arrayElement(pure.registeredModules.address.country);

        this.defaultCountry = () => pure.random.arrayElement(pure.registeredModules.address.default_country);

        this.countryCode = (alphaCode) => {
            let code;
            if (alphaCode === 'alpha-3') {
                code = pure.random.arrayElement(pure.registeredModules.address.country_code_alpha_3);
            } else {
                code = pure.random.arrayElement(pure.registeredModules.address.country_code);
            }

            return code;
        };

        this.state = (useAbbr) => (useAbbr
            ? pure.random.arrayElement(pure.registeredModules.address.state_abbr)
            : pure.random.arrayElement(pure.registeredModules.address.state));

        this.stateAbbr = () => pure.random.arrayElement(pure.registeredModules.address.state_abbr);

        this.latitude = (options) => {
            const def = options || {};
            const { max = 90, min = -90, precision = 4 } = def;

            return pure.random.number({ min, max, precision }).toFixed(precision);
        };

        this.longitude = (options) => {
            const def = options || {};
            const { max = 180, min = -180, precision = 4 } = def;

            return pure.random.number({ min, max, precision }).toFixed(precision);
        };

        this.direction = (useAbbr) => {
            let direction;

            if (useAbbr) {
                direction = pure.random.objectElement(pure.registeredModules.address.direction_abbr);
            } else {
                direction = pure.random.objectElement(pure.registeredModules.address.direction);
            }

            return pure.random.arrayElement(direction);
        };

        this.cardinalDirection = (useAbbr) => {
            let result = '';

            if (useAbbr) {
                result = pure.random.arrayElement(pure.registeredModules.address.direction_abbr.cardinal);
            } else {
                result = pure.random.arrayElement(pure.registeredModules.address.direction.cardinal);
            }

            return result;
        };

        this.ordinalDirection = (useAbbr) => {
            let result = '';

            if (useAbbr) {
                result = pure.random.arrayElement(pure.registeredModules.address.direction_abbr.ordinal);
            } else {
                result = pure.random.arrayElement(pure.registeredModules.address.direction.ordinal);
            }

            return result;
        };

        // TODO: rename radius param to distance
        this.nearbyGPSCoordinate = (options) => {
            const def = options || {};
            const { coordinate, radius = 10.0, isMetric = false } = def;
            // If there is no coordinate, the best we can do is return a random GPS coordinate.
            if (coordinate === undefined) {
                return [this.latitude(), this.longitude()];
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

            // This approach will likely result in a higher density of points near the center.
            const randomCoord = coordinateWithOffset(
                coordinate,
                degreesToRadians(Math.random() * 360.0),
                radius,
                isMetric,
            );

            return [randomCoord[0].toFixed(4), randomCoord[1].toFixed(4)];
        };

        this.timeZone = () => pure.random.arrayElement(pure.registeredModules.address.time_zone);
    }
}

module.exports = Address;
