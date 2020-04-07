/**
 *
 * @namespace pure.music
 */
function Music(pure) {
    const self = this;
    /**
     * genre
     *
     * @description Return random music genre
     * @method pure.music.genre
     * @example
     * console.log(pure.music.genre());
     * //outputs: "Rock"
     */
    self.genre = () => pure.random.arrayElement(pure.definitions.music.genre);

    self.genre.schema = {
        description: 'Generates a genre.',
        sampleResults: ['Rock', 'Metal', 'Pop'],
    };
}

module.exports = Music;
