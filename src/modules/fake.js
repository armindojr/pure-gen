/*
  pure-gen - generator method for combining pure methods based on string input

*/

function Fake(pure) {
    function fakeReplacer(_, module, method, args) {
        const fn = pure[module][method];

        let params = args;
        if (args) {
            try {
                params = JSON.parse(args);
            } catch (e) {
                params = args;
            }
        }

        try {
            return fn.call(pure, params);
        } catch (e) {
            throw new Error(`Invalid method: ${module}.${method}`);
        }
    }

    // Regex to extract module, method, args from a given fake string
    // e.g. {{foo.bar({min: 42})}} is matched as ["foo", "bar", "{min: 42}"]
    const fakeStringRegex = /{{(\w+)\.(\w+)(?:\((.*)\))?}}/g;

    /**
     * Generator method for combining pure methods based on string input
     *
     *
     * @description
     * This will interpolate the format string with the value of methods
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

        return str.replace(fakeStringRegex, fakeReplacer);
    };
}

module.exports = Fake;
