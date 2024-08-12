export class Commerce {
  constructor(pure) {
    this.pure = pure;
  }

  color() {
    return this.pure.random.arrayElement(this.pure.registeredModules.commerce.color);
  }

  department() {
    return this.pure.random.arrayElement(this.pure.registeredModules.commerce.department);
  }

  productName() {
    return (
      `${this.pure.commerce.productAdjective()}` +
      ` ${this.pure.commerce.productMaterial()} ${this.pure.commerce.product()}`
    );
  }

  price(options) {
    let def = options;

    if (def === undefined) {
      def = {
        min: 1
      };
    }

    def.max = def.max || 1000 * def.min;
    def.dec = def.dec === undefined ? 2 : def.dec;
    def.symbol = def.symbol || '';

    if (def.min < 0 || def.max < 0) {
      return def.symbol + 0.0;
    }

    const randValue = this.pure.random.number({ max: def.max, min: def.min, precision: def.dec }).toFixed(def.dec);
    const finalValue = def.symbol + randValue.toString();

    return def.comma ? finalValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : finalValue;
  }

  categories(num) {
    let categories = [];
    let def = num;

    if (typeof def === 'undefined') {
      def = this.pure.random.number({ min: 1, max: 10 });
    }

    if (def > this.pure.registeredModules.commerce.department.length) {
      categories = this.pure.registeredModules.commerce.department;
    } else {
      const shuffledArr = this.pure.helpers.shuffle(this.pure.registeredModules.commerce.department);
      const diff = this.pure.registeredModules.commerce.department.length - num;
      shuffledArr.splice(0, diff);
      categories = shuffledArr;
    }

    return categories;
  }

  productAdjective() {
    return this.pure.random.arrayElement(this.pure.registeredModules.commerce.productName.adjective);
  }

  productMaterial() {
    return this.pure.random.arrayElement(this.pure.registeredModules.commerce.productName.material);
  }

  product() {
    return this.pure.random.arrayElement(this.pure.registeredModules.commerce.productName.product);
  }

  productDescription() {
    return this.pure.random.arrayElement(this.pure.registeredModules.commerce.productDescription);
  }
}
