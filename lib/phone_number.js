/**
 *
 * @namespace pure.phone
 */
function Phone(pure) {
    const self = this;

    /**
   * phoneNumber
   *
   * @method pure.phone.phoneNumber
   * @param {string} format
   * @memberOf pure.phone
   */
    self.phoneNumber = (format) => {
        const def = format || pure.phone.phoneFormats();
        return pure.helpers.replaceSymbolWithNumber(def);
    };

    // FIXME: this is strange passing in an array index.
    /**
   * phoneNumberFormat
   *
   * @method pure.phone.phoneFormatsArrayIndex
   * @param phoneFormatsArrayIndex
   * @memberOf pure.phone
   */
    self.phoneNumberFormat = (phoneFormatsArrayIndex) => {
        const format = phoneFormatsArrayIndex || 0;
        return pure.helpers.replaceSymbolWithNumber(pure.definitions.phone_number.formats[format]);
    };

    /**
   * phoneFormats
   *
   * @method pure.phone.phoneFormats
   */
    self.phoneFormats = () => pure.random.arrayElement(pure.definitions.phone_number.formats);

    return self;
}

module.exports = Phone;
