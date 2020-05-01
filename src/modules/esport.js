/**
 *
 * @namespace pure.esport
 */
function Esport(pure) {
    /**
     * players
     *
     * @description Generate random players name
     * @method pure.esport.players
     * @example
     * console.log(pure.esport.players());
     * //outputs: "shroud"
     */
    this.players = () => pure.random.arrayElement(pure.definitions.esport.players);

    /**
     * teams
     *
     * @description Generate random teams name
     * @method pure.esport.teams
     * @example
     * console.log(pure.esport.teams());
     * //outputs: "FaZe"
     */
    this.teams = () => pure.random.arrayElement(pure.definitions.esport.teams);

    /**
     * events
     *
     * @description Generate random events name
     * @method pure.esport.events
     * @example
     * console.log(pure.esport.events());
     * //outputs: "ESL Cologne"
     */
    this.events = () => pure.random.arrayElement(pure.definitions.esport.events);

    /**
     * leagues
     *
     * @description Generate random leagues name
     * @method pure.esport.leagues
     * @example
     * console.log(pure.esport.leagues());
     * //outputs: "IEM"
     */
    this.leagues = () => pure.random.arrayElement(pure.definitions.esport.leagues);

    /**
     * games
     *
     * @description Generate random e-sport game name
     * @method pure.esport.games
     * @example
     * console.log(pure.esport.games());
     * //outputs: "CS:GO"
     */
    this.games = () => pure.random.arrayElement(pure.definitions.esport.games);
}

module.exports = Esport;
