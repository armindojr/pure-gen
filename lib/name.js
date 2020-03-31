/**
 *
 * @namespace pure.name
 */
function Name(pure) {
    /**
   * firstName
   *
   * @method firstName
   * @param {mixed} gender
   * @memberof pure.name
   */
    this.firstName = (gender) => {
        let def = gender;
        const maleVerification = (typeof pure.definitions.name.male_first_name !== 'undefined');
        const femaleVerification = (typeof pure.definitions.name.female_first_name !== 'undefined');
        if (maleVerification && femaleVerification) {
            // some locale datasets ( like ru ) have first_name split by gender.
            // since the name.first_name field does not exist in these datasets,
            // we must randomly pick a name from either gender array so pure.name.firstName
            // will return the correct locale data ( and not fallback )
            if (typeof def !== 'number') {
                if (typeof pure.definitions.name.first_name === 'undefined') {
                    def = pure.random.number(1);
                } else {
                    // Fall back to non-gendered names if they exist and gender wasn't specified
                    return pure.random.arrayElement(pure.definitions.name.first_name);
                }
            }
            if (def === 0) {
                return pure.random.arrayElement(pure.definitions.name.male_first_name);
            }
            return pure.random.arrayElement(pure.definitions.name.female_first_name);
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
    this.lastName = (gender) => {
        let def = gender;
        const maleVerification = (typeof pure.definitions.name.male_last_name !== 'undefined');
        const femaleVerification = (typeof pure.definitions.name.female_last_name !== 'undefined');
        if (maleVerification && femaleVerification) {
            // some locale datasets ( like ru ) have last_name split by gender.
            // i have no idea how last names can have genders, but also i do not speak russian
            // see above comment of firstName method
            if (typeof def !== 'number') {
                def = pure.random.number(1);
            }
            if (def === 0) {
                return pure.random.arrayElement(pure.locales[pure.locale].name.male_last_name);
            }
            return pure.random.arrayElement(pure.locales[pure.locale].name.female_last_name);
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
    this.findName = (firstName, lastName, gender) => {
        const r = pure.random.number(8);
        let prefix;
        let suffix;
        let def = gender;
        let fName = firstName;
        let lName = lastName;
        let result;
        // in particular locales first and last names split by gender,
        // thus we keep consistency by passing 0 as male and 1 as female
        if (typeof def !== 'number') {
            def = pure.random.number(1);
        }
        fName = fName || pure.name.firstName(def);
        lName = lName || pure.name.lastName(def);
        switch (r) {
        case 0:
            prefix = pure.name.prefix(def);
            if (prefix) {
                result = `${prefix} ${fName} ${lName}`;
            }
            break;

        case 1:
            suffix = pure.name.suffix(def);
            if (suffix) {
                result = `${fName} ${lName} ${suffix}`;
            }
            break;

        default:
            result = `${fName} ${lName}`;
        }

        return result;
    };

    /**
   * jobTitle
   *
   * @method jobTitle
   * @memberof pure.name
   */
    this.jobTitle = () => `${pure.name.jobDescriptor()} ${
        pure.name.jobArea()} ${
        pure.name.jobType()}`;

    /**
   * gender
   *
   * @method gender
   * @memberof pure.name
   */
    this.gender = () => pure.random.arrayElement(pure.definitions.name.gender);

    /**
   * prefix
   *
   * @method prefix
   * @param {mixed} gender
   * @memberof pure.name
   */
    this.prefix = (gender) => {
        let def = gender;
        const maleVerification = (typeof pure.definitions.name.male_prefix !== 'undefined');
        const femaleVerification = (typeof pure.definitions.name.female_prefix !== 'undefined');
        if (maleVerification && femaleVerification) {
            if (typeof def !== 'number') {
                def = pure.random.number(1);
            }
            if (def === 0) {
                return pure.random.arrayElement(pure.locales[pure.locale].name.male_prefix);
            }
            return pure.random.arrayElement(pure.locales[pure.locale].name.female_prefix);
        }
        return pure.random.arrayElement(pure.definitions.name.prefix);
    };

    /**
   * suffix
   *
   * @method suffix
   * @memberof pure.name
   */
    this.suffix = () => pure.random.arrayElement(pure.definitions.name.suffix);

    /**
   * title
   *
   * @method title
   * @memberof pure.name
   */
    this.title = () => {
        const descriptor = pure.random.arrayElement(pure.definitions.name.title.descriptor);
        const level = pure.random.arrayElement(pure.definitions.name.title.level);
        const job = pure.random.arrayElement(pure.definitions.name.title.job);

        return `${descriptor} ${level} ${job}`;
    };

    /**
   * jobDescriptor
   *
   * @method jobDescriptor
   * @memberof pure.name
   */
    this.jobDescriptor = () => pure.random.arrayElement(pure.definitions.name.title.descriptor);

    /**
   * jobArea
   *
   * @method jobArea
   * @memberof pure.name
   */
    this.jobArea = () => pure.random.arrayElement(pure.definitions.name.title.level);

    /**
   * jobType
   *
   * @method jobType
   * @memberof pure.name
   */
    this.jobType = () => pure.random.arrayElement(pure.definitions.name.title.job);
}

module.exports = Name;
