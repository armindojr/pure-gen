import address from './address/index.js';
import name from './name/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'Farsi';
const localeName = 'fa';

export const fa = {
  ...en,
  address,
  name,
  title,
  localeName
};
