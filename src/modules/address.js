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

        // TODO: this is strange passing in an array index.
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

            return pure.fake(formats[def]);
        };

        this.cityPrefix = () => pure.random.arrayElement(pure.registeredModules.address.city_prefix);

        this.citySuffix = () => pure.random.arrayElement(pure.registeredModules.address.city_suffix);

        this.cityName = () => pure.random.arrayElement(pure.registeredModules.address.city_name);

        // TODO: Refactor to use real street names not pure.name.lastName()
        this.streetName = () => {
            let result;
            let suffix = this.streetSuffix();

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
                result = this.streetSuffix();
            }

            return result;
        };

        this.streetAddress = (useFullAddress) => {
            let def = useFullAddress;

            if (def === undefined) {
                def = false;
            }

            let address = '';

            switch (pure.random.number(2)) {
            case 0:
                address = `${pure.helpers.replaceSymbolWithNumber({ string: '#####' })} ${this.streetName()}`;
                break;
            case 1:
                address = `${pure.helpers.replaceSymbolWithNumber({ string: '####' })} ${this.streetName()}`;
                break;
            case 2:
                address = `${pure.helpers.replaceSymbolWithNumber({ string: '###' })} ${this.streetName()}`;
                break;
            default:
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

        this.latitude = (options = {}) => {
            const { max = 90, min = -90, precision = 4 } = options;

            // TODO: review why using parseFloat on precision
            return pure.random.number({
                max,
                min,
                precision,
            }).toFixed(precision);
        };

        this.longitude = (options = {}) => {
            const { max = 180, min = -180, precision = 4 } = options;

            // TODO: review why using parseFloat on precision
            return pure.random.number({
                max,
                min,
                precision,
            }).toFixed(precision);
        };

        this.direction = (useAbbr) => {
            if (typeof useAbbr === 'undefined' || useAbbr === false) {
                return pure.random.arrayElement(pure.registeredModules.address.direction);
            }
            return pure.random.arrayElement(pure.registeredModules.address.direction_abbr);
        };

        this.cardinalDirection = (useAbbr) => {
            if (typeof useAbbr === 'undefined' || useAbbr === false) {
                return (
                    pure.random.arrayElement(pure.registeredModules.address.direction.slice(0, 4))
                );
            }
            return (
                pure.random.arrayElement(pure.registeredModules.address.direction_abbr.slice(0, 4))
            );
        };

        this.ordinalDirection = (useAbbr) => {
            if (typeof useAbbr === 'undefined' || useAbbr === false) {
                return (
                    pure.random.arrayElement(pure.registeredModules.address.direction.slice(4, 8))
                );
            }
            return (
                pure.random.arrayElement(pure.registeredModules.address.direction_abbr.slice(4, 8))
            );
        };

        // TODO: rename radius param to distance
        this.nearbyGPSCoordinate = (options = {}) => {
            const { coordinate, radius = 10.0, isMetric = false } = options;
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
                coordinate, degreesToRadians(Math.random() * 360.0), radius, isMetric,
            );

            return [randomCoord[0].toFixed(4), randomCoord[1].toFixed(4)];
        };

        this.timeZone = () => pure.random.arrayElement(pure.registeredModules.address.time_zone);
    }
}

module.exports = Address;
