/* eslint no-console: "off" */
const tar = require('tar');

function compress() {
    tar.c({
        gzip: true,
        file: 'locale.tgz',
    }, ['./locale']).then(() => {
        console.log('Locales compressed!');
    });
}

function decompress() {
    tar.x({
        file: 'locale.tgz',
    }).then(() => {
        console.log('Locales extracted!');
    });
}

if (process.argv[2] === 'compress') {
    compress();
} else if (process.argv[2] === 'decompress') {
    decompress();
}
