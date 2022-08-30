export default class Games {
    constructor(pure) {
        this.pure = pure;
    }

    title() {
        return this.pure.random.arrayElement(this.pure.registeredModules.games.title);
    }

    genre() {
        return this.pure.random.arrayElement(this.pure.registeredModules.games.genre);
    }

    platform() {
        return this.pure.random.arrayElement(this.pure.registeredModules.games.platform);
    }
}
