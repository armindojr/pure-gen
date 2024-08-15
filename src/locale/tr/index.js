import address from './address/index.js';
import internet from './internet/index.js';
import lorem from './lorem/index.js';
import name from './name/index.js';
import phoneNumber from './phoneNumber/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'Turkish';
const localeName = 'tr';

export const tr = {
  ...en,
  address,
  internet,
  lorem,
  name,
  phoneNumber,
  title,
  localeName
};
