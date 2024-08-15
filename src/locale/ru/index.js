import address from './address/index.js';
import commerce from './commerce/index.js';
import company from './company/index.js';
import date from './date/index.js';
import hacker from './hacker/index.js';
import internet from './internet/index.js';
import lorem from './lorem/index.js';
import name from './name/index.js';
import phoneNumber from './phoneNumber/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'Russian';
const separator = ' и ';
const localeName = 'ru';

export const ru = {
  ...en,
  title,
  separator,
  localeName,
  address,
  commerce,
  company,
  date,
  hacker,
  internet,
  lorem,
  name,
  phoneNumber
};
