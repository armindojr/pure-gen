import address from './address/index.js';
import internet from './internet/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'United States (English)';
const localeName = 'en_US';

export const en_US = {
  ...en,
  address,
  internet,
  title,
  localeName
};
