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
    });

    describe('commonFileName()', () => {
        it('returns filenames without system path seperators', () => {
            sinon.stub(pure.random, 'words').returns('24/7');
            const fileName = pure.system.commonFileName();
            assert.equal(fileName.indexOf('/'), -1, 'generated commonFileNames should not have path seperators');

            pure.random.words.restore();
        });
    });
});
