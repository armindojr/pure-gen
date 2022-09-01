import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pure from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// generate dataSet as example
fs.writeFile(`${__dirname}/dataSet.json`, JSON.stringify(pure.helpers.userCard()), () => {
    console.log('dataSet generated successfully!');
});
// generate bigDataSet as example
const bigSet = [];

for (let i = 20; i >= 0; i--) {
    bigSet.push(pure.helpers.userCard());
}

fs.writeFile(`${__dirname}/bigDataSet.json`, JSON.stringify(bigSet), () => {
    console.log('bigDataSet generated successfully!');
});
