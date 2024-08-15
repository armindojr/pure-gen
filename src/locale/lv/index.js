import address from './address/index.js';
import commerce from './commerce/index.js';
import company from './company/index.js';
import date from './date/index.js';
import internet from './internet/index.js';
import lorem from './lorem/index.js';
import name from './name/index.js';
import phoneNumber from './phoneNumber/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'Latvian';
const separator = ' un ';
const localeName = 'lv';

export const lv = {
  ...en,
  address,
  commerce,
  company,
  date,
  internet,
  lorem,
  name,
  phoneNumber,
  title,
  separator,
  localeName
};
