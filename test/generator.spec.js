/* eslint no-console: "off" */

import inquirer from 'inquirer';
import fs from 'fs';
import sinon from 'sinon';
import pure from '../src/index.js';
import gen from '../src/cli/generator';

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
      savePath: `${__dirname}/support`,
      saveName: 'stubtest'
    });

    const generatedResult = await gen.generator({});
    const resultFromFile = JSON.parse(fs.readFileSync(`${__dirname}/support/stubtest.json`));

    expect(generatedResult.generated).toEqual(JSON.stringify(resultFromFile));
    expect(resultFromFile[0]).toHaveProperty('number');
    expect(resultFromFile[0]).toHaveProperty('zipCode');

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
      saveName: '-'
    });

    const generatedResult = await gen.generator({});

    expect(generatedResult.pathJoin).toContain(process.cwd());

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
      savePath: `${__dirname}/support`,
      saveName: 'stubtest1'
    });

    const generatedResult = await gen.generator({});
    const resultFromFile = JSON.parse(fs.readFileSync(`${__dirname}/support/stubtest1.json`));

    expect(generatedResult.generated).toEqual(JSON.stringify(resultFromFile));
    expect(resultFromFile[1]).toHaveProperty('number');
    expect(resultFromFile[1]).toHaveProperty('zipCode');
    expect(resultFromFile[1].zipCode).not.toEqual(resultFromFile[0].zipCode);

    inquirer.prompt.restore();
  });

  it('generate txt file with two entries unique', async () => {
    pure.seed(1);
    sinon.stub(inquirer, 'prompt').resolves({
      formatType: 'txt',
      templateStr: '{{random.number}}; {{address.zipCode}};\n',
      rows: 2,
      uniqueRows: true,
      savePath: `${__dirname}/support`,
      saveName: 'stubtest2'
    });

    const generatedResult = await gen.generator({});
    const resultFromFile = String(fs.readFileSync(`${__dirname}/support/stubtest2.txt`));

    expect(generatedResult.generated).toEqual(resultFromFile);

    inquirer.prompt.restore();
  });

  it('generate txt file with two entries', async () => {
    pure.seed(1);
    sinon.stub(inquirer, 'prompt').resolves({
      formatType: 'txt',
      templateStr: '{{random.number}}; {{address.zipCode}};\n',
      rows: 2,
      uniqueRows: false,
      savePath: `${__dirname}/support`,
      saveName: 'stubtest3'
    });

    const generatedResult = await gen.generator({});
    const resultFromFile = String(fs.readFileSync(`${__dirname}/support/stubtest3.txt`));

    expect(generatedResult.generated).toEqual(resultFromFile);

    inquirer.prompt.restore();
  });

  it('generate json file with cli parameter', async () => {
    pure.seed(1);
    sinon.stub(inquirer, 'prompt').resolves({
      formatType: 'txt',
      templateStr: '{{address.defaultCountry}}\n',
      rows: 1,
      uniqueRows: false,
      savePath: `${__dirname}/support`,
      saveName: 'stubtest4'
    });

    const generatedResult = await gen.generator({ locale: 'en' });
    const resultFromFile = String(fs.readFileSync(`${__dirname}/support/stubtest4.txt`));

    expect(generatedResult.generated).toEqual(resultFromFile);

    inquirer.prompt.restore();
  });

  it('generate json file with cli parameter and relative path', async () => {
    pure.seed(1);
    sinon.stub(inquirer, 'prompt').resolves({
      formatType: 'txt',
      templateStr: '{{address.defaultCountry}}\n',
      rows: 1,
      uniqueRows: false,
      savePath: `./test/support`,
      saveName: 'stubtest5'
    });

    const generatedResult = await gen.generator({ locale: 'en' });
    const resultFromFile = String(fs.readFileSync(`${__dirname}/support/stubtest5.txt`));

    expect(generatedResult.generated).toEqual(resultFromFile);

    inquirer.prompt.restore();
  });

  it('pass invalid locale as parameter', async () => {
    pure.seed(1);
    sinon.stub(inquirer, 'prompt').resolves({
      formatType: 'json',
      templateStr: '{"number":{{random.number}},"zipCode":"{{address.zipCode}}"}',
      rows: 1,
      uniqueRows: false,
      savePath: process.cwd(),
      saveName: '-'
    });

    expect(() => {
      gen.generator({ locale: `XXX` });
    }).toThrow('The following locale is not supported: XXX');

    inquirer.prompt.restore();
  });

  it("generate text and don't save", async () => {
    pure.seed(1);
    sinon.stub(inquirer, 'prompt').resolves({
      formatType: 'none',
      templateStr: '{{random.number}} <-> {{address.zipCode}}',
      rows: 1,
      uniqueRows: false
    });

    const generatedResult = await gen.generator({});
    const splitted = generatedResult.generated.split(' <-> ');

    expect(splitted.length).toEqual(2);

    inquirer.prompt.restore();
  });

  it('generate and throws error', async () => {
    sinon.stub(inquirer, 'prompt').resolves();

    await expect(gen.generator({})).rejects.toThrow('The following error has occurred');

    inquirer.prompt.restore();
  });

  describe('call auxiliary functions', () => {
    it('defaultTemplate with formatType json', () => {
      const result = gen.defaultTemplate({ formatType: 'json' });

      expect(result).toEqual('{ "number": {{random.number}}, "pass": "{{internet.password}}" }');
    });

    it('defaultTemplate with formatType csv', () => {
      const result = gen.defaultTemplate({ formatType: 'csv' });

      expect(result).toEqual('{{random.number}}; {{internet.password}}; {{address.city}};\n');
    });

    it('validateTemplate passing invalid string', () => {
      const result = gen.validateTemplate('');

      expect(result).toEqual('You need to pass a valid string!');
    });

    it('validateTemplate passing valid string', () => {
      const result = gen.validateTemplate('test');

      expect(result).toEqual(true);
    });

    it('validateRows passing invalid number', () => {
      const result = gen.validateRows(NaN);

      expect(result).toEqual('You need to pass a valid number');
    });

    it('validateRows passing valid number', () => {
      const result = gen.validateRows(1);

      expect(result).toEqual(true);
    });

    it('conditionalPath formatType json', () => {
      const result = gen.conditionalPath({ formatType: 'json' });

      expect(result).toEqual(true);
    });

    it('conditionalPath formatType none', () => {
      const result = gen.conditionalPath({ formatType: 'none' });

      expect(result).toEqual(false);
    });

    it('validatePath invalid string', () => {
      const result = gen.validatePath('');

      expect(result).toEqual('You need to pass a valid string!');
    });

    it('validatePath invalid dir', () => {
      const result = gen.validatePath('/ehgdeuyhgfj');

      expect(result).toEqual('No such directory. You need to pass a valid path!');
    });

    it('validatePath valid dir', () => {
      const result = gen.validatePath(`${__dirname}/support`);

      expect(result).toEqual(true);
    });

    it('conditionalName formatType json', () => {
      const result = gen.conditionalName({ formatType: 'json' });

      expect(result).toEqual(true);
    });

    it('conditionalName formatType none', () => {
      const result = gen.conditionalName({ formatType: 'none' });

      expect(result).toEqual(false);
    });
  });
});
