class Document {
    constructor(pure) {
        this.brazilianCitizenNumber = (options) => {
            const def = options || {};
            const { format = false } = def;
            let doc = pure.helpers.replaceSymbolWithNumber({ string: '#########' });

            const dv = (str) => {
                let sum = 0;
                const mult = str.length + 2;

                for (let i = 1; i <= str.length; i += 1) {
                    sum += parseInt(str[i - 1], 10) * (mult - i);
                }

                let digit = pure.helpers.mod({ digitStr: `${sum * 10}`, modValue: 11 });

                if ((digit === 10) || (digit === 11)) {
                    digit = 0;
                }

                return digit;
            };

            doc += dv(doc);
            doc += dv(doc);

            if (format === true) {
                doc = doc.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            }

            return doc;
        };

        this.brazilianCompanyNumber = (options) => {
            const def = options || {};
            const { format = false } = def;
            let doc = pure.helpers.replaceSymbolWithNumber({ string: '########' });

            const mod = (str) => {
                let sum = 0;
                let pos = str.length - 7;

                for (let i = 1; i <= str.length; i += 1) {
                    sum += parseInt(str[i - 1], 10) * (pos);
                    pos = pos <= 2 ? 9 : pos -= 1;
                }

                const modResult = parseInt(pure.helpers.mod({ digitStr: `${sum}`, modValue: 11 }), 10);

                return modResult < 2 ? 0 : 11 - modResult;
            };

            doc += '0001';
            doc += mod(doc);
            doc += mod(doc);

            if (format === true) {
                doc = doc.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
            }

            return doc;
        };

        this.brazilianId = (options) => {
            const def = options || {};
            const { format = false } = def;
            let doc = pure.helpers.replaceSymbolWithNumber({ string: '########' });
            let sum = 0;

            for (let i = 0; i < doc.length; i += 1) {
                sum += (doc[i] * (i + 2));
            }

            const modResult = parseInt(pure.helpers.mod({ digitStr: `${sum}`, modValue: 11 }), 10);
            let verificationNum = 11 - modResult;

            if (verificationNum === 11) {
                verificationNum = 0;
            } else if (verificationNum === 10) {
                verificationNum = 'X';
            }

            doc = `${doc}${verificationNum}`;

            if (format === true) {
                doc = doc.replace(/^(\d{2})(\d{3})(\d{3})(\d?\w{1})/, '$1.$2.$3-$4');
            }

            return doc;
        };
    }
}

module.exports = Document;
