/**
 *
 * @namespace pure.helpers
 */
var Helpers = function (pure) {

  var self = this;

  /**
   * backword-compatibility
   *
   * @method pure.helpers.randomize
   * @param {array} array
   */
  self.randomize = function (array) {
      array = array || ["a", "b", "c"];
      return pure.random.arrayElement(array);
  };

  /**
   * slugifies string
   *
   * @method pure.helpers.slugify
   * @param {string} string
   */
  self.slugify = function (string) {
      string = string || "";
      return string.replace(/ /g, '-').replace(/[^\w\.\-]+/g, '');
  };

  /**
   * parses string for a symbol and replace it with a random number from 1-10
   *
   * @method pure.helpers.replaceSymbolWithNumber
   * @param {string} string
   * @param {string} symbol defaults to `"#"`
   */
  self.replaceSymbolWithNumber = function (string, symbol) {
      string = string || "";
      // default symbol is '#'
      if (symbol === undefined) {
          symbol = '#';
      }

      var str = '';
      for (var i = 0; i < string.length; i++) {
          if (string.charAt(i) == symbol) {
              str += pure.random.number(9);
          } else if (string.charAt(i) == "!"){
              str += pure.random.number({min: 2, max: 9});
          } else {
              str += string.charAt(i);
          }
      }
      return str;
  };

  /**
   * parses string for symbols (numbers or letters) and replaces them appropriately (# will be replaced with number,
   * ? with letter and * will be replaced with number or letter)
   *
   * @method pure.helpers.replaceSymbols
   * @param {string} string
   */
  self.replaceSymbols = function (string) {
      string = string || "";
      var alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
      var str = '';

      for (var i = 0; i < string.length; i++) {
          if (string.charAt(i) == "#") {
              str += pure.random.number(9);
          } else if (string.charAt(i) == "?") {
              str += pure.random.arrayElement(alpha);
          } else if (string.charAt(i) == "*") {
            str += pure.random.boolean() ? pure.random.arrayElement(alpha) : pure.random.number(9);
          } else {
              str += string.charAt(i);
          }
      }
      return str;
  };

  /**
   * replace symbols in a credit card schems including Luhn checksum
   *
   * @method pure.helpers.replaceCreditCardSymbols
   * @param {string} string
   * @param {string} symbol
   */

   self.replaceCreditCardSymbols = function(string, symbol) {
     symbol = symbol || "#";

     // Function calculating the Luhn checksum of a number string
     var getCheckBit = function(number) {
       number.reverse();
       number = number.map(function(num, index){
         if(index%2 === 0) {
           num *= 2;
           if(num>9) {
             num -= 9;
           }
         }
         return num;
       });
       var sum = number.reduce(function(prev,curr){return prev + curr;});
       return sum % 10;
     };

     string = string || "";
     string = pure.helpers.regexpStyleStringParse(string); // replace [4-9] with a random number in range etc...
     string = pure.helpers.replaceSymbolWithNumber(string, symbol); // replace ### with random numbers

     var numberList = string.replace(/\D/g,"").split("").map(function(num){return parseInt(num);});
     var checkNum = getCheckBit(numberList);
     return string.replace("L",checkNum);
   };

   /** string repeat helper, alternative to String.prototype.repeat.... See PR #382
   *
   * @method pure.helpers.repeatString
   * @param {string} string
   * @param {number} num
   */
   self.repeatString = function(string,num) {
     if(typeof num ==="undefined") {
       num = 0;
     }
     var text = "";
     for(var i = 0; i < num; i++){
       text += string.toString();
     }
     return text;
   };

   /**
    * parse string paterns in a similar way to RegExp
    *
    * e.g. "#{3}test[1-5]" -> "###test4"
    *
    * @method pure.helpers.regexpStyleStringParse
    * @param {string} string
    */
   self.regexpStyleStringParse = function(string){
     string = string || "";
     // Deal with range repeat `{min,max}`
     var RANGE_REP_REG = /(.)\{(\d+)\,(\d+)\}/;
     var REP_REG = /(.)\{(\d+)\}/;
     var RANGE_REG = /\[(\d+)\-(\d+)\]/;
     var min, max, tmp, repetitions;
     var token = string.match(RANGE_REP_REG);
     while(token !== null){
       min = parseInt(token[2]);
       max =  parseInt(token[3]);
       // switch min and max
       if(min>max) {
         tmp = max;
         max = min;
         min = tmp;
       }
       repetitions = pure.random.number({min:min,max:max});
       string = string.slice(0,token.index) + pure.helpers.repeatString(token[1], repetitions) + string.slice(token.index+token[0].length);
       token = string.match(RANGE_REP_REG);
     }
     // Deal with repeat `{num}`
     token = string.match(REP_REG);
     while(token !== null){
       repetitions = parseInt(token[2]);
       string = string.slice(0,token.index)+ pure.helpers.repeatString(token[1], repetitions) + string.slice(token.index+token[0].length);
       token = string.match(REP_REG);
     }
     // Deal with range `[min-max]` (only works with numbers for now)
     //TODO: implement for letters e.g. [0-9a-zA-Z] etc.

     token = string.match(RANGE_REG);
     while(token !== null){
       min = parseInt(token[1]); // This time we are not capturing the char befor `[]`
       max =  parseInt(token[2]);
       // switch min and max
       if(min>max) {
         tmp = max;
         max = min;
         min = tmp;
       }
        string = string.slice(0,token.index) +
          pure.random.number({min:min, max:max}).toString() +
          string.slice(token.index+token[0].length);
        token = string.match(RANGE_REG);
     }
     return string;
   };

  /**
   * takes an array and randomizes it in place then returns it
   * 
   * uses the modern version of the Fisher–Yates algorithm
   *
   * @method pure.helpers.shuffle
   * @param {array} o
   */
  self.shuffle = function (o) {
      if (typeof o === 'undefined' || o.length === 0) {
        return o || [];
      }
      o = o || ["a", "b", "c"];
      for (var x, j, i = o.length - 1; i > 0; --i) {
        j = pure.random.number(i);
        x = o[i];
        o[i] = o[j];
        o[j] = x;
      }
      return o;
  };

  /**
   * mustache
   *
   * @method pure.helpers.mustache
   * @param {string} str
   * @param {object} data
   */
  self.mustache = function (str, data) {
    if (typeof str === 'undefined') {
      return '';
    }
    for(var p in data) {
      var re = new RegExp('{{' + p + '}}', 'g')
      str = str.replace(re, data[p]);
    }
    return str;
  };

  /**
   * createCard
   *
   * @method pure.helpers.createCard
   */
  self.createCard = function () {
      return {
          "name": pure.name.findName(),
          "username": pure.internet.userName(),
          "email": pure.internet.email(),
          "address": {
              "streetA": pure.address.streetName(),
              "streetB": pure.address.streetAddress(),
              "streetC": pure.address.streetAddress(true),
              "streetD": pure.address.secondaryAddress(),
              "city": pure.address.city(),
              "state": pure.address.state(),
              "country": pure.address.country(),
              "zipcode": pure.address.zipCode(),
              "geo": {
                  "lat": pure.address.latitude(),
                  "lng": pure.address.longitude()
              }
          },
          "phone": pure.phone.phoneNumber(),
          "website": pure.internet.domainName(),
          "company": {
              "name": pure.company.companyName(),
              "catchPhrase": pure.company.catchPhrase(),
              "bs": pure.company.bs()
          },
          "posts": [
              {
                  "words": pure.lorem.words(),
                  "sentence": pure.lorem.sentence(),
                  "sentences": pure.lorem.sentences(),
                  "paragraph": pure.lorem.paragraph()
              },
              {
                  "words": pure.lorem.words(),
                  "sentence": pure.lorem.sentence(),
                  "sentences": pure.lorem.sentences(),
                  "paragraph": pure.lorem.paragraph()
              },
              {
                  "words": pure.lorem.words(),
                  "sentence": pure.lorem.sentence(),
                  "sentences": pure.lorem.sentences(),
                  "paragraph": pure.lorem.paragraph()
              }
          ],
          "accountHistory": [pure.helpers.createTransaction(), pure.helpers.createTransaction(), pure.helpers.createTransaction()]
      };
  };

  /**
   * contextualCard
   *
   * @method pure.helpers.contextualCard
   */
  self.contextualCard = function () {
    var name = pure.name.firstName(),
        userName = pure.internet.userName(name);
    return {
        "name": name,
        "username": userName,
        "avatar": pure.internet.avatar(),
        "email": pure.internet.email(userName),
        "dob": pure.date.past(50, new Date("Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)")),
        "phone": pure.phone.phoneNumber(),
        "address": {
            "street": pure.address.streetName(true),
            "suite": pure.address.secondaryAddress(),
            "city": pure.address.city(),
            "zipcode": pure.address.zipCode(),
            "geo": {
                "lat": pure.address.latitude(),
                "lng": pure.address.longitude()
            }
        },
        "website": pure.internet.domainName(),
        "company": {
            "name": pure.company.companyName(),
            "catchPhrase": pure.company.catchPhrase(),
            "bs": pure.company.bs()
        }
    };
  };


  /**
   * userCard
   *
   * @method pure.helpers.userCard
   */
  self.userCard = function () {
      return {
          "name": pure.name.findName(),
          "username": pure.internet.userName(),
          "email": pure.internet.email(),
          "address": {
              "street": pure.address.streetName(true),
              "suite": pure.address.secondaryAddress(),
              "city": pure.address.city(),
              "zipcode": pure.address.zipCode(),
              "geo": {
                  "lat": pure.address.latitude(),
                  "lng": pure.address.longitude()
              }
          },
          "phone": pure.phone.phoneNumber(),
          "website": pure.internet.domainName(),
          "company": {
              "name": pure.company.companyName(),
              "catchPhrase": pure.company.catchPhrase(),
              "bs": pure.company.bs()
          }
      };
  };

  /**
   * createTransaction
   *
   * @method pure.helpers.createTransaction
   */
  self.createTransaction = function(){
    return {
      "amount" : pure.finance.amount(),
      "date" : new Date(2012, 1, 2),  //TODO: add a ranged date method
      "business": pure.company.companyName(),
      "name": [pure.finance.accountName(), pure.finance.mask()].join(' '),
      "type" : self.randomize(pure.definitions.finance.transaction_type),
      "account" : pure.finance.account()
    };
  };

  return self;

};


/*
String.prototype.capitalize = function () { //v1.0
    return this.replace(/\w+/g, function (a) {
        return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
    });
};
*/

module['exports'] = Helpers;
