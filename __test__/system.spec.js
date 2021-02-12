const { assert } = require('chai');
const sinon = require('sinon');
const pure = require('../index');

describe('system.js', () => {
    describe('directoryPath()', () => {
        it('returns unix fs directory full path', () => {
            sinon.stub(pure.random, 'words').returns('24/7');
            const directoryPath = pure.system.directoryPath();
            assert.equal(directoryPath.indexOf('/'), 0, 'generated directoryPath should start with /');

            pure.random.words.restore();
        });
    });

    describe('filePath()', () => {
        it('returns unix fs file full path', () => {
            sinon.stub(pure.random, 'words').returns('24/7');
            const filePath = pure.system.filePath();
            assert.equal(filePath.indexOf('/'), 0, 'generated filePath should start with /');

            pure.random.words.restore();
        });
    });

    describe('fileName()', () => {
        it('returns filenames without system path seperators', () => {
            sinon.stub(pure.random, 'words').returns('24/7');
            const fileName = pure.system.fileName();
            assert.equal(fileName.indexOf('/'), -1, 'generated fileNames should not have path seperators');

            pure.random.words.restore();
        });
        it('returns filenames passing "ext" as parameter', () => {
            const fileName = pure.system.fileName('zip');

            assert.ok(fileName.match(/(.*?)\.(zip)+$/g));
        });
        it('returns filenames passing "ext" as parameter with dot in begining', () => {
            const fileName = pure.system.fileName('.jpg');

            assert.ok(fileName.match(/(.*?)\.(jpg)+$/g));
        });
    });

    describe('mimeType()', () => {
        it('returns random mimetype', () => {
            const mime = pure.system.mimeType();

            assert.ok(mime);
        });
    });

    describe('commonFileType()', () => {
        it('returns random common file type', () => {
            const file = pure.system.commonFileType();

            assert.ok(file);
        });
    });

    describe('fileType()', () => {
        it('returns random common file type', () => {
            const file = pure.system.fileType();

            assert.ok(file);
        });
    });

    describe('commonFileName()', () => {
        it('returns filenames without system path seperators', () => {
            sinon.stub(pure.random, 'words').returns('24/7');
            const fileName = pure.system.commonFileName();
            assert.equal(fileName.indexOf('/'), -1, 'generated commonFileNames should not have path seperators');

            pure.random.words.restore();
        });
        it('returns filenames passing "ext" as parameter', () => {
            const fileName = pure.system.commonFileName('zip');

            assert.ok(fileName.match(/(.*?)\.(zip)+$/g));
        });
        it('returns filenames passing "ext" as parameter with dot in begining', () => {
            const fileName = pure.system.commonFileName('.jpg');

            assert.ok(fileName.match(/(.*?)\.(jpg)+$/g));
        });
    });
});
