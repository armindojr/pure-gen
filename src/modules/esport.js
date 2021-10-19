class Esport {
    constructor(pure) {
        this.players = () => pure.random.arrayElement(pure.registeredModules.esport.players);

        this.teams = () => pure.random.arrayElement(pure.registeredModules.esport.teams);

        this.events = () => pure.random.arrayElement(pure.registeredModules.esport.events);

        this.leagues = () => pure.random.arrayElement(pure.registeredModules.esport.leagues);

        this.games = () => pure.random.arrayElement(pure.registeredModules.esport.games);
    }
}

module.exports = Esport;
