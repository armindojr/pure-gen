export class Hacker {
  constructor(pure) {
    this.pure = pure;
  }

  abbreviation() {
    return this.pure.random.arrayElement(this.pure.registeredModules.hacker.abbreviation);
  }

  adjective() {
    return this.pure.random.arrayElement(this.pure.registeredModules.hacker.adjective);
  }

  noun() {
    return this.pure.random.arrayElement(this.pure.registeredModules.hacker.noun);
  }

  verb() {
    return this.pure.random.arrayElement(this.pure.registeredModules.hacker.verb);
  }

  ingverb() {
    return this.pure.random.arrayElement(this.pure.registeredModules.hacker.ingverb);
  }

  phrase() {
    const data = {
      abbreviation: this.pure.hacker.abbreviation(),
      adjective: this.pure.hacker.adjective(),
      ingverb: this.pure.hacker.ingverb(),
      noun: this.pure.hacker.noun(),
      verb: this.pure.hacker.verb()
    };
    const phrase = this.pure.random.arrayElement(this.pure.registeredModules.hacker.phrase);

    return this.pure.helpers.mustache({ str: phrase, data });
  }
}
