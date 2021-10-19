class Games {
    constructor(pure) {
        this.title = () => pure.random.arrayElement(pure.registeredModules.games.title);

        this.genre = () => pure.random.arrayElement(pure.registeredModules.games.genre);

        this.platform = () => pure.random.arrayElement(pure.registeredModules.games.platform);
    }
}

module.exports = Games;
