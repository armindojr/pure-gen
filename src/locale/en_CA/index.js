import address from './address/index.js';
import internet from './internet/index.js';
import phoneNumber from './phoneNumber/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'Canada (English)';
const localeName = 'en_CA';

export const en_CA = {
  ...en,
  address,
  internet,
  phoneNumber,
  title,
  localeName
};
