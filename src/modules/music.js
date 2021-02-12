/**
 *
 * @namespace pure.music
 */
class Music {
    constructor(pure) {
        /**
         * genre
         *
         * @description Return random music genre
         * @method pure.music.genre
         * @example
         * console.log(pure.music.genre());
         * //outputs: "Rock"
         */
        this.genre = () => pure.random.arrayElement(pure.registeredModules.music.genre);
    }
}

module.exports = Music;
