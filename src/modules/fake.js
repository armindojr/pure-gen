// TODO: Methods that use mustachestring as parameter don't work
class Fake {
    constructor(pure) {
        const fakeStringRegex = /(\w+)\.(\w+)(?:\((.*)\))?/g;
        const paramsRegex = /(?:\((.*)\))/g;

        this.fake = (str) => {
            // if incoming str parameter is not provided, return error message
            if (typeof str !== 'string' || str.length === 0) {
                throw new Error('string parameter is required!');
            }

            const parsed = pure.helpers.mustacheParse(str);
            let result = {};

            parsed.forEach((item) => {
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
                            [method]: args,
                        },
                    };
                }
            });

            Object.keys(result).forEach((module) => {
                Object.keys(result[module]).forEach((method) => {
                    if (typeof pure[module] === 'undefined'
                        || typeof pure[module][method] === 'undefined') {
                        throw new Error(`${module}.${method} doesn't exist inside pure scope`);
                    }

                    const fn = pure[module][method];
                    const params = result[module][method];
                    let args = '';

                    if (params) {
                        try {
                            args = JSON.parse(params);
                        } catch (error) {
                            if (params[0] === '{') {
                                throw new Error('Params provided doesn\'t match JSON standard type');
                            }

                            args = params;
                        }
                    } else {
                        args = params;
                    }

                    result[module][method] = fn.call(pure, args);
                });
            });

            const strFixed = str.replace(paramsRegex, '');

            return pure.helpers.mustache({ str: strFixed, data: result });
        };
    }
}

module.exports = Fake;
