import address from './address/index.js';
import commerce from './commerce/index.js';
import name from './name/index.js';
import transport from './transport/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'Arabic';
const separator = ' & ';
const localeName = 'ar';

export const ar = {
  ...en,
  title,
  separator,
  localeName,
  address,
  commerce,
  name,
  transport
};
