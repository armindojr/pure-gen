/**
 * @namespace pure.finance
 */
var Finance = function (pure) {
  var ibanLib = require("./iban");
  var Helpers = pure.helpers,
      self = this;

  /**
   * account
   *
   * @method pure.finance.account
   * @param {number} length
   */
  self.account = function (length) {

      length = length || 8;

      var template = '';

      for (var i = 0; i < length; i++) {
          template = template + '#';
      }
      length = null;
      return Helpers.replaceSymbolWithNumber(template);
  };

  /**
   * accountName
   *
   * @method pure.finance.accountName
   */
  self.accountName = function () {

      return [Helpers.randomize(pure.definitions.finance.account_type), 'Account'].join(' ');
  };

  /**
   * routingNumber
   *
   * @method pure.finance.routingNumber
   */
  self.routingNumber = function () {

      var routingNumber = Helpers.replaceSymbolWithNumber('########');

      // Modules 10 straight summation.
      var sum = 0;

      for (var i = 0; i < routingNumber.length; i += 3) {
        sum += Number(routingNumber[i]) * 3;
        sum += Number(routingNumber[i + 1]) * 7;
        sum += Number(routingNumber[i + 2]) || 0;
      }

      return routingNumber + (Math.ceil(sum / 10) * 10 - sum);
  }

  /**
   * mask
   *
   * @method pure.finance.mask
   * @param {number} length
   * @param {boolean} parens
   * @param {boolean} ellipsis
   */
  self.mask = function (length, parens, ellipsis) {

      //set defaults
      length = (length == 0 || !length || typeof length == 'undefined') ? 4 : length;
      parens = (parens === null) ? true : parens;
      ellipsis = (ellipsis === null) ? true : ellipsis;

      //create a template for length
      var template = '';

      for (var i = 0; i < length; i++) {
          template = template + '#';
      }

      //prefix with ellipsis
      template = (ellipsis) ? ['...', template].join('') : template;

      template = (parens) ? ['(', template, ')'].join('') : template;

      //generate random numbers
      template = Helpers.replaceSymbolWithNumber(template);

      return template;
  };

  //min and max take in minimum and maximum amounts, dec is the decimal place you want rounded to, symbol is $, €, £, etc
  //NOTE: this returns a string representation of the value, if you want a number use parseFloat and no symbol

  /**
   * amount
   *
   * @method pure.finance.amount
   * @param {number} min
   * @param {number} max
   * @param {number} dec
   * @param {string} symbol
   *
   * @return {string}
   */
  self.amount = function (min, max, dec, symbol) {

      min = min || 0;
      max = max || 1000;
      dec = dec === undefined ? 2 : dec;
      symbol = symbol || '';
      var randValue = pure.random.number({ max: max, min: min, precision: Math.pow(10, -dec) });

      return symbol + randValue.toFixed(dec);
  };

  /**
   * transactionType
   *
   * @method pure.finance.transactionType
   */
  self.transactionType = function () {
      return Helpers.randomize(pure.definitions.finance.transaction_type);
  };

  /**
   * currencyCode
   *
   * @method pure.finance.currencyCode
   */
  self.currencyCode = function () {
      return pure.random.objectElement(pure.definitions.finance.currency)['code'];
  };

  /**
   * currencyName
   *
   * @method pure.finance.currencyName
   */
  self.currencyName = function () {
      return pure.random.objectElement(pure.definitions.finance.currency, 'key');
  };

  /**
   * currencySymbol
   *
   * @method pure.finance.currencySymbol
   */
  self.currencySymbol = function () {
      var symbol;

      while (!symbol) {
          symbol = pure.random.objectElement(pure.definitions.finance.currency)['symbol'];
      }
      return symbol;
  };

  /**
   * bitcoinAddress
   *
   * @method  pure.finance.bitcoinAddress
   */
  self.bitcoinAddress = function () {
    var addressLength = pure.random.number({ min: 25, max: 34 });

    var address = pure.random.arrayElement(['1', '3']);

    for (var i = 0; i < addressLength - 1; i++)
      address += pure.random.arrayElement('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'.split(''));

    return address;
  }

  /**
   * litecoinAddress
   *
   * @method  pure.finance.litecoinAddress
  */
  self.litecoinAddress = function () {
    var addressLength = pure.random.number({ min: 26, max: 33 });

    var address = pure.random.arrayElement(['L', 'M', '3']);

    for (var i = 0; i < addressLength; i++)
      address += pure.random.arrayElement('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'.split(''));

    return address;
  }

  /**
   * Credit card number
   * @method pure.finance.creditCardNumber
   * @param {string} provider | scheme
  */
  self.creditCardNumber = function(provider){
    provider = provider || "";
    var format, formats;
    var localeFormat = pure.definitions.finance.credit_card;
    if (provider in localeFormat) {
      formats = localeFormat[provider]; // there chould be multiple formats
      if (typeof formats === "string") {
        format = formats;
      } else {
        format = pure.random.arrayElement(formats);
      }
    } else if (provider.match(/#/)) { // The user chose an optional scheme
      format = provider;
    } else { // Choose a random provider
      if (typeof localeFormat === 'string') {
        format = localeFormat;
      } else if( typeof localeFormat === "object") {
        // Credit cards are in a object structure
        formats = pure.random.objectElement(localeFormat, "value"); // There chould be multiple formats
        if (typeof formats === "string") {
          format = formats;
        } else {
          format = pure.random.arrayElement(formats);
        }
      }
    }
    format = format.replace(/\//g,"")
    return Helpers.replaceCreditCardSymbols(format);
  };
  /**
   * Credit card CVV
   * @method pure.finance.creditCardCVV
  */
  self.creditCardCVV = function() {
    var cvv = "";
    for (var i = 0; i < 3; i++) {
      cvv += pure.random.number({max:9}).toString();
    }
    return cvv;
  };

  /**
   * ethereumAddress
   *
   * @method  pure.finance.ethereumAddress
   */
  self.ethereumAddress = function () {
    var address = pure.random.hexaDecimal(40).toLowerCase();

    return address;
  };

  /**
   * iban
   *
   * @method  pure.finance.iban
   */
  self.iban = function (formatted, country) {      
      var ibanFormat;
      if (typeof country === 'undefined') {
        ibanFormat = pure.random.arrayElement(ibanLib.formats);
      } else {
        ibanFormat = ibanLib.formats.filter((format) => {
          if (format.country === country.toUpperCase()) return format;
        })[0];

        if (!ibanFormat) {
          ibanFormat = pure.random.arrayElement(ibanLib.formats);
        }
      }

      var s = "";
      var count = 0;
      for (var b = 0; b < ibanFormat.bban.length; b++) {
          var bban = ibanFormat.bban[b];
          var c = bban.count;
          count += bban.count;
          while (c > 0) {
              if (bban.type == "a") {
                  s += pure.random.arrayElement(ibanLib.alpha);
              } else if (bban.type == "c") {
                  if (pure.random.number(100) < 80) {
                      s += pure.random.number(9);
                  } else {
                      s += pure.random.arrayElement(ibanLib.alpha);
                  }
              } else {
                  if (c >= 3 && pure.random.number(100) < 30) {
                      if (pure.random.boolean()) {
                          s += pure.random.arrayElement(ibanLib.pattern100);
                          c -= 2;
                      } else {
                          s += pure.random.arrayElement(ibanLib.pattern10);
                          c--;
                      }
                  } else {
                      s += pure.random.number(9);
                  }
              }
              c--;
          }
          s = s.substring(0, count);
      }
      var checksum = 98 - ibanLib.mod97(ibanLib.toDigitString(s + ibanFormat.country + "00"));
      if (checksum < 10) {
          checksum = "0" + checksum;
      }
      var iban = ibanFormat.country + checksum + s;
      return formatted ? iban.match(/.{1,4}/g).join(" ") : iban;
  };

  /**
   * bic
   *
   * @method  pure.finance.bic
   */
  self.bic = function () {
      var vowels = ["A", "E", "I", "O", "U"];
      var prob = pure.random.number(100);
      return Helpers.replaceSymbols("???") +
          pure.random.arrayElement(vowels) +
          pure.random.arrayElement(ibanLib.iso3166) +
          Helpers.replaceSymbols("?") + "1" +
          (prob < 10 ?
              Helpers.replaceSymbols("?" + pure.random.arrayElement(vowels) + "?") :
          prob < 40 ?
              Helpers.replaceSymbols("###") : "");
  };
};

module['exports'] = Finance;
