class Phone {
    constructor(pure) {
        this.phoneNumber = (format) => {
            const def = format || this.phoneFormats();
            return pure.helpers.replaceSymbolWithNumber({ string: def });
        };

        // TODO: this is strange passing in an array index.
        this.phoneNumberFormat = (phoneFormatsArrayIndex) => {
            const format = phoneFormatsArrayIndex || 0;
            return pure.helpers.replaceSymbolWithNumber({
                string: pure.registeredModules.phone_number.formats[format],
            });
        };

        this.phoneFormats = () => pure.random.arrayElement(pure.registeredModules.phone_number.formats);
    }
}

module.exports = Phone;
