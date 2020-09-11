// generates fake data for many computer systems properties

/**
 *
 * @namespace pure.system
 */
function System(pure) {
    /**
     * fileName
     *
     * @description Generates a file name with extension
     * @param {string} [ext= random] Define what extension to use
     * @method pure.system.fileName
     * @example
     * console.log(pure.system.fileName());
     * //outputs: "account_home.ipk"
     */
    this.fileName = (ext) => {
        let def = ext;
        if (typeof ext === 'undefined') {
            def = pure.system.fileExt();
        } else if (ext[0] === '.') {
            def = ext.substr(1, ext.length);
        }

        let str = `${pure.random.words()}.${def}`;
        str = pure.helpers.slugify(str);
        str = str.replace(/\s\\\/-,/g, '_');
        str = str.toLowerCase();
        return str;
    };

    /**
     * commonFileName
     *
     * @description Generates a file name with common extension
     * @param {string} [ext= random] Define what extension to use
     * @method pure.system.commonFileName
     * @example
     * console.log(pure.system.commonFileName());
     * //outputs: "thx.gif"
     */
    this.commonFileName = (ext) => {
        let def = ext;
        if (typeof ext === 'undefined') {
            def = pure.system.commonFileExt();
        } else if (ext[0] === '.') {
            def = ext.substr(1, ext.length);
        }

        return pure.system.fileName(def);
    };

    /**
     * mimeType
     *
     * @description Generates a random internet media type
     * @method pure.system.mimeType
     * @example
     * console.log(pure.system.mimeType());
     * //outputs: "application/vnd.picsel"
     */
    this.mimeType = () => pure.random.arrayElement(Object.keys(pure.definitions.system.mimeTypes));

    /**
     * commonFileType
     *
     * @description Returns a commonly used file type
     * @method pure.system.commonFileType
     * @example
     * console.log(pure.system.commonFileType());
     * //outputs: "video"
     */
    this.commonFileType = () => {
        const types = ['video', 'audio', 'image', 'text', 'application'];
        return pure.random.arrayElement(types);
    };

    /**
     * commonFileExt
     *
     * @description Returns a commonly used file extension based on optional type
     * @method pure.system.commonFileExt
     * @example
     * console.log(pure.system.commonFileExt());
     * //outputs: "wav"
     */
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
        return pure.system.fileExt(pure.random.arrayElement(types));
    };

    /**
     * fileType
     *
     * @description Returns any file type available as mime-type
     * @method pure.system.fileType
     * @example
     * console.log(pure.system.fileType());
     * //outputs: "x-shader"
     */
    this.fileType = () => {
        const types = [];
        const mimes = pure.definitions.system.mimeTypes;
        Object.keys(mimes).forEach((m) => {
            const parts = m.split('/');
            if (types.indexOf(parts[0]) === -1) {
                types.push(parts[0]);
            }
        });
        return pure.random.arrayElement(types);
    };

    /**
     * fileExt
     *
     * @description Returns file extension based on mime type
     * @param {string} [mimeType= random] Define what internet media type to use
     * @method pure.system.fileExt
     * @example
     * console.log(pure.system.fileExt());
     * //outputs: "c4u"
     */
    this.fileExt = (mimeType) => {
        const exts = [];
        const mimes = pure.definitions.system.mimeTypes;

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

    /**
     * directoryPath
     *
     * @description Returns directory path
     * @method pure.system.directoryPath
     * @example
     * console.log(pure.system.directoryPath());
     * //outputs: "/private/tmp"
     */
    this.directoryPath = () => pure.random.arrayElement(pure.definitions.system.directoryPaths);

    /**
     * filePath
     *
     * @description Returns file path
     * @method pure.system.filePath
     * @example
     * console.log(pure.system.filePath());
     * //outputs: "/usr/src/solutions_virtual.mif"
     */
    this.filePath = () => pure.fake('{{system.directoryPath}}/{{system.fileName}}');

    /**
     * semver
     *
     * @description Returns random semantic versioning number
     * @method pure.system.semver
     * @example
     * console.log(pure.system.semver());
     * //outputs: "9.8.1"
     */
    this.semver = () => pure.helpers.replaceSymbolWithNumber('#.#.#');
}

module.exports = System;
