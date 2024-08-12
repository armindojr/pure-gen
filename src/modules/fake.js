// TODO: Methods that use mustachestring as parameter don't work
export class Fake {
  constructor(pure) {
    this.pure = pure;
  }

  parse(str) {
    const fakeStringRegex = /(\w+)\.(\w+)(?:\((.*)\))?/g;
    const paramsRegex = /(?:\((.*)\))/g;

    // if incoming str parameter is not provided, return error message
    if (typeof str !== 'string' || str.length === 0) {
      throw new Error('string parameter is required!');
    }

    const parsed = this.pure.helpers.mustacheParse(str);
    let result = {};

    parsed.forEach(item => {
      if (item[0] === 'name' || item[0] === '&') {
        let module;
        let method;
        let args;

        item[1].replace(fakeStringRegex, (_, a, b, c) => {
          module = a;
          method = b;
          args = c;
        });

        result = {
          ...result,
          [module]: {
            ...result[module],
            [method]: args
          }
        };
      }
    });

    Object.keys(result).forEach(module => {
      Object.keys(result[module]).forEach(method => {
        if (typeof this.pure[module] === 'undefined' || typeof this.pure[module][method] === 'undefined') {
          throw new Error(`${module}.${method} doesn't exist inside pure scope`);
        }

        const params = result[module][method];
        let args = '';

        if (params) {
          try {
            args = JSON.parse(params);
          } catch (e) {
            if (params[0] === '{') {
              throw new Error(`Params provided doesn't match JSON standard type. Error: ${e}`);
            }

            args = params;
          }
        } else {
          args = params;
        }

        result[module][method] = this.pure[module][method](args);
      });
    });

    const strFixed = str.replace(paramsRegex, '');

    return this.pure.helpers.mustache({ str: strFixed, data: result });
  }
}
