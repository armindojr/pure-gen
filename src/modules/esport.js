export class Esport {
  constructor(pure) {
    this.pure = pure;
  }

  players() {
    return this.pure.random.arrayElement(this.pure.registeredModules.esport.players);
  }

  teams() {
    return this.pure.random.arrayElement(this.pure.registeredModules.esport.teams);
  }

  events() {
    return this.pure.random.arrayElement(this.pure.registeredModules.esport.events);
  }

  leagues() {
    return this.pure.random.arrayElement(this.pure.registeredModules.esport.leagues);
  }

  games() {
    return this.pure.random.arrayElement(this.pure.registeredModules.esport.games);
  }
}
