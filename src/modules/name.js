/**
 *
 * @namespace pure.name
 */
class Name {
    constructor(pure) {
        /**
         * firstName
         *
         * @description Generate random first names
         * @param {Number} [gender= random] Defines gendered names by 0 male and 1 female
         * @method pure.name.firstName
         * @example
         * console.log(pure.name.firstName());
         * //outputs: "Jennifer"
         */
        this.firstName = (gender) => {
            let def = gender;
            const maleVerification = (typeof pure.registeredModules.name.male_first_name !== 'undefined');
            const femaleVerification = (typeof pure.registeredModules.name.female_first_name !== 'undefined');
            if (maleVerification && femaleVerification) {
                // some locale datasets ( like ru ) have first_name split by gender.
                // since the name.first_name field does not exist in these datasets,
                // we must randomly pick a name from either gender array so pure.name.firstName
                // will return the correct locale data ( and not fallback )
                if (typeof def !== 'number') {
                    if (typeof pure.registeredModules.name.first_name === 'undefined') {
                        def = pure.random.number(1);
                        if (def === 0) {
                            return pure.random.arrayElement(pure.registeredModules.name.male_first_name);
                        }
                        return pure.random.arrayElement(pure.registeredModules.name.female_first_name);
                    }
                    // Fall back to non-gendered names if they exist and gender wasn't specified
                    return pure.random.arrayElement(pure.registeredModules.name.first_name);
                } if (def === 0) {
                    return pure.random.arrayElement(pure.registeredModules.name.male_first_name);
                }
                return pure.random.arrayElement(pure.registeredModules.name.female_first_name);
            }
            return pure.random.arrayElement(pure.registeredModules.name.first_name);
        };

        /**
         * lastName
         *
         * @description Generate random last names
         * @param {Number} [gender= random] Defines gendered names by 0 male and 1 female
         * @method pure.name.lastName
         * @example
         * console.log(pure.name.lastName());
         * //outputs: "Bartell"
         */
        this.lastName = (gender) => {
            let def = gender;
            const maleVerification = (typeof pure.registeredModules.name.male_last_name !== 'undefined');
            const femaleVerification = (typeof pure.registeredModules.name.female_last_name !== 'undefined');
            if (maleVerification && femaleVerification) {
                // some locale datasets ( like ru ) have last_name split by gender.
                // i have no idea how last names can have genders, but also i do not speak russian
                // see above comment of firstName method
                if (typeof def !== 'number') {
                    def = pure.random.number(1);
                }
                if (def === 0) {
                    return pure.random.arrayElement(pure.registeredModules.name.male_last_name);
                }
                return pure.random.arrayElement(pure.registeredModules.name.female_last_name);
            }
            return pure.random.arrayElement(pure.registeredModules.name.last_name);
        };

        /**
         * findName
         *
         * @description Generate random complete name
         * @param {Number} [gender= random] Defines gendered names by 0 male and 1 female
         * @method pure.name.findName
         * @example
         * console.log(pure.name.findName());
         * //outputs: "Dorothy Littel"
         */
        this.findName = (gender) => {
            const r = pure.random.number(8);
            let prefix;
            let suffix;
            let def = gender;
            let result;
            // in particular locales first and last names split by gender,
            // thus we keep consistency by passing 0 as male and 1 as female
            if (typeof def !== 'number') {
                def = pure.random.number(1);
            }
            const fName = this.firstName(def);
            const lName = this.lastName(def);
            switch (r) {
            case 0:
                prefix = this.prefix(def);
                if (prefix) {
                    result = `${prefix} ${fName} ${lName}`;
                }
                break;

            case 1:
                suffix = this.suffix(def);
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
         * @description Generates a random job title
         * @method pure.name.jobTitle
         * @example
         * console.log(pure.name.jobTitle());
         * //outputs: "Regional Infrastructure Consultant"
         */
        this.jobTitle = () => `${this.jobDescriptor()} ${this.jobArea()} ${this.jobType()}`;

        /**
         * gender
         *
         * @description Generate random gender
         * @method pure.name.gender
         * @example
         * console.log(pure.name.gender());
         * //outputs: "Hermaphrodite"
         */
        this.gender = () => pure.random.arrayElement(pure.registeredModules.name.gender);

        /**
         * prefix
         *
         * @description Generate random prefix
         * @param {mixed} gender
         * @method pure.name.prefix
         * @example
         * console.log(pure.name.prefix());
         * //outputs: "Miss"
         */
        this.prefix = (gender) => {
            let def = gender;
            const maleVerification = (typeof pure.registeredModules.name.male_prefix !== 'undefined');
            const femaleVerification = (typeof pure.registeredModules.name.female_prefix !== 'undefined');
            if (maleVerification && femaleVerification) {
                if (typeof def !== 'number') {
                    def = pure.random.number(1);
                }
                if (def === 0) {
                    return pure.random.arrayElement(pure.registeredModules.name.male_prefix);
                }
                return pure.random.arrayElement(pure.registeredModules.name.female_prefix);
            }
            return pure.random.arrayElement(pure.registeredModules.name.prefix);
        };

        /**
         * suffix
         *
         * @description Generate random suffix
         * @method pure.name.suffix
         * @example
         * console.log(pure.name.suffix());
         * //outputs: "IV"
         */
        this.suffix = () => pure.random.arrayElement(pure.registeredModules.name.suffix);

        /**
         * title
         *
         * @description Generate random title
         * @method pure.name.title
         * @example
         * console.log(pure.name.title());
         * //outputs: "Corporate Research Associate"
         */
        this.title = () => {
            const descriptor = pure.random.arrayElement(pure.registeredModules.name.title.descriptor);
            const level = pure.random.arrayElement(pure.registeredModules.name.title.level);
            const job = pure.random.arrayElement(pure.registeredModules.name.title.job);

            return `${descriptor} ${level} ${job}`;
        };

        /**
         * jobDescriptor
         *
         * @description Generate random job descriptor
         * @method pure.name.jobDescriptor
         * @example
         * console.log(pure.name.jobDescriptor());
         * //outputs: "Dynamic"
         */
        this.jobDescriptor = () => pure.random.arrayElement(pure.registeredModules.name.title.descriptor);

        /**
         * jobArea
         *
         * @description Generate random job area
         * @method pure.name.jobArea
         * @example
         * console.log(pure.name.jobArea());
         * //outputs: "Operations"
         */
        this.jobArea = () => pure.random.arrayElement(pure.registeredModules.name.title.level);

        /**
         * jobType
         *
         * @description Generate random job area
         * @method pure.name.jobType
         * @example
         * console.log(pure.name.jobType());
         * //outputs: "Administrator"
         */
        this.jobType = () => pure.random.arrayElement(pure.registeredModules.name.title.job);
    }
}

module.exports = Name;
