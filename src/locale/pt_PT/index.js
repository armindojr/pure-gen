import address from './address/index.js';
import commerce from './commerce/index.js';
import date from './date/index.js';
import internet from './internet/index.js';
import name from './name/index.js';
import phoneNumber from './phoneNumber/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'Portuguese (Portugal)';
const localeName = 'pt_PT';

export const pt_PT = {
  ...en,
  address,
  commerce,
  date,
  internet,
  name,
  phoneNumber,
  title,
  localeName
};
