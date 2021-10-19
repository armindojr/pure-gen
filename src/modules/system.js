class System {
    constructor(pure) {
        this.fileName = (ext) => {
            let def = ext;
            if (typeof ext === 'undefined') {
                def = this.fileExt();
            } else if (ext[0] === '.') {
                def = ext.substr(1, ext.length);
            }

            let str = `${pure.random.words()}.${def}`;
            str = pure.helpers.slugify(str);
            str = str.replace(/\s\\\/-,/g, '_');
            str = str.toLowerCase();
            return str;
        };

        this.commonFileName = (ext) => {
            let def = ext;
            if (typeof ext === 'undefined') {
                def = this.commonFileExt();
            } else if (ext[0] === '.') {
                def = ext.substr(1, ext.length);
            }

            return this.fileName(def);
        };

        this.mimeType = () => pure.random.arrayElement(Object.keys(pure.registeredModules.system.mimeTypes));

        this.commonFileType = () => {
            const types = ['video', 'audio', 'image', 'text', 'application'];
            return pure.random.arrayElement(types);
        };

        this.commonFileExt = () => {
            const types = [
                'application/pdf',
                'audio/mpeg',
                'audio/wav',
                'image/png',
                'image/jpeg',
                'image/gif',
                'video/mp4',
                'video/mpeg',
                'text/html',
            ];
            return this.fileExt(pure.random.arrayElement(types));
        };

        this.fileType = () => {
            const types = [];
            const mimes = pure.registeredModules.system.mimeTypes;
            Object.keys(mimes).forEach((m) => {
                const parts = m.split('/');
                if (types.indexOf(parts[0]) === -1) {
                    types.push(parts[0]);
                }
            });
            return pure.random.arrayElement(types);
        };

        this.fileExt = (mimeType) => {
            const exts = [];
            const mimes = pure.registeredModules.system.mimeTypes;

            // get specific ext by mime-type
            if (typeof mimes[mimeType] === 'object') {
                return pure.random.arrayElement(mimes[mimeType].extensions);
            }

            // reduce mime-types to those with file-extensions
            Object.keys(mimes).forEach((m) => {
                if (mimes[m].extensions instanceof Array) {
                    mimes[m].extensions.forEach((ext) => {
                        exts.push(ext);
                    });
                }
            });

            return pure.random.arrayElement(exts);
        };

        this.directoryPath = () => pure.random.arrayElement(pure.registeredModules.system.directoryPaths);

        this.filePath = () => `${this.directoryPath()}/${this.fileName()}`;

        this.semver = () => pure.helpers.replaceSymbolWithNumber({ string: '#.#.#' });
    }
}

module.exports = System;
