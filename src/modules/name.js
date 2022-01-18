/**
 *
 * @namespace pure.name
 */
class Name {
    constructor(pure) {
        this.firstName = (gender) => {
            let def = gender;
            let result = '';
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
                            result = pure.random.arrayElement(pure.registeredModules.name.male_first_name);
                        } else {
                            result = pure.random.arrayElement(pure.registeredModules.name.female_first_name);
                        }
                    } else {
                        // Fall back to non-gendered names if they exist and gender wasn't specified
                        result = pure.random.arrayElement(pure.registeredModules.name.first_name);
                    }
                } else {
                    if (def === 0) {
                        result = pure.random.arrayElement(pure.registeredModules.name.male_first_name);
                    } else {
                        result = pure.random.arrayElement(pure.registeredModules.name.female_first_name);
                    }
                }
                
                return result;
            }

            return pure.random.arrayElement(pure.registeredModules.name.first_name);
        };

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

        this.findName = (gender) => {
            const r = pure.random.number(8);
            let def = gender;
            let result;
            // in particular locales first and last names split by gender,
            // thus we keep consistency by passing 0 as male and 1 as female
            if (typeof def !== 'number') {
                def = pure.random.number(1);
            }

            let prefix = this.prefix(def);
            let suffix = this.suffix(def);
            const fName = this.firstName(def);
            const lName = this.lastName(def);

            if (r === 0) {
                result = `${prefix} ${fName} ${lName}`;
            } else if (r === 1) {
                result = `${fName} ${lName} ${suffix}`;
            } else {
                result = `${fName} ${lName}`;
            }

            return result;
        };

        this.jobTitle = () => `${this.jobDescriptor()} ${this.jobArea()} ${this.jobType()}`;

        this.gender = () => pure.random.arrayElement(pure.registeredModules.name.gender);

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

        this.suffix = () => pure.random.arrayElement(pure.registeredModules.name.suffix);

        this.title = () => {
            const descriptor = pure.random.arrayElement(pure.registeredModules.name.title.descriptor);
            const level = pure.random.arrayElement(pure.registeredModules.name.title.level);
            const job = pure.random.arrayElement(pure.registeredModules.name.title.job);

            return `${descriptor} ${level} ${job}`;
        };

        this.jobDescriptor = () => pure.random.arrayElement(pure.registeredModules.name.title.descriptor);

        this.jobArea = () => pure.random.arrayElement(pure.registeredModules.name.title.level);

        this.jobType = () => pure.random.arrayElement(pure.registeredModules.name.title.job);
    }
}

module.exports = Name;
