/**
 *
 * @namespace pure.music
 */
function Music(pure) {
    const self = this;
    /**
     * genre
     *
     * @method pure.music.genre
     */
    self.genre = () => pure.random.arrayElement(pure.definitions.music.genre);

    self.genre.schema = {
        description: 'Generates a genre.',
        sampleResults: ['Rock', 'Metal', 'Pop'],
    };
}

module.exports = Music;
