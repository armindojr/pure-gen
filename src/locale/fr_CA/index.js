import address from './address/index.js';
import internet from './internet/index.js';
import phoneNumber from './phoneNumber/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'Canada (French)';
const localeName = 'fr_CA';

export const fr_CA = {
  ...en,
  address,
  internet,
  phoneNumber,
  localeName,
  title
};
