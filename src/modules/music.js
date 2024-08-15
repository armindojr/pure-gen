export class Music {
  constructor(pure) {
    this.pure = pure;
  }

  genre() {
    return this.pure.random.arrayElement(this.pure.registeredModules.music.genre);
  }
}
