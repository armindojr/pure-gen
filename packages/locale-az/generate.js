import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import az from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fs.writeFileSync(path.join(__dirname, 'az.json'), JSON.stringify(az, undefined, 4));
