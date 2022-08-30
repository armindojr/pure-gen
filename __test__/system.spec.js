import sinon from 'sinon';
import pure from '../index.js';

describe('system.js', () => {
    describe('directoryPath()', () => {
        it('returns unix fs directory full path', () => {
            sinon.stub(pure.random, 'words').returns('24/7');

            const directoryPath = pure.system.directoryPath();

            expect(directoryPath.indexOf('/')).toEqual(0);

            pure.random.words.restore();
        });
    });

    describe('filePath()', () => {
        it('returns unix fs file full path', () => {
            sinon.stub(pure.random, 'words').returns('24/7');

            const filePath = pure.system.filePath();

            expect(filePath.indexOf('/')).toEqual(0);

            pure.random.words.restore();
        });
    });

    describe('fileName()', () => {
        it('returns filenames without system path seperators', () => {
            sinon.stub(pure.random, 'words').returns('24/7');

            const fileName = pure.system.fileName();

            expect(fileName.indexOf('/')).toEqual(-1);

            pure.random.words.restore();
        });

        it('returns filenames passing \'ext\' as parameter', () => {
            const fileName = pure.system.fileName('zip');

            expect(/(.*?)\.(zip)+$/g.test(fileName)).toEqual(true);
        });

        it('returns filenames passing \'ext\' as parameter with dot in begining', () => {
            const fileName = pure.system.fileName('.jpg');

            expect(/(.*?)\.(jpg)+$/g.test(fileName)).toEqual(true);
        });
    });

    describe('mimeType()', () => {
        it('returns random mimetype', () => {
            const mime = pure.system.mimeType();

            expect(mime).toBeDefined();
        });
    });

    describe('commonFileType()', () => {
        it('returns random common file type', () => {
            const file = pure.system.commonFileType();

            expect(file).toBeDefined();
        });
    });

    describe('fileType()', () => {
        it('returns random common file type', () => {
            const file = pure.system.fileType();

            expect(file).toBeDefined();
        });
    });

    describe('commonFileName()', () => {
        it('returns filenames without system path seperators', () => {
            sinon.stub(pure.random, 'words').returns('24/7');

            const fileName = pure.system.commonFileName();

            expect(fileName.indexOf('/')).toEqual(-1);

            pure.random.words.restore();
        });

        it('returns filenames passing \'ext\' as parameter', () => {
            const fileName = pure.system.commonFileName('zip');

            expect(/(.*?)\.(zip)+$/g.test(fileName)).toEqual(true);
        });

        it('returns filenames passing \'ext\' as parameter with dot in begining', () => {
            const fileName = pure.system.commonFileName('.jpg');

            expect(/(.*?)\.(jpg)+$/g.test(fileName)).toEqual(true);
        });
    });
});
