/**
 *
 * @namespace pure.name
 */
function Name (pure) {

  /**
   * firstName
   *
   * @method firstName
   * @param {mixed} gender
   * @memberof pure.name
   */
  this.firstName = function (gender) {
    if (typeof pure.definitions.name.male_first_name !== "undefined" && typeof pure.definitions.name.female_first_name !== "undefined") {
      // some locale datasets ( like ru ) have first_name split by gender. since the name.first_name field does not exist in these datasets,
      // we must randomly pick a name from either gender array so pure.name.firstName will return the correct locale data ( and not fallback )
      if (typeof gender !== 'number') {
        if(typeof pure.definitions.name.first_name === "undefined") {
          gender = pure.random.number(1);
        }
        else {
          //Fall back to non-gendered names if they exist and gender wasn't specified
          return pure.random.arrayElement(pure.definitions.name.first_name);
        }
      }
      if (gender === 0) {
        return pure.random.arrayElement(pure.definitions.name.male_first_name)
      } else {
        return pure.random.arrayElement(pure.definitions.name.female_first_name);
      }
    }
    return pure.random.arrayElement(pure.definitions.name.first_name);
  };

  /**
   * lastName
   *
   * @method lastName
   * @param {mixed} gender
   * @memberof pure.name
   */
  this.lastName = function (gender) {
    if (typeof pure.definitions.name.male_last_name !== "undefined" && typeof pure.definitions.name.female_last_name !== "undefined") {
      // some locale datasets ( like ru ) have last_name split by gender. i have no idea how last names can have genders, but also i do not speak russian
      // see above comment of firstName method
      if (typeof gender !== 'number') {
        gender = pure.random.number(1);
      }
      if (gender === 0) {
        return pure.random.arrayElement(pure.locales[pure.locale].name.male_last_name);
      } else {
        return pure.random.arrayElement(pure.locales[pure.locale].name.female_last_name);
      }
    }
    return pure.random.arrayElement(pure.definitions.name.last_name);
  };

  /**
   * findName
   *
   * @method findName
   * @param {string} firstName
   * @param {string} lastName
   * @param {mixed} gender
   * @memberof pure.name
   */
  this.findName = function (firstName, lastName, gender) {
      var r = pure.random.number(8);
      var prefix, suffix;
      // in particular locales first and last names split by gender,
      // thus we keep consistency by passing 0 as male and 1 as female
      if (typeof gender !== 'number') {
        gender = pure.random.number(1);
      }
      firstName = firstName || pure.name.firstName(gender);
      lastName = lastName || pure.name.lastName(gender);
      switch (r) {
      case 0:
          prefix = pure.name.prefix(gender);
          if (prefix) {
              return prefix + " " + firstName + " " + lastName;
          }
      case 1:
          suffix = pure.name.suffix(gender);
          if (suffix) {
              return firstName + " " + lastName + " " + suffix;
          }
      }

      return firstName + " " + lastName;
  };

  /**
   * jobTitle
   *
   * @method jobTitle
   * @memberof pure.name
   */
  this.jobTitle = function () {
    return  pure.name.jobDescriptor() + " " +
      pure.name.jobArea() + " " +
      pure.name.jobType();
  };

  /**
   * gender
   *
   * @method gender
   * @memberof pure.name
   */
  this.gender = function () {
    return pure.random.arrayElement(pure.definitions.name.gender);
  }
  
  /**
   * prefix
   *
   * @method prefix
   * @param {mixed} gender
   * @memberof pure.name
   */
  this.prefix = function (gender) {
    if (typeof pure.definitions.name.male_prefix !== "undefined" && typeof pure.definitions.name.female_prefix !== "undefined") {
      if (typeof gender !== 'number') {
        gender = pure.random.number(1);
      }
      if (gender === 0) {
        return pure.random.arrayElement(pure.locales[pure.locale].name.male_prefix);
      } else {
        return pure.random.arrayElement(pure.locales[pure.locale].name.female_prefix);
      }
    }
    return pure.random.arrayElement(pure.definitions.name.prefix);
  };

  /**
   * suffix
   *
   * @method suffix
   * @memberof pure.name
   */
  this.suffix = function () {
      return pure.random.arrayElement(pure.definitions.name.suffix);
  };

  /**
   * title
   *
   * @method title
   * @memberof pure.name
   */
  this.title = function() {
      var descriptor  = pure.random.arrayElement(pure.definitions.name.title.descriptor),
          level       = pure.random.arrayElement(pure.definitions.name.title.level),
          job         = pure.random.arrayElement(pure.definitions.name.title.job);

      return descriptor + " " + level + " " + job;
  };

  /**
   * jobDescriptor
   *
   * @method jobDescriptor
   * @memberof pure.name
   */
  this.jobDescriptor = function () {
    return pure.random.arrayElement(pure.definitions.name.title.descriptor);
  };

  /**
   * jobArea
   *
   * @method jobArea
   * @memberof pure.name
   */
  this.jobArea = function () {
    return pure.random.arrayElement(pure.definitions.name.title.level);
  };

  /**
   * jobType
   *
   * @method jobType
   * @memberof pure.name
   */
  this.jobType = function () {
    return pure.random.arrayElement(pure.definitions.name.title.job);
  };

}

module['exports'] = Name;
