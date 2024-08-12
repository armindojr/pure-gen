import fs from 'fs';
import pure from '../index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// generate dataSet as example
fs.writeFile(__dirname + '/dataSet.json', JSON.stringify(pure.helpers.userCard()), function () {
  console.log('dataSet generated successfully!');
});

// generate bigDataSet as example
let bigSet = [];

for (let i = 20; i >= 0; i--) {
  bigSet.push(pure.helpers.userCard());
}

fs.writeFile(__dirname + '/bigDataSet.json', JSON.stringify(bigSet), function () {
  console.log('bigDataSet generated successfully!');
});
