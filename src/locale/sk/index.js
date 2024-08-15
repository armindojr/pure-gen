import address from './address/index.js';
import company from './company/index.js';
import internet from './internet/index.js';
import lorem from './lorem/index.js';
import name from './name/index.js';
import phoneNumber from './phoneNumber/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'Slovakian';
const localeName = 'sk';

export const sk = {
  ...en,
  address,
  company,
  internet,
  lorem,
  name,
  phoneNumber,
  title,
  localeName
};
