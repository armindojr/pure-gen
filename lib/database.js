/**
 *
 * @namespace pure.database
 */
function Database(pure) {
    const self = this;
    /**
     * column
     *
     * @description Generate random database column
     * @method pure.database.column
     * @example
     * console.log(pure.database.column());
     * //outputs: "createdAt"
     */
    self.column = () => pure.random.arrayElement(pure.definitions.database.column);

    self.column.schema = {
        description: 'Generates a column name.',
        sampleResults: ['id', 'title', 'createdAt'],
    };

    /**
     * type
     *
     * @description Generate random database type
     * @method pure.database.type
     * @example
     * console.log(pure.database.type());
     * //outputs: "blob"
     */
    self.type = () => pure.random.arrayElement(pure.definitions.database.type);

    self.type.schema = {
        description: 'Generates a column type.',
        sampleResults: ['byte', 'int', 'varchar', 'timestamp'],
    };

    /**
     * collation
     *
     * @description Generate random database collation
     * @method pure.database.collation
     * @example
     * console.log(pure.database.collation());
     * //outputs: "ascii_general_ci"
     */
    self.collation = () => pure.random.arrayElement(pure.definitions.database.collation);

    self.collation.schema = {
        description: 'Generates a collation.',
        sampleResults: ['utf8_unicode_ci', 'utf8_bin'],
    };

    /**
     * engine
     *
     * @description Generate random database engine
     * @method pure.database.engine
     * @example
     * console.log(pure.database.engine());
     * //outputs: "MEMORY"
     */
    self.engine = () => pure.random.arrayElement(pure.definitions.database.engine);

    self.engine.schema = {
        description: 'Generates a storage engine.',
        sampleResults: ['MyISAM', 'InnoDB'],
    };
}

module.exports = Database;
