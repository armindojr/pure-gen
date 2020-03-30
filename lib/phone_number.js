/**
 *
 * @namespace pure.phone
 */
var Phone = function (pure) {
  var self = this;

  /**
   * phoneNumber
   *
   * @method pure.phone.phoneNumber
   * @param {string} format
   * @memberOf pure.phone
   */
  self.phoneNumber = function (format) {
      format = format || pure.phone.phoneFormats();
      return pure.helpers.replaceSymbolWithNumber(format);
  };

  // FIXME: this is strange passing in an array index.
  /**
   * phoneNumberFormat
   *
   * @method pure.phone.phoneFormatsArrayIndex
   * @param phoneFormatsArrayIndex
   * @memberOf pure.phone
   */
  self.phoneNumberFormat = function (phoneFormatsArrayIndex) {
      phoneFormatsArrayIndex = phoneFormatsArrayIndex || 0;
      return pure.helpers.replaceSymbolWithNumber(pure.definitions.phone_number.formats[phoneFormatsArrayIndex]);
  };

  /**
   * phoneFormats
   *
   * @method pure.phone.phoneFormats
   */
  self.phoneFormats = function () {
    return pure.random.arrayElement(pure.definitions.phone_number.formats);
  };
  
  return self;

};

module['exports'] = Phone;
