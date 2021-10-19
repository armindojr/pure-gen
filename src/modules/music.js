class Music {
    constructor(pure) {
        this.genre = () => pure.random.arrayElement(pure.registeredModules.music.genre);
    }
}

module.exports = Music;
