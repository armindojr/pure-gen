import address from './address/index.js';
import internet from './internet/index.js';
import phoneNumber from './phoneNumber/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const localeName = 'en_GB';

export const en_GB = {
  ...en,
  localeName,
  address,
  internet,
  phoneNumber
};
