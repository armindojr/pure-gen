/**
 *
 * @namespace pure.address
 */
function Address(pure) {
    const Helpers = pure.helpers;

    /**
     * zipCode
     *
     * @description Generates random zipcode from format.
     * <br> If format is not specified, the locale's zip format is used.
     * @param {String} [format=Locale default format] What format to use when generate zipCode
     * @method pure.address.zipCode
     * @example
     * console.log(pure.address.zipCode());
     * //outputs: "54566-5363"
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
     * zipCodeByState
     *
     * @description Generates random zipcode from state abbreviation. If state abbreviation is
     * <br> not specified, a random zip code is generated according to the locale's zip format.
     * <br> Only works for locales with postcode_by_state definition. If a locale does not
     * <br> have a postcode_by_state definition, a random zip code is generated according
     * <br> to the locale's zip format.
     * @param {String} state State used to format zipCode
     * @method pure.address.zipCodeByState
     * @example
     * pure.locale = 'en_US'
     * console.log(pure.address.zipCodeByState('CA'))
     * //outputs: "91357"
     */
    this.zipCodeByState = (state) => {
        const zipRange = pure.definitions.address.postcode_by_state[state];
        if (zipRange) {
            return pure.random.number(zipRange);
        }
        return pure.address.zipCode();
    };

    /**
     * city
     *
     * @description Generates a random localized city name. The format string can contain any
     * <br> method provided by pure wrapped in `{{}}`, e.g. `{{name.firstName}}` in
     * <br> order to build the city name.
     * <br> If no format string is provided one of the following is randomly used:
     * <br>
     * <br> * `{{address.cityPrefix}} {{name.firstName}}{{address.citySuffix}}`
     * <br> * `{{address.cityPrefix}} {{name.firstName}}`
     * <br> * `{{name.firstName}}{{address.citySuffix}}`
     * <br> * `{{name.lastName}}{{address.citySuffix}}`
     * @param {String} format What format to use when generate city name
     * @method pure.address.city
     * @example
     * console.log(pure.address.city());
     * //outputs: "Roobchester"
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

        return pure.fake(formats[def]);
    };

    /**
     * cityPrefix
     *
     * @description Return a random localized city prefix
     * @method pure.address.cityPrefix
     * @example
     * console.log(pure.address.cityPrefix());
     * //outputs: "New"
     */
    this.cityPrefix = () => pure.random.arrayElement(pure.definitions.address.city_prefix);

    /**
     * citySuffix
     *
     * @description Return a random localized city suffix
     * @method pure.address.citySuffix
     * @example
     * console.log(pure.address.citySuffix());
     * //outputs: "port"
     */
    this.citySuffix = () => pure.random.arrayElement(pure.definitions.address.city_suffix);

    /**
     * cityName
     *
     * @description Return a random localized city name
     * @method pure.address.cityName
     * @example
     * pure.locale = 'pt_PT'
     * console.log(pure.address.cityName());
     * //outputs: "Gafanha da Nazaré"
     */
    this.cityName = () => pure.random.arrayElement(pure.definitions.address.city_name);

    /**
     * streetName
     *
     * @description Returns a random localized street name
     * @method pure.address.streetName
     * @example
     * console.log(pure.address.streetName());
     * //outputs: "Botsford Mills"
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

    /**
     * streetAddress
     *
     * @description Returns a random localized street address
     * @param {Boolean} useFullAddress Change street address to use full address
     * @method pure.address.streetAddress
     * @example
     * console.log(pure.address.streetAddress());
     * //outputs: "947 Lina Wells"
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
     * @description Returns a localized street suffix
     * @method pure.address.streetSuffix
     * @example
     * console.log(pure.address.streetSuffix());
     * //outputs: "Skyway"
     */
    this.streetSuffix = () => pure.random.arrayElement(pure.definitions.address.street_suffix);

    /**
     * streetPrefix
     *
     * @description Returns a localized street prefix
     * @method pure.address.streetPrefix
     * @example
     * pure.locale = 'pt_PT'
     * console.log(pure.address.streetPrefix());
     * //outputs: "Acesso"
     */
    this.streetPrefix = () => pure.random.arrayElement(pure.definitions.address.street_prefix);

    /**
     * secondaryAddress
     *
     * @description Returns a secondary address
     * @method pure.address.secondaryAddress
     * @example
     * console.log(pure.address.secondaryAddress());
     * //outputs: "Apt. 110"
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
     * @description Returns a localized county
     * @method pure.address.county
     * @example
     * console.log(pure.address.county());
     * //outputs: "Bedfordshire"
     */
    this.county = () => pure.random.arrayElement(pure.definitions.address.county);

    /**
     * country
     *
     * @description Returns a localized country
     * @method pure.address.country
     * @example
     * console.log(pure.address.country());
     * //outputs: "Philippines"
     */
    this.country = () => pure.random.arrayElement(pure.definitions.address.country);

    /**
     * defaultCountry
     *
     * @description Returns a localized default country
     * @method pure.address.defaultCountry
     * @example
     * console.log(pure.address.defaultCountry());
     * //outputs: "United States of America"
     */
    this.defaultCountry = () => pure.random.arrayElement(pure.definitions.address.default_country);

    /**
     * countryCode
     *
     * @description Returns a random country code
     * @param {string} [alphaCode= alpha-2] Define what type of code return
     * @method pure.address.countryCode
     * @example
     * console.log(pure.address.countryCode());
     * //outputs: "GN"
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
     * @description Returns random localized state
     * @param {Boolean} [useAbbr= false] Define if state is abbreviated or not
     * @method pure.address.state
     * @example
     * console.log(pure.address.state());
     * //outputs: "Maine"
     */
    this.state = (useAbbr) => (useAbbr
        ? pure.random.arrayElement(pure.definitions.address.state_abbr)
        : pure.random.arrayElement(pure.definitions.address.state));


    /**
     * stateAbbr
     *
     * @description Returns random localized state abbreviated
     * @method pure.address.stateAbbr
     * @example
     * console.log(pure.address.stateAbbr());
     * //outputs: "SD"
     */
    this.stateAbbr = () => pure.random.arrayElement(pure.definitions.address.state_abbr);

    /**
     * latitude
     *
     * @description Returns random latitude respecting parameters
     * @param {Double} [max=90] Valid max range of latitude
     * @param {Double} [min=-90] Valid min range of latitude
     * @param {number} [precision=4] Floating point precision
     * @method pure.address.latitude
     * @example
     * console.log(pure.address.latitude());
     * //outputs: "-24.9689"
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
     * @description Returns random longitude respecting parameters
     * @param {Double} [max=180] Valid max range of longitude
     * @param {Double} [min=-180] Valid min range of longitude
     * @param {number} [precision=4] Floating point precision
     * @method pure.address.longitude
     * @example
     * console.log(pure.address.longitude());
     * //outputs: "-19.0215"
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
     * direction
     *
     * @description Returns random direction
     * @param {Boolean} [useAbbr=false] Direction abbreviation
     * @method pure.address.direction
     * @example
     * console.log(pure.address.direction());
     * //outputs: "Northeast"
     */
    this.direction = (useAbbr) => {
        if (typeof useAbbr === 'undefined' || useAbbr === false) {
            return pure.random.arrayElement(pure.definitions.address.direction);
        }
        return pure.random.arrayElement(pure.definitions.address.direction_abbr);
    };

    /**
     * cardinalDirection
     *
     * @description Returns random cardinal direction
     * @param {Boolean} [useAbbr=false] Cardinal direction abbreviation
     * @method pure.address.cardinalDirection
     * @example
     * console.log(pure.address.cardinalDirection());
     * //outputs: "South"
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

    /**
     * ordinalDirection
     *
     * @description Returns random ordinal direction
     * @param {Boolean} [useAbbr=false] Ordinal direction abbreviation
     * @method pure.address.ordinalDirection
     * @example
     * console.log(pure.address.ordinalDirection());
     * //outputs: "Southwest"
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

    /**
     * nearbyGPSCoordinate
     *
     * @description Returns random nearby GPS coordinate closed to specified point
     * @param {Array} [coordinate=['random', 'random']] Array with latitude and longitude
     * @param {Boolean} [radius=10.0]
     * @param {Boolean} [isMetric=false]
     * @method pure.address.nearbyGPSCoordinate
     * @example
     * console.log(pure.address.nearbyGPSCoordinate());
     * //outputs: "[ '-87.0506', '-95.7426' ]"
     */
    this.nearbyGPSCoordinate = (coordinate, radius, isMetric) => {
        // If there is no coordinate, the best we can do is return a random GPS coordinate.
        if (coordinate === undefined) {
            return [pure.address.latitude(), pure.address.longitude()];
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
        const nRadius = radius || 10.0;
        const nIsMetric = isMetric || false;

        // This approach will likely result in a higher density of points near the center.
        const randomCoord = coordinateWithOffset(
            coordinate, degreesToRadians(Math.random() * 360.0), nRadius, nIsMetric,
        );
        return [randomCoord[0].toFixed(4), randomCoord[1].toFixed(4)];
    };
}

module.exports = Address;
