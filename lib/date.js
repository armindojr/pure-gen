/**
 *
 * @namespace pure.date
 */
var _Date = function (pure) {
  var self = this;
  /**
   * past
   *
   * @method pure.date.past
   * @param {number} years
   * @param {date} refDate
   */
  self.past = function (years, refDate) {
      var date = new Date();
      if (typeof refDate !== "undefined") {
          date = new Date(Date.parse(refDate));
      }

      var range = {
        min: 1000,
        max: (years || 1) * 365 * 24 * 3600 * 1000
      };

      var past = date.getTime();
      past -= pure.random.number(range); // some time from now to N years ago, in milliseconds
      date.setTime(past);

      return date;
  };

  /**
   * future
   *
   * @method pure.date.future
   * @param {number} years
   * @param {date} refDate
   */
  self.future = function (years, refDate) {
      var date = new Date();
      if (typeof refDate !== "undefined") {
          date = new Date(Date.parse(refDate));
      }

      var range = {
        min: 1000,
        max: (years || 1) * 365 * 24 * 3600 * 1000
      };

      var future = date.getTime();
      future += pure.random.number(range); // some time from now to N years later, in milliseconds
      date.setTime(future);

      return date;
  };

  /**
   * between
   *
   * @method pure.date.between
   * @param {date} from
   * @param {date} to
   */
  self.between = function (from, to) {
      var fromMilli = Date.parse(from);
      var dateOffset = pure.random.number(Date.parse(to) - fromMilli);

      var newDate = new Date(fromMilli + dateOffset);

      return newDate;
  };

    /**
   * arrayBetween
   *
   * @method pure.date.arrayBetween
   * @param {date} from
   * @param {date} to
   * @param {num} num number of samples to return in array
   */
  self.arrayBetween = function (from, to, num) {
    if (typeof num == 'undefined') { num = 3; }
    var newDates = [];
    var fromMilli = Date.parse(from);
    var dateOffset = (Date.parse(to) - fromMilli) / ( num + 1 );
    var lastDate = from
    for (var i = 0; i < num; i++) {
        fromMilli = Date.parse(lastDate);
        lastDate = new Date(fromMilli + dateOffset)
        newDates.push(lastDate)
    }
    return newDates;
  };

  /**
   * recent
   *
   * @method pure.date.recent
   * @param {number} days
   * @param {date} refDate
   */
  self.recent = function (days, refDate) {
      var date = new Date();
      if (typeof refDate !== "undefined") {
          date = new Date(Date.parse(refDate));
      }

      var range = {
        min: 1000,
        max: (days || 1) * 24 * 3600 * 1000
      };

      var future = date.getTime();
      future -= pure.random.number(range); // some time from now to N days ago, in milliseconds
      date.setTime(future);

      return date;
  };

  /**
   * soon
   *
   * @method pure.date.soon
   * @param {number} days
   * @param {date} refDate
   */
  self.soon = function (days, refDate) {
      var date = new Date();
      if (typeof refDate !== "undefined") {
          date = new Date(Date.parse(refDate));
      }

      var range = {
        min: 1000,
        max: (days || 1) * 24 * 3600 * 1000
      };

      var future = date.getTime();
      future += pure.random.number(range); // some time from now to N days later, in milliseconds
      date.setTime(future);

      return date;
  };

  /**
   * month
   *
   * @method pure.date.month
   * @param {object} options
   */
  self.month = function (options) {
      options = options || {};

      var type = 'wide';
      if (options.abbr) {
          type = 'abbr';
      }
      if (options.context && typeof pure.definitions.date.month[type + '_context'] !== 'undefined') {
          type += '_context';
      }

      var source = pure.definitions.date.month[type];

      return pure.random.arrayElement(source);
  };

  /**
   * weekday
   *
   * @param {object} options
   * @method pure.date.weekday
   */
  self.weekday = function (options) {
      options = options || {};

      var type = 'wide';
      if (options.abbr) {
          type = 'abbr';
      }
      if (options.context && typeof pure.definitions.date.weekday[type + '_context'] !== 'undefined') {
          type += '_context';
      }

      var source = pure.definitions.date.weekday[type];

      return pure.random.arrayElement(source);
  };

  return self;

};

module['exports'] = _Date;
