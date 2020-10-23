/**
 *
 * @namespace pure.document
 */
function Document(pure) {
    /**
     * brazilianCitizenNumber
     *
     * @description Method to generate random valid document number for Brazillian citizen (CPF)
     * @param {object} opts Options passed through object
     * @param {boolean= } [opts.format=false] Define that result is formated or not
     * @method pure.document.brazilianCitizenNumber
     * @memberof pure.document
     * @example
     * console.log(pure.document.brazilianCitizenNumber());
     * //outputs: "76049418500"
     * @returns {string} valid document number
     */
    this.brazilianCitizenNumber = (opts = {}) => {
        const def = opts;
        let doc = pure.helpers.replaceSymbolWithNumber('#########');

        const mod = (str, size, val) => {
            let sum = 0;
            for (let i = 1; i <= size; i += 1) {
                const subst = str.substring(i - 1, i);
                sum += parseInt(subst, 10) * (val - i);
            }

            let digit = (sum * 10) % 11;

            if ((digit === 10) || (digit === 11)) {
                digit = 0;
            }

            return digit;
        };

        doc += mod(doc, 9, 11);
        doc += mod(doc, 10, 12);

        if (def.format === true) {
            doc = doc.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }

        return doc;
    };

    /**
     * brazilianCompanyNumber
     *
     * @description Method to generate random valid document number for Brazillian company (CNPJ)
     * @param {object} opts Options passed through object
     * @param {boolean= } [opts.format=false] Define that result is formated or not
     * @method pure.document.brazilianCompanyNumber
     * @memberof pure.document
     * @example
     * console.log(pure.document.brazilianCompanyNumber());
     * //outputs: "06747662000106"
     * @returns {string} valid document number
     */
    this.brazilianCompanyNumber = (opts = {}) => {
        const def = opts;
        let doc = pure.helpers.replaceSymbolWithNumber('########');

        const mod = (str) => {
            const strlen = str.length;
            const num = str.substring(0, strlen);
            let sum = 0;
            let pos = strlen - 7;
            for (let i = 0; i <= strlen; i += 1) {
                sum += num.charAt(i) * (pos);
                pos = pos <= 2 ? 9 : pos -= 1;
            }
            return sum % 11 < 2 ? 0 : 11 - (sum % 11);
        };

        doc += '0001';
        doc += mod(doc);
        doc += mod(doc);

        if (def.format === true) {
            doc = doc.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        }

        return doc;
    };

    /**
     * brazilianId
     *
     * @description Method to generate random identity number for Brazillian citizen (RG)
     * @param {object} opts Options passed through object
     * @param {boolean= } [opts.format=false] Define that result is formated or not
     * @method pure.document.brazilianId
     * @memberof pure.document
     * @example
     * console.log(pure.document.brazilianId());
     * //outputs: "628909720"
     * @returns {string} document number
     */
    this.brazilianId = (opts = {}) => {
        const def = opts;
        let doc = pure.helpers.replaceSymbolWithNumber('#########');

        if (def.format === true) {
            doc = doc.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
        }

        return doc;
    };
}

module.exports = Document;
