/**
 *
 * @namespace pure.database
 */
function Database(pure) {
    const self = this;
    /**
   * column
   *
   * @method pure.database.column
   */
    self.column = () => pure.random.arrayElement(pure.definitions.database.column);

    self.column.schema = {
        description: 'Generates a column name.',
        sampleResults: ['id', 'title', 'createdAt'],
    };

    /**
   * type
   *
   * @method pure.database.type
   */
    self.type = () => pure.random.arrayElement(pure.definitions.database.type);

    self.type.schema = {
        description: 'Generates a column type.',
        sampleResults: ['byte', 'int', 'varchar', 'timestamp'],
    };

    /**
   * collation
   *
   * @method pure.database.collation
   */
    self.collation = () => pure.random.arrayElement(pure.definitions.database.collation);

    self.collation.schema = {
        description: 'Generates a collation.',
        sampleResults: ['utf8_unicode_ci', 'utf8_bin'],
    };

    /**
   * engine
   *
   * @method pure.database.engine
   */
    self.engine = () => pure.random.arrayElement(pure.definitions.database.engine);

    self.engine.schema = {
        description: 'Generates a storage engine.',
        sampleResults: ['MyISAM', 'InnoDB'],
    };
}

module.exports = Database;
