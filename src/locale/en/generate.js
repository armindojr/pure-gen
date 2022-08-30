import en from './index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fs.writeFileSync(path.join(__dirname, 'en.json'), JSON.stringify(en, undefined, 4))