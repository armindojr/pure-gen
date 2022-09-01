import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ar from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fs.writeFileSync(path.join(__dirname, 'ar.json'), JSON.stringify(ar, undefined, 4));
