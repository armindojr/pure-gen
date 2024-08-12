export class Company {
  constructor(pure) {
    this.pure = pure;
  }

  companyName(format) {
    let res;

    if (typeof format !== 'string') {
      res = this.pure.fake.parse(this.pure.random.arrayElement(this.pure.registeredModules.company.name));
    } else {
      res = this.pure.fake.parse(format);
    }

    return res;
  }

  companySuffix() {
    return this.pure.random.arrayElement(this.pure.registeredModules.company.suffix);
  }

  companyPrefix() {
    return this.pure.random.arrayElement(this.pure.registeredModules.company.prefix);
  }

  catchPhrase() {
    return (
      `${this.pure.company.catchPhraseAdjective()} ${this.pure.company.catchPhraseDescriptor()}` +
      ` ${this.pure.company.catchPhraseNoun()}`
    );
  }

  catchPhraseAdjective() {
    return this.pure.random.arrayElement(this.pure.registeredModules.company.adjective);
  }

  catchPhraseDescriptor() {
    return this.pure.random.arrayElement(this.pure.registeredModules.company.descriptor);
  }

  catchPhraseNoun() {
    return this.pure.random.arrayElement(this.pure.registeredModules.company.noun);
  }

  bs() {
    return `${this.pure.company.bsBuzz()} ${this.pure.company.bsAdjective()} ${this.pure.company.bsNoun()}`;
  }

  bsAdjective() {
    return this.pure.random.arrayElement(this.pure.registeredModules.company.bsAdjective);
  }

  bsBuzz() {
    return this.pure.random.arrayElement(this.pure.registeredModules.company.bsVerb);
  }

  bsNoun() {
    return this.pure.random.arrayElement(this.pure.registeredModules.company.bsNoun);
  }
}
