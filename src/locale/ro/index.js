import address from './address/index.js';
import date from './date/index.js';
import internet from './internet/index.js';
import name from './name/index.js';
import phoneNumber from './phoneNumber/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'Romanian';
const localeName = 'ro';

export const ro = {
  ...en,
  address,
  date,
  internet,
  name,
  phoneNumber,
  title,
  localeName
};
