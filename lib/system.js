// generates fake data for many computer systems properties

/**
 *
 * @namespace pure.system
 */
function System (pure) {

  /**
   * generates a file name with extension or optional type
   *
   * @method pure.system.fileName
   * @param {string} ext
   * @param {string} type
   */
  this.fileName = function (ext, type) {
    var str = pure.fake("{{random.words}}.{{system.fileExt}}");
    str = str.replace(/ /g, '_');
    str = str.replace(/\,/g, '_');
    str = str.replace(/\-/g, '_');
    str = str.replace(/\\/g, '_');
    str = str.replace(/\//g, '_');
    str = str.toLowerCase();
    return str;
  };

  /**
   * commonFileName
   *
   * @method pure.system.commonFileName
   * @param {string} ext
   * @param {string} type
   */
  this.commonFileName = function (ext, type) {
    var str = pure.random.words() + "." + (ext || pure.system.commonFileExt());
    str = str.replace(/ /g, '_');
    str = str.replace(/\,/g, '_');
    str = str.replace(/\-/g, '_');
    str = str.replace(/\\/g, '_');
    str = str.replace(/\//g, '_');
    str = str.toLowerCase();
    return str;
  };

  /**
   * mimeType
   *
   * @method pure.system.mimeType
   */
  this.mimeType = function () {
    return pure.random.arrayElement(Object.keys(pure.definitions.system.mimeTypes));
  };

  /**
   * returns a commonly used file type
   *
   * @method pure.system.commonFileType
   */
  this.commonFileType = function () {
    var types = ['video', 'audio', 'image', 'text', 'application'];
    return pure.random.arrayElement(types)
  };

  /**
   * returns a commonly used file extension based on optional type
   *
   * @method pure.system.commonFileExt
   * @param {string} type
   */
  this.commonFileExt = function (type) {
    var types = [
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
    return pure.system.fileExt(pure.random.arrayElement(types));
  };


  /**
   * returns any file type available as mime-type
   *
   * @method pure.system.fileType
   */
  this.fileType = function () {
    var types = [];
    var mimes = pure.definitions.system.mimeTypes;
    Object.keys(mimes).forEach(function(m){
      var parts = m.split('/');
      if (types.indexOf(parts[0]) === -1) {
        types.push(parts[0]);
      }
    });
    return pure.random.arrayElement(types);
  };

  /**
   * fileExt
   *
   * @method pure.system.fileExt
   * @param {string} mimeType
   */
  this.fileExt = function (mimeType) {
    var exts = [];
    var mimes = pure.definitions.system.mimeTypes;

    // get specific ext by mime-type
    if (typeof mimes[mimeType] === "object") {
      return pure.random.arrayElement(mimes[mimeType].extensions);
    }

    // reduce mime-types to those with file-extensions
    Object.keys(mimes).forEach(function(m){
      if (mimes[m].extensions instanceof Array) {
        mimes[m].extensions.forEach(function(ext){
          exts.push(ext)
        });
      }
    });
    return pure.random.arrayElement(exts);
  };

  /**
   * returns directory path
   *
   * @method pure.system.directoryPath
   */
  this.directoryPath = function () {
      var paths = pure.definitions.system.directoryPaths
      return pure.random.arrayElement(paths);
  };

  /**
   * returns file path
   *
   * @method pure.system.filePath
   */
  this.filePath = function () {
      return pure.fake("{{system.directoryPath}}/{{system.fileName}}");
  };

  /**
   * semver
   *
   * @method pure.system.semver
   */
  this.semver = function () {
      return [pure.random.number(9),
              pure.random.number(9),
              pure.random.number(9)].join('.');
  }

}

module['exports'] = System;
