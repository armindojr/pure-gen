const { deflateRawSync, inflateRawSync } = require('zlib');
const {
    readFileSync,
    writeFileSync,
    existsSync,
    mkdirSync
} = require('fs');
const glob = require("glob")
const path = require('path')

function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    mkdirSync(dirname);
}

function compress() {
    glob('./locale/**/**/**/*.js', (er, files) => {
        files.forEach(element => {
            const source = readFileSync(element);
            const compressed = deflateRawSync(source)
            const newFile = element.replace('/locale/', '/dist/compressed/')
            ensureDirectoryExistence(newFile)
            writeFileSync(newFile, compressed)
        });
    })
}

function decompress() {
    glob('./dist/compressed/**/**/**/*.js', (er, files) => {
        files.forEach(element => {
            const dest = readFileSync(element)
            const decompressed = inflateRawSync(dest)
            const newFile = element.replace('/dist/compressed/', '/locale/')
            ensureDirectoryExistence(newFile)
            writeFileSync(newFile, decompressed)
        });
    })
}

if (process.argv[2] === 'compress') {
    compress()
} else if (process.argv[2] === 'decompress') {
    decompress()
}