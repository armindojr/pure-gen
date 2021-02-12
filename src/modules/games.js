/**
 *
 * @namespace pure.games
 */
class Games {
    constructor(pure) {
        /**
         * title
         *
         * @description Generate random game title
         * @method pure.games.title
         * @example
         * console.log(pure.games.title());
         * //outputs: "Half-Life"
         */
        this.title = () => pure.random.arrayElement(pure.registeredModules.games.title);

        /**
         * genre
         *
         * @description Generate random game genre
         * @method pure.games.genre
         * @example
         * console.log(pure.games.genre());
         * //outputs: "First-person shooter"
         */
        this.genre = () => pure.random.arrayElement(pure.registeredModules.games.genre);

        /**
         * platform
         *
         * @description Generate random platform
         * @method pure.games.platform
         * @example
         * console.log(pure.games.platform());
         * //outputs: "Nintendo DS"
         */
        this.platform = () => pure.random.arrayElement(pure.registeredModules.games.platform);
    }
}

module.exports = Games;
