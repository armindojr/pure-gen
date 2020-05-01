/**
 *
 * @namespace pure.games
 */
function Games(pure) {
    /**
     * title
     *
     * @description Generate random game title
     * @method pure.games.title
     * @example
     * console.log(pure.games.title());
     * //outputs: "Half-Life"
     */
    this.title = () => pure.random.arrayElement(pure.definitions.games.title);

    /**
     * genre
     *
     * @description Generate random game genre
     * @method pure.games.genre
     * @example
     * console.log(pure.games.genre());
     * //outputs: "First-person shooter"
     */
    this.genre = () => pure.random.arrayElement(pure.definitions.games.genre);

    /**
     * platform
     *
     * @description Generate random platform
     * @method pure.games.platform
     * @example
     * console.log(pure.games.platform());
     * //outputs: "Nintendo DS"
     */
    this.platform = () => pure.random.arrayElement(pure.definitions.games.platform);
}

module.exports = Games;
