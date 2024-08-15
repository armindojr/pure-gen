import address from './address/index.js';
import company from './company/index.js';
import date from './date/index.js';
import internet from './internet/index.js';
import lorem from './lorem/index.js';
import name from './name/index.js';
import phoneNumber from './phoneNumber/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'French';
const localeName = 'fr';

export const fr = {
  ...en,
  address,
  company,
  date,
  internet,
  lorem,
  name,
  phoneNumber,
  title,
  localeName
};
