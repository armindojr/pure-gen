export default class Name {
    constructor(pure) {
        this.pure = pure;
    }

    firstName(gender) {
        let def = gender;
        let result = '';
        const maleVerification = (typeof this.pure.registeredModules.name.maleFirstName !== 'undefined');
        const femaleVerification = (typeof this.pure.registeredModules.name.femaleFirstName !== 'undefined');

        if (maleVerification && femaleVerification) {
            // some locale datasets ( like ru ) have firstName split by gender.
            // since the name.firstName field does not exist in these datasets,
            // we must randomly pick a name from either gender array so pure.name.firstName
            // will return the correct locale data ( and not fallback )
            if (typeof def !== 'number') {
                if (typeof this.pure.registeredModules.name.firstName === 'undefined') {
                    def = this.pure.random.number(1);
                    if (def === 0) {
                        result = this.pure.random.arrayElement(this.pure.registeredModules.name.maleFirstName);
                    } else {
                        result = this.pure.random.arrayElement(this.pure.registeredModules.name.femaleFirstName);
                    }
                } else {
                    // Fall back to non-gendered names if they exist and gender wasn't specified
                    result = this.pure.random.arrayElement(this.pure.registeredModules.name.firstName);
                }
            } else if (def === 0) {
                result = this.pure.random.arrayElement(this.pure.registeredModules.name.maleFirstName);
            } else {
                result = this.pure.random.arrayElement(this.pure.registeredModules.name.femaleFirstName);
            }

            return result;
        }

        return this.pure.random.arrayElement(this.pure.registeredModules.name.firstName);
    }

    lastName(gender) {
        let def = gender;
        const maleVerification = (typeof this.pure.registeredModules.name.maleLastName !== 'undefined');
        const femaleVerification = (typeof this.pure.registeredModules.name.femaleLastName !== 'undefined');

        if (maleVerification && femaleVerification) {
            // some locale datasets ( like ru ) have lastName split by gender.
            // i have no idea how last names can have genders, but also i do not speak russian
            // see above comment of firstName method
            if (typeof def !== 'number') {
                def = this.pure.random.number(1);
            }

            if (def === 0) {
                return this.pure.random.arrayElement(this.pure.registeredModules.name.maleLastName);
            }

            return this.pure.random.arrayElement(this.pure.registeredModules.name.femaleLastName);
        }

        return this.pure.random.arrayElement(this.pure.registeredModules.name.lastName);
    }

    findName(gender) {
        const r = this.pure.random.number(8);
        let def = gender;
        let result;

        // in particular locales first and last names split by gender,
        // thus we keep consistency by passing 0 as male and 1 as female
        if (typeof def !== 'number') {
            def = this.pure.random.number(1);
        }

        const prefix = this.pure.name.prefix(def);
        const suffix = this.pure.name.suffix(def);
        const fName = this.pure.name.firstName(def);
        const lName = this.pure.name.lastName(def);

        if (r === 0) {
            result = `${prefix} ${fName} ${lName}`;
        } else if (r === 1) {
            result = `${fName} ${lName} ${suffix}`;
        } else {
            result = `${fName} ${lName}`;
        }

        return result;
    }

    jobTitle() {
        return `${this.pure.name.jobDescriptor()} ${this.pure.name.jobArea()} ${this.pure.name.jobType()}`;
    }

    gender() {
        return this.pure.random.arrayElement(this.pure.registeredModules.name.gender);
    }

    prefix(gender) {
        let def = gender;
        const maleVerification = (typeof this.pure.registeredModules.name.malePrefix !== 'undefined');
        const femaleVerification = (typeof this.pure.registeredModules.name.femalePrefix !== 'undefined');

        if (maleVerification && femaleVerification) {
            if (typeof def !== 'number') {
                def = this.pure.random.number(1);
            }

            if (def === 0) {
                return this.pure.random.arrayElement(this.pure.registeredModules.name.malePrefix);
            }

            return this.pure.random.arrayElement(this.pure.registeredModules.name.femalePrefix);
        }

        return this.pure.random.arrayElement(this.pure.registeredModules.name.prefix);
    }

    suffix() {
        return this.pure.random.arrayElement(this.pure.registeredModules.name.suffix);
    }

    title() {
        const descriptor = this.pure.random.arrayElement(this.pure.registeredModules.name.title.descriptor);
        const level = this.pure.random.arrayElement(this.pure.registeredModules.name.title.level);
        const job = this.pure.random.arrayElement(this.pure.registeredModules.name.title.job);

        return `${descriptor} ${level} ${job}`;
    }

    jobDescriptor() {
        return this.pure.random.arrayElement(this.pure.registeredModules.name.title.descriptor);
    }

    jobArea() {
        return this.pure.random.arrayElement(this.pure.registeredModules.name.title.level);
    }

    jobType() {
        return this.pure.random.arrayElement(this.pure.registeredModules.name.title.job);
    }
}
