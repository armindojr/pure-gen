import address from './address/index.js';
import company from './company/index.js';
import date from './date/index.js';
import internet from './internet/index.js';
import lorem from './lorem/index.js';
import name from './name/index.js';
import phoneNumber from './phoneNumber/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'Czech';
const localeName = 'cz';

export const cz = {
  ...en,
  title,
  localeName,
  address,
  company,
  date,
  internet,
  lorem,
  name,
  phoneNumber
};
