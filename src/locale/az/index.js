import address from './address/index.js';
import commerce from './commerce/index.js';
import company from './company/index.js';
import date from './date/index.js';
import internet from './internet/index.js';
import name from './name/index.js';
import phoneNumber from './phoneNumber/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'Azerbaijani';
const separator = ' və ';
const localeName = 'az';

export const az = {
  ...en,
  title,
  separator,
  localeName,
  address,
  commerce,
  company,
  date,
  internet,
  name,
  phoneNumber
};
