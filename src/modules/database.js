export default class Database {
    constructor(pure) {
        this.pure = pure;
    }

    column() {
        return this.pure.random.arrayElement(this.pure.registeredModules.database.column);
    }

    type() {
        return this.pure.random.arrayElement(this.pure.registeredModules.database.dataType);
    }

    collation() {
        return this.pure.random.arrayElement(this.pure.registeredModules.database.collation);
    }

    engine() {
        return this.pure.random.arrayElement(this.pure.registeredModules.database.engine);
    }
}
