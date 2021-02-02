const { assert, expect } = require('chai');
const sinon = require('sinon');
const inquirer = require('inquirer');
const fs = require('fs');
const pure = require('../index');
const {
    defaultTemplate,
    validateTemplate,
    validateRows,
    conditionalPath,
    validatePath,
    conditionalName,
    generator,
} = require('../src/cli/generator');

describe('generator.js', () => {
    beforeEach(() => {
        sinon.stub(console, 'log').returns();
    });

    afterEach(() => {
        console.log.restore();
    });

    it('generate json file with only one entry', async () => {
        pure.seed(1);
        sinon.stub(inquirer, 'prompt').resolves({
            formatType: 'json',
            templateStr: '{"number":{{random.number}},"zipCode":"{{address.zipCode}}"}',
            rows: 1,
            uniqueRows: false,
            savePath: '/__test__/support',
            saveName: 'stubtest',
        });

        const generatedResult = await generator();
        const resultFromFile = JSON.parse(fs.readFileSync(`${process.cwd()}/__test__/support/stubtest.json`));

        assert.equal(generatedResult.generated, JSON.stringify(resultFromFile));
        expect(resultFromFile[0]).to.have.property('number');
        expect(resultFromFile[0]).to.have.property('zipCode');

        inquirer.prompt.restore();
    });

    it('generate with only one entry and path is cwd', async () => {
        pure.seed(1);
        sinon.stub(fs, 'writeFileSync').returns();
        sinon.stub(inquirer, 'prompt').resolves({
            formatType: 'json',
            templateStr: '{"number":{{random.number}},"zipCode":"{{address.zipCode}}"}',
            rows: 1,
            uniqueRows: false,
            savePath: process.cwd(),
            saveName: '-',
        });

        const generatedResult = await generator();

        expect(generatedResult.pathJoin).to.include(process.cwd());

        inquirer.prompt.restore();
        fs.writeFileSync.restore();
    });

    it('generate json file with two entries unique', async () => {
        pure.seed(1);
        sinon.stub(inquirer, 'prompt').resolves({
            formatType: 'json',
            templateStr: '{"number":{{random.number}},"zipCode":"{{address.zipCode}}"}',
            rows: 2,
            uniqueRows: true,
            savePath: '/__test__/support',
            saveName: 'stubtest1',
        });

        const generatedResult = await generator();
        const resultFromFile = JSON.parse(fs.readFileSync(`${process.cwd()}/__test__/support/stubtest1.json`));

        assert.equal(generatedResult.generated, JSON.stringify(resultFromFile));
        expect(resultFromFile[1]).to.have.property('number');
        expect(resultFromFile[1]).to.have.property('zipCode');
        assert.ok(resultFromFile[1].zipCode !== resultFromFile[0].zipCode);

        inquirer.prompt.restore();
    });

    it('generate txt file with two entries unique', async () => {
        pure.seed(1);
        sinon.stub(inquirer, 'prompt').resolves({
            formatType: 'txt',
            templateStr: '{{random.number}}; {{address.zipCode}};\n',
            rows: 2,
            uniqueRows: true,
            savePath: '/__test__/support',
            saveName: 'stubtest2',
        });

        const generatedResult = await generator();
        const resultFromFile = String(fs.readFileSync(`${process.cwd()}/__test__/support/stubtest2.txt`));

        assert.equal(generatedResult.generated, resultFromFile);

        inquirer.prompt.restore();
    });

    it('generate txt file with two entries', async () => {
        pure.seed(1);
        sinon.stub(inquirer, 'prompt').resolves({
            formatType: 'txt',
            templateStr: '{{random.number}}; {{address.zipCode}};\n',
            rows: 2,
            uniqueRows: false,
            savePath: '/__test__/support',
            saveName: 'stubtest3',
        });

        const generatedResult = await generator();
        const resultFromFile = String(fs.readFileSync(`${process.cwd()}/__test__/support/stubtest3.txt`));

        assert.equal(generatedResult.generated, resultFromFile);

        inquirer.prompt.restore();
    });

    it('generate text and don\'t save', async () => {
        pure.seed(1);
        sinon.stub(inquirer, 'prompt').resolves({
            formatType: 'none',
            templateStr: '{{random.number}} <-> {{address.zipCode}}',
            rows: 1,
            uniqueRows: false,
        });

        const generatedResult = await generator();
        const splitted = generatedResult.generated.split(' <-> ');

        assert.equal(splitted.length, 2);

        inquirer.prompt.restore();
    });

    it('generate and throws error', async () => {
        sinon.stub(inquirer, 'prompt').resolves();

        await generator().catch((err) => {
            assert.isDefined(err);
        });

        inquirer.prompt.restore();
    });

    describe('call auxiliary functions', () => {
        it('defaultTemplate with formatType json', () => {
            const result = defaultTemplate({ formatType: 'json' });

            assert.equal(result, '{ "number": {{random.number}}, "pass": "{{internet.password}}" }');
        });

        it('defaultTemplate with formatType csv', () => {
            const result = defaultTemplate({ formatType: 'csv' });

            assert.equal(result, '{{random.number}}; {{internet.password}}; {{address.city}};');
        });

        it('validateTemplate passing invalid string', () => {
            const result = validateTemplate('');

            assert.equal(result, 'You need to pass a valid string!');
        });

        it('validateTemplate passing valid string', () => {
            const result = validateTemplate('test');

            // console.log(result)
            assert.equal(result, true);
        });

        it('validateRows passing invalid number', () => {
            const result = validateRows(NaN);

            assert.equal(result, 'You need to pass a valid number');
        });

        it('validateRows passing valid number', () => {
            const result = validateRows(1);

            assert.equal(result, true);
        });

        it('conditionalPath formatType json', () => {
            const result = conditionalPath({ formatType: 'json' });

            assert.equal(result, true);
        });

        it('conditionalPath formatType none', () => {
            const result = conditionalPath({ formatType: 'none' });

            assert.equal(result, false);
        });

        it('validatePath invalid string', () => {
            const result = validatePath('');

            assert.equal(result, 'You need to pass a valid string!');
        });

        it('validatePath invalid dir', () => {
            const result = validatePath('/ehgdeuyhgfj');

            assert.equal(result, 'No such directory. You need to pass a valid path!');
        });

        it('validatePath valid dir', () => {
            const result = validatePath('./__test__');

            assert.equal(result, true);
        });

        it('conditionalName formatType json', () => {
            const result = conditionalName({ formatType: 'json' });

            assert.equal(result, true);
        });

        it('conditionalName formatType none', () => {
            const result = conditionalName({ formatType: 'none' });

            assert.equal(result, false);
        });
    });
});
