export class Phone {
  constructor(pure) {
    this.pure = pure;
  }

  phoneNumber(format) {
    const def = format || this.pure.phone.phoneFormats();

    return this.pure.helpers.replaceSymbolWithNumber({ string: def });
  }

  // TODO: this is strange passing in an array index.
  phoneNumberFormat(phoneFormatsArrayIndex) {
    const format = phoneFormatsArrayIndex || 0;

    return this.pure.helpers.replaceSymbolWithNumber({
      string: this.pure.registeredModules.phoneNumber.formats[format]
    });
  }

  phoneFormats() {
    return this.pure.random.arrayElement(this.pure.registeredModules.phoneNumber.formats);
  }
}
