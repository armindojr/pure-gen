export class System {
  constructor(pure) {
    this.pure = pure;
  }

  fileName(ext) {
    let def = ext;

    if (typeof ext === 'undefined') {
      def = this.pure.system.fileExt();
    } else if (ext[0] === '.') {
      def = ext.substr(1, ext.length);
    }

    let str = `${this.pure.random.words()}.${def}`;
    str = this.pure.helpers.slugify(str);
    str = str.replace(/\s\\\/-,/g, '_');
    str = str.toLowerCase();

    return str;
  }

  commonFileName(ext) {
    let def = ext;

    if (typeof ext === 'undefined') {
      def = this.pure.system.commonFileExt();
    } else if (ext[0] === '.') {
      def = ext.substr(1, ext.length);
    }

    return this.pure.system.fileName(def);
  }

  mimeType() {
    return this.pure.random.arrayElement(Object.keys(this.pure.registeredModules.system.mimeTypes));
  }

  commonFileType() {
    const types = ['video', 'audio', 'image', 'text', 'application'];

    return this.pure.random.arrayElement(types);
  }

  commonFileExt() {
    const types = [
      'application/pdf',
      'audio/mpeg',
      'audio/wav',
      'image/png',
      'image/jpeg',
      'image/gif',
      'video/mp4',
      'video/mpeg',
      'text/html'
    ];

    return this.pure.system.fileExt(this.pure.random.arrayElement(types));
  }

  fileType() {
    const types = [];
    const mimes = this.pure.registeredModules.system.mimeTypes;

    Object.keys(mimes).forEach(m => {
      const parts = m.split('/');
      if (types.indexOf(parts[0]) === -1) {
        types.push(parts[0]);
      }
    });

    return this.pure.random.arrayElement(types);
  }

  fileExt(mimeType) {
    const exts = [];
    const mimes = this.pure.registeredModules.system.mimeTypes;

    // get specific ext by mime-type
    if (typeof mimes[mimeType] === 'object') {
      return this.pure.random.arrayElement(mimes[mimeType].extensions);
    }

    // reduce mime-types to those with file-extensions
    Object.keys(mimes).forEach(m => {
      if (mimes[m].extensions instanceof Array) {
        mimes[m].extensions.forEach(ext => {
          exts.push(ext);
        });
      }
    });

    return this.pure.random.arrayElement(exts);
  }

  directoryPath() {
    return this.pure.random.arrayElement(this.pure.registeredModules.system.directoryPaths);
  }

  filePath() {
    return `${this.pure.system.directoryPath()}/${this.pure.system.fileName()}`;
  }

  semver() {
    return this.pure.helpers.replaceSymbolWithNumber({ string: '#.#.#' });
  }
}
