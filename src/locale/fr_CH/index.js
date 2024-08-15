import address from './address/index.js';
import internet from './internet/index.js';
import phoneNumber from './phoneNumber/index.js';

// Merge fallback locale
import { en } from '../en/index.js';

const title = 'French (Switzerland)';
const localeName = 'fr_CH';

export const fr_CH = {
  ...en,
  address,
  internet,
  phoneNumber,
  localeName,
  title
};
