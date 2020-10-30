/**
 *
 * @namespace pure.database
 */
class Database {
    constructor(pure) {
        /**
         * column
         *
         * @description Generate random database column
         * @method pure.database.column
         * @example
         * console.log(pure.database.column());
         * //outputs: "createdAt"
         */
        this.column = () => pure.random.arrayElement(pure.registeredModules.database.column);

        /**
         * type
         *
         * @description Generate random database type
         * @method pure.database.type
         * @example
         * console.log(pure.database.type());
         * //outputs: "blob"
         */
        this.type = () => pure.random.arrayElement(pure.registeredModules.database.type);

        /**
         * collation
         *
         * @description Generate random database collation
         * @method pure.database.collation
         * @example
         * console.log(pure.database.collation());
         * //outputs: "ascii_general_ci"
         */
        this.collation = () => pure.random.arrayElement(pure.registeredModules.database.collation);

        /**
         * engine
         *
         * @description Generate random database engine
         * @method pure.database.engine
         * @example
         * console.log(pure.database.engine());
         * //outputs: "MEMORY"
         */
        this.engine = () => pure.random.arrayElement(pure.registeredModules.database.engine);
    }
}

module.exports = Database;
