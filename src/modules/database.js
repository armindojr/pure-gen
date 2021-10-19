class Database {
    constructor(pure) {
        this.column = () => pure.random.arrayElement(pure.registeredModules.database.column);

        this.type = () => pure.random.arrayElement(pure.registeredModules.database.type);

        this.collation = () => pure.random.arrayElement(pure.registeredModules.database.collation);

        this.engine = () => pure.random.arrayElement(pure.registeredModules.database.engine);
    }
}

module.exports = Database;
