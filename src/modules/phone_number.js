/**
 *
 * @namespace pure.phone
 */
class Phone {
    constructor(pure) {
        /**
         * phoneNumber
         *
         * @description Return random phone number
         * @param {string} [format= random] What format to use
         * @method pure.phone.phoneNumber
         * @example
         * console.log(pure.phone.phoneNumber());
         * //outputs: "1-273-245-5292 x193"
         */
        this.phoneNumber = (format) => {
            const def = format || this.phoneFormats();
            return pure.helpers.replaceSymbolWithNumber({ string: def });
        };

        /**
         * phoneNumberFormat
         *
         * @description Return phone number based on random locale format
         * @param {Number} [phoneFormatsArrayIndex= 0] Index to use when retrieving format from locale
         * @method pure.phone.phoneNumberFormat
         * @example
         * console.log(pure.phone.phoneNumberFormat());
         * //outputs: "1-273-245-5292 x193"
         */
        // TODO: this is strange passing in an array index.
        this.phoneNumberFormat = (phoneFormatsArrayIndex) => {
            const format = phoneFormatsArrayIndex || 0;
            return pure.helpers.replaceSymbolWithNumber({
                string: pure.registeredModules.phone_number.formats[format],
            });
        };

        /**
         * phoneFormats
         *
         * @description Return random locale format
         * @method pure.phone.phoneFormats
         * @example
         * console.log(pure.phone.phoneFormats());
         * //outputs: "(!##) !##-####"
         */
        this.phoneFormats = () => pure.random.arrayElement(pure.registeredModules.phone_number.formats);
    }
}

module.exports = Phone;
