const mustache = require('mustache');

/**
 *
 * @namespace pure.fake
 */
function Fake(pure) {
    const fakeStringRegex = /(\w+)\.(\w+)(?:\((.*)\))?/g;
    const paramsRegex = /(?:\((.*)\))/g;

    /**
     * fake
     *
     * @description
     * Main purpose is to take template string and fill in with generated data using method passed
     * inside double curly brackets
     *
     * In given example this method will interpolate the format string with the value of methods
     * [name.lastName]{@link pure.name.lastName}, [name.firstName]{@link pure.name.firstName},
     * and [name.suffix]{@link pure.name.suffix}
     *
     * @param {string} str Docstring to replace with methods
     * @method pure.fake
     * @example
     * console.log(pure.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'));
     * //outputs: "Marks, Dean Sr."
     */
    this.fake = function fake(str) {
        // if incoming str parameter is not provided, return error message
        if (typeof str !== 'string' || str.length === 0) {
            throw new Error('string parameter is required!');
        }

        const parsed = mustache.parse(str);
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
                const fn = pure[module][method];
                const params = result[module][method];
                let args = '';

                if (params) {
                    try {
                        args = JSON.parse(params);
                    } catch (error) {
                        args = params;
                    }
                }

                result[module][method] = fn.call(pure, args);
            });
        });

        const strFixed = str.replace(paramsRegex, '');

        return mustache.render(strFixed, result);
    };
}

module.exports = Fake;
