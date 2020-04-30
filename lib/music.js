/**
 *
 * @namespace pure.music
 */
function Music(pure) {
    /**
     * genre
     *
     * @description Return random music genre
     * @method pure.music.genre
     * @example
     * console.log(pure.music.genre());
     * //outputs: "Rock"
     */
    this.genre = () => pure.random.arrayElement(pure.definitions.music.genre);
}

module.exports = Music;
