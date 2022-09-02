import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import de from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fs.writeFileSync(path.join(__dirname, 'de.json'), JSON.stringify(de, undefined, 4));
